import React from 'react';
import { SAMPLE_ARTWORKS, IMAGES } from '../data/printhouseData';
import { Artwork } from '../types';
import { Award, ArrowRight, ShieldCheck } from 'lucide-react';

interface LimitedEditionsProps {
  onSelectEditionForCustomizer: (art: Artwork) => void;
  onOpenCOA: (title: string, artist: string, paper: string) => void;
}

export const LimitedEditions: React.FC<LimitedEditionsProps> = ({
  onSelectEditionForCustomizer,
  onOpenCOA,
}) => {
  return (
    <section id="limited-editions" className="py-12 lg:py-16 bg-[#FBF9F5] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-sans text-[#78350F] font-semibold">
            Archival Gallery & Numbered Releases
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1C1917]">
            Curated Limited Editions
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Exclusive fine art editions produced in strictly limited runs in collaboration with regional California masters. Each edition includes hand-deckled edges, artist graphite signature, blind-embossed studio seal, and an individual Certificate of Authenticity.
          </p>
        </div>

        {/* Lead Featured Edition: Elena Vance's American River Oaks */}
        <div className="bg-[#F7F4EE] border border-[#E7E2D8] rounded-sm p-6 sm:p-10 mb-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="relative bg-[#EFECE4] p-3 rounded-xs border border-[#D6CEBE]">
                <div className="overflow-hidden aspect-4/3 bg-[#D4B995]">
                  <img
                    src={IMAGES.featuredArtwork}
                    alt="Valley Oaks Along the American River by Elena Vance"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-stone-600">
                  <span className="italic font-serif">Original Plein Air Oil, Fair Oaks Bluffs, CA</span>
                  <span className="font-mono tabular-nums text-[#78350F] font-semibold">Edition 18 of 50 Remaining</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="font-semibold text-[#78350F] uppercase tracking-wider">Featured Atelier Release</span>
                <span aria-hidden="true">·</span>
                <span>Spring Collection 2026</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">
                Valley Oaks Along the American River
              </h3>

              <div className="text-xs text-stone-600 space-y-1">
                <p><strong className="text-stone-900">Artist:</strong> Elena Vance (Fair Oaks, California)</p>
                <p><strong className="text-stone-900">Substrate:</strong> 310gsm Hahnemühle German Etching</p>
                <p><strong className="text-stone-900">Edition Run:</strong> Strictly limited to 50 impressions worldwide</p>
                <p><strong className="text-stone-900">Image Size:</strong> 24 × 18 inches (with 2-inch archival border)</p>
              </div>

              <p className="text-sm text-[#57534E] leading-relaxed">
                Rendered with vigorous impasto knife work during late afternoon golden hour over the American River rapids. Each impression is individually signed in pencil by the artist, blind-embossed with our atelier chop mark, and accompanied by a registered Certificate of Authenticity.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectEditionForCustomizer(SAMPLE_ARTWORKS[0])}
                  className="px-5 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#1C1917] hover:bg-[#78350F] rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <span>Customize Framing & Mat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCOA(SAMPLE_ARTWORKS[0].title, SAMPLE_ARTWORKS[0].artist, 'Hahnemühle German Etching 310gsm')}
                  className="px-4 py-3 text-xs font-semibold tracking-wider uppercase text-stone-800 border border-[#D6CEBE] bg-white hover:bg-stone-100 rounded-xs transition-colors cursor-pointer"
                >
                  Inspect Certificate
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Editions Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_ARTWORKS.map((art) => (
            <div
              key={art.id}
              className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-sm p-5 flex flex-col justify-between hover:border-stone-400 transition-colors"
            >
              <div className="space-y-4">
                <div className="relative overflow-hidden aspect-4/3 rounded-xs border border-stone-200 bg-stone-100">
                  <img
                    src={art.imageSrc}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono tabular-nums px-2 py-0.5 rounded-xs">
                    {art.editionRemaining} of {art.editionTotal} Left
                  </div>
                </div>

                <div>
                  <h4 className="font-serif text-xl font-medium text-stone-900">
                    {art.title}
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">{art.artist} · {art.year}</p>
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed line-clamp-3">
                  {art.description}
                </p>

                <div className="pt-2 border-t border-[#E7E2D8] text-xs text-stone-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Medium:</span>
                    <span className="font-medium text-stone-900">{art.medium.split(' (')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard Size:</span>
                    <span className="font-medium text-stone-900">{art.dimensions}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[#E7E2D8] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Print Only from</span>
                  <span className="font-serif text-lg font-medium text-stone-950 tabular-nums">
                    ${art.basePrice}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectEditionForCustomizer(art)}
                  className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C1917] hover:bg-[#78350F] rounded-xs transition-colors cursor-pointer"
                >
                  Configure Frame
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
