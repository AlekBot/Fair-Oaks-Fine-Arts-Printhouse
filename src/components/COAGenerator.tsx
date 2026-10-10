import React, { useState } from 'react';
import { Award, ShieldCheck, Printer, Check, Search, QrCode } from 'lucide-react';

interface COAGeneratorProps {
  initialTitle?: string;
  initialArtist?: string;
  initialPaper?: string;
}

export const COAGenerator: React.FC<COAGeneratorProps> = ({
  initialTitle = 'Valley Oaks Along the American River',
  initialArtist = 'Elena Vance',
  initialPaper = 'Hahnemühle German Etching 310gsm',
}) => {
  const [artistName, setArtistName] = useState(initialArtist);
  const [artworkTitle, setArtworkTitle] = useState(initialTitle);
  const [paperGrade, setPaperGrade] = useState(initialPaper);
  const [editionNumber, setEditionNumber] = useState('18');
  const [editionTotal, setEditionTotal] = useState('50');
  const [dateOfImpression, setDateOfImpression] = useState('October 2026');
  const [serialCode, setSerialCode] = useState('FOA-2026-94812');
  const [printerSignature, setPrinterSignature] = useState('Aleks Vorobets, Master Printer');

  // Registry lookup demo
  const [searchCode, setSearchCode] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    setSearchResult(`Verified Official Provenance: Serial ${searchCode.toUpperCase()} corresponds to registered Fair Oaks Fine Arts Printhouse impression on 100% Cotton Rag.`);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <section id="certificates" className="py-12 lg:py-16 bg-[#F7F4EE] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-sans text-[#78350F] font-semibold">
            Provenance & Authenticity Archive
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1C1917]">
            Certificate of Authenticity (COA)
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Every fine art impression printed at Fair Oaks Fine Arts Printhouse receives a permanent archival registry record and serialized Certificate of Authenticity detailing paper chemistry, pigment formula, and edition numbering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT 7 COLUMNS: High-Fidelity Certificate Sheet Preview */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] border-2 border-[#C5A880] p-8 sm:p-12 rounded-sm shadow-xl relative overflow-hidden text-center print:border-none print:shadow-none print:p-0">
              
              {/* Inner Decorative Hairline Border */}
              <div className="border border-[#D6CEBE] p-6 sm:p-8 relative">
                
                {/* Header Lockup */}
                <div className="space-y-1 mb-8">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-stone-500 font-semibold block">
                    Atelier de Reproduction d'Art · Fair Oaks, California
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 tracking-wide uppercase">
                    Certificate of Authenticity
                  </h3>
                  <div className="w-16 h-px bg-[#78350F] mx-auto my-3" />
                  <span className="text-xs font-serif italic text-stone-600 block">
                    Archival Giclée Pigment Impression
                  </span>
                </div>

                {/* Body Curatorial Certification Statement */}
                <div className="space-y-6 max-w-lg mx-auto text-xs sm:text-sm text-stone-700 font-serif leading-relaxed">
                  <p>
                    This document certifies that the artwork entitled{' '}
                    <strong className="text-stone-950 font-semibold italic text-base block my-1">
                      "{artworkTitle}"
                    </strong>
                    created by the artist{' '}
                    <strong className="text-stone-950 font-semibold text-base block my-1">
                      {artistName}
                    </strong>
                    is an authentic, museum-grade limited impression produced under the supervision of the artist and Fair Oaks Fine Arts Printhouse.
                  </p>

                  {/* Technical Provenance Table */}
                  <div className="border-y border-[#D6CEBE] py-4 text-xs font-sans text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Substrate Paper:</span>
                      <span className="font-semibold text-stone-900">{paperGrade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Colorant Technology:</span>
                      <span className="font-semibold text-stone-900">12-Channel Micro-Piezo Mineral Pigments</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Edition Registry:</span>
                      <span className="font-mono font-semibold text-stone-900 tabular-nums">
                        {editionNumber} of {editionTotal}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Atelier Serial Code:</span>
                      <span className="font-mono font-semibold text-[#78350F] tabular-nums">
                        {serialCode}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Date of Impression:</span>
                      <span className="text-stone-900">{dateOfImpression}</span>
                    </div>
                  </div>

                  {/* Signatures & Blind Chop Seal */}
                  <div className="pt-6 grid grid-cols-2 gap-8 items-end text-xs font-sans">
                    <div>
                      <div className="border-b border-stone-400 pb-1 mb-1 font-serif italic text-sm text-stone-900">
                        {artistName}
                      </div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                        Artist Signature
                      </span>
                    </div>

                    <div>
                      <div className="border-b border-stone-400 pb-1 mb-1 font-serif italic text-sm text-stone-900">
                        {printerSignature}
                      </div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                        Master Printer / Director
                      </span>
                    </div>
                  </div>

                  {/* Embossed Seal Watermark */}
                  <div className="pt-6 flex items-center justify-center gap-2 text-[10px] text-stone-400 uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-[#78350F]" />
                    <span>Fair Oaks Fine Arts Printhouse · Permanent Registry</span>
                  </div>

                </div>

              </div>

            </div>

            {/* Print Affordance */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handlePrintCertificate}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-800 border border-[#D6CEBE] bg-white hover:bg-stone-100 rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5 text-stone-700" />
                <span>Print Certificate Document</span>
              </button>
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: Certificate Generator Controls & Verification Query */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Form Controls */}
            <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-5 rounded-sm space-y-4">
              <h3 className="font-serif text-xl font-medium text-stone-900">
                Configure Certificate Metadata
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Artwork Title</label>
                  <input
                    type="text"
                    value={artworkTitle}
                    onChange={(e) => setArtworkTitle(e.target.value)}
                    className="w-full p-2 bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Artist Full Name</label>
                  <input
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    className="w-full p-2 bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Archival Substrate</label>
                  <input
                    type="text"
                    value={paperGrade}
                    onChange={(e) => setPaperGrade(e.target.value)}
                    className="w-full p-2 bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Edition Number</label>
                    <input
                      type="text"
                      value={editionNumber}
                      onChange={(e) => setEditionNumber(e.target.value)}
                      className="w-full p-2 bg-white border border-[#D6CEBE] rounded-xs text-stone-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Total Edition Run</label>
                    <input
                      type="text"
                      value={editionTotal}
                      onChange={(e) => setEditionTotal(e.target.value)}
                      className="w-full p-2 bg-white border border-[#D6CEBE] rounded-xs text-stone-900 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Serial Number</label>
                    <input
                      type="text"
                      value={serialCode}
                      onChange={(e) => setSerialCode(e.target.value)}
                      className="w-full p-2 bg-white border border-[#D6CEBE] rounded-xs text-[#78350F] font-mono font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Impression Date</label>
                    <input
                      type="text"
                      value={dateOfImpression}
                      onChange={(e) => setDateOfImpression(e.target.value)}
                      className="w-full p-2 bg-white border border-[#D6CEBE] rounded-xs text-stone-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Registry Lookup Box */}
            <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-5 rounded-sm space-y-3">
              <h3 className="font-serif text-lg font-medium text-stone-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-[#78350F]" />
                <span>Verify Registered Impression</span>
              </h3>
              <p className="text-xs text-stone-500">
                Collectors and galleries can verify serial codes against our Fair Oaks atelier ledger.
              </p>

              <form onSubmit={handleVerify} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. FOA-2026-94812"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="flex-1 p-2 text-xs bg-white border border-[#D6CEBE] rounded-xs font-mono uppercase text-stone-900 focus:outline-none focus:border-[#78350F]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C1917] hover:bg-[#78350F] rounded-xs transition-colors cursor-pointer"
                >
                  Verify
                </button>
              </form>

              {searchResult && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xs text-xs text-emerald-900 flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{searchResult}</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
