import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Play } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { DEFAULT_OG_IMAGE_URL, toCanonicalUrl } from '../seo/siteConstants';
import type { NavigateFunction } from '../types';

const groups = [
  {
    "id": "ussd",
    "title": "USSD and airtime",
    "href": "/ussd-codes-south-africa/",
    "label": "Browse all USSD codes",
    "videos": [
      {
        "id": "QCXPLi_Ie9I",
        "title": "Check your Vodacom balance",
        "summary": "Dial *136# on Vodacom. For the wider self-service menu, dial *135#."
      },
      {
        "id": "ZZWDJyOxsKs",
        "title": "Check your MTN detailed balance",
        "summary": "Dial *136*1# from your MTN SIM and look for the allowance you want to check."
      },
      {
        "id": "ck4IPHrCVUg",
        "title": "Check your Cell C balance",
        "summary": "On Cell C prepaid, use *101# for airtime or *147# for detailed balances."
      },
      {
        "id": "7ib2Jkztj1A",
        "title": "Check your Telkom Mobile bundle balance",
        "summary": "Dial *188# from your Telkom Mobile SIM and look for the relevant bundle."
      },
      {
        "id": "XVifbZaNnWk",
        "title": "Load a Cell C prepaid voucher",
        "summary": "Dial *102*PIN#, replacing PIN with the digits on your own voucher. Keep the PIN private."
      }
    ]
  },
  {
    "id": "settings",
    "title": "Phone settings",
    "href": "/guides/why-is-my-data-finishing-so-fast/",
    "label": "Troubleshoot high data usage",
    "videos": [
      {
        "id": "CdOj8eEiVPU",
        "title": "Turn on Data Saver on Google Pixel",
        "summary": "Open Network & internet in Settings to find Data Saver. Check which apps have unrestricted data."
      },
      {
        "id": "haTHgwSRcl4",
        "title": "Use Low Data Mode on iPhone",
        "summary": "Find Low Data Mode in your iPhone mobile data settings to reduce background activity."
      },
      {
        "id": "GNdYlgXnbb4",
        "title": "Find the apps using your mobile data",
        "summary": "Use App data usage on Pixel to compare apps over the date range you care about."
      },
      {
        "id": "5FXcyUOmd7U",
        "title": "Use YouTube Data Saver on mobile",
        "summary": "Choose Data saver for mobile networks under Video quality preferences."
      },
      {
        "id": "XPsom1zzDRA",
        "title": "Choose the data line on a dual SIM iPhone",
        "summary": "Select the line with your bundle and check whether cellular data switching is enabled."
      }
    ]
  },
  {
    "id": "bundles",
    "title": "Buying data",
    "href": "/best-data-deals-south-africa/",
    "label": "Compare monthly data bundles",
    "videos": [
      {
        "id": "X8OpHhwL7EU",
        "title": "Anytime vs night data",
        "summary": "Compare the daytime allowance separately and check the eligible hours for night data."
      },
      {
        "id": "vVCQuZOLZcI",
        "title": "Calculate rand per usable gig",
        "summary": "Divide the price by the anytime gigabytes. The worked prices in this video are illustrative."
      },
      {
        "id": "8LNrpoSa9rM",
        "title": "Once-off vs recurring bundles",
        "summary": "Check expiry, automatic renewal and cancellation before confirming a bundle."
      }
    ]
  },
  {
    "id": "fibre",
    "title": "Home fibre",
    "href": "/fibre/",
    "label": "Explore fibre guides",
    "videos": [
      {
        "id": "mdHUjEkw7RI",
        "title": "Fibre network operator vs ISP",
        "summary": "Find out who supplies the physical network and who supplies your internet service."
      },
      {
        "id": "FGBFVYl1l7E",
        "title": "Check fibre at your exact address",
        "summary": "Confirm coverage for your street number and unit. Ask what the full monthly and setup costs are."
      }
    ]
  }
];

interface Props {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export function VideoGuidesPage({ onNavigate, onScrollTo }: Props) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const title = 'Mobile Data & Fibre Video Guides | DataCost';
  const description = 'Watch 15 quick South African guides to USSD balance codes, mobile data settings, bundle comparisons and home fibre.';
  const canonical = toCanonicalUrl('/videos/');

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Header onScrollTo={onScrollTo} activeSection="guides" />
      <main className="mx-auto max-w-5xl px-4 pb-14 pt-24 sm:px-6">
        <p className="text-sm font-semibold text-[#1b6d24]"><a className="underline" href="/guides/">Guides</a> / Videos</p>
        <div className="mt-4 rounded-3xl bg-[#031636] px-6 py-9 text-white sm:px-10">
          <p className="text-sm font-bold uppercase tracking-widest text-[#a0f399]">15 short guides</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Mobile data and fibre videos</h1>
          <p className="mt-3 max-w-2xl text-slate-200">Find the code, setting or buying check you need in under a minute. Read the quick answer here or play the Short for the steps.</p>
        </div>
        <nav aria-label="Video topics" className="mt-6 flex flex-wrap gap-2">
          {groups.map(group => <a key={group.id} href={'#' + group.id} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-[#031636] hover:border-[#1b6d24] hover:underline">{group.title}</a>)}
        </nav>
        <p className="mt-4 text-sm text-slate-600">The YouTube player loads when you choose to play a video.</p>
        {groups.map(group => (
          <section key={group.id} id={group.id} aria-labelledby={group.id + '-heading'} className="mt-10 scroll-mt-24">
            <h2 id={group.id + '-heading'} className="border-b border-slate-300 pb-3 text-2xl font-black text-[#031636]">{group.title}</h2>
            <ul className="divide-y divide-slate-200">
              {group.videos.map(video => {
                const playing = activeVideo === video.id;
                return (
                  <li key={video.id} className="py-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="max-w-2xl">
                        <h3 className="text-lg font-bold text-[#031636]">{video.title}</h3>
                        <p className="mt-1 text-slate-700">{video.summary}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <button type="button" aria-expanded={playing} aria-label={(playing ? 'Close player for ' : 'Play ') + video.title} onClick={() => setActiveVideo(playing ? null : video.id)} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#031636] px-3 font-bold text-white hover:bg-[#1b6d24]">
                          <Play size={16} aria-hidden="true" /> {playing ? 'Close player' : 'Play here'}
                        </button>
                        <a href={'https://www.youtube.com/shorts/' + video.id} aria-label={'Watch ' + video.title + ' on YouTube'} className="inline-flex min-h-11 items-center font-semibold text-[#1b6d24] underline">YouTube</a>
                      </div>
                    </div>
                    {playing && <iframe
                      title={video.title}
                      src={'https://www.youtube-nocookie.com/embed/' + video.id + '?autoplay=1'}
                      className="mx-auto mt-4 aspect-[9/16] w-full max-w-xs rounded-xl bg-[#031636]"
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                    />}
                  </li>
                );
              })}
            </ul>
            <a href={group.href} className="inline-flex items-center gap-2 py-2 font-bold text-[#1b6d24] underline">{group.label} <ArrowRight size={17} aria-hidden="true" /></a>
          </section>
        ))}
      </main>
      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
    </div>
  );
}
