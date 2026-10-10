import React, { useState } from 'react';
import { PAPERS } from '../data/printhouseData';
import { X, Check, Package, Sparkles } from 'lucide-react';

interface SamplePackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SamplePackModal: React.FC<SamplePackModalProps> = ({ isOpen, onClose }) => {
  const [artistName, setArtistName] = useState('');
  const [studioEmail, setStudioEmail] = useState('');
  const [address, setAddress] = useState('');
  const [discipline, setDiscipline] = useState('Oil / Acrylic Painter');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-[#FBF9F5] border border-[#D6CEBE] rounded-sm max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-[#E7E2D8] pb-3">
              <span className="text-xs uppercase tracking-wider text-[#78350F] font-semibold">
                Artist Tactile Kit
              </span>
              <h3 className="font-serif text-2xl font-medium text-stone-900 mt-1">
                Order 6-Paper Archival Swatch Pack
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Experience paper tooth, fiber grain, and optical density firsthand. Shipped complimentary to practicing artists and fine art photographers.
              </p>
            </div>

            {/* Swatch List included */}
            <div className="bg-[#F7F4EE] p-3 rounded-xs text-xs space-y-1.5 border border-[#E7E2D8]">
              <span className="font-semibold text-stone-800 block">Included in Swatch Folio:</span>
              <ul className="text-stone-600 space-y-1 list-disc list-inside">
                {PAPERS.map((p) => (
                  <li key={p.id}>
                    <span className="font-medium text-stone-900">{p.name}</span> ({p.weightGsm} GSM)
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Artist / Studio Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Rossi Studio"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none focus:border-[#78350F]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="artist@mariarossi.com"
                  value={studioEmail}
                  onChange={(e) => setStudioEmail(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none focus:border-[#78350F]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Mailing Address (US) *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Street address, City, State, ZIP code"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none focus:border-[#78350F]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Primary Artistic Discipline</label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none"
                >
                  <option value="Oil / Acrylic Painter">Oil / Acrylic Painter</option>
                  <option value="Watercolorist">Watercolorist / Ink Wash Artist</option>
                  <option value="Fine Art Photographer">Fine Art Photographer</option>
                  <option value="Printmaker / Relief Artist">Printmaker / Relief Artist</option>
                  <option value="Gallery Curator / Art Consultant">Gallery Curator / Art Consultant</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7E2D8]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C1917] hover:bg-[#78350F] rounded-xs transition-colors cursor-pointer shadow-xs"
              >
                Dispatch Swatch Pack
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-amber-50 text-[#78350F] rounded-full flex items-center justify-center mx-auto border border-amber-200">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              Swatch Folio En Route
            </h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              Thank you, {artistName}. Your curated 6-sheet fine art paper swatch folio has been scheduled for priority dispatch. We will send USPS tracking details to <span className="font-semibold text-stone-900">{studioEmail}</span>.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C1917] hover:bg-[#78350F] rounded-xs transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
