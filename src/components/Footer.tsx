import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { School, MapPin, Mail, Phone, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onTabChange: (tab: string) => void;
}

export default function Footer({ currentLang, onTabChange }: FooterProps) {
  const t = (key: string) => TRANSLATIONS[currentLang][key] || key;

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800" id="main-footer">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Core footer Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Presentation */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                <School className="h-5.5 w-5.5" />
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-tight text-white block">
                  WISDOM
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block -mt-1.5">
                  Academy
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Setting elite international academic standards. Wisdom Academy nurtures multi-dialect scholar minds across sciences, innovative systems, character, and global sports.
            </p>
            <div className="flex items-center space-x-3 text-xs text-slate-500" id="accreditation-stamps">
              <span className="rounded bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-300">Cambridge ET209</span>
              <span className="rounded bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-300">MOE-Elite Status</span>
            </div>
          </div>

          {/* Academic divisions */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Academic Divisions</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onTabChange('academics')} className="hover:text-amber-400 transition-colors">
                  Dual Cambridge IGCSE Program
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('academics')} className="hover:text-amber-400 transition-colors">
                  Global Biotech & STEM Curriculum
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('studentLife')} className="hover:text-amber-400 transition-colors">
                  Extra-Curricular Societies & Arts
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('admissions')} className="hover:text-amber-400 transition-colors">
                  Endowment & Merit Scholarships
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Hub Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Academy Information</h3>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onTabChange('about')} className="hover:text-amber-400 transition-colors">Accreditations & Board</button></li>
              <li><button onClick={() => onTabChange('about')} className="hover:text-amber-400 transition-colors">Principal's Address</button></li>
              <li><button onClick={() => onTabChange('admissions')} className="hover:text-amber-400 transition-colors">Online Admissions Engine</button></li>
              <li><button onClick={() => onTabChange('newsEvents')} className="hover:text-amber-400 transition-colors">News Updates & Calendar</button></li>
              <li><button onClick={() => onTabChange('contact')} className="hover:text-amber-400 transition-colors">Schedule Campus Visits</button></li>
            </ul>
          </div>

          {/* Core Contacts */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Main Campuses</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Bole Elite Avenue, Bypass Ring Road, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                <span>admissions@wisdom.edu.et</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                <span>+251 (011) 689-WISDOM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Separator / Simulation disclaimer and copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0" id="disclosure-bar">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" />
            <p className="max-w-md text-[10px] sm:text-xs">
              <strong>Simulated Enterprise System:</strong> Active audit trace-logging, offline-ready local backups, and instant virtual SMS/Email message triggers are simulated inside the environment.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span>© 2026 Wisdom Academy.</span>
            <span className="hidden sm:inline">|</span>
            <button 
              onClick={() => onTabChange('contact')} 
              className="hover:text-amber-400 inline-flex items-center"
            >
              Feedback <ExternalLink className="ml-1 h-3 w-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
