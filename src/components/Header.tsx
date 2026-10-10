import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSamplePack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenSamplePack }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand title, one line wordmark */}
          <button 
            onClick={() => setActiveTab('studio')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#1C1917] group-hover:text-[#78350F] transition-colors whitespace-nowrap shrink-0 block">
              Fair Oaks Fine Arts Printhouse
            </span>
          </button>

          {/* Zone 2: 4–5 nav links, 1–2 word labels, single-line text */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#57534E]">
            <button
              onClick={() => setActiveTab('studio')}
              className={`hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'studio' ? 'text-[#1C1917] border-b-2 border-[#78350F] font-semibold' : ''
              }`}
            >
              Print Studio
            </button>
            <button
              onClick={() => setActiveTab('papers')}
              className={`hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'papers' ? 'text-[#1C1917] border-b-2 border-[#78350F] font-semibold' : ''
              }`}
            >
              Paper Catalog
            </button>
            <button
              onClick={() => setActiveTab('framing')}
              className={`hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'framing' ? 'text-[#1C1917] border-b-2 border-[#78350F] font-semibold' : ''
              }`}
            >
              Conservation Framing
            </button>
            <button
              onClick={() => setActiveTab('digitization')}
              className={`hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'digitization' ? 'text-[#1C1917] border-b-2 border-[#78350F] font-semibold' : ''
              }`}
            >
              Art Digitization
            </button>
            <button
              onClick={() => setActiveTab('editions')}
              className={`hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'editions' ? 'text-[#1C1917] border-b-2 border-[#78350F] font-semibold' : ''
              }`}
            >
              Limited Editions
            </button>
            <button
              onClick={() => setActiveTab('coa')}
              className={`hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'coa' ? 'text-[#1C1917] border-b-2 border-[#78350F] font-semibold' : ''
              }`}
            >
              Certificates & Provenance
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSamplePack}
              className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-stone-700 border border-[#D6CEBE] bg-[#F7F4EE] hover:bg-stone-200 hover:text-stone-900 rounded-sm transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              Order Swatch Pack
            </button>
            <button
              onClick={() => setActiveTab('studio')}
              className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-[#1C1917] hover:bg-[#78350F] rounded-sm transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              Custom Print Builder
            </button>
          </div>

        </div>

        {/* Mobile secondary navigation rail */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-4 text-xs font-medium border-t border-[#E7E2D8] text-[#78716C] scrollbar-none">
          <button
            onClick={() => setActiveTab('studio')}
            className={`whitespace-nowrap shrink-0 ${activeTab === 'studio' ? 'text-[#1C1917] font-semibold' : ''}`}
          >
            Print Studio
          </button>
          <button
            onClick={() => setActiveTab('papers')}
            className={`whitespace-nowrap shrink-0 ${activeTab === 'papers' ? 'text-[#1C1917] font-semibold' : ''}`}
          >
            Paper Catalog
          </button>
          <button
            onClick={() => setActiveTab('framing')}
            className={`whitespace-nowrap shrink-0 ${activeTab === 'framing' ? 'text-[#1C1917] font-semibold' : ''}`}
          >
            Framing
          </button>
          <button
            onClick={() => setActiveTab('digitization')}
            className={`whitespace-nowrap shrink-0 ${activeTab === 'digitization' ? 'text-[#1C1917] font-semibold' : ''}`}
          >
            Digitization
          </button>
          <button
            onClick={() => setActiveTab('editions')}
            className={`whitespace-nowrap shrink-0 ${activeTab === 'editions' ? 'text-[#1C1917] font-semibold' : ''}`}
          >
            Editions
          </button>
          <button
            onClick={() => setActiveTab('coa')}
            className={`whitespace-nowrap shrink-0 ${activeTab === 'coa' ? 'text-[#1C1917] font-semibold' : ''}`}
          >
            Certificates
          </button>
        </div>
      </div>
    </header>
  );
};
