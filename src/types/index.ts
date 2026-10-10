export interface PaperOption {
  id: string;
  name: string;
  brand: string;
  weightGsm: number;
  composition: string;
  surface: string;
  tone: string;
  dmax: number;
  description: string;
  pricePerSqInch: number;
  bestFor: string;
}

export interface FrameOption {
  id: string;
  name: string;
  woodType: string;
  colorHex: string;
  textureClass: string;
  borderWidthInches: number;
  depthInches: number;
  pricePerLinearInch: number;
  description: string;
}

export interface MatOption {
  id: string;
  name: string;
  ply: 4 | 8;
  colorHex: string;
  borderClass: string;
  pricePerSqInch: number;
  description: string;
}

export interface GlassOption {
  id: string;
  name: string;
  uvProtection: string;
  reflection: string;
  priceMultiplier: number;
  description: string;
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  medium: string;
  year: number;
  dimensions: string;
  imageSrc: string;
  editionTotal: number;
  editionRemaining: number;
  basePrice: number;
  aspectRatio: number; // width / height
  description: string;
}

export interface CustomPrintConfig {
  artworkTitle: string;
  artistName: string;
  imageSrc: string;
  widthInches: number;
  heightInches: number;
  paperId: string;
  frameId: string; // 'none' or frame id
  matId: string; // 'none' or mat id
  matWidthInches: number;
  glassId: string;
  deckleEdge: boolean;
  includeCertificate: boolean;
  quantity: number;
  notes: string;
}

export interface PriceBreakdown {
  printSqInches: number;
  paperCost: number;
  matCost: number;
  frameCost: number;
  glassCost: number;
  finishingCost: number;
  subtotal: number;
  total: number;
}
