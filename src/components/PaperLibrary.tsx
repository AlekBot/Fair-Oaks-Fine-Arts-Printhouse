import React, { useState } from 'react';
import { PAPERS, IMAGES } from '../data/printhouseData';
import { PaperOption } from '../types';
import { Layers, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface PaperLibraryProps {
  onSelectPaper: (paperId: string) => void;
}

export const PaperLibrary: React.FC<PaperLibraryProps> = ({ onSelectPaper }) => {
  const [activePaper, setActivePaper] = useState<PaperOption>(PAPERS[0]);

  return (
    <section id="paper-catalog" className="py-12 lg:py-16 bg-[#F7F4EE] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-sans text-[#78350F] font-semibold">
            Substrates & Archival Permanence
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1C1917]">
            The Archival Paper Collection
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Every sheet in our print room is selected from centuries-old European paper mills. We use exclusively 100% cotton rag, cylinder mold-made α-cellulose, and sustainable botanical fibres free of optical brightening agents (OBAs).
          </p>
        </div>

        {/* Hero Paper Feature: Macro Surface Detail */}
        <div className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-sm p-6 sm:p-8 mb-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative">
              <div className="overflow-hidden aspect-4/3 rounded-xs border border-[#D6CEBE] bg-[#EFECE4]">
                <img
                  src={IMAGES.paperTexture}
                  alt="Macro detail of 310gsm Hahnemühle German Etching deckle edge cotton paper"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="block text-[11px] text-stone-500 font-serif italic mt-2">
                Fig. 1 — Tactile cylinder mold deckle edge on 310gsm Hahnemühle paper
              </span>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="font-semibold text-[#78350F] uppercase tracking-wider">Hahnemühle & Canson Heritage</span>
                <span aria-hidden="true">·</span>
                <span>ISO 9706 Longevity Certified</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
                Milled without compromise since 1584.
              </h3>

              <p className="text-sm text-[#57534E] leading-relaxed">
                Optical brighteners degrade under ambient light, causing cheap commercial papers to yellow and turn brittle within a decade. Our master collection relies on natural calcium carbonate buffering, unchlorinated spring waters, and genuine rag fibers, ensuring your artwork remains chemically neutral for over 100 years.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E7E2D8] text-xs">
                <div>
                  <span className="text-stone-400 block font-medium">Acid-Free Buffer</span>
                  <span className="text-stone-900 font-semibold mt-0.5 block">pH 7.5 – 9.5</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Lignin Free</span>
                  <span className="text-stone-900 font-semibold mt-0.5 block">&lt; 1% Kappa</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Aging Longevity</span>
                  <span className="text-[#78350F] font-semibold mt-0.5 block">100+ Years Museum</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAPERS.map((paper) => (
            <div
              key={paper.id}
              className={`bg-[#FAF8F5] border rounded-sm p-6 flex flex-col justify-between transition-all ${
                activePaper.id === paper.id
                  ? 'border-[#78350F] ring-1 ring-[#78350F] shadow-sm'
                  : 'border-[#E7E2D8] hover:border-stone-400'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                      {paper.brand}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-stone-900 mt-0.5">
                      {paper.name}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-semibold tabular-nums text-stone-700 bg-stone-100 px-2 py-0.5 rounded-xs border border-stone-200 shrink-0">
                    {paper.weightGsm} GSM
                  </span>
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed">
                  {paper.description}
                </p>

                <div className="pt-2 border-t border-[#E7E2D8] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Surface Finish:</span>
                    <span className="text-stone-900 font-medium text-right max-w-[180px] truncate">{paper.surface}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Substrate Composition:</span>
                    <span className="text-stone-900 font-medium text-right max-w-[180px] truncate">{paper.composition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Paper Tone:</span>
                    <span className="text-stone-900 font-medium">{paper.tone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">DMax Density:</span>
                    <span className="text-stone-900 font-mono tabular-nums">{paper.dmax}</span>
                  </div>
                  <div className="pt-1 text-[11px] text-[#78350F] font-medium">
                    Best suited for: {paper.bestFor}
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[#E7E2D8] flex items-center justify-between">
                <span className="text-xs font-mono tabular-nums text-stone-600">
                  ${paper.pricePerSqInch.toFixed(2)} / sq. in.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActivePaper(paper);
                    onSelectPaper(paper.id);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C1917] hover:bg-[#78350F] rounded-xs transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Select for Print</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
