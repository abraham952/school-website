import { TRANSLATIONS, CORE_VALUES, ACCREDITATIONS } from '../../data';
import { Language } from '../../types';
import { History, Target, ShieldCheck, Heart, Award, ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  currentLang: Language;
}

export default function AboutSection({ currentLang }: AboutSectionProps) {
  const t = (key: string) => TRANSLATIONS[currentLang][key] || key;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 pb-16" id="about-us-container">
      
      {/* 1. Header Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          We Are Preparing Scholars to Change the World
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed font-sans">
          Wisdom Academy was established with a singular vision: to challenge standard academic defaults and build an elite international hub combining deep research with strong character values.
        </p>
      </div>

      {/* 2. Timeline Grid / Historical Narrative */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white rounded-2xl border border-slate-100 p-8 shadow-sm" id="history-segment">
        <div className="space-y-4">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
            <History className="h-5 w-5" />
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900">Our Heritage & Founding Narrative</h2>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Founded in Addis Ababa by a joint coalition of international educators and regional developers, Wisdom Academy started as a specialized STEM counseling division. Our results immediately caught global attention, prompting our official expansion into a full-scale residential dual-curriculum academy in 2012.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Today, our campus houses over 400 digital scholar minds, represent multiple nationalities, and continues to post elite average test results matching top school percentiles in Europe and America.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 font-mono text-xs">
          <div className="border-l-2 border-amber-500 pl-4 py-1">
            <h3 className="font-bold text-slate-900 text-sm">2012 — Ground Breaking</h3>
            <p className="text-slate-500 text-[11px] mt-0.5">Foundations of the Bole Campus were laid down with 4 bio-science laboratories.</p>
          </div>
          <div className="border-l-2 border-amber-500 pl-4 py-1">
            <h3 className="font-bold text-slate-900 text-sm">2016 — Cambridge Accreditation</h3>
            <p className="text-slate-500 text-[11px] mt-0.5">Officially affiliated as a standard centre for advanced level (A-Levels) research.</p>
          </div>
          <div className="border-l-2 border-amber-500 pl-4 py-1">
            <h3 className="font-bold text-slate-900 text-sm">2021 — Robotics Launchpad</h3>
            <p className="text-slate-500 text-[11px] mt-0.5">Unveiling of the Wisdom Astro-Dome and AI workstation centers.</p>
          </div>
        </div>
      </section>

      {/* 3. Vision, Mission & Accreditations (dual bento layout) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8" id="mission-accreditation">
        
        {/* flex, etc. */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-900 text-white p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-amber-400">
              <Target className="h-5 w-5" />
              <h3 className="font-display text-sm font-bold uppercase tracking-wider">Vision</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              To remain the absolute educational portal of choice in East Africa, producing elite innovative leaders, scientific pioneers, and compassionate standard-bearers of high ethical character.
            </p>
          </div>

          <div className="rounded-2xl bg-amber-50 p-6 shadow-sm space-y-4 border border-amber-100">
            <div className="flex items-center space-x-3 text-amber-800">
              <Target className="h-5 w-5" />
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-amber-900">Mission Statement</h3>
            </div>
            <p className="text-xs text-amber-950 leading-relaxed font-sans">
              We empower candidates through rigorous instruction, highly individual computer and cleanroom laboratory research, championship athletic training, and localized values of empathy and global action.
            </p>
          </div>
        </div>

        {/* Accreditations log details */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-emerald-600">
            <ShieldCheck className="h-5 w-5" />
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-slate-900">Accreditations & Registry</h3>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Wisdom Academy maintains verified affiliation registries. Security certificates are published annually:
          </p>
          <div className="space-y-3 pt-2">
            {ACCREDITATIONS.map((acc, idx) => (
              <div key={idx} className="flex items-start justify-between border-b border-slate-50 pb-2 text-xs">
                <span className="font-medium text-slate-800 pr-4">{acc.name}</span>
                <span className="font-mono text-[10px] text-slate-400 text-right flex-shrink-0">{acc.cert}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 4. Core Values list */}
      <section className="space-y-8" id="core-values-segment">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-display text-2xl font-bold text-slate-900">The Covenants We Guard</h2>
          <p className="text-xs text-slate-500">Every Wisdom student aligns with four foundational covenants during their tenure.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_VALUES.map((val, idx) => (
            <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 space-y-3 text-center">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                <Heart className="h-4 w-4" />
              </div>
              <h3 className="font-display text-xs font-bold text-slate-900 uppercase tracking-widest pr-1">
                {val.name[currentLang] || val.name.en}
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {val.desc[currentLang] || val.desc.en}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Board of Trustees/Leadership board */}
      <section className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm space-y-8" id="leadership-segment">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">Wisdom Board of Governors</span>
          <h2 className="font-display text-2xl font-bold text-slate-900">Leadership Council</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="space-y-1 text-center p-4">
            <p className="font-display text-sm font-bold text-slate-900">Ambassador Sofia Kidane</p>
            <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">Chairperson of the Board</p>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1.5">Former Envoy to diplomatic councils, advisory lead on East African economic policy.</p>
          </div>
          <div className="space-y-1 text-center p-4">
            <p className="font-display text-sm font-bold text-slate-900">Prof. Mekonnen Aberra, Ph.D.</p>
            <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">Director of Curriculum Integrity</p>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1.5">Distinguished professor in analytical astrophysics and curriculum evaluation systems.</p>
          </div>
          <div className="space-y-1 text-center p-4">
            <p className="font-display text-sm font-bold text-slate-900">Dr. Helen Selamawit, Ph.D.</p>
            <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">Dean of Student Safeguarding</p>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1.5">Expert clinician specializing in adolescent psychology and inclusive international support.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
