import React from 'react';
import { ATELIER_SPECS } from '../data/printhouseData';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1C1917] text-stone-300 border-t border-stone-800 text-xs py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl font-medium text-white tracking-tight block">
              Fair Oaks Fine Arts Printhouse
            </span>
            <p className="text-stone-400 max-w-sm leading-relaxed text-xs">
              Atelier for museum-grade pigment printing, archival cotton rag papers, conservation hardwood framing, 150MP artwork digitization, and bibliographic estate forensics.
            </p>
            <div className="pt-2 text-stone-400 text-[11px] space-y-1">
              <p><strong className="text-stone-200">Director:</strong> Aleks Vorobets</p>
              <p><strong className="text-stone-200">Atelier Studio:</strong> 10143 Fair Oaks Blvd, Suite B, Fair Oaks, CA 95628</p>
              <p><strong className="text-stone-200">Postal Hub:</strong> 95662, California, United States</p>
            </div>
          </div>

          {/* Studio Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-stone-200 block">
              Atelier Collections
            </span>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('studio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Print & Frame Visualizer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('papers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hahnemühle & Canson Paper Catalog
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('framing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Conservation Hardwood Framing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('digitization')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  150-Megapixel Art Digitization
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('editions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Regional Limited Editions
                </button>
              </li>
            </ul>
          </div>

          {/* Forensics & Provenance Navigation */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-stone-200 block">
              Forensics & Accreditations
            </span>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('forensics')}
                  className="hover:text-white transition-colors cursor-pointer text-[#C5A880] font-medium"
                >
                  Bookshelf Forensics & Valuation Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('coa')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Digital Certificate of Authenticity (COA)
                </button>
              </li>
              <li className="pt-2 text-[11px] text-stone-500 space-y-1">
                <span className="block text-stone-300 font-medium">Certified Archival Standards:</span>
                <span>• ISO 9706 Permanent Paper Longevity</span>
                <span className="block">• 12-Channel Micro-Piezo Mineral Pigments</span>
                <span className="block">• FADGI 4-Star Precision Digitization</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Unboxed Metadata Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-sans">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Fair Oaks Fine Arts Printhouse</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved</span>
            <span aria-hidden="true">·</span>
            <span>Fair Oaks, CA 95628</span>
          </div>
          <div>
            <span>Archival Giclée Atelier · Conservation Joinery · Estate Intelligence</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
