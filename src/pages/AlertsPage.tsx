import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Bell, Mail, MessageCircle, Zap, ShieldCheck, Gift, Signal, Wrench } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { NavigateFunction } from '../types';
import {
  AlertsPreferences,
  AlertsPreferenceState
} from '../components/AlertsPreferences';
import { AlertsSignupCard } from '../components/AlertsSignupCard';
import { getDefaultPublishedIso, getRouteModifiedIso } from '../seo/contentDates';
import { triggerOneSignalPrompt } from '../utils/oneSignal';

interface AlertsPageProps {
  onScrollTo: (id: string) => void;
  onNavigate: NavigateFunction;
}

const ALERTS_PREFERENCES_STORAGE_KEY = 'alertsPreferences';

const DEFAULT_PREFERENCES: AlertsPreferenceState = {
  alertTypes: ['cheapest_data_deals', 'airtime_specials'],
  networks: ['all_networks'],
  frequency: 'weekly_digest'
};

const faqItems = [
  {
    question: 'Are DataCost alerts free?',
    answer:
      'Yes. Alerts are free to subscribe to. Standard data charges may apply when you visit websites or use mobile services.'
  },
  {
    question: 'What kind of alerts will I receive?',
    answer:
      'You can choose alerts for data deals, airtime specials, verified competitions, network updates, and useful telecom tools.'
  },
  {
    question: 'Can I unsubscribe anytime?',
    answer: 'Yes. You should be able to unsubscribe or opt out at any time.'
  },
  {
    question: 'Will I get spammed?',
    answer:
      'No. DataCost alerts should focus on useful, practical telecom updates rather than excessive notifications.'
  },
  {
    question: 'Do alerts include MTN, Vodacom, Cell C, and Telkom?',
    answer: 'Yes. Users should be able to select network-specific preferences.'
  }
];

export const AlertsPage: React.FC<AlertsPageProps> = ({ onScrollTo, onNavigate }) => {
  const [preferences, setPreferences] = useState<AlertsPreferenceState>(DEFAULT_PREFERENCES);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const pageTitle = 'Get Data Deal Alerts in South Africa | DataCost';
  const metaDescription =
    'Get free alerts for cheaper data deals, airtime specials, verified competitions, and useful network updates in South Africa.';
  const canonicalUrl = 'https://datacost.co.za/alerts/';
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso('/alerts/');

  useEffect(() => {
    const saved = window.localStorage.getItem(ALERTS_PREFERENCES_STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as AlertsPreferenceState;
      if (parsed.alertTypes && parsed.networks && parsed.frequency) {
        setPreferences(parsed);
      }
    } catch {
      // ignore invalid local preferences
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(ALERTS_PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  const handleBrowserAlerts = () => {
    triggerOneSignalPrompt();
    showToast("If your browser allows it, you'll see a prompt to enable alerts.");
  };

  const handleEmailSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      showToast('Enter an email address to continue.');
      return;
    }

    showToast('Thanks. Email alerts request captured.');
    setEmail('');
  };

  const handleWhatsAppNotify = () => {
    showToast('WhatsApp alerts waitlist coming soon.');
  };

  const faqSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    };
  }, []);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: metaDescription,
    url: canonicalUrl,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    isPartOf: {
      '@type': 'WebSite',
      name: 'DataCost',
      url: 'https://datacost.co.za/'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://datacost.co.za/' },
      { '@type': 'ListItem', position: 2, name: 'Alerts', item: canonicalUrl }
    ]
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="DataCost" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://datacost.co.za/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://datacost.co.za/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="alerts" />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-5">
        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Get Free Data Deal Alerts in South Africa
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Don&apos;t miss cheaper bundles, airtime promos, verified competitions, or useful network updates.
            Choose the alerts you want and stay in control.
          </p>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            <AlertsSignupCard
              title="Browser Alerts"
              description="Get instant alerts when new data deals or promos go live."
              ctaLabel="Turn On Browser Alerts"
              onCtaClick={handleBrowserAlerts}
              icon={Bell}
            />
            <AlertsSignupCard
              title="Email Alerts"
              description="Get a simple weekly roundup of the best deals and useful updates."
              ctaLabel="Get Email Alerts"
              onCtaClick={() => {
                document.getElementById('email-alert-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              icon={Mail}
            />
            <AlertsSignupCard
              title="WhatsApp Alerts (Coming Soon)"
              description="For high-value telecom alerts you'll actually want to see."
              ctaLabel="Notify Me When Live"
              onCtaClick={handleWhatsAppNotify}
              icon={MessageCircle}
              comingSoon
            />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">What You&apos;ll Get Alerts For</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h3 className="inline-flex items-center gap-2 font-black text-slate-900"><Zap className="w-4 h-4 text-[#1b6d24]" /> Data Deals</h3>
              <ul className="mt-2 text-sm text-slate-600 space-y-1">
                <li>Cheapest bundle updates</li>
                <li>Better prepaid deals</li>
                <li>Hidden bundle options</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h3 className="inline-flex items-center gap-2 font-black text-slate-900"><Zap className="w-4 h-4 text-[#1b6d24]" /> Airtime Specials</h3>
              <ul className="mt-2 text-sm text-slate-600 space-y-1">
                <li>Recharge promos</li>
                <li>Airtime bonuses</li>
                <li>Limited-time network specials</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h3 className="inline-flex items-center gap-2 font-black text-slate-900"><Gift className="w-4 h-4 text-[#1b6d24]" /> Verified Competitions</h3>
              <ul className="mt-2 text-sm text-slate-600 space-y-1">
                <li>Recharge-to-win competitions</li>
                <li>Free airtime/data promos</li>
                <li>Verified prize promotions</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h3 className="inline-flex items-center gap-2 font-black text-slate-900"><Signal className="w-4 h-4 text-[#1b6d24]" /> Network Updates</h3>
              <ul className="mt-2 text-sm text-slate-600 space-y-1">
                <li>MTN updates</li>
                <li>Vodacom updates</li>
                <li>Cell C updates</li>
                <li>Telkom updates</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4 md:col-span-2">
              <h3 className="inline-flex items-center gap-2 font-black text-slate-900"><Wrench className="w-4 h-4 text-[#1b6d24]" /> Utility Alerts</h3>
              <ul className="mt-2 text-sm text-slate-600 space-y-1">
                <li>Useful USSD tools</li>
                <li>New mobile shortcuts</li>
                <li>Telecom how-to updates</li>
              </ul>
            </article>
          </div>
        </section>

        <AlertsPreferences value={preferences} onChange={setPreferences} />

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Turn Alerts On</h2>

          <div className="mt-4 space-y-4">
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h3 className="font-black text-slate-900">Browser Alerts</h3>
              <p className="text-sm text-slate-600 mt-1">Best for instant alerts when deals drop.</p>
              <button
                type="button"
                onClick={handleBrowserAlerts}
                className="mt-3 min-h-[44px] rounded-xl bg-[#031636] px-4 text-sm font-black text-white hover:bg-[#1b6d24] transition-colors"
              >
                Turn On Browser Alerts
              </button>
            </article>

            <article id="email-alert-form" className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h3 className="font-black text-slate-900">Email Alerts</h3>
              <p className="text-sm text-slate-600 mt-1">Simple weekly updates with practical telecom value.</p>
              <form onSubmit={handleEmailSignup} className="mt-3 grid grid-cols-1 gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="min-h-[44px] rounded-xl border border-slate-200 px-3 text-sm focus:outline-none focus:border-[#1b6d24]"
                />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name (optional)"
                  className="min-h-[44px] rounded-xl border border-slate-200 px-3 text-sm focus:outline-none focus:border-[#1b6d24]"
                />
                <button
                  type="submit"
                  className="min-h-[44px] rounded-xl bg-[#1b6d24] px-4 text-sm font-black text-white hover:bg-[#14521c] transition-colors"
                >
                  Get Email Alerts
                </button>
              </form>
            </article>

            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h3 className="font-black text-slate-900">WhatsApp Alerts Coming Soon</h3>
              <p className="text-sm text-slate-600 mt-1">We are preparing a low-noise WhatsApp alert experience.</p>
              <button
                type="button"
                onClick={handleWhatsAppNotify}
                className="mt-3 min-h-[44px] rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-700"
              >
                Notify me when WhatsApp alerts launch
              </button>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Why DataCost Alerts Are Different</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li className="inline-flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#1b6d24]" /> We focus on useful telecom alerts, not noise</li>
            <li className="inline-flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#1b6d24]" /> We don&apos;t send fake prize or &quot;claim now&quot; messages</li>
            <li className="inline-flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#1b6d24]" /> You can unsubscribe anytime</li>
            <li className="inline-flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#1b6d24]" /> We only alert you when something is worth your attention</li>
            <li className="inline-flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#1b6d24]" /> Competitions are highlighted only when verified</li>
            <li className="inline-flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#1b6d24]" /> Alerts stay practical, relevant, and low-noise</li>
          </ul>

          <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4">
            <p className="text-sm font-black text-amber-900">Scam Warning</p>
            <p className="text-sm text-amber-900 mt-1">
              DataCost will never ask you to pay to claim a prize. If you receive a suspicious telecom
              &quot;winner&quot; message, verify it before acting.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">How Alerts Work</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Step 1</p>
              <p className="mt-1 text-sm font-bold text-slate-900">Choose what you want alerts for</p>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Step 2</p>
              <p className="mt-1 text-sm font-bold text-slate-900">We notify you when something useful happens</p>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Step 3</p>
              <p className="mt-1 text-sm font-bold text-slate-900">Tap through to the relevant deal, promo, or tool</p>
            </article>
          </div>
        </section>

        <AdUnit type="inContent" />

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-3">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <h3 className="font-black text-slate-900">{item.question}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Related Tools & Guides</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            <Link to="/save-ussd-codes/" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24]">Save USSD Codes Tool</Link>
            <Link to="/ussd-codes-south-africa/" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24]">USSD Codes South Africa</Link>
            <Link to="/" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24]">DataCost Homepage</Link>
            <Link to="/guides/best-data-deals-south-africa/" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24]">Best Data Deals Guide</Link>
            <Link to="/network/mtn/" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24]">MTN Network Hub</Link>
            <Link to="/network/vodacom/" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24]">Vodacom Network Hub</Link>
          </div>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="alerts" />
      <AdUnit type="stickyMobile" />

      {toast ? (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#031636] px-4 py-2 text-xs font-bold text-white shadow-lg">
          {toast}
        </div>
      ) : null}
    </div>
  );
};
