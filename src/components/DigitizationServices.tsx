import React, { useState } from 'react';
import { IMAGES } from '../data/printhouseData';

export const DigitizationServices: React.FC = () => {
  const [artworkMedium, setArtworkMedium] = useState('Oil on Stretched Canvas');
  const [estWidth, setEstWidth] = useState(30);
  const [estHeight, setEstHeight] = useState(24);
  const [includeColorMatchProof, setIncludeColorMatchProof] = useState(true);
  const [clientEmail, setClientEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Calculate digitization pricing
  // Base capture: $95 for up to 20x24, $145 for up to 36x48, $195 for oversized + $35 color proof
  const isLarge = estWidth * estHeight > 1000;
  const isMedium = estWidth * estHeight > 500;
  const baseCaptureRate = isLarge ? 195 : isMedium ? 145 : 95;
  const proofRate = includeColorMatchProof ? 35 : 0;
  const totalCaptureEst = baseCaptureRate + proofRate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="art-digitization" className="py-12 lg:py-16 bg-[#F7F4EE] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-sans text-[#78350F] font-semibold">
            Museum-Grade Artwork Reproduction
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1C1917]">
            150-Megapixel Fine Art Digitization
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Every master print reproduction begins with flawless optical capture. Our Fair Oaks studio employs medium-format sensor arrays, cross-polarized studio strobes, and ICC spectrophotometer color profiling to capture every brushstroke, palette knife relief, and subtle glaze layer.
          </p>
        </div>

        {/* Feature Split with Studio Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          <div className="lg:col-span-6">
            <div className="relative bg-[#FAF8F5] p-3 rounded-xs border border-[#D6CEBE]">
              <div className="overflow-hidden aspect-4/3 bg-[#242424]">
                <img
                  src={IMAGES.archivalScan}
                  alt="High-end fine art reproduction studio with medium format camera and precision color calibration chart"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="block text-[11px] text-stone-500 font-serif italic mt-2 text-center">
                Fig. 2 — 150MP medium-format capture array with cross-polarized continuous illumination
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#78350F] font-semibold">
                FADGI 4-Star & Metamorfoze Guidelines
              </span>
              <h3 className="font-serif text-3xl font-medium text-stone-900 leading-tight">
                Zero glare, true Delta-E color accuracy.
              </h3>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Reflective varnishes and raised oil impasto typically blind consumer scanners with hot specular highlights. Our cross-polarized optical filtration isolates pure diffuse pigment reflection, revealing true deep cadmium reds, cerulean undertones, and gold leaf radiance with zero flare.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xs space-y-1">
                <span className="font-semibold text-stone-900 block">16-Bit ProPhoto RGB</span>
                <span className="text-stone-500">Uncompressed master TIFF with ultra-wide color gamut coverage.</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xs space-y-1">
                <span className="font-semibold text-stone-900 block">Delta-E &lt; 1.2 Fidelity</span>
                <span className="text-stone-500">Certified spectrophotometer verification against original paint swatches.</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xs space-y-1">
                <span className="font-semibold text-stone-900 block">Non-Contact Capture</span>
                <span className="text-stone-500">Zero physical contact with delicate or unvarnished surfaces.</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xs space-y-1">
                <span className="font-semibold text-stone-900 block">Hard Proof Verification</span>
                <span className="text-stone-500">Side-by-side studio inspection of proof strip under 5000K daylight.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive Studio Session Booking Calculator */}
        <div className="bg-[#FAF8F5] border border-[#D6CEBE] p-6 sm:p-8 rounded-sm shadow-xs">
          <div className="max-w-3xl mb-6">
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              Schedule Studio Digitization & Estimate Investment
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Drop off your original artwork at our Fair Oaks Village atelier. Archival capture is completed within 3 business days.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Original Medium
                </label>
                <select
                  value={artworkMedium}
                  onChange={(e) => setArtworkMedium(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none focus:border-[#78350F]"
                >
                  <option value="Oil on Stretched Canvas">Oil on Stretched Canvas / Panel</option>
                  <option value="Watercolor / Gouache on Paper">Watercolor / Gouache on Paper</option>
                  <option value="Acrylic Impasto / Textured">Acrylic Impasto / Textured Relief</option>
                  <option value="Pastel / Charcoal / Fragile">Pastel / Charcoal / Fragile Powder</option>
                  <option value="Historic Document / Vintage Print">Historic Document / Vintage Print</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Artwork Dimensions (Inches)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    min="4"
                    max="96"
                    value={estWidth}
                    onChange={(e) => setEstWidth(Number(e.target.value))}
                    placeholder="W"
                    className="w-full p-2.5 text-xs bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none"
                  />
                  <input
                    type="number"
                    min="4"
                    max="96"
                    value={estHeight}
                    onChange={(e) => setEstHeight(Number(e.target.value))}
                    placeholder="H"
                    className="w-full p-2.5 text-xs bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Artist Contact Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="artist@studio.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none focus:border-[#78350F]"
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeColorMatchProof}
                    onChange={(e) => setIncludeColorMatchProof(e.target.checked)}
                    className="accent-[#78350F] w-4 h-4 cursor-pointer"
                  />
                  <span>Include Hard Proof Paper Strip under 5000K Solux lighting (+ $35)</span>
                </label>
              </div>

              <div className="flex items-center justify-between gap-4 bg-white p-2.5 rounded-xs border border-stone-200">
                <div className="text-xs">
                  <span className="text-stone-400 block font-medium">Estimated Capture Fee:</span>
                  <span className="font-serif text-xl font-semibold text-stone-900 tabular-nums">
                    ${totalCaptureEst}
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C1917] hover:bg-[#78350F] rounded-xs transition-colors cursor-pointer"
                >
                  Book Session
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xs text-xs text-emerald-900 flex items-center justify-between">
              <div>
                <span className="font-semibold block">Digitization Session Requested</span>
                <span>We have reserved a capture intake slot for your {estWidth}×{estHeight}" {artworkMedium}. We will reach out to {clientEmail} to confirm your intake appointment.</span>
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-emerald-800 underline font-medium ml-4 cursor-pointer"
              >
                Book Another
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
