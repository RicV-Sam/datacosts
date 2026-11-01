import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import items from '../data/generated/siteSearch.json';
import { searchSite } from '../utils/siteSearch';

export default function SiteSearchDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchSite(items, query), [query]);
  useEffect(() => {
    const element = dialog.current!;
    element.showModal();
    input.current?.focus();
    return () => { if (element.open) element.close(); };
  }, []);
  const close = () => { dialog.current?.close(); onClose(); };
  return <dialog ref={dialog} aria-labelledby="site-search-title"
    onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); } }} onCancel={(event) => { event.preventDefault(); close(); }}
    onClick={(event) => { if (event.target === event.currentTarget) close(); }}
    className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_16px)] max-w-2xl overflow-y-auto overscroll-contain rounded-2xl border border-slate-300 bg-white p-0 text-slate-950 shadow-2xl backdrop:bg-black/40">
    <div onClick={(event) => event.stopPropagation()}>
      <div className="border-b border-slate-200 p-[16px]">
        <div className="mb-3 flex items-start justify-between gap-[12px]">
          <h2 id="site-search-title" className="text-lg font-bold">Search<span className="sr-only"> DataCost</span></h2>
          <button type="button" onClick={close} aria-label="Close search" className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-lg p-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#166534]"><X aria-hidden="true" className="h-[24px] w-[24px] shrink-0" /></button>
        </div>
        <label htmlFor="site-search-query" className="mb-2 block text-sm font-semibold">Search data, airtime, fibre and fixes</label>
        <div className="relative"><Search aria-hidden="true" className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
          <input id="site-search-query" ref={input} type="search" maxLength={120} autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)}
            placeholder="Try MTN APN, fibre installation or rollover"
            className="min-h-11 w-full rounded-lg border border-slate-500 py-2 pl-10 pr-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#166534]" />
        </div>
        <p className="mt-2 text-sm text-slate-600" role="status">{query.trim() ? `${results.length === 20 ? 'First 20' : results.length} matching pages` : 'Popular starting points'}</p>
      </div>
      <div className="p-2">
        {results.length ? <ul>{results.map((item) => <li key={item.path}>
          <Link to={item.path} onClick={() => { close(); window.scrollTo(0, 0); }} className="block rounded-lg p-4 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#166534]">
            <span className="block font-bold">{item.title}</span><span className="mt-1 block text-sm leading-6 text-slate-600">{item.description}</span>
          </Link>
        </li>)}</ul> : <p className="p-4 leading-7">No matching page. Try your network name, the error message, or a shorter phrase. You can also <Link to="/fix/" onClick={close} className="font-semibold underline">browse troubleshooting</Link> or <Link to="/fibre/" onClick={close} className="font-semibold underline">browse fibre help</Link>.</p>}
      </div>
    </div>
  </dialog>;
}
