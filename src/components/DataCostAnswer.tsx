import React from 'react';
import { ArrowRight, MessageCircleQuestion } from 'lucide-react';

interface DataCostAnswerIntroProps {
  number: number;
  question: string;
  answer: string;
}

export const DataCostAnswerIntro: React.FC<DataCostAnswerIntroProps> = ({ number, question, answer }) => (
  <section className="mb-10 space-y-4">
    <div className="inline-flex items-center gap-2 rounded-full bg-[#a0f399]/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]">
      <MessageCircleQuestion className="h-4 w-4" /> DataCost Answers #{number}
    </div>
    <blockquote className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm md:p-8">
      <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">The question</p>
      <p className="text-xl font-black leading-snug text-slate-900 md:text-2xl">“{question}”</p>
    </blockquote>
    <div className="rounded-[2rem] border border-[#a0f399]/50 bg-[#f6fff4] p-6 md:p-8">
      <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#1b6d24]">Answer first</p>
      <p className="text-base font-bold leading-relaxed text-slate-800">{answer}</p>
    </div>
  </section>
);

export const DataCostAnswerCta: React.FC = () => (
  <aside className="mb-10 rounded-3xl bg-slate-950 p-6 text-white shadow-sm md:p-8">
    <h2 className="mb-3 text-2xl font-black tracking-tight">Ask DataCost</h2>
    <p className="mb-5 max-w-3xl text-sm font-medium leading-relaxed text-slate-300">
      Have a mobile, data or airtime question? Send it to us. If it could help other South Africans, we may research it and publish a detailed answer.
    </p>
    <a href="/contact/#questions" className="inline-flex items-center gap-2 text-sm font-black text-[#a0f399] hover:underline">
      Send your question <ArrowRight className="h-4 w-4" />
    </a>
  </aside>
);
