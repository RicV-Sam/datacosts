export const ADSENSE_CLIENT_ID = 'ca-pub-6084410613829318';
export const ADSENSE_SCRIPT_URL = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;

// Injected after prerendering, so Google's runtime never runs in the build.
// React replaces the prerendered root during startup. Wait for main.tsx's
// stable-content event before Auto ads can attach containers to that root.
export const ADSENSE_AUTO_ADS_LOADER = `<script id="datacost-adsense-loader">
document.addEventListener('render-event', function () {
  if (document.querySelector('script[src="${ADSENSE_SCRIPT_URL}"]')) return;
  var script = document.createElement('script');
  script.async = true;
  script.src = '${ADSENSE_SCRIPT_URL}';
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}, { once: true });
</script>`;
