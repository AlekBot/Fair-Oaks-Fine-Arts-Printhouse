import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PrintBuilder } from './components/PrintBuilder';
import { PaperLibrary } from './components/PaperLibrary';
import { FramingStudio } from './components/FramingStudio';
import { DigitizationServices } from './components/DigitizationServices';
import { LimitedEditions } from './components/LimitedEditions';
import { COAGenerator } from './components/COAGenerator';
import { ForensicsDashboard } from './components/ForensicsDashboard';
import { SamplePackModal } from './components/SamplePackModal';
import { Footer } from './components/Footer';
import { Artwork } from './types';
import { Check } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('studio');
  const [isSamplePackOpen, setIsSamplePackOpen] = useState(false);

  // COA modal or prefill state
  const [coaPrefill, setCoaPrefill] = useState({
    title: 'Valley Oaks Along the American River',
    artist: 'Elena Vance',
    paper: 'Hahnemühle German Etching 310gsm',
  });

  // Recent order notice
  const [recentOrder, setRecentOrder] = useState<{
    orderId: string;
    total: number;
    title: string;
  } | null>(null);

  const handleOpenCOA = (title: string, artist: string, paper: string) => {
    setCoaPrefill({ title, artist, paper });
    setActiveTab('coa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEdition = (art: Artwork) => {
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (details: { orderId: string; total: number; title: string }) => {
    setRecentOrder(details);
    setTimeout(() => {
      setRecentOrder(null);
    }, 8000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] selection:bg-[#78350F]/20 selection:text-[#1C1917]">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSamplePack={() => setIsSamplePackOpen(true)}
      />

      {/* Persistent Order Toast */}
      {recentOrder && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white p-4 rounded-sm shadow-2xl border border-stone-700 max-w-sm flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <span className="font-semibold block text-stone-100">Order Record Created</span>
            <span className="text-stone-300 block">
              Reference #{recentOrder.orderId}: {recentOrder.title} (${recentOrder.total.toFixed(2)})
            </span>
            <span className="text-stone-400 text-[10px] block mt-1">
              Atelier proof verification packet dispatched.
            </span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Editorial Institutional Hero - shown in Studio and Overview */}
        {(activeTab === 'studio' || activeTab === 'overview') && (
          <Hero
            onStartCustomPrint={() => {
              setActiveTab('studio');
              const el = document.getElementById('print-studio');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onExplorePapers={() => {
              setActiveTab('papers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Dynamic Section Routing */}
        {activeTab === 'studio' && (
          <>
            <PrintBuilder
              onOrderSuccess={handleOrderSuccess}
              onOpenCOA={handleOpenCOA}
            />
            {/* Quick Teaser for Bookshelf Forensics */}
            <div className="bg-[#EFECE4] border-t border-[#E7E2D8] py-8 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-semibold text-stone-900 block font-serif text-base">
                    Bookshelf Forensics & Estate Art Appraisals
                  </span>
                  <span className="text-stone-600">
                    Valuing 225 titles & rare artist folios across Northern California community sales (Zip 95662).
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('forensics');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C1917] hover:bg-[#78350F] rounded-xs cursor-pointer whitespace-nowrap shrink-0"
                >
                  Explore Forensics Engine
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'papers' && (
          <PaperLibrary
            onSelectPaper={(paperId) => {
              setActiveTab('studio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'framing' && (
          <FramingStudio
            onStartFraming={() => {
              setActiveTab('studio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'digitization' && (
          <DigitizationServices />
        )}

        {activeTab === 'editions' && (
          <LimitedEditions
            onSelectEditionForCustomizer={handleSelectEdition}
            onOpenCOA={handleOpenCOA}
          />
        )}

        {activeTab === 'coa' && (
          <COAGenerator
            initialTitle={coaPrefill.title}
            initialArtist={coaPrefill.artist}
            initialPaper={coaPrefill.paper}
          />
        )}

        {activeTab === 'forensics' && (
          <ForensicsDashboard
            onSelectItemForCustomizer={(title, author) => {
              setActiveTab('studio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Swatch Pack Modal */}
      <SamplePackModal
        isOpen={isSamplePackOpen}
        onClose={() => setIsSamplePackOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default App;
