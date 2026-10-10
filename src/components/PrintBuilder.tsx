import React, { useState, useId } from 'react';
import { PAPERS, FRAMES, MATS, GLASS_OPTIONS, SAMPLE_ARTWORKS } from '../data/printhouseData';
import { CustomPrintConfig, PriceBreakdown } from '../types';
import { Upload, Check, RefreshCw, ZoomIn, FileText, ShieldCheck, Ruler, Sparkles } from 'lucide-react';

interface PrintBuilderProps {
  onOrderSuccess: (details: { orderId: string; total: number; title: string }) => void;
  onOpenCOA: (artworkTitle: string, artistName: string, paperName: string) => void;
}

export const PrintBuilder: React.FC<PrintBuilderProps> = ({ onOrderSuccess, onOpenCOA }) => {
  const [selectedArtwork, setSelectedArtwork] = useState(SAMPLE_ARTWORKS[0]);
  const [customImageSrc, setCustomImageSrc] = useState<string | null>(null);
  const [artworkTitle, setArtworkTitle] = useState('Valley Oaks Along the American River');
  const [artistName, setArtistName] = useState('Elena Vance');

  // Print geometry
  const [widthInches, setWidthInches] = useState(24);
  const [heightInches, setHeightInches] = useState(18);
  const [selectedPaperId, setSelectedPaperId] = useState(PAPERS[0].id);

  // Framing & Matting
  const [selectedFrameId, setSelectedFrameId] = useState<string>('natural-white-oak'); // 'none' or frameId
  const [selectedMatId, setSelectedMatId] = useState<string>('mat-8ply-warm-white'); // 'none' or matId
  const [matWidthInches, setMatWidthInches] = useState<number>(2.5);
  const [selectedGlassId, setSelectedGlassId] = useState(GLASS_OPTIONS[0].id);

  // Extras
  const [deckleEdge, setDeckleEdge] = useState(true);
  const [includeCertificate, setIncludeCertificate] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [quoteConfirmed, setQuoteConfirmed] = useState(false);
  const [zoomPreview, setZoomPreview] = useState(false);

  const fileInputId = useId();

  // Current selected objects
  const activePaper = PAPERS.find((p) => p.id === selectedPaperId) || PAPERS[0];
  const activeFrame = selectedFrameId !== 'none' ? FRAMES.find((f) => f.id === selectedFrameId) : null;
  const activeMat = selectedMatId !== 'none' ? MATS.find((m) => m.id === selectedMatId) : null;
  const activeGlass = GLASS_OPTIONS.find((g) => g.id === selectedGlassId) || GLASS_OPTIONS[0];

  const currentImage = customImageSrc || selectedArtwork.imageSrc;

  // Handle image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImageSrc(event.target.result as string);
          setArtworkTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
          setArtistName('Custom Client Work');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Pricing calculations
  const calculatePricing = (): PriceBreakdown => {
    const printSqInches = widthInches * heightInches;
    const paperCost = Math.round(printSqInches * activePaper.pricePerSqInch * 100) / 100;

    let matCost = 0;
    if (activeMat) {
      const outerWidth = widthInches + matWidthInches * 2;
      const outerHeight = heightInches + matWidthInches * 2;
      const outerSqInches = outerWidth * outerHeight;
      const matArea = outerSqInches - printSqInches;
      matCost = Math.round(matArea * activeMat.pricePerSqInch * 100) / 100;
    }

    let frameCost = 0;
    let glassCost = 0;
    if (activeFrame) {
      const frameOuterWidth = widthInches + (activeMat ? matWidthInches * 2 : 0);
      const frameOuterHeight = heightInches + (activeMat ? matWidthInches * 2 : 0);
      const perimeterLinearInches = (frameOuterWidth + frameOuterHeight) * 2;
      frameCost = Math.round(perimeterLinearInches * activeFrame.pricePerLinearInch * 100) / 100;

      const glassSqInches = frameOuterWidth * frameOuterHeight;
      const baseGlassRate = 0.06;
      glassCost = Math.round(glassSqInches * baseGlassRate * activeGlass.priceMultiplier * 100) / 100;
    }

    let finishingCost = 0;
    if (deckleEdge) finishingCost += 24;
    if (includeCertificate) finishingCost += 16;
    if (activeFrame) finishingCost += 35; // Museum framing fitting, hanging hardware & dust cover

    const subtotal = (paperCost + matCost + frameCost + glassCost + finishingCost) * quantity;
    const total = Math.round(subtotal * 100) / 100;

    return {
      printSqInches,
      paperCost,
      matCost,
      frameCost,
      glassCost,
      finishingCost,
      subtotal,
      total,
    };
  };

  const pricing = calculatePricing();

  const handleStandardSize = (w: number, h: number) => {
    setWidthInches(w);
    setHeightInches(h);
  };

  const handleSelectSampleArt = (art: typeof SAMPLE_ARTWORKS[0]) => {
    setSelectedArtwork(art);
    setCustomImageSrc(null);
    setArtworkTitle(art.title);
    setArtistName(art.artist);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `FOA-${Math.floor(100000 + Math.random() * 900000)}`;
      setIsSubmitting(false);
      setQuoteConfirmed(true);
      onOrderSuccess({
        orderId,
        total: pricing.total,
        title: artworkTitle,
      });
    }, 600);
  };

  return (
    <section id="print-studio" className="py-12 lg:py-16 bg-[#FBF9F5] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs uppercase tracking-widest font-sans text-[#78350F] font-semibold">
            Interactive Atelier Studio
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1C1917]">
            Archival Print & Frame Visualizer
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Configure paper grade, dimension, conservation matting, and solid hardwood framing with real-time visual proofing and instant archival cost estimates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT 7 COLUMNS: Interactive Live Visualizer Stage */}
          <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24">
            
            {/* Visualizer Frame Box */}
            <div className="bg-[#EFECE4] border border-[#D6CEBE] rounded-sm p-6 sm:p-10 flex flex-col items-center justify-center min-h-[460px] sm:min-h-[540px] shadow-inner relative overflow-hidden">
              
              {/* Wall Backdrop Texture */}
              <div className="absolute inset-0 bg-radial from-transparent to-stone-300/40 pointer-events-none" />

              {/* The Framed & Matted Artwork Element */}
              <div
                className={`relative transition-all duration-300 shadow-2xl flex items-center justify-center max-w-full ${
                  activeFrame ? 'border' : ''
                }`}
                style={{
                  backgroundColor: activeFrame ? activeFrame.colorHex : 'transparent',
                  padding: activeFrame ? `${Math.max(14, activeFrame.borderWidthInches * 18)}px` : '0px',
                  boxShadow: activeFrame
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0,0,0,0.1)'
                    : '0 20px 30px -10px rgba(0,0,0,0.15)',
                }}
              >
                {/* Frame Inner Lip Highlight */}
                {activeFrame && (
                  <div className="absolute inset-0 pointer-events-none border border-black/20" />
                )}

                {/* Mat Container */}
                <div
                  className="transition-all duration-300 flex items-center justify-center relative"
                  style={{
                    backgroundColor: activeMat ? activeMat.colorHex : 'transparent',
                    padding: activeMat ? `${Math.max(12, matWidthInches * 16)}px` : '0px',
                    boxShadow: activeMat ? 'inset 0 2px 4px rgba(0,0,0,0.12)' : 'none',
                  }}
                >
                  {/* Beveled 45-degree Inner Cut line of Mat */}
                  {activeMat && (
                    <div className="absolute inset-0 pointer-events-none border border-black/15 shadow-inner" />
                  )}

                  {/* Artwork Container */}
                  <div
                    className={`relative overflow-hidden transition-all duration-300 ${
                      deckleEdge
                        ? 'p-1.5 bg-[#FAF7F0] shadow-md border border-stone-300/60'
                        : 'border border-stone-200'
                    }`}
                    style={{
                      maxHeight: '380px',
                    }}
                  >
                    {/* Glass Reflection Simulation for Museum Glass vs Conservation */}
                    {activeFrame && (
                      <div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                          background:
                            activeGlass.id === 'tru-vue-museum'
                              ? 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)'
                              : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
                        }}
                      />
                    )}

                    {/* Paper Texture Overlay */}
                    <div className="relative group">
                      <img
                        src={currentImage}
                        alt={artworkTitle}
                        className={`w-auto h-auto max-h-[340px] sm:max-h-[380px] object-contain transition-all duration-500 ${
                          zoomPreview ? 'scale-125' : 'scale-100'
                        }`}
                        referrerPolicy="no-referrer"
                      />

                      {/* Tactile Deckle Edge styling preview */}
                      {deckleEdge && (
                        <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-stone-300/40" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Viewport Control Bar */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-stone-600 bg-white/90 backdrop-blur-xs py-1.5 px-3 rounded-xs border border-stone-200 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900">{artworkTitle}</span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span>{widthInches}" × {heightInches}"</span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="text-[#78350F] font-medium">{activePaper.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomPreview(!zoomPreview)}
                  className="flex items-center gap-1 hover:text-stone-950 transition-colors cursor-pointer text-stone-500"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{zoomPreview ? 'Reset View' : 'Inspect Details'}</span>
                </button>
              </div>

            </div>

            {/* Artwork Source Selection Strip */}
            <div className="bg-[#F7F4EE] border border-[#E7E2D8] p-4 rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                  Select Artwork or Upload Your File
                </span>
                <span className="text-xs text-stone-500">TIFF, JPEG, PNG up to 100MB</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {/* Upload Button */}
                <label
                  htmlFor={fileInputId}
                  className="sm:col-span-1 border border-dashed border-[#B3A895] hover:border-[#78350F] hover:bg-stone-100 p-2.5 rounded-sm flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
                >
                  <Upload className="w-5 h-5 text-[#78350F] mb-1" />
                  <span className="text-xs font-semibold text-stone-900">Upload Artwork</span>
                  <span className="text-[10px] text-stone-500">Custom print</span>
                  <input
                    id={fileInputId}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                </label>

                {/* Curated Sample Artworks */}
                {SAMPLE_ARTWORKS.map((art) => (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => handleSelectSampleArt(art)}
                    className={`p-2 rounded-sm border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      selectedArtwork.id === art.id && !customImageSrc
                        ? 'border-[#78350F] bg-white shadow-xs'
                        : 'border-[#E7E2D8] bg-[#FBF9F5] hover:bg-white'
                    }`}
                  >
                    <img
                      src={art.imageSrc}
                      alt={art.title}
                      className="w-10 h-10 object-cover rounded-xs border border-stone-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-stone-900 truncate">{art.title}</p>
                      <p className="text-[11px] text-stone-500 truncate">{art.artist}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Curatorial Specifications Preview */}
            <div className="border border-[#E7E2D8] bg-[#FAF8F5] p-4 rounded-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-stone-400 block font-medium">Substrate Base</span>
                <span className="text-stone-900 font-semibold mt-0.5 block">{activePaper.composition}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-medium">Surface Weight</span>
                <span className="text-stone-900 font-semibold mt-0.5 block tabular-nums">{activePaper.weightGsm} GSM</span>
              </div>
              <div>
                <span className="text-stone-400 block font-medium">Optics / DMax</span>
                <span className="text-stone-900 font-semibold mt-0.5 block tabular-nums">{activePaper.dmax} DMax</span>
              </div>
              <div>
                <span className="text-stone-400 block font-medium">Preservation Class</span>
                <span className="text-[#78350F] font-semibold mt-0.5 block">ISO 9706 Permanent</span>
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLUMNS: Studio Configuration Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Sizing & Geometry Controls */}
            <div className="border border-[#E7E2D8] bg-[#F7F4EE] p-5 rounded-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-medium text-stone-900 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#78350F]" />
                  <span>01. Print Dimensions & Aspect</span>
                </h3>
                <span className="text-xs font-mono tabular-nums text-stone-600 font-medium">
                  {widthInches} × {heightInches} in ({Math.round(widthInches * 2.54)} × {Math.round(heightInches * 2.54)} cm)
                </span>
              </div>

              {/* Standard Size Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { w: 8, h: 10, label: '8 × 10' },
                  { w: 11, h: 14, label: '11 × 14' },
                  { w: 16, h: 20, label: '16 × 20' },
                  { w: 18, h: 24, label: '18 × 24' },
                  { w: 24, h: 36, label: '24 × 36' },
                  { w: 30, h: 40, label: '30 × 40' },
                ].map((sz) => (
                  <button
                    key={sz.label}
                    type="button"
                    onClick={() => handleStandardSize(sz.w, sz.h)}
                    className={`py-1.5 px-2 text-xs font-mono tabular-nums rounded-xs border text-center transition-colors cursor-pointer ${
                      widthInches === sz.w && heightInches === sz.h
                        ? 'border-[#78350F] bg-[#1C1917] text-white font-medium'
                        : 'border-[#D6CEBE] bg-white text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {sz.label}
                  </button>
                ))}
              </div>

              {/* Custom Sliders */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs text-stone-600 mb-1">
                    <span>Width</span>
                    <span className="font-mono tabular-nums">{widthInches} in</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="60"
                    step="1"
                    value={widthInches}
                    onChange={(e) => setWidthInches(Number(e.target.value))}
                    className="w-full accent-[#78350F] cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-stone-600 mb-1">
                    <span>Height</span>
                    <span className="font-mono tabular-nums">{heightInches} in</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="60"
                    step="1"
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="w-full accent-[#78350F] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* 2. Paper Grade Selection */}
            <div className="border border-[#E7E2D8] bg-[#F7F4EE] p-5 rounded-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-medium text-stone-900">
                  02. Fine Art Paper Grade
                </h3>
                <span className="text-xs text-[#78350F] font-medium">100% Cotton / α-Cellulose</span>
              </div>

              <div className="space-y-2">
                {PAPERS.map((paper) => (
                  <button
                    key={paper.id}
                    type="button"
                    onClick={() => setSelectedPaperId(paper.id)}
                    className={`w-full p-3 rounded-sm border text-left transition-all cursor-pointer ${
                      selectedPaperId === paper.id
                        ? 'border-[#78350F] bg-white shadow-xs'
                        : 'border-[#E7E2D8] bg-[#FAF8F5] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full border border-stone-300 flex items-center justify-center ${selectedPaperId === paper.id ? 'bg-[#78350F]' : 'bg-transparent'}`}>
                          {selectedPaperId === paper.id && <Check className="w-2 h-2 text-white" />}
                        </span>
                        <span className="text-xs font-semibold text-stone-900">{paper.name}</span>
                      </div>
                      <span className="text-xs font-mono tabular-nums text-stone-600">
                        {paper.weightGsm} GSM
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1 pl-5 line-clamp-1">{paper.surface}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Conservation Framing Moulding */}
            <div className="border border-[#E7E2D8] bg-[#F7F4EE] p-5 rounded-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-medium text-stone-900">
                  03. Hardwood Gallery Moulding
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedFrameId(selectedFrameId === 'none' ? 'natural-white-oak' : 'none')}
                  className="text-xs text-stone-500 hover:text-stone-900 underline cursor-pointer"
                >
                  {selectedFrameId === 'none' ? 'Add Custom Frame' : 'Print Only (No Frame)'}
                </button>
              </div>

              {selectedFrameId !== 'none' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FRAMES.map((frame) => (
                    <button
                      key={frame.id}
                      type="button"
                      onClick={() => setSelectedFrameId(frame.id)}
                      className={`p-2.5 rounded-sm border text-left transition-all cursor-pointer ${
                        selectedFrameId === frame.id
                          ? 'border-[#78350F] bg-white ring-1 ring-[#78350F]'
                          : 'border-[#E7E2D8] bg-[#FAF8F5] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="w-4 h-4 rounded-xs border border-black/20 shrink-0"
                          style={{ backgroundColor: frame.colorHex }}
                        />
                        <span className="text-xs font-semibold text-stone-900 truncate">{frame.name}</span>
                      </div>
                      <span className="text-[10px] text-stone-500 block truncate">{frame.woodType}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-white rounded-xs text-xs text-stone-500 border border-stone-200">
                  Unframed archival print shipped flat in acid-free glassine with rigid museum conservation boards.
                </div>
              )}
            </div>

            {/* 4. Museum Mat & Glazing Options (Active if framed) */}
            {selectedFrameId !== 'none' && (
              <div className="border border-[#E7E2D8] bg-[#F7F4EE] p-5 rounded-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-medium text-stone-900">
                    04. Matboard & Conservation Glazing
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSelectedMatId(selectedMatId === 'none' ? 'mat-8ply-warm-white' : 'none')}
                    className="text-xs text-stone-500 hover:text-stone-900 underline cursor-pointer"
                  >
                    {selectedMatId === 'none' ? 'Add Mat' : 'Full-Bleed (No Mat)'}
                  </button>
                </div>

                {selectedMatId !== 'none' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {MATS.map((mat) => (
                        <button
                          key={mat.id}
                          type="button"
                          onClick={() => setSelectedMatId(mat.id)}
                          className={`p-2 rounded-sm border text-left text-xs transition-all cursor-pointer ${
                            selectedMatId === mat.id
                              ? 'border-[#78350F] bg-white ring-1 ring-[#78350F]'
                              : 'border-[#E7E2D8] bg-[#FAF8F5] hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-stone-300"
                              style={{ backgroundColor: mat.colorHex }}
                            />
                            <span className="font-semibold text-stone-900 truncate">{mat.name.split(' (')[0]}</span>
                          </div>
                          <span className="text-[10px] text-stone-500">{mat.ply}-Ply Solid Rag</span>
                        </button>
                      ))}
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-stone-600 mb-1">
                        <span>Mat Border Width</span>
                        <span className="font-mono tabular-nums">{matWidthInches} in</span>
                      </div>
                      <input
                        type="range"
                        min="1.5"
                        max="4.5"
                        step="0.25"
                        value={matWidthInches}
                        onChange={(e) => setMatWidthInches(Number(e.target.value))}
                        className="w-full accent-[#78350F] cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* Glazing Selection */}
                <div className="pt-2 border-t border-[#E7E2D8]">
                  <span className="text-xs font-semibold text-stone-800 block mb-2">Conservation Glazing</span>
                  <div className="space-y-1.5">
                    {GLASS_OPTIONS.map((glass) => (
                      <button
                        key={glass.id}
                        type="button"
                        onClick={() => setSelectedGlassId(glass.id)}
                        className={`w-full p-2.5 rounded-xs border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                          selectedGlassId === glass.id
                            ? 'border-[#78350F] bg-white font-medium'
                            : 'border-[#E7E2D8] bg-[#FAF8F5] text-stone-600 hover:bg-white'
                        }`}
                      >
                        <div>
                          <span className="font-semibold text-stone-900">{glass.name}</span>
                          <span className="text-stone-500 block text-[11px]">{glass.uvProtection} · {glass.reflection}</span>
                        </div>
                        {glass.id === 'tru-vue-museum' && (
                          <span className="text-[10px] uppercase tracking-wider text-[#78350F] font-semibold bg-amber-50 px-1.5 py-0.5 rounded-xs border border-amber-200">
                            Recommended
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. Archival Add-ons & Quantity */}
            <div className="border border-[#E7E2D8] bg-[#F7F4EE] p-5 rounded-sm space-y-3">
              <h3 className="font-serif text-lg font-medium text-stone-900">
                05. Atelier Finishes & Provenance
              </h3>

              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-2.5 bg-white rounded-xs border border-[#E7E2D8] cursor-pointer hover:border-stone-400">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={deckleEdge}
                      onChange={(e) => setDeckleEdge(e.target.checked)}
                      className="accent-[#78350F] w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="font-semibold text-stone-900">Hand-Torn Deckled Edges</span>
                      <span className="block text-[11px] text-stone-500">Artisan feathered edges showing natural cotton rag fibers</span>
                    </div>
                  </div>
                  <span className="font-mono tabular-nums text-stone-700 font-medium">+$24</span>
                </label>

                <label className="flex items-center justify-between p-2.5 bg-white rounded-xs border border-[#E7E2D8] cursor-pointer hover:border-stone-400">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeCertificate}
                      onChange={(e) => setIncludeCertificate(e.target.checked)}
                      className="accent-[#78350F] w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="font-semibold text-stone-900">Embossed Certificate of Authenticity</span>
                      <span className="block text-[11px] text-stone-500">Numbered atelier chop mark with permanent provenance entry</span>
                    </div>
                  </div>
                  <span className="font-mono tabular-nums text-stone-700 font-medium">+$16</span>
                </label>
              </div>

              {/* Quantity */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-800">Print Quantity:</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-xs border border-stone-300 bg-white hover:bg-stone-100 flex items-center justify-center font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono text-sm font-semibold tabular-nums px-2">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-xs border border-stone-300 bg-white hover:bg-stone-100 flex items-center justify-center font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price Summary & Primary Order Action */}
            <div className="border border-[#D6CEBE] bg-[#1C1917] text-white p-6 rounded-sm shadow-md space-y-4">
              <div className="flex items-baseline justify-between border-b border-stone-700 pb-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 block">Total Archival Investment</span>
                  <span className="text-xs text-stone-400">Includes archival packaging & cotton gloves</span>
                </div>
                <div className="text-right">
                  <span className="font-serif text-3xl font-medium tabular-nums text-white">
                    ${pricing.total.toFixed(2)}
                  </span>
                  {quantity > 1 && (
                    <span className="block text-xs text-stone-400 tabular-nums">
                      ${(pricing.total / quantity).toFixed(2)} each
                    </span>
                  )}
                </div>
              </div>

              {/* Itemized Line Items */}
              <div className="space-y-1.5 text-xs text-stone-300 font-mono tabular-nums">
                <div className="flex justify-between">
                  <span>Fine Art Print ({pricing.printSqInches} sq. in.):</span>
                  <span>${pricing.paperCost.toFixed(2)}</span>
                </div>
                {activeMat && (
                  <div className="flex justify-between">
                    <span>{activeMat.name.split(' (')[0]}:</span>
                    <span>${pricing.matCost.toFixed(2)}</span>
                  </div>
                )}
                {activeFrame && (
                  <div className="flex justify-between">
                    <span>{activeFrame.name} Framing:</span>
                    <span>${pricing.frameCost.toFixed(2)}</span>
                  </div>
                )}
                {activeFrame && (
                  <div className="flex justify-between">
                    <span>{activeGlass.name}:</span>
                    <span>${pricing.glassCost.toFixed(2)}</span>
                  </div>
                )}
                {pricing.finishingCost > 0 && (
                  <div className="flex justify-between">
                    <span>Archival Finishing & Provenance:</span>
                    <span>${pricing.finishingCost.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(true)}
                  className="flex-1 py-3 px-4 text-xs font-semibold tracking-wider uppercase text-[#1C1917] bg-[#F7F4EE] hover:bg-white rounded-xs transition-colors cursor-pointer text-center shadow-xs"
                >
                  Request Archival Proof & Quote
                </button>
                {includeCertificate && (
                  <button
                    type="button"
                    onClick={() => onOpenCOA(artworkTitle, artistName, activePaper.name)}
                    className="py-3 px-4 text-xs font-semibold tracking-wider uppercase text-white border border-stone-600 hover:border-stone-400 rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Preview COA</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Quote / Order Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#FBF9F5] border border-[#D6CEBE] rounded-sm max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            {!quoteConfirmed ? (
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="border-b border-[#E7E2D8] pb-3">
                  <span className="text-xs uppercase tracking-wider text-[#78350F] font-semibold">Atelier Submission</span>
                  <h3 className="font-serif text-2xl font-medium text-stone-900 mt-1">
                    Request Proof & Custom Print
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Our master printmaker will verify file resolution, ICC paper profiling, and send an archival invoice within 24 hours.
                  </p>
                </div>

                <div className="bg-[#F7F4EE] p-3 rounded-xs text-xs space-y-1 text-stone-700">
                  <div className="font-medium text-stone-900">{artworkTitle} by {artistName}</div>
                  <div>Dimension: {widthInches} × {heightInches} in · Substrate: {activePaper.name}</div>
                  <div>Finish: {activeFrame ? `${activeFrame.name} with ${activeGlass.name}` : 'Print Only'}</div>
                  <div className="font-serif text-base font-semibold text-stone-950 pt-1">
                    Total: ${pricing.total.toFixed(2)} ({quantity} {quantity === 1 ? 'edition' : 'editions'})
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Artist / Collector Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. collector@artgallery.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none focus:border-[#78350F]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      placeholder="(916) 555-0192"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none focus:border-[#78350F]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Curatorial Instructions / Edition Numbering</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Please leave 2-inch white border for artist signature and pencil numbering 1/50."
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none focus:border-[#78350F]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7E2D8]">
                  <button
                    type="button"
                    onClick={() => setShowQuoteModal(false)}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C1917] hover:bg-[#78350F] rounded-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Transmitting Request...' : 'Transmit Print Order'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-stone-900">
                  Atelier Proof Requested
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                  Thank you. Your order record has been created with reference <span className="font-mono font-semibold text-stone-900">FOA-{Math.floor(100000 + Math.random() * 900000)}</span>. Master printmaker Aleks Vorobets will inspect your file and issue color proof guidance.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowQuoteModal(false);
                      setQuoteConfirmed(false);
                    }}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C1917] hover:bg-[#78350F] rounded-xs transition-colors cursor-pointer"
                  >
                    Return to Atelier
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
