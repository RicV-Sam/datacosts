import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Info, CheckCircle2 } from 'lucide-react';
import { NetworkName } from '../types';
import { networkMetadata, bundles } from '../data';

interface NetworkModalProps {
  network: NetworkName | null;
  onClose: () => void;
}

export const NetworkModal: React.FC<NetworkModalProps> = ({ network, onClose }) => {
  if (!network) return null;

  const meta = networkMetadata[network];
  const networkBundles = bundles.filter(b => b.network === network);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#031636]/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div
            className="p-8 text-white relative"
            style={{ backgroundColor: meta.color }}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center font-black text-2xl shadow-lg"
                style={{ color: meta.color }}
              >
                {meta.logoLetter}
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tight">{network}</h2>
                <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <span className="bg-white/20 px-2 py-0.5 rounded">Prepaid & Monthly</span>
                  <span>•</span>
                  <span>{networkBundles.length} Bundles Available</span>
                </div>
              </div>
            </div>
            <p className="text-white/90 text-sm leading-relaxed max-w-md">
              {meta.description}
            </p>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-8 bg-slate-50">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Available Bundles</h3>
              {networkBundles.map(bundle => (
                <div
                  key={bundle.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-[#a0f399] transition-all"
                >
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-900">{bundle.name}</h4>
                      {bundle.isBestValue && (
                        <span className="bg-[#a0f399]/20 text-[#217128] text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Best Value</span>
                      )}
                      {bundle.isSpeedKing && (
                        <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Speed King</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{bundle.volume} Total</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Info className="w-3.5 h-3.5" />
                        <span>{bundle.validity}</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        R{(bundle.costPerGb || 0).toFixed(2)} / GB
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#031636]">R{bundle.price}</div>
                    </div>
                    <button className="bg-[#031636] text-white p-3 rounded-xl hover:opacity-90 transition-opacity">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-white border-t border-slate-100 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">USSD Balance Code</span>
              <code className="text-sm font-black text-[#031636]">{meta.ussdBalance}</code>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
