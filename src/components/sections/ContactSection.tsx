import React, { useState } from 'react';
import { TRANSLATIONS } from '../../data';
import { Language } from '../../types';
import { Mail, Phone, MapPin, CheckCircle, Globe, Share2, ClipboardSignature } from 'lucide-react';

interface ContactSectionProps {
  currentLang: Language;
  onAddAuditLog: (action: string, details: string) => void;
}

export default function ContactSection({ currentLang, onAddAuditLog }: ContactSectionProps) {
  const t = (key: string) => TRANSLATIONS[currentLang][key] || key;

  // Contact States
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userSubject, setUserSubject] = useState('General inquiry');
  const [userMessage, setUserMessage] = useState('');
  const [submissionComplete, setSubmissionComplete] = useState(false);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail || !userMessage) {
      alert("Please provide name, email and message text.");
      return;
    }

    setSubmissionComplete(true);
    onAddAuditLog(
      "Contact Message Submission",
      `Guest ${userName} (${userEmail}) submitted inquiry regarding "${userSubject}"`
    );
  };

  const handleResetForm = () => {
    setUserName('');
    setUserEmail('');
    setUserMessage('');
    setSubmissionComplete(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 pb-16" id="contact-container">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center space-x-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-800 uppercase tracking-widest font-mono">
          Advisory & Tours
        </span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Contact Advisory Desk
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed font-sans">
          Have specific inquiries regarding tuition fees, curriculum mappings, or scholarship admissions? Please write to our admissions counselors.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
        
        {/* Left column (Col-span 5): Contact Info Details and Canvas Map */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Info Box */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4 text-xs text-slate-600">
            <h3 className="font-display font-bold text-sm tracking-wide uppercase text-slate-800">Campus Avenues</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-4.5 w-4.5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-800">Wisdom Bole Campus</p>
                  <p className="leading-relaxed">Bole Elite Avenue, Bypass Ring Road, Addis Ababa, Ethiopia</p>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="h-4.5 w-4.5 text-emerald-500 mr-3 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-800">Admissions Email</p>
                  <a href="mailto:admissions@wisdom.edu.et" className="text-indigo-600 hover:underline">admissions@wisdom.edu.et</a>
                </div>
              </li>
              <li className="flex items-center">
                <Phone className="h-4.5 w-4.5 text-blue-500 mr-3 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-800">Registrar Telephone</p>
                  <p className="font-mono">+251 (011) 689-WISDOM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* BEAUTIFUL CUSTOM VECTOR MAP REPRESENTING CAMPUS ROAD PLOTS */}
          <div className="rounded-2xl bg-neutral-900 overflow-hidden relative shadow-md p-4 text-white space-y-2 select-none border border-neutral-800">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold">Wisdom Ground Map Locator</span>
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            {/* Stylized custom coordinate grid layout */}
            <div className="aspect-video w-full rounded-lg bg-neutral-950 border border-neutral-800 p-2 relative flex items-center justify-center overflow-hidden">
              {/* Core roads representations: Cross lines */}
              <div className="absolute inset-x-0 h-4 bg-neutral-900 top-1/2 -translate-y-1/2"></div>
              <div className="absolute inset-y-0 w-4 bg-neutral-900 left-1/3"></div>
              
              {/* Road names indicator logs */}
              <span className="absolute left-1 top-12 text-[8px] font-mono text-neutral-600 tracking-wider font-bold">BOLE HIGHWAY AVENUE</span>
              <span className="absolute right-4 bottom-2 text-[8px] font-mono text-neutral-600 tracking-wider font-bold">BYPASS RING ROAD</span>

              {/* Surrounding styled landmark grids */}
              <div className="absolute bottom-5 left-4 rounded bg-neutral-800/80 p-1 text-[8px] font-semibold border border-neutral-700">Welo Sefer Intersection</div>
              <div className="absolute top-4 right-6 rounded bg-neutral-800/80 p-1 text-[8px] font-semibold border border-neutral-700">Adwa Diplomatic Enclave</div>
              
              {/* Active Golden pinpoint marker representing Veritas */}
              <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                {/* Pin core */}
                <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center shadow-lg border border-white animate-bounce">
                  <MapPin className="h-3 w-3 text-slate-900" />
                </div>
                {/* Ping rings */}
                <span className="absolute -bottom-1 text-[9px] font-bold text-amber-400 bg-slate-950/90 px-1.5 rounded-full border border-amber-500/20 shadow uppercase tracking-wide">
                  WISDOM
                </span>
              </div>
            </div>
            
            <p className="text-[9px] text-slate-400 leading-normal font-sans italic text-center pt-1">
              * Centered coordinates matching 9.0116&deg; N, 38.7831&deg; E. Private parking and shuttle lanes exist on-site.
            </p>
          </div>

        </div>

        {/* Right column (Col-span 7): Contact Correspondence Form */}
        <div className="lg:col-span-7">
          {submissionComplete ? (
            <div className="rounded-2xl border border-emerald-200 bg-white p-8 text-center space-y-6 shadow-md animate-fadeIn">
              <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto" />
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-lg text-slate-900">Message Dispatch Successful</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Thank you for writing. We have registered your inquiry index. Our admissions registrar office usually responds within one academic business cycle.
                </p>
              </div>
              <div className="inline-flex items-center space-x-1.5 text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded px-3 py-1.5 font-mono">
                <span>Security Stamp: WA_CONTACT_OK</span>
              </div>
              <div>
                <button
                  onClick={handleResetForm}
                  className="rounded-lg bg-amber-500 hover:bg-amber-600 px-5 py-2.5 text-xs font-semibold uppercase text-white tracking-wide"
                >
                  Submit another advisory note
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-6">
              
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2 text-slate-800">
                  <ClipboardSignature className="h-5 w-5 text-amber-500" />
                  <h2 className="font-display text-lg font-bold">Advisory & Visiting Inquiry Form</h2>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Please provide correct correspondence email addresses to secure callback links.</p>
              </div>

              <form onSubmit={handleMessageSubmit} className="space-y-4 text-xs font-sans">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-500 font-semibold uppercase block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Martha Hailu"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 font-semibold uppercase block mb-1">Your Correspondence Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="martha@example.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 font-semibold uppercase block mb-1">Subject of Correspondence</label>
                  <select
                    value={userSubject}
                    onChange={(e) => setUserSubject(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 outline-none focus:border-amber-500 focus:bg-white"
                  >
                    <option>General inquiry</option>
                    <option>Admissions & Tuition fees</option>
                    <option>STEM & Robotics courses curriculum</option>
                    <option>Merit scholarships grants</option>
                    <option>Book a private physical campus tour</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-500 font-semibold uppercase block mb-1">Message Detail *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your detailed questions regarding Wisdom requirements..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 outline-none focus:border-amber-500 focus:bg-white font-sans whitespace-pre-line"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-amber-500 hover:bg-amber-600 font-bold uppercase tracking-wider text-white py-3 shadow transition-colors"
                >
                  Send Advisory Letter
                </button>

              </form>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
