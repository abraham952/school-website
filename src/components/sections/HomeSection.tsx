import { useState, useEffect } from 'react';
import { TRANSLATIONS, STATISTICS, PILLARS, EVENTS } from '../../data';
import { Language, SchoolEvent } from '../../types';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, Quote, Sparkles, BookOpen, Clock, MapPin } from 'lucide-react';

interface HomeSectionProps {
  currentLang: Language;
  onTabChange: (tab: string) => void;
  onEventSelect: (event: SchoolEvent) => void;
  eventsList?: SchoolEvent[];
}

const HERO_IMAGES = [
  {
    url: "/src/assets/images/ethiopian_students_classroom_1781712311463.jpg",
    caption: "Wisdom Atrium of Academic Excellence"
  },
  {
    url: "/src/assets/images/ethiopian_school_science_lab_1781712327357.jpg",
    caption: "State-of-the-art Digital STEM Lab"
  },
  {
    url: "/src/assets/images/ethiopian_school_sports_athletics_1781712348924.jpg",
    caption: "Olympic Dimensions Training Arena"
  }
];

export default function HomeSection({ currentLang, onTabChange, onEventSelect, eventsList }: HomeSectionProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  const t = (key: string) => TRANSLATIONS[currentLang][key] || key;

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  return (
    <div className="space-y-16 pb-16" id="home-section-container">
      
      {/* 1. HERO SLIDER SECTION with Glassmorphism overlay */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-slate-950 text-white" id="home-hero-slider">
        {/* Slides */}
        {HERO_IMAGES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === slideIndex ? 'opacity-40' : 'opacity-0'
            }`}
          >
            <img
              src={slide.url}
              alt={slide.caption}
              className="h-full w-full object-cover scale-105 transition-transform duration-[6000ms] ease-in-out"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}

        {/* Dynamic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>

        {/* Contents */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl space-y-6">
              
              <div className="inline-flex items-center space-x-2 rounded-full bg-amber-500/10 px-3.5 py-1 text-sm font-semibold text-amber-400 ring-1 ring-amber-500/20 backdrop-blur-md">
                <Sparkles className="h-4 w-4" />
                <span>Rigorous Cambridge & National Curriculums</span>
              </div>

              <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-tight">
                {t('heroTagline')}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                {t('heroSub')}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => onTabChange('admissions')}
                  className="rounded-lg bg-amber-500 px-5 py-3 text-xs font-semibold tracking-wider uppercase text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-600 hover:scale-[1.02]"
                >
                  {t('applyNow')}
                </button>
                <button
                  onClick={() => onTabChange('gallery')}
                  className="rounded-lg bg-white/10 px-5 py-3 text-xs font-semibold tracking-wider uppercase text-white ring-1 ring-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
                >
                  {t('exploreCampus')}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/30 p-2 text-white hover:bg-slate-900/60 backdrop-blur-sm"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/30 p-2 text-white hover:bg-slate-900/60 backdrop-blur-sm"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === slideIndex ? 'w-6 bg-amber-500' : 'w-2 bg-slate-600'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* 2. SCHOOL STATISTICS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="stats-segment">
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">{t('statsTitle')}</h2>
            <p className="text-xs text-slate-500 mt-2">{t('statsSub')}</p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATISTICS.map((stat, idx) => (
              <div key={idx} className="text-center space-y-1 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-4xl font-extrabold tracking-tight text-transparent font-display`}>
                  {stat.value}
                </span>
                <p className="text-xs font-semibold text-slate-700 uppercase tracking-widest block pt-1.5">
                  {t(stat.key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRINCIPAL'S ADDRESS CARD with dual-column elegance */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="principal-keynote">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-center rounded-2xl bg-slate-900 text-white overflow-hidden shadow-xl">
          <div className="md:col-span-4 h-full min-h-[300px] relative">
            <img
              src="/src/assets/images/ethiopian_principal_portrait_1781712414112.jpg"
              alt="Dr. Abraham Tadesse, principal"
              className="absolute inset-0 h-full w-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent md:bg-gradient-to-r"></div>
          </div>
          <div className="md:col-span-8 p-8 md:p-12 space-y-4">
            <Quote className="h-10 w-10 text-amber-500 opacity-60" />
            <h3 className="font-display text-xs font-semibold text-amber-400 tracking-wider uppercase">
              {t('principalTitle')}
            </h3>
            <p className="text-sm font-sans leading-relaxed text-slate-300 italic">
              "{t('principalMessage')}"
            </p>
            <div className="pt-2 border-t border-slate-800">
              <p className="font-display text-sm font-bold text-white">{t('principalName')}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Academy Leadership & Trustee Board</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PILLARS OF DISTINCTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10" id="academy-pillars">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t('whyTitle')}
          </h2>
          <p className="text-xs text-slate-500">
            {t('whySub')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.key}
              className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-display text-sm font-bold text-slate-900 tracking-tight group-hover:text-amber-700 transition-colors">
                {t(pillar.titleKey)}
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-2">
                {t(pillar.descKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. UPCOMING HIGHLIGHTS & EVENTS BOARD */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="events-grid-short">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Info Column */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              Academy Live Calendar & Summits
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              We highly encourage parents and partners to join our scientific fairs, classical orchestra showcases and regional sports play-offs. Scroll to register or view dates.
            </p>
            <button
              onClick={() => onTabChange('newsEvents')}
              className="inline-flex items-center text-xs font-bold text-amber-700 hover:text-amber-800 space-x-1"
            >
              <span>Explore all schedule rosters</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Events Listings */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(eventsList || EVENTS).slice(0, 2).map((event) => (
              <div
                key={event.id}
                onClick={() => onEventSelect(event)}
                className="group cursor-pointer rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:bg-amber-50/50 hover:border-amber-200"
              >
                <div className="flex items-center space-x-2 text-amber-700 mb-2 font-mono text-[10px] font-semibold uppercase">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{event.date}</span>
                </div>
                <h3 className="font-display text-xs font-semibold text-slate-900 group-hover:text-amber-900 leading-snug">
                  {event.title[currentLang] || event.title.en}
                </h3>
                <div className="mt-3.5 flex items-center space-x-4 text-[10px] text-slate-500">
                  <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {event.time}</span>
                  <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> {event.location[currentLang].slice(0, 15)}...</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. IMMERSIVE CALL-TO-ACTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="home-immersive-cta">
        <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-amber-700 p-8 sm:p-12 text-white shadow-lg space-y-6 text-center max-w-4xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            Build Your Legacy at Wisdom Academy
          </h2>
          <p className="text-xs sm:text-sm text-slate-100 max-w-xl mx-auto leading-relaxed">
            Ready to secure admissions within our elite digital cohort? Start your online request process today. Financial aid grants and sports endowment benefits are reviewed on submission.
          </p>
          <div className="flex justify-center space-x-3 pt-2">
            <button
              onClick={() => onTabChange('admissions')}
              className="rounded-lg bg-slate-900 px-5 py-3 text-xs font-semibold tracking-wider uppercase text-white shadow-md hover:bg-slate-800 transition-colors"
            >
              Start Admission Entry
            </button>
            <button
              onClick={() => onTabChange('contact')}
              className="rounded-lg bg-white px-5 py-3 text-xs font-semibold tracking-wider uppercase text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Book Advisory Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
