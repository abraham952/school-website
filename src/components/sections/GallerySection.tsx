import { useState } from 'react';
import { TRANSLATIONS, GALLERIES } from '../../data';
import { Language } from '../../types';
import { Compass, GraduationCap, Building, Star, Box, Camera } from 'lucide-react';

interface GallerySectionProps {
  currentLang: Language;
}

const TOUR_HOTSPOTS = [
  {
    id: "hotspot-1",
    title: "Selamawit Biology & Science Labs",
    desc: "Specially calibrated biological cleanroom environments configured with computerized gene synthesizer boards, cellular culture chambers and PCR test utilities.",
    capacity: "Active cap: 12 students per session",
    spec: "Grade 11/12 Cambridge advanced research sittings.",
    url: "/src/assets/images/ethiopian_school_science_lab_1781712327357.jpg"
  },
  {
    id: "hotspot-2",
    title: "Bole Central School Library",
    desc: "A breathtaking academic archive and reading hall containing over 14,000 reference portfolios, world history codexes, scientific journals, and quiet individual study chambers.",
    capacity: "Occupancy limit: 80 silent scholar spaces",
    spec: "Configured with access to digital Oxford/A-Level resources.",
    url: "/src/assets/images/ethiopian_students_classroom_1781712311463.jpg"
  },
  {
    id: "hotspot-3",
    title: "AI Workspaces & Robotics Hub",
    desc: "The nerve center for computational engineering. Features computer vision workstations, micro-controllers, advanced drone test cages, and industrial 3D printing rigs.",
    capacity: "Active cap: 16 students",
    spec: "Equipped with NVIDIA RTX computation clusters.",
    url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600"
  }
];

export default function GallerySection({ currentLang }: GallerySectionProps) {
  const t = (key: string) => TRANSLATIONS[currentLang][key] || key;
  const [activeHotspotId, setActiveHotspotId] = useState('hotspot-1');

  const tourSelection = TOUR_HOTSPOTS.find(hp => hp.id === activeHotspotId) || TOUR_HOTSPOTS[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 pb-16" id="gallery-container">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center space-x-1 border border-indigo-300 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold text-indigo-900 tracking-wider font-mono">
          <Compass className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
          <span>Simulated Interactive Tour</span>
        </span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Virtual Campus Tours & Galleries
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed font-sans">
          Welcome to the digital overview of our campus. Switch through interactive hotspots to view laboratories, libraries and technological workstations built inside Wisdom Academy.
        </p>
      </div>

      {/* 2. Interactive Virtual Campus Hotspot Selector */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl" id="virtual-hotspots">
        
        {/* Left selector menu (Col-span 4) */}
        <div className="lg:col-span-4 space-y-3.5">
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-amber-400">Campus Tour Hotspots</h3>
          <p className="text-[11px] text-slate-400 leading-normal pb-2">Select a facility to render simulated visual spec sheets:</p>
          
          <div className="space-y-2.5 flex flex-col">
            {TOUR_HOTSPOTS.map((hotspot) => (
              <button
                key={hotspot.id}
                onClick={() => setActiveHotspotId(hotspot.id)}
                className={`w-full text-left rounded-xl p-3.5 text-xs font-semibold tracking-wide transition-all ${
                  activeHotspotId === hotspot.id
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700/60'
                }`}
              >
                {hotspot.title}
              </button>
            ))}
          </div>
        </div>

        {/* Right view panel (Col-span 8) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="h-56 rounded-xl overflow-hidden bg-slate-800 relative border border-slate-700">
            <img
              src={tourSelection.url}
              alt={tourSelection.title}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Pulsing indicator tag */}
            <div className="absolute top-4 left-4 h-3 w-3 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute top-4 left-4 h-3 w-3 bg-red-500 rounded-full border border-white"></div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-white tracking-tight">{tourSelection.title}</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{tourSelection.desc}</p>
            <div className="space-y-1.5 p-3 rounded-lg bg-slate-850 border border-slate-800 text-[10px] text-slate-400 font-mono">
              <p className="flex items-center"><GraduationCap className="h-4 w-4 text-amber-500 mr-2" /> {tourSelection.spec}</p>
              <p className="flex items-center"><Box className="h-4 w-4 text-indigo-400 mr-2" /> {tourSelection.capacity}</p>
            </div>
          </div>
        </div>

      </section>

      {/* 3. Photography Catalog View */}
      <section className="space-y-6" id="photo-directories">
        <div className="border-b border-slate-150 pb-2">
          <h2 className="font-display text-lg font-bold text-slate-950 uppercase tracking-widest flex items-center">
            <Camera className="h-5 w-5 mr-1.5 text-amber-500" /> Static Photo Galleries
          </h2>
          <p className="text-[10px] text-slate-500 mt-1">Official highlights of educational structures and landscape avenues.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERIES.map((gal, idx) => (
            <div
              key={idx}
              className="group cursor-pointer rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div className="h-48 overflow-hidden bg-slate-100 relative">
                <img
                  src={gal.src}
                  alt={gal.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-3 left-3 rounded bg-slate-900/80 px-2 py-0.5 text-[9px] font-mono font-bold text-white border border-slate-800 uppercase tracking-wider">
                  {gal.aspect}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  {gal.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
