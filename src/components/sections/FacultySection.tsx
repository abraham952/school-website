import { useState } from 'react';
import { TRANSLATIONS, TEACHERS } from '../../data';
import { Language, TeacherProfile } from '../../types';
import { GraduationCap, ShieldAlert, Search, Sparkles } from 'lucide-react';

interface FacultySectionProps {
  currentLang: Language;
}

export default function FacultySection({ currentLang }: FacultySectionProps) {
  const t = (key: string) => TRANSLATIONS[currentLang][key] || key;
  const [filterDept, setFilterDept] = useState<'all' | 'Sciences' | 'Mathematics' | 'Humanities' | 'Languages'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeachers = TEACHERS.filter(teacher => {
    const matchesDept = filterDept === 'all' || teacher.department === filterDept;
    const matchesQuery = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      teacher.role[currentLang].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 pb-16" id="faculty-container">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center space-x-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-800 uppercase tracking-widest font-mono">
          Distinguished Educators
        </span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Faculty, Staff & Chairs
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed font-sans">
          Our teachers are experienced scholars, hold doctorate and postgraduate credentials, and are dedicated to individual student coaching and high-performance STEM testing.
        </p>
      </div>

      {/* 2. Search & Filtering Utilities */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-slate-100 rounded-2xl p-4.5 shadow-sm" id="faculty-search-control">
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Search teachers or roles..."
            aria-label="Search teachers or roles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-3 pr-8 text-xs outline-none focus:border-amber-500 focus:bg-white"
          />
          <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full md:w-auto overflow-x-auto">
          {(['all', 'Sciences', 'Mathematics', 'Humanities', 'Languages'] as const).map((dept) => (
            <button
              key={dept}
              onClick={() => setFilterDept(dept)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                filterDept === dept
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dept === 'all' ? t('filterAll') : dept}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Teachers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="teachers-grid">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="group rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-150 p-5 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Photo with active tag */}
              <div className="h-48 w-full rounded-xl overflow-hidden relative bg-slate-100">
                <img
                  src={teacher.imageUrl}
                  alt={teacher.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-3 left-3 rounded bg-slate-900/80 px-2 py-0.5 text-[9px] font-mono font-bold uppercase text-amber-400 border border-slate-800">
                  {teacher.department}
                </span>
              </div>

              {/* Text content details */}
              <div className="space-y-1.5">
                <h3 className="font-display text-base font-bold text-slate-900 leading-tight">
                  {teacher.name}
                </h3>
                <p className="text-amber-800 font-bold text-xs">
                  {teacher.role[currentLang] || teacher.role.en}
                </p>
                <div className="flex items-start space-x-1 px-2 py-1 rounded bg-slate-50 border border-slate-100">
                  <GraduationCap className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[10px] text-slate-500 font-medium">
                    {teacher.qualification[currentLang] || teacher.qualification.en}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed pt-1italic">
                  "{teacher.bio[currentLang] || teacher.bio.en}"
                </p>
              </div>
            </div>

            {/* Micro badges showing mentorship role */}
            <div className="border-t border-slate-50 pt-3 flex items-center justify-between text-[9px] text-slate-400 uppercase tracking-widest font-mono">
              <span>SOCIETY ADVISOR</span>
              <span className="font-bold text-emerald-600 flex items-center">
                <Sparkles className="h-3 w-3 mr-0.5" /> VERIFIED CREDENTIALS
              </span>
            </div>

          </div>
        ))}
        {filteredTeachers.length === 0 && (
          <div className="col-span-3 text-center py-12 text-slate-400">
            <p className="text-xs font-semibold">No instructors matched your search parameters.</p>
          </div>
        )}
      </div>

    </div>
  );
}
