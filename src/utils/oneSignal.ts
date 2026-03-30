declare global {
  interface Window {
    OneSignalDeferred?: Array<(OneSignal: any) => void>;
  }
}

export function triggerOneSignalPrompt() {
  if (typeof window === 'undefined') return;

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async (OneSignal: any) => {
    try {
      await OneSignal.Slidedown.promptPush();
    } catch (error) {
      console.error('OneSignal prompt failed', error);
    }
  });
}

