import React, { useState } from 'react';
import {
  VERIFIED_HIGH_VALUE_ITEMS,
  EBAY_EXPORT_ITEMS,
  CATALOG_DATABASE_SAMPLE,
  FORENSICS_SUMMARY,
  VerifiedItem,
  EbayListing,
} from '../data/forensicsData';
import {
  Search,
  Filter,
  Download,
  BookOpen,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Shield,
  Layers,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Tag,
  Share2,
} from 'lucide-react';

interface ForensicsDashboardProps {
  onSelectItemForCustomizer?: (title: string, author: string) => void;
}

export const ForensicsDashboard: React.FC<ForensicsDashboardProps> = ({
  onSelectItemForCustomizer,
}) => {
  const [activeTab, setActiveTab] = useState<'verified' | 'algorithm' | 'ebay' | 'serial'>(
    'verified'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [clusterFilter, setClusterFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<VerifiedItem | null>(null);
  const [copiedEbayCsv, setCopiedEbayCsv] = useState(false);

  // Filter verified items
  const filteredVerified = VERIFIED_HIGH_VALUE_ITEMS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bibliographicResolution.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCluster =
      clusterFilter === 'all' || item.valuationCluster.includes(clusterFilter);
    return matchesSearch && matchesCluster;
  });

  // Calculate stats
  const totalVerifiedCeiling = VERIFIED_HIGH_VALUE_ITEMS.reduce(
    (acc, item) => acc + item.ceilingUsd,
    0
  );
  const totalEbayListingsValue = EBAY_EXPORT_ITEMS.reduce(
    (acc, item) => acc + item.startPrice,
    0
  );

  // Generate eBay File Exchange CSV string
  const handleExportEbayCsv = () => {
    const headers = [
      'Action',
      'SiteID',
      'Country',
      'Currency',
      'CustomLabel',
      'Category',
      'Title',
      'ConditionID',
      'StartPrice',
      'Quantity',
      'Location',
      'Description',
      'C:Book Title',
      'C:Author',
      'C:Publisher',
      'C:Publication Year',
      'C:Format',
    ];

    const rows = EBAY_EXPORT_ITEMS.map((item) => [
      item.action,
      'US',
      'US',
      'USD',
      item.customLabel,
      item.category,
      `"${item.title.replace(/"/g, '""')}"`,
      item.conditionId,
      item.startPrice.toFixed(2),
      item.quantity,
      item.location,
      `"${item.description.replace(/"/g, '""')}"`,
      `"${item.bookTitle.replace(/"/g, '""')}"`,
      `"${item.author.replace(/"/g, '""')}"`,
      `"${item.publisher.replace(/"/g, '""')}"`,
      item.year,
      item.format,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Fair_Oaks_eBay_File_Exchange_95662.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedEbayCsv(true);
    setTimeout(() => setCopiedEbayCsv(false), 3000);
  };

  return (
    <section id="forensics" className="py-12 lg:py-16 bg-[#FBF9F5] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial Header */}
        <div className="mb-10 max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-sans text-[#78350F] font-semibold">
            Estate Valuation & Bibliographic Intelligence
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1C1917]">
            Bookshelf Forensics & Estate Archive
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Data-driven visual extraction and secondary market valuation analyzing community book sales, regional library donations, and estate collections in Fair Oaks, CA (Zip 95662).
          </p>
        </div>

        {/* 4-KPI Intelligence Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-4 rounded-sm">
            <span className="text-xs text-stone-500 font-medium block">Cataloged Spines</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif text-3xl font-medium text-stone-900 tabular-nums">
                565
              </span>
              <span className="text-xs text-stone-500">records</span>
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">225 visually extracted from 10 shelf photos</span>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-4 rounded-sm">
            <span className="text-xs text-stone-500 font-medium block">Total Verified Portfolio Ceiling</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif text-3xl font-medium text-stone-900 tabular-nums">
                ${totalVerifiedCeiling.toLocaleString()}
              </span>
              <span className="text-xs text-[#78350F] font-semibold">USD</span>
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">Top 50 high-conviction collectible artifacts</span>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-4 rounded-sm">
            <span className="text-xs text-stone-500 font-medium block">The Volume vs Value Delta</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif text-3xl font-medium text-[#78350F] tabular-nums">
                18.7×
              </span>
              <span className="text-xs text-stone-500">ROI Gap</span>
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">Art Folios ($84 avg) vs Thrillers ($4.50 avg)</span>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-4 rounded-sm">
            <span className="text-xs text-stone-500 font-medium block">eBay File Exchange Ready</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif text-3xl font-medium text-stone-900 tabular-nums">
                ${totalEbayListingsValue.toFixed(0)}
              </span>
              <span className="text-xs text-stone-500">active batch</span>
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">Origin Fair Oaks (95662)</span>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E7E2D8] mb-8 pb-1 overflow-x-auto scrollbar-none text-xs font-medium">
          <button
            onClick={() => setActiveTab('verified')}
            className={`py-2 px-3 rounded-xs whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'verified'
                ? 'bg-[#1C1917] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 bg-[#FAF8F5]'
            }`}
          >
            Verified High-Value Artifacts (Top 50)
          </button>
          <button
            onClick={() => setActiveTab('algorithm')}
            className={`py-2 px-3 rounded-xs whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'algorithm'
                ? 'bg-[#1C1917] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 bg-[#FAF8F5]'
            }`}
          >
            The Scouting Algorithm & Shelf Demographics
          </button>
          <button
            onClick={() => setActiveTab('ebay')}
            className={`py-2 px-3 rounded-xs whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'ebay'
                ? 'bg-[#1C1917] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 bg-[#FAF8F5]'
            }`}
          >
            eBay File Exchange Exporter (Zip 95662)
          </button>
          <button
            onClick={() => setActiveTab('serial')}
            className={`py-2 px-3 rounded-xs whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'serial'
                ? 'bg-[#1C1917] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 bg-[#FAF8F5]'
            }`}
          >
            Serial Offender Phenomenon
          </button>
        </div>

        {/* TAB 1: VERIFIED HIGH-VALUE ARTIFACTS MATRIX */}
        {activeTab === 'verified' && (
          <div className="space-y-6">
            
            {/* Search & Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F7F4EE] p-4 rounded-sm border border-[#E7E2D8]">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search by title, author, or publisher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none focus:border-[#78350F]"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Cluster:</span>
                </div>
                <select
                  value={clusterFilter}
                  onChange={(e) => setClusterFilter(e.target.value)}
                  className="text-xs p-2 bg-white border border-[#D6CEBE] rounded-xs text-stone-900 focus:outline-none"
                >
                  <option value="all">All Valuation Clusters</option>
                  <option value="High Antiquarian">High Antiquarian & Firsts</option>
                  <option value="Art History">Art History & Folios</option>
                  <option value="Architecture">Architecture & Science</option>
                  <option value="Civil War">Civil War & Military</option>
                  <option value="Non-Book">Non-Book Hardware</option>
                  <option value="Literature">Literature & Modern Fiction</option>
                </select>
              </div>
            </div>

            {/* Artifact Table */}
            <div className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-sm overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-[#EFECE4] text-[11px] uppercase tracking-wider text-stone-600 font-semibold border-b border-[#E7E2D8]">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Title & Edition Details</th>
                      <th className="py-3 px-4">Author / Maker</th>
                      <th className="py-3 px-4">Cluster</th>
                      <th className="py-3 px-4">Base Range</th>
                      <th className="py-3 px-4 text-right">Ceiling USD</th>
                      <th className="py-3 px-4">Condition</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E2D8]">
                    {filteredVerified.map((item) => (
                      <tr
                        key={item.itemNumber}
                        className="hover:bg-[#F4EFEB] transition-colors cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                      >
                        <td className="py-3.5 px-4 font-mono font-medium text-stone-500 tabular-nums">
                          {String(item.itemNumber).padStart(3, '0')}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <span className="font-serif text-sm font-semibold text-stone-900 block leading-tight">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                            {item.bibliographicResolution}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-stone-800 font-medium">
                          {item.author}
                          <span className="text-stone-400 block text-[10px] tabular-nums">{item.year}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-xs border border-stone-200 block truncate max-w-[160px]">
                            {item.valuationCluster}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono tabular-nums text-stone-600">
                          ${item.baseMinUsd} – ${item.baseMaxUsd}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold tabular-nums text-[#78350F] text-right text-sm">
                          ${item.ceilingUsd}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-[11px] text-stone-700 font-medium capitalize">
                            {item.conditionGrade}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                            }}
                            className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-stone-800 border border-[#D6CEBE] bg-white hover:bg-stone-100 rounded-xs transition-colors cursor-pointer"
                          >
                            Dossier
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: THE SCOUTING ALGORITHM & SHELF DEMOGRAPHICS */}
        {activeTab === 'algorithm' && (
          <div className="space-y-8">
            
            {/* The 3-Step Scouting Algorithm Card */}
            <div className="bg-[#FAF8F5] border border-[#D6CEBE] p-6 sm:p-8 rounded-sm">
              <span className="text-xs uppercase tracking-widest text-[#78350F] font-semibold block mb-2">
                Field Guide Methodology
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-2">
                The 3-Step Scouting Algorithm
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed mb-6">
                "The true value of a community book sale is never in the volumes that take up the most space, but in the specialized passions hidden between them."
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FORENSICS_SUMMARY.scoutingAlgorithm.map((step) => (
                  <div
                    key={step.step}
                    className="bg-[#F7F4EE] border border-[#E7E2D8] p-5 rounded-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl font-medium text-[#78350F] tabular-nums">
                        0{step.step}.
                      </span>
                      <span className="text-[11px] font-mono text-stone-500 font-medium">
                        {step.metric}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-medium text-stone-900">
                      {step.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {step.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Volume vs Value Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* The Bulk */}
              <div className="bg-[#FAF8F5] border border-stone-200 p-6 rounded-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    The Bulk (Low Yield)
                  </span>
                  <span className="font-mono text-xs text-stone-500">32.9% of Shelf</span>
                </div>
                <h4 className="font-serif text-2xl font-medium text-stone-900">
                  Mystery & Thriller Paperbacks
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Occupies nearly 1/3 of total shelf footprint (74 titles identified). High market saturation suppresses secondary prices ($0.50 – $4.50 average yield).
                </p>
                <div className="p-3 bg-stone-100 rounded-xs text-xs text-stone-600">
                  <strong>Example:</strong> Janet Evanovich "Fortune and Glory" bottoms out at $0.55 on wholesale liquidation channels.
                </div>
              </div>

              {/* The Treasures */}
              <div className="bg-[#FAF8F5] border border-[#78350F]/40 p-6 rounded-sm space-y-4 shadow-2xs">
                <div className="flex items-center justify-between border-b border-[#D6CEBE] pb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#78350F]">
                    The Treasures (High Yield)
                  </span>
                  <span className="font-mono text-xs text-[#78350F] font-bold">4.4% of Shelf</span>
                </div>
                <h4 className="font-serif text-2xl font-medium text-stone-900">
                  Art, Photography & Specialized Folios
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Only 10 titles on the entire shelf, but delivers the densest concentration of high-value items ($76.00 – $84.00 average yield).
                </p>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xs text-xs text-amber-950">
                  <strong>Examples:</strong> Women Photographers ($82.85 peak), Star Trek Encyclopedia ($80.65), Too Young to Die ($81.59).
                </div>
              </div>

            </div>

            {/* Niche Hobby Premium Breakdown */}
            <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-6 rounded-sm space-y-4">
              <h4 className="font-serif text-xl font-medium text-stone-900">
                The Niche Hobby Premium ($40+ Baseline)
              </h4>
              <p className="text-xs text-stone-600">
                Dedicated communities (quilting, advanced masonry, high-altitude mountaineering) rely on specific out-of-print instructional manuals:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-3 bg-white border border-[#E7E2D8] rounded-xs">
                  <span className="text-stone-500 block text-[11px] font-sans">Sky Warriors [Outdoor]</span>
                  <span className="font-serif text-lg font-semibold text-stone-900 block mt-1">$54.81</span>
                </div>
                <div className="p-3 bg-white border border-[#E7E2D8] rounded-xs">
                  <span className="text-stone-500 block text-[11px] font-sans">Patchwork & Quilts [Craft]</span>
                  <span className="font-serif text-lg font-semibold text-stone-900 block mt-1">$43.49</span>
                </div>
                <div className="p-3 bg-white border border-[#E7E2D8] rounded-xs">
                  <span className="text-stone-500 block text-[11px] font-sans">Glorious Knits [Craft]</span>
                  <span className="font-serif text-lg font-semibold text-stone-900 block mt-1">$41.77</span>
                </div>
                <div className="p-3 bg-white border border-[#E7E2D8] rounded-xs">
                  <span className="text-stone-500 block text-[11px] font-sans">K2: Challenging the Sky</span>
                  <span className="font-serif text-lg font-semibold text-stone-900 block mt-1">$40.32</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: EBAY FILE EXCHANGE EXPORTER */}
        {activeTab === 'ebay' && (
          <div className="space-y-6">
            <div className="bg-[#FAF8F5] border border-[#D6CEBE] p-6 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#78350F] font-semibold block">
                  Automated Bulk Listing Engine
                </span>
                <h3 className="font-serif text-2xl font-medium text-stone-900 mt-1">
                  eBay File Exchange CSV (Zip: 95662)
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Validated schema conforming to official eBay Merchant Integration Platform / File Exchange format.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleExportEbayCsv}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C1917] hover:bg-[#78350F] rounded-xs transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>{copiedEbayCsv ? 'Downloaded CSV!' : 'Download CSV File'}</span>
                </button>
              </div>
            </div>

            {/* Preview of eBay File Exchange Rows */}
            <div className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-[#EFECE4] text-[11px] uppercase tracking-wider text-stone-600 font-semibold border-b border-[#E7E2D8]">
                    <tr>
                      <th className="py-3 px-4">CustomLabel</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Listing Title</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Condition</th>
                      <th className="py-3 px-4">Postal Code</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E2D8]">
                    {EBAY_EXPORT_ITEMS.map((item) => (
                      <tr key={item.customLabel} className="hover:bg-[#F4EFEB]">
                        <td className="py-3 px-4 font-mono font-medium text-stone-900">
                          {item.customLabel}
                        </td>
                        <td className="py-3 px-4 font-mono text-stone-500">
                          {item.category}
                        </td>
                        <td className="py-3 px-4 font-medium text-stone-800 max-w-md truncate">
                          {item.title}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-[#78350F] tabular-nums">
                          ${item.startPrice.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-stone-600">
                          {item.conditionId === 4000 ? 'Very Good' : 'Good'}
                        </td>
                        <td className="py-3 px-4 font-mono text-stone-500">
                          {item.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: THE SERIAL OFFENDER PHENOMENON */}
        {activeTab === 'serial' && (
          <div className="space-y-6">
            <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-6 rounded-sm space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#78350F] font-semibold block">
                Estate Clearance Patterns
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
                The Serial Offender Phenomenon
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
                Nearly 25% of the mystery shelf is occupied by just three prolific serialized authors. These collections typically arrive together from single-estate liquidations, serving as a signature footprint of the community book sale ecosystem.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {FORENSICS_SUMMARY.serialOffenders.map((author) => (
                  <div
                    key={author.author}
                    className="p-5 bg-white border border-[#E7E2D8] rounded-xs space-y-2 shadow-2xs"
                  >
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
                      Serialized Author Footprint
                    </span>
                    <h4 className="font-serif text-xl font-semibold text-stone-900">
                      {author.author}
                    </h4>
                    <div className="pt-2 border-t border-[#E7E2D8] flex items-center justify-between text-xs">
                      <span className="text-stone-500">Titles on Shelf:</span>
                      <span className="font-mono font-bold text-stone-900 tabular-nums">
                        {author.titles} titles
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500">Category Share:</span>
                      <span className="font-mono font-bold text-[#78350F] tabular-nums">
                        {author.shareOfCategory}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Item Dossier Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#FBF9F5] border border-[#D6CEBE] rounded-sm max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#E7E2D8] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-mono text-[#78350F] font-semibold block">
                  Artifact #{String(selectedItem.itemNumber).padStart(3, '0')} · {selectedItem.valuationCluster}
                </span>
                <h3 className="font-serif text-2xl font-medium text-stone-900 mt-1">
                  {selectedItem.title}
                </h3>
                <span className="text-xs text-stone-500">
                  {selectedItem.author} ({selectedItem.year})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            {/* Valuation Band */}
            <div className="bg-[#FAF8F5] p-4 rounded-xs border border-[#E7E2D8] flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-stone-400 block font-sans">Base Realized Band:</span>
                <span className="text-base font-semibold text-stone-900 tabular-nums">
                  ${selectedItem.baseMinUsd} – ${selectedItem.baseMaxUsd}
                </span>
              </div>
              <div className="text-right">
                <span className="text-stone-400 block font-sans">Upside Ceiling:</span>
                <span className="text-2xl font-serif font-bold text-[#78350F] tabular-nums">
                  ${selectedItem.ceilingUsd}
                </span>
              </div>
            </div>

            {/* Physical Facts */}
            <div className="space-y-3 text-xs text-stone-700">
              <div>
                <strong className="text-stone-900 block font-semibold mb-0.5">Physical Condition & Facts:</strong>
                <p className="bg-white p-2.5 rounded-xs border border-stone-200">
                  {selectedItem.physicalFacts}
                </p>
              </div>

              <div>
                <strong className="text-stone-900 block font-semibold mb-0.5">Bibliographic Resolution:</strong>
                <p className="bg-white p-2.5 rounded-xs border border-stone-200">
                  {selectedItem.bibliographicResolution}
                </p>
              </div>

              <div>
                <strong className="text-stone-900 block font-semibold mb-0.5">Market Routing & Divestment Note:</strong>
                <p className="bg-white p-2.5 rounded-xs border border-stone-200">
                  {selectedItem.marketRoutingNote}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7E2D8]">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
