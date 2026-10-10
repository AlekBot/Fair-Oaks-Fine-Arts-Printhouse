import React from 'react';
import { FRAMES, MATS, GLASS_OPTIONS, IMAGES } from '../data/printhouseData';
import { Shield, Check, Compass, Sparkles } from 'lucide-react';

interface FramingStudioProps {
  onStartFraming: () => void;
}

export const FramingStudio: React.FC<FramingStudioProps> = ({ onStartFraming }) => {
  return (
    <section id="conservation-framing" className="py-12 lg:py-16 bg-[#FBF9F5] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-sans text-[#78350F] font-semibold">
            Archival Joinery & Preservation
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1C1917]">
            Conservation Framing Atelier
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            A master print deserves housing that honors its provenance. Every frame in our woodshop is milled from sustainably harvested North American hardwoods, assembled with keyed corner splines, and mounted using completely reversible museum techniques.
          </p>
        </div>

        {/* Feature Split with Frame Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 bg-[#F7F4EE] border border-[#E7E2D8] p-6 sm:p-10 rounded-sm">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block">
              100% Reversible Preservation Practice
            </span>
            <h3 className="font-serif text-3xl font-medium text-stone-900 leading-tight">
              True conservation mounting never damages the paper.
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Standard commercial framing relies on pressure-sensitive adhesives, masking tapes, and acidic backing boards that emit off-gases, permanently staining your artwork. Our atelier mounts prints exclusively with hand-torn Japanese Kozo mulberry paper hinges and organic, cooked wheat-starch paste—the same standard mandated by the Smithsonian and Library of Congress.
            </p>

            <div className="space-y-3 pt-2 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#78350F] shrink-0 mt-0.5" />
                <span><strong className="text-stone-900">Keyed Spline Corners:</strong> Contrast hardwood corner splines provide enduring structural rigidity without fragile metal staples.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#78350F] shrink-0 mt-0.5" />
                <span><strong className="text-stone-900">8-Ply Solid Cotton Rag Mats:</strong> 3mm deep beveled edge provides a dramatic architectural shadow line while separating glazing from the artwork surface.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#78350F] shrink-0 mt-0.5" />
                <span><strong className="text-stone-900">Tru Vue® Museum Glass®:</strong> 99% UV radiation blocking with optical anti-reflective coating reduces glare to under 1%.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onStartFraming}
                className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#1C1917] hover:bg-[#78350F] rounded-xs transition-colors cursor-pointer shadow-xs"
              >
                Configure Custom Frame in Visualizer
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative bg-[#EFECE4] p-3 rounded-xs border border-[#D6CEBE]">
              <div className="overflow-hidden aspect-4/3 bg-[#D4B995]">
                <img
                  src={IMAGES.customFraming}
                  alt="Artisanal solid walnut and white oak picture frame corner sample with 8-ply museum mat"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="block text-[11px] text-stone-500 font-serif italic mt-2 text-center">
                Artisanal corner sample: Solid Black Walnut & Quarter-Sawn Oak spline joinery
              </span>
            </div>
          </div>

        </div>

        {/* Hardwood Moulding Catalog Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E7E2D8] pb-3">
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              The Atelier Hardwood Moulding Selection
            </h3>
            <span className="text-xs text-stone-500">Milled & finished in Fair Oaks, CA</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FRAMES.map((frame) => (
              <div
                key={frame.id}
                className="bg-[#FAF8F5] border border-[#E7E2D8] p-5 rounded-sm space-y-3 hover:border-stone-400 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xs border border-black/20 shadow-xs shrink-0"
                    style={{ backgroundColor: frame.colorHex }}
                  />
                  <div>
                    <h4 className="font-serif text-lg font-medium text-stone-900 leading-snug">
                      {frame.name}
                    </h4>
                    <span className="text-xs text-[#78350F] font-medium">{frame.woodType}</span>
                  </div>
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed">
                  {frame.description}
                </p>

                <div className="pt-2 border-t border-[#E7E2D8] grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-stone-400 block font-medium">Face Width</span>
                    <span className="text-stone-800 font-semibold mt-0.5 block tabular-nums">{frame.borderWidthInches}"</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Rabbet Depth</span>
                    <span className="text-stone-800 font-semibold mt-0.5 block tabular-nums">{frame.depthInches}"</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Linear Rate</span>
                    <span className="text-stone-800 font-semibold mt-0.5 block tabular-nums">${frame.pricePerLinearInch.toFixed(2)}/in</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
