export type AnalyticsConsentState = 'granted' | 'denied' | 'unknown';
export type AnalyticsConsentSource = 'window' | 'dataset' | 'consent_mode' | 'adapter';

interface ConsentStore {
  state: AnalyticsConsentState;
  sequence: number;
  dataLayerRef: unknown[] | undefined;
  dataLayerIndex: number;
  history: Array<{ sequence: number; source: AnalyticsConsentSource; state: AnalyticsConsentState }>;
}

const stores = new WeakMap<object, ConsentStore>();

function supportedState(value: unknown): AnalyticsConsentState | undefined {
  return value === 'granted' || value === 'denied' || value === 'unknown' ? value : undefined;
}

function consentModeState(item: unknown): AnalyticsConsentState | undefined {
  if (item === null || item === undefined) return undefined;
  const values = Array.from(item as ArrayLike<unknown>);
  if (values[0] !== 'consent' || (values[1] !== 'default' && values[1] !== 'update')) return undefined;
  const state = (values[2] as { analytics_storage?: unknown } | undefined)?.analytics_storage;
  return supportedState(state);
}

function apply(store: ConsentStore, source: AnalyticsConsentSource, state: AnalyticsConsentState): void {
  // Unknown never erases an explicit decision.
  if (state === 'unknown' && store.state !== 'unknown') return;
  store.sequence += 1;
  store.state = state;
  store.history.push({ sequence: store.sequence, source, state });
}

function initializeStore(): ConsentStore {
  const windowState = supportedState(window.__DATACOST_ANALYTICS_CONSENT);
  const datasetState = supportedState(document.documentElement.dataset.analyticsConsent);
  const explicitInitial = [windowState, datasetState].filter((state): state is AnalyticsConsentState => state !== undefined && state !== 'unknown');
  const state: AnalyticsConsentState = explicitInitial.includes('denied')
    ? 'denied'
    : explicitInitial.includes('granted')
      ? 'granted'
      : 'unknown';

  const store: ConsentStore = {
    state,
    sequence: 0,
    dataLayerRef: window.dataLayer,
    dataLayerIndex: 0,
    history: []
  };

  if (windowState) store.history.push({ sequence: 0, source: 'window', state: windowState });
  if (datasetState) store.history.push({ sequence: 0, source: 'dataset', state: datasetState });
  return store;
}

function currentStore(): ConsentStore | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;
  let store = stores.get(window);
  if (!store) {
    store = initializeStore();
    stores.set(window, store);
  }
  return store;
}

export function refreshAnalyticsConsent(): AnalyticsConsentState {
  const store = currentStore();
  if (!store) return 'unknown';

  if (store.dataLayerRef !== window.dataLayer) {
    store.dataLayerRef = window.dataLayer;
    store.dataLayerIndex = 0;
  }
  const layer = window.dataLayer ?? [];
  for (let index = store.dataLayerIndex; index < layer.length; index += 1) {
    const state = consentModeState(layer[index]);
    if (state) apply(store, 'consent_mode', state);
  }
  store.dataLayerIndex = layer.length;
  return store.state;
}

export function updateAnalyticsConsent(state: AnalyticsConsentState, source: 'adapter' = 'adapter'): void {
  const store = currentStore();
  if (!store || source !== 'adapter') return;
  apply(store, source, state);
}

export function getAnalyticsConsentAudit(): ReadonlyArray<{ sequence: number; source: AnalyticsConsentSource; state: AnalyticsConsentState }> {
  return currentStore()?.history ?? [];
}

/**
 * Consent contract:
 * - Window and dataset values are initial compatibility inputs; conflicting initial
 *   inputs resolve conservatively to denied.
 * - Consent Mode entries are replayed in array order and later explicit entries win.
 * - The adapter API is the only live mutation authority exposed by this module.
 *   Compatibility-source labels are observation metadata, never update authority.
 * - Unknown never clears a prior grant or denial.
 * - No known state preserves the approved Release A default (analytics allowed).
 * - Dispatch refreshes this store immediately before sending.
 */
