import React, { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Download, MessageCircle, Signal } from 'lucide-react';
import { UssdNetworkKey, ussdCodesByNetwork, ussdMostUsed, ussdNetworkOrder } from '../data/ussdCodes';

const PREFERRED_NETWORK_KEY = 'preferredNetwork';

const toneByNetwork: Record<UssdNetworkKey, string> = {
  mtn: 'from-yellow-400/30 to-yellow-100',
  vodacom: 'from-red-400/25 to-red-100',
  cellc: 'from-blue-400/25 to-blue-100',
  telkom: 'from-cyan-400/25 to-cyan-100'
};

function buildWhatsappMessage(networkKey: UssdNetworkKey): string {
  const network = ussdCodesByNetwork[networkKey];
  const lines = network.codes.map((item) => `${item.label}: ${item.code}`).join('\n');
  return `My saved ${network.name} USSD Codes from DataCost:\n\n${lines}\n\nhttps://datacost.co.za/ussd-codes-south-africa/`;
}

async function copyText(value: string): Promise<boolean> {
  if (!navigator.clipboard) return false;
  await navigator.clipboard.writeText(value);
  return true;
}

async function downloadNetworkImage(networkKey: UssdNetworkKey): Promise<void> {
  const network = ussdCodesByNetwork[networkKey];
  const canvas = document.createElement('canvas');
  const width = 1080;
  const rowHeight = 115;
  const paddingTop = 180;
  const paddingBottom = 190;
  const cardHeight = paddingTop + paddingBottom + network.codes.length * rowHeight;

  canvas.width = width;
  canvas.height = cardHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const bg = ctx.createLinearGradient(0, 0, width, cardHeight);
  bg.addColorStop(0, '#031636');
  bg.addColorStop(1, '#0f3c75');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, cardHeight);

  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.fillRect(64, 64, width - 128, cardHeight - 128);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 58px Arial';
  ctx.fillText(`${network.name} USSD Codes`, 96, 150);

  ctx.font = '500 32px Arial';
  ctx.fillStyle = '#d8e6ff';
  ctx.fillText('Quick dial codes for South Africa', 96, 198);

  let y = 300;

  network.codes.forEach((item, index) => {
    const isAlt = index % 2 === 0;
    ctx.fillStyle = isAlt ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)';
    ctx.fillRect(96, y - 52, width - 192, 90);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 30px Arial';
    ctx.fillText(item.label, 124, y);

    ctx.font = '700 34px Arial';
    ctx.fillStyle = '#a0f399';
    ctx.fillText(item.code, width - 430, y);

    y += rowHeight;
  });

  ctx.font = '600 30px Arial';
  ctx.fillStyle = '#d8e6ff';
  ctx.fillText('Saved from DataCost.co.za', 96, cardHeight - 88);

  const imageUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${network.name.toLowerCase().replace(/\s+/g, '-')}-ussd-codes-datacost.png`;
  link.href = imageUrl;
  link.click();
}

export const UssdTool: React.FC = () => {
  const [activeNetwork, setActiveNetwork] = useState<UssdNetworkKey>('mtn');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(PREFERRED_NETWORK_KEY) as UssdNetworkKey | null;
    if (stored && ussdNetworkOrder.includes(stored)) {
      setActiveNetwork(stored);
      setSavedMessage(`Your saved network: ${ussdCodesByNetwork[stored].name}`);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(PREFERRED_NETWORK_KEY, activeNetwork);
  }, [activeNetwork]);

  const active = useMemo(() => ussdCodesByNetwork[activeNetwork], [activeNetwork]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 1800);
  };

  const handleCopy = async (code: string) => {
    const success = await copyText(code).catch(() => false);
    if (!success) {
      showToast('Copy failed. Please try again.');
      return;
    }

    setCopiedCode(code);
    showToast('Copied to clipboard');
    window.setTimeout(() => setCopiedCode(null), 1500);
  };

  const handleWhatsapp = () => {
    const text = buildWhatsappMessage(activeNetwork);
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSaveImage = async () => {
    await downloadNetworkImage(activeNetwork);
    showToast('Image saved');
  };

  const handleSaveAllNetworks = async () => {
    const lines = ussdNetworkOrder.flatMap((networkKey) => {
      const network = ussdCodesByNetwork[networkKey];
      return [
        `${network.name} USSD Codes`,
        ...network.codes.map((item) => `- ${item.label}: ${item.code}`),
        ''
      ];
    });

    const textBlob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(textBlob);
    downloadLink.download = 'south-africa-ussd-codes-datacost.txt';
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);

    showToast('All networks saved');
  };

  return (
    <section className="space-y-4">
      <header className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight">Save Your USSD Codes to Your Phone</h1>
        <p className="mt-2 text-sm md:text-base text-slate-600">Quickly copy, share or save the most useful mobile codes.</p>
        {savedMessage ? <p className="mt-3 text-xs font-bold text-[#1b6d24]">{savedMessage}</p> : null}
      </header>

      <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">Select Network</p>
        <div className="grid grid-cols-2 gap-2">
          {ussdNetworkOrder.map((networkKey) => {
            const network = ussdCodesByNetwork[networkKey];
            const isActive = activeNetwork === networkKey;
            return (
              <button
                key={networkKey}
                type="button"
                onClick={() => setActiveNetwork(networkKey)}
                className={`min-h-[48px] rounded-2xl border text-sm font-black transition-colors ${
                  isActive
                    ? 'border-[#1b6d24] bg-[#1b6d24] text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24]'
                }`}
              >
                {network.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className={`rounded-3xl border border-slate-100 bg-gradient-to-br ${toneByNetwork[activeNetwork]} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-black text-[#031636]">{active.name} Codes</h2>
          <button
            type="button"
            onClick={handleSaveAllNetworks}
            className="text-[11px] font-black uppercase tracking-wider text-[#031636] border border-[#031636]/20 rounded-xl px-3 py-2 bg-white/70"
          >
            Save All Networks
          </button>
        </div>

        <div className="space-y-3">
          {active.codes.map((item) => (
            <article key={`${active.name}-${item.label}`} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.label}</p>
                  <p className="text-xl font-black tracking-tight text-[#031636]">{item.code}</p>
                </div>
                <Signal className="w-5 h-5 text-slate-400" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(item.code)}
                  className="min-h-[42px] rounded-xl border border-slate-200 text-xs font-black uppercase tracking-wide text-slate-700"
                >
                  <span className="inline-flex items-center justify-center gap-1">
                    {copiedCode === item.code ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsapp}
                  className="min-h-[42px] rounded-xl bg-[#25D366] text-white text-xs font-black uppercase tracking-wide"
                >
                  <span className="inline-flex items-center justify-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveImage}
                  className="min-h-[42px] rounded-xl bg-[#031636] text-white text-xs font-black uppercase tracking-wide"
                >
                  <span className="inline-flex items-center justify-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    Save Image
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
        <h3 className="text-base font-black text-slate-900 mb-3">Most Used Codes</h3>
        <div className="space-y-2">
          {ussdMostUsed.map((item) => (
            <div key={item.label} className="rounded-xl bg-slate-50 p-3 border border-slate-100">
              <p className="text-xs font-black uppercase tracking-wider text-slate-500">{item.label}</p>
              <p className="text-sm font-semibold text-slate-900">{item.code}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
        <h3 className="text-base font-black text-slate-900 mb-2">Report a Broken Code</h3>
        <p className="text-sm text-slate-600 mb-3">Help us keep this tool accurate for South Africa networks.</p>
        <a
          href="mailto:hello@datacost.co.za?subject=USSD%20Code%20Update%20Request"
          className="inline-flex min-h-[44px] items-center rounded-xl border border-slate-200 px-4 text-sm font-black text-slate-700"
        >
          Email a correction
        </a>
      </section>

      {toast ? (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#031636] px-4 py-2 text-xs font-bold text-white shadow-lg">
          {toast}
        </div>
      ) : null}
    </section>
  );
};
