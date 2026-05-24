declare global {
  interface Window {
    OneSignalDeferred?: Array<(OneSignal: any) => void>;
  }
}

const ONESIGNAL_APP_ID = 'd1b81488-8d12-4ec1-92f4-effe26092a0c';
const ONESIGNAL_SCRIPT_ID = 'datacost-onesignal-sdk';
const ONESIGNAL_SCRIPT_SRC = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';

let oneSignalLoadPromise: Promise<void> | null = null;

function loadOneSignalSdk(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (oneSignalLoadPromise) return oneSignalLoadPromise;

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async (OneSignal: any) => {
    await OneSignal.init({
      appId: ONESIGNAL_APP_ID
    });
  });

  oneSignalLoadPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(ONESIGNAL_SCRIPT_ID);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = ONESIGNAL_SCRIPT_ID;
    script.src = ONESIGNAL_SCRIPT_SRC;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('OneSignal SDK failed to load'));
    document.head.appendChild(script);
  });

  return oneSignalLoadPromise;
}

export async function triggerOneSignalPrompt() {
  if (typeof window === 'undefined') return;

  await loadOneSignalSdk();

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async (OneSignal: any) => {
    try {
      await OneSignal.Slidedown.promptPush();
    } catch (error) {
      console.error('OneSignal prompt failed', error);
    }
  });
}
