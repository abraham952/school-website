import { useState } from 'react';
import { TRANSLATIONS, CLUBS } from '../../data';
import { Language, ClubInfo } from '../../types';
import { ShieldCheck, Trophy, Compass, Star, Calendar, Clock } from 'lucide-react';

interface StudentLifeSectionProps {
  currentLang: Language;
}

export default function StudentLifeSection({ currentLang }: StudentLifeSectionProps) {
  const t = (key: string) => TRANSLATIONS[currentLang][key] || key;
  const [activeCategory, setActiveCategory] = useState<'all' | 'arts' | 'sports' | 'tech' | 'community'>('all');

  const filteredClubs = activeCategory === 'all' 
    ? CLUBS 
    : CLUBS.filter(club => club.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 pb-16" id="student-life-container">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center space-x-1 border border-amber-300 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-900 tracking-wider font-mono">
          <Compass className="h-3.5 w-3.5 text-amber-500 animate-spin" />
          <span>Extracurricular Ecosystem</span>
        </span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Society & Student Ventures
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed font-sans">
          We believe true character and intellectual agility are forged beyond primary exam desks. Wisdom Academy hosts student-led societies spanning advanced rocketry, philharmonic scores, and championship swimming.
        </p>
      </div>

      {/* 2. Category Filters bar */}
      <div className="flex flex-wrap items-center justify-center gap-2" id="clubs-filter-tray">
        {(['all', 'tech', 'arts', 'sports'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-lg px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-150 ${
              activeCategory === cat
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-150'
            }`}
          >
            {cat === 'all' ? t('filterAll') : cat === 'tech' ? 'Neuro Tech / STEM' : cat === 'arts' ? 'Creative Arts' : 'Athletic Academies'}
          </button>
        ))}
      </div>

      {/* 3. Clubs Directory listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="clubs-grid">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="group rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all divide-y divide-slate-100 overflow-hidden"
          >
            {/* Image header with category indicator */}
            <div className="h-44 w-full relative bg-slate-900 overflow-hidden">
              <img
                src={club.imageUrl}
                alt={club.name.en}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
              <span className="absolute left-3 top-3 rounded bg-amber-500 text-slate-900 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                {club.category === 'tech' ? 'Robotics & AI' : club.category === 'arts' ? 'Philharmonic' : 'Olympic division'}
              </span>
            </div>

            {/* Content block */}
            <div className="p-5 space-y-2">
              <h3 className="font-display text-base font-bold text-slate-900">
                {club.name[currentLang] || club.name.en}
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                {club.description[currentLang] || club.description.en}
              </p>
            </div>

            {/* Schedule details */}
            <div className="p-3 bg-slate-50 text-[10px] text-slate-500 font-mono flex items-center space-x-4">
              <span className="flex items-center"><Calendar className="h-3 w-3 text-amber-500 mr-1" /> {club.schedule}</span>
            </div>

          </div>
        ))}
      </div>

      {/* 4. Champion highlights block (Championships, tournaments) */}
      <section className="rounded-2xl bg-slate-900 text-white p-8 space-y-6" id="society-scoreboard">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 space-y-2 sm:space-y-0">
          <div className="space-y-0.5">
            <h2 className="font-display text-lg font-bold">Championship Highlights & Trophies</h2>
            <p className="text-[11px] text-slate-400">Wisdom sports groups hold numerous distinctions in international trials.</p>
          </div>
          <div className="inline-flex items-center space-x-1 text-xs text-amber-400 font-bold">
            <Trophy className="h-4 w-4" />
            <span>ANNUAL SCOREBOARD</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="bg-slate-800/40 rounded-xl p-4.5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-emerald-400 font-bold">GOLD — JUNE 2026</span>
              <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            </div>
            <h4 className="font-bold font-display text-sm">International Swim Trials</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">Wisdom Academy athletes swept four separate categories in 100M fly and 200M individual medleys in Nairobi.</p>
          </div>

          <div className="bg-slate-800/40 rounded-xl p-4.5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-emerald-400 font-bold">SILVER — MAY 2026</span>
              <Star className="h-3.5 w-3.5 text-slate-400 fill-slate-400" />
            </div>
            <h4 className="font-bold font-display text-sm">Astro-Physics Olympiad</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">Three Wisdom Academy senior scholars placed within the top 20 rankings internationally for orbital routing equations.</p>
          </div>

          <div className="bg-slate-800/40 rounded-xl p-4.5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-emerald-400 font-bold">TROPHY — FEB 2026</span>
              <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            </div>
            <h4 className="font-bold font-display text-sm">National Debating Finals</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">Awarded 1st Place Speaker panel trophy for arguments surrounding digital ethics and AI regulations.</p>
          </div>

        </div>
      </section>

    </div>
  );
}
