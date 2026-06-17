import { useState } from 'react';
import { TRANSLATIONS, NEWS, EVENTS } from '../../data';
import { Language, NewsItem, SchoolEvent, SystemNotification } from '../../types';
import { Calendar, Search, Newspaper, Clock, MapPin, X, Send, Sparkles, CheckCheck } from 'lucide-react';

interface NewsEventsSectionProps {
  currentLang: Language;
  onEventSelect: (event: SchoolEvent) => void;
  onTriggerSimulatedNotification: (notif: Omit<SystemNotification, 'id' | 'sentAt'>) => void;
  newsList?: NewsItem[];
  eventsList?: SchoolEvent[];
}

export default function NewsEventsSection({
  currentLang,
  onEventSelect,
  onTriggerSimulatedNotification,
  newsList,
  eventsList
}: NewsEventsSectionProps) {
  const t = (key: string) => TRANSLATIONS[currentLang][key] || key;

  // Search/Filter news states
  const [newsQuery, setNewsQuery] = useState('');
  const [activeNewsCategory, setActiveNewsCategory] = useState<'all' | 'academic' | 'sports' | 'achievement' | 'admission' | 'event'>('all');
  const [selectedNewsDetail, setSelectedNewsDetail] = useState<NewsItem | null>(null);

  // Email simulation states
  const [simulatedEmails, setSimulatedEmails] = useState<Record<string, string>>({});

  const filteredNews = (newsList || NEWS).filter(item => {
    const matchesCategory = activeNewsCategory === 'all' || item.category === activeNewsCategory;
    const matchesSearch = item.title[currentLang].toLowerCase().includes(newsQuery.toLowerCase()) || 
      item.summary[currentLang].toLowerCase().includes(newsQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRegisterEventAttendance = (event: SchoolEvent, emailInput: string) => {
    if (!emailInput) {
      alert("Please enter a valid email to register simulated invitation alerts.");
      return;
    }

    // Trigger simulation notification dispatch
    onTriggerSimulatedNotification({
      recipient: emailInput,
      type: 'email',
      subjectOrHeader: `Invitation: ${event.title.en}`,
      message: `Dear Wisdom Academy Partner,

This email confirms your seat allocation for the "${event.title.en}".

Event details:
- Date: ${event.date}
- Time: ${event.time}
- Location: ${event.location.en}

Your entry barcode is encrypted inside verification hash code: WA-EV-INV-${Math.floor(100+Math.random()*900)}. Complete registration guidelines will follow shortly.

Sincerely,
Wisdom Relations Office`,
      status: 'delivered'
    });

    // Reset indicator state
    setSimulatedEmails(prev => ({
      ...prev,
      [event.id]: 'registered'
    }));

    alert(`Simulated confirmation email dispatched securely to ${emailInput}. Press top System Portal dropdown to view dispatch logs!`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 pb-16" id="news-events-container">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-800 uppercase tracking-widest font-mono">
          Live Media & Calendar
        </span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Announcements & Event Calendars
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed font-sans">
          Stay mapped with newly compiled research breakthroughs, curriculum modifications, and student extracurricular victories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left column (Col-span 7): News Catalog System */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <h2 className="font-display text-base font-bold text-slate-900 uppercase tracking-widest">Wisdom Press Ledger</h2>
            
            <div className="flex space-x-2">
              <select
                value={activeNewsCategory}
                onChange={(e) => setActiveNewsCategory(e.target.value as any)}
                className="rounded-lg border border-slate-200 bg-slate-50 py-1.5 px-2.5 text-xs outline-none focus:border-amber-500"
              >
                <option value="all">Categories: Show All</option>
                <option value="academic">Academic Releases</option>
                <option value="sports">Athletic Summaries</option>
                <option value="admission">Admissions cohort</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedNewsDetail(item)}
                className="group cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-5 overflow-hidden"
              >
                <div className="h-44 w-full md:w-44 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title.en}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-50 rounded px-2 py-0.5 uppercase tracking-wide inline-block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-amber-800 leading-tight">
                      {item.title[currentLang] || item.title.en}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {item.summary[currentLang] || item.summary.en}
                    </p>
                  </div>
                  <div className="border-t border-slate-50 pt-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Published {item.date}</span>
                    <span className="font-semibold text-slate-500 group-hover:underline">Read whole release &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column (Col-span 5): Event Management System & Live Register */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-b border-slate-150 pb-3">
            <h2 className="font-display text-base font-bold text-slate-900 uppercase tracking-widest">Active Calendar</h2>
            <p className="text-[10px] text-slate-500 mt-1">Book invite grids for our physical cleanrooms and forums.</p>
          </div>

          <div className="space-y-4">
            {(eventsList || EVENTS).map((event) => (
              <div
                key={event.id}
                className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm space-y-3.5 transition hover:shadow-md"
              >
                <div className="flex items-center space-x-2 text-indigo-700 font-mono text-[10px] font-bold uppercase">
                  <Calendar className="h-4 w-4 text-amber-500" />
                  <span>{event.date}</span>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900">
                    {event.title[currentLang] || event.title.en}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {event.description[currentLang] || event.description.en}
                  </p>
                </div>
                <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-100 text-[10px] text-slate-600 font-sans">
                  <p className="flex items-center"><Clock className="h-3.5 w-3.5 text-slate-400 mr-2 flex-shrink-0" /> {event.time}</p>
                  <p className="flex items-center"><MapPin className="h-3.5 w-3.5 text-slate-400 mr-2 flex-shrink-0" /> {event.location[currentLang] || event.location.en}</p>
                </div>

                {/* Simulated Attendance Booking Form */}
                <div className="border-t border-slate-50 pt-3 text-xs">
                  {simulatedEmails[event.id] === 'registered' ? (
                    <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                      <CheckCheck className="h-4 w-4" />
                      <span className="font-semibold text-[10px]">RESERVATION SECURE — CHECK SIMULATOR</span>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Get Simulated Seat Reservation Invitation
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          placeholder="Your email address..."
                          aria-label="Your email address"
                          id={`email-input-${event.id}`}
                          className="flex-1 rounded border border-slate-200 bg-slate-50/50 p-2 text-xs outline-none focus:border-amber-500 focus:bg-white"
                        />
                        <button
                          onClick={() => {
                            const val = (document.getElementById(`email-input-${event.id}`) as HTMLInputElement)?.value;
                            handleRegisterEventAttendance(event, val);
                          }}
                          className="rounded bg-slate-950 hover:bg-slate-800 text-white px-3 font-semibold text-xs flex items-center"
                        >
                          Send Alert
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. News Detail Modal */}
      {selectedNewsDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedNewsDetail(null)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Image */}
            <div className="h-64 w-full rounded-xl overflow-hidden bg-slate-100">
              <img
                src={selectedNewsDetail.imageUrl}
                alt={selectedNewsDetail.title.en}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Modal labels */}
            <span className="inline-flex rounded bg-amber-50 text-amber-800 border border-amber-100 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider">
              Wisdom Media Release / {selectedNewsDetail.category}
            </span>

            <div className="space-y-2">
              <h2 className="font-display text-lg sm:text-2xl font-bold text-slate-900 leading-tight">
                {selectedNewsDetail.title[currentLang] || selectedNewsDetail.title.en}
              </h2>
              <p className="text-[10px] text-slate-400 font-mono">
                BY {selectedNewsDetail.author.toUpperCase()} &bull; RELEASED {selectedNewsDetail.date}
              </p>
            </div>

            {/* Full text content */}
            <p className="text-xs text-slate-600 leading-relaxed font-sans whitespace-pre-line border-t border-slate-100 pt-3">
              {selectedNewsDetail.content[currentLang] || selectedNewsDetail.content.en}
            </p>

            {/* Footer stamp */}
            <div className="border-t border-slate-100 pt-3.5 flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>Security Key: SHA256_WA_PRESS</span>
              <span className="font-semibold text-amber-700 flex items-center">
                <Sparkles className="h-3 w-3 mr-0.5" /> WISDOM PRESS OFFICE
              </span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
