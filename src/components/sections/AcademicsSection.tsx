import { BookOpen, Sparkles, Binary, Award, Layers, Calendar, HelpCircle } from 'lucide-react';
import { TRANSLATIONS } from '../../data';
import { Language } from '../../types';

interface AcademicsSectionProps {
  currentLang: Language;
}

export default function AcademicsSection({ currentLang }: AcademicsSectionProps) {
  const t = (key: string) => TRANSLATIONS[currentLang][key] || key;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 pb-16" id="academics-container">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center space-x-1.5 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold text-indigo-800 uppercase tracking-widest font-mono">
          Rigorous Curricular Design
        </span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Curriculum Standards & Pathways
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed font-sans">
          Wisdom Academy incorporates a hybrid curriculum standard. We merge Cambridge International Examinations with elite national engineering blocks, ensuring exceptional intellectual readiness.
        </p>
      </div>

      {/* 2. Core Pathways Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="pathways-grid">
        
        {/* Pathway 1 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-all space-y-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <Award className="h-5 w-5" />
          </span>
          <h3 className="font-display text-base font-bold text-slate-900 tracking-tight">Cambridge Advanced A-Level</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            Tailored for grades 11 and 12. Students specialize in deep analytical subjects (Pure Physics, Advanced Mathematics, Chemistry, Literature, and History) preparing them for world-class university entrance.
          </p>
          <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">Grade bracket: Grades 11 - 12</div>
        </div>

        {/* Pathway 2 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-all space-y-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
            <Binary className="h-5 w-5" />
          </span>
          <h3 className="font-display text-base font-bold text-slate-900 tracking-tight">Advanced STEM & Genetics Block</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            Incorporating practical biological cleanrooms and computer modeling. In this track, students study computational algorithms, data pipelines, molecular structures, and deep learning engines.
          </p>
          <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">Grade bracket: Grades 9 - 12</div>
        </div>

        {/* Pathway 3 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-all space-y-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
            <BookOpen className="h-5 w-5" />
          </span>
          <h3 className="font-display text-base font-bold text-slate-900 tracking-tight">Cambridge IGCSE & Core Foundation</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            Guarantees multi-disciplinary coverage across global perspectives, humanities, arts, and foundational sciences, focusing on research writing, dialectics, and cognitive agility.
          </p>
          <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">Grade bracket: Grades 9 - 10</div>
        </div>

      </section>

      {/* 3. Deep Curriculum Departments Table */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-6" id="curriculum-departments">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="font-display text-lg font-bold text-slate-900">Academic Divisions & Focus</h2>
          <p className="text-[11px] text-slate-500">Every department is governed by faculty with PhD or Masters credentials.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] font-mono">
                <th className="pb-3 pr-4 font-semibold">Division</th>
                <th className="pb-3 px-4 font-semibold">Core Curriculum Elements</th>
                <th className="pb-3 px-4 font-semibold">Cleanroom Lab Access</th>
                <th className="pb-3 pl-4 font-semibold text-right">Assessment Base</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3.5 pr-4 font-bold text-slate-900">Sciences Division</td>
                <td className="py-3.5 px-4">Cambridge Bio-Molecular Synthesis, Organic Chemistry, Mechanics, Electrical Grid Design</td>
                <td className="py-3.5 px-4 font-semibold text-emerald-600">Selamawit Biology & Science Labs</td>
                <td className="py-3.5 pl-4 text-right">Cambridge Board examinations, Project Portfolios</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-slate-900">Mathematics Block</td>
                <td className="py-3.5 px-4">Advanced Calculus, Pure Complex Algebra, Statistical Modeling, Linear Matrix Algorithms</td>
                <td className="py-3.5 px-4 font-semibold text-purple-600">Digital Modeling Hub</td>
                <td className="py-3.5 pl-4 text-right">Cambridge Board examinations</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-slate-900">Humanities Division</td>
                <td className="py-3.5 px-4">Global Perspectives, Macroeconomics, Political Theories, African History Narrative</td>
                <td className="py-3.5 px-4 text-slate-400">Library Study Chambers</td>
                <td className="py-3.5 pl-4 text-right">Thesis Thesis Defense, Forums</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-slate-900">Languages Wing</td>
                <td className="py-3.5 px-4">Amharic Grammar Mastery, English Rhetoric & Literature, Afaan Oromo Literature</td>
                <td className="py-3.5 px-4 text-indigo-600 font-semibold">Multi-dialect Speech Studio</td>
                <td className="py-3.5 pl-4 text-right">Written & Conversational panels</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Grade Levels Matrix Layout */}
      <section className="space-y-8" id="grade-levels-matrix">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-display text-2xl font-bold text-slate-900">Academic Grade Matrix</h2>
          <p className="text-xs text-slate-500">Overview of the administrative tiers across our student levels.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 space-y-2">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Ages 4 - 7</span>
            <h3 className="font-display text-sm font-bold text-slate-900">Foundation Stage</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
              Introducing primary numbers, phonics mastery, cognitive puzzles, and cooperative language games within safe creative playscapes.
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 space-y-2">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Ages 8 - 13</span>
            <h3 className="font-display text-sm font-bold text-slate-900">Middle Academy</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
              Developing critical algebraic bases, early biological inquiry, digital literacy foundations, and historical mapping skills.
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 space-y-2 col-span-1 sm:col-span-2 lg:col-span-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Ages 14 - 18</span>
            <h3 className="font-display text-sm font-bold text-slate-900">Senior Scholars Block</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
              Heavy focus on Cambridge standards. Preparing candidates for high IGCSE and Advanced A-level sittings alongside biotech and computer networks.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Academic Calendar Milestones Mockups */}
      <section className="rounded-2xl bg-indigo-950 p-6 sm:p-8 text-white space-y-6 shadow-lg" id="academic-calendar">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-indigo-900 pb-4 space-y-2 sm:space-y-0">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-indigo-400">
              <Calendar className="h-4 w-4" />
              <span className="font-mono text-xs uppercase font-bold tracking-widest">Roster Board 2026</span>
            </div>
            <h3 className="font-display text-lg font-bold">Upcoming Milestone Highlights</h3>
          </div>
          <span className="rounded bg-indigo-900 px-3 py-1 text-xs font-semibold text-indigo-200">Roster updated June 2026</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-900 space-y-2">
            <p className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">August 10, 2026</p>
            <h4 className="font-bold text-sm">Fall Academic Cycle Ingress</h4>
            <p className="text-indigo-200 leading-relaxed text-[11px]">Orientation sessions kick-off for newly approved scholars and parent unions.</p>
          </div>
          <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-900 space-y-2">
            <p className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">October 15-20, 2026</p>
            <h4 className="font-bold text-sm">Mid-Term Competency Evaluations</h4>
            <p className="text-indigo-200 leading-relaxed text-[11px]">Diagnostic assessments to index scholar trends and custom tutor assignments.</p>
          </div>
          <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-900 space-y-2">
            <p className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">December 18, 2026</p>
            <h4 className="font-bold text-sm">Winter Science Gala & Recess</h4>
            <p className="text-indigo-200 leading-relaxed text-[11px]">Biological model expositions followed immediately by the general winter holidays cycle.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
