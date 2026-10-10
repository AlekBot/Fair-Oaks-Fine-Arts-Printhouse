import React from 'react';
import { IMAGES } from '../data/printhouseData';

interface HeroProps {
  onStartCustomPrint: () => void;
  onExplorePapers: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCustomPrint, onExplorePapers }) => {
  return (
    <section className="border-b border-[#E7E2D8] bg-[#F7F4EE]">
      {/* Operational Utility Ribbon */}
      <div className="border-b border-[#E7E2D8] bg-[#EFECE4] text-xs text-[#57534E] py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#1C1917]">Fair Oaks Atelier</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>Historic Village District, California</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>Tuesday – Saturday 10:00 – 17:30</span>
          </div>
          <div className="flex items-center gap-3 text-stone-600">
            <span>ISO 9706 Archival Standard</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>100+ Year Pigment Permanence</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span className="text-[#78350F] font-semibold">Artist Proof Turnaround: 48 Hours</span>
          </div>
        </div>
      </div>

      {/* Main Hero Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Editorial Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-widest font-sans text-[#78350F] font-semibold">
              Archival Giclée Atelier · Custom Conservation Framing · 150MP Capture
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1C1917] leading-[1.08] text-balance">
              Museum-grade pigment editions crafted for generations.
            </h1>

            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-xl">
              From our sunlit atelier in Fair Oaks, we collaborate with painters, sculptors, and fine art photographers to produce pigment reproductions of uncompromising tonal depth. Milled Hahnemühle and Canson cotton rag, 12-channel micro-piezo chemistry, and hand-joined hardwood gallery mouldings.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onStartCustomPrint}
                className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1C1917] hover:bg-[#78350F] transition-colors rounded-sm cursor-pointer shadow-sm"
              >
                Launch Print Visualizer
              </button>
              <button
                onClick={onExplorePapers}
                className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#1C1917] border border-[#D6CEBE] bg-[#FBF9F5] hover:bg-white transition-colors rounded-sm cursor-pointer shadow-xs"
              >
                Examine Paper Grades
              </button>
            </div>

            {/* Proofing Trust Strip */}
            <div className="pt-6 border-t border-[#E7E2D8] grid grid-cols-3 gap-6 text-xs text-[#78716C]">
              <div>
                <span className="block font-serif text-2xl font-normal text-[#1C1917] tabular-nums">12-Ch</span>
                <span className="mt-1 block">UltraChrome PRO micro-droplet pigment</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-normal text-[#1C1917] tabular-nums">2.38</span>
                <span className="mt-1 block">Maximum optical black density (DMax)</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-normal text-[#1C1917] tabular-nums">100%</span>
                <span className="mt-1 block">Cotton rag, acid-free & OBA-free substrates</span>
              </div>
            </div>
          </div>

          {/* Curated Visual Focal Column */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#EFECE4] p-3 sm:p-4 rounded-sm border border-[#E7E2D8] shadow-sm">
              <div className="relative overflow-hidden aspect-16/10 bg-[#D6CEBE]">
                <img
                  src={IMAGES.heroAtelier}
                  alt="Master printmaker inspecting an archival Hahnemühle print on an exhibition table in Fair Oaks studio"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#78716C] font-sans">
                <span className="italic font-serif text-[#57534E]">Master atelier inspection table, Fair Oaks, CA</span>
                <span>Proofing on 310gsm German Etching</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
