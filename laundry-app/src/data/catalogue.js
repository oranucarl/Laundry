/**
 * Garment catalogue driving the Pricing section and the live estimator.
 * Prices are in naira, for a single garment, standard 48-hour turnaround.
 */
// TODO:REAL — confirm every price against your actual rate card.

export const groups = [
  { id: 'men', label: "Traditional — Men" },
  { id: 'women', label: 'Traditional — Women' },
  { id: 'everyday', label: 'Everyday Wear' },
  { id: 'home', label: 'Household' },
]

// Warm golds and clays for traditional wear, brand teal for everyday.
const GOLD = { fabric: '#e8d5a9', shade: '#d4bc84', accent: '#b8860b', detail: '#8b6914' }
const INDIGO = { fabric: '#3b5998', shade: '#2d4373', accent: '#f0c419', detail: '#1e2f52' }
const TERRA = { fabric: '#d98b5f', shade: '#bf7347', accent: '#7a3b1f', detail: '#5c2c17' }
const CREAM = { fabric: '#f3ece0', shade: '#ded3c0', accent: '#c2986a', detail: '#8a6a44' }
const ROSE = { fabric: '#d4798f', shade: '#b95f76', accent: '#f4d06f', detail: '#7d2f45' }
const EMERALD = { fabric: '#2f8f6f', shade: '#237056', accent: '#f0c419', detail: '#16503c' }
const ROYAL = { fabric: '#5b4b9e', shade: '#453a7d', accent: '#e8c46a', detail: '#2e2555' }
const IVORY = { fabric: '#efe7dc', shade: '#dbd0c1', accent: '#c9a227', detail: '#8f7320' }
const TEAL = { fabric: '#7dd3e0', shade: '#5cb9c9', accent: '#0891b2', detail: '#155e75' }
const SLATE = { fabric: '#8fa3b8', shade: '#70869c', accent: '#0891b2', detail: '#334155' }
const CHARCOAL = { fabric: '#4a5568', shade: '#374151', accent: '#94a3b8', detail: '#1f2937' }
const SKY = { fabric: '#bfdbfe', shade: '#a5c8f5', accent: '#0891b2', detail: '#475569' }
const SAGE = { fabric: '#b7c9a8', shade: '#9db28d', accent: '#10b981', detail: '#4b6043' }

export const catalogue = [
  // ── Traditional menswear ──
  {
    id: 'agbada', group: 'men', art: 'agbada', colors: GOLD,
    name: 'Agbada',
    blurb: 'Three-piece. Hand-finished embroidery, starched and pressed.',
    price: 8500, unit: 'per set', popular: true,
  },
  {
    id: 'senator', group: 'men', art: 'senator', colors: INDIGO,
    name: 'Senator Style',
    blurb: 'Two-piece. Crisp placket press, collar reshaped.',
    price: 5500, unit: 'per set', popular: true,
  },
  {
    id: 'dashiki', group: 'men', art: 'dashiki', colors: TERRA,
    name: 'Dashiki',
    blurb: 'Colour-safe wash that protects the embroidered yoke.',
    price: 3500, unit: 'per piece',
  },
  {
    id: 'kaftan', group: 'men', art: 'kaftan', colors: CREAM,
    name: 'Kaftan',
    blurb: 'Gentle cycle, full-length press, no shine on the fabric.',
    price: 4000, unit: 'per piece',
  },

  // ── Traditional womenswear ──
  {
    id: 'iro-buba', group: 'women', art: 'iro-buba', colors: ROSE,
    name: 'Iro & Buba',
    blurb: 'Wrapper and blouse cleaned together, sash re-pressed.',
    price: 6500, unit: 'per set', popular: true,
  },
  {
    id: 'ankara-gown', group: 'women', art: 'ankara-gown', colors: EMERALD,
    name: 'Ankara Gown',
    blurb: 'Cold wash that keeps wax-print colours from bleeding.',
    price: 4500, unit: 'per piece',
  },
  {
    id: 'gele', group: 'women', art: 'gele', colors: ROYAL,
    name: 'Gele',
    blurb: 'Steamed and re-stiffened so it holds its shape.',
    price: 2500, unit: 'per piece',
  },
  {
    id: 'lace-gown', group: 'women', art: 'lace-gown', colors: IVORY,
    name: 'Lace / Aso Ebi',
    blurb: 'Hand-finished dry clean for beaded and sequinned lace.',
    price: 9000, unit: 'per piece', popular: true,
  },

  // ── Everyday ──
  {
    id: 'shirt', group: 'everyday', art: 'shirt', colors: SKY,
    name: 'Shirt',
    blurb: 'Washed, starched to your preference, pressed on the board.',
    price: 1200, unit: 'each',
  },
  {
    id: 'trousers', group: 'everyday', art: 'trousers', colors: SLATE,
    name: 'Trousers',
    blurb: 'Crease set sharp, waistband and pockets reshaped.',
    price: 1500, unit: 'each',
  },
  {
    id: 'suit', group: 'everyday', art: 'suit', colors: CHARCOAL,
    name: 'Suit',
    blurb: 'Two-piece dry clean with shoulder and lapel shaping.',
    price: 6000, unit: 'per set',
  },

  // ── Household ──
  {
    id: 'duvet', group: 'home', art: 'duvet', colors: TEAL,
    name: 'Duvet & Bedding',
    blurb: 'Industrial wash and tumble dry. Pillowcases included.',
    price: 7000, unit: 'per set',
  },
  {
    id: 'curtains', group: 'home', art: 'curtains', colors: SAGE,
    name: 'Curtains',
    blurb: 'Dust extraction, wash and steam finish while hanging.',
    price: 3500, unit: 'per panel',
  },
]

/** Express service halves the turnaround and adds a surcharge. */
export const turnarounds = [
  { id: 'standard', label: 'Standard', detail: '48 hours', multiplier: 1 },
  { id: 'express', label: 'Express', detail: '24 hours', multiplier: 1.4 },
]

export const formatNaira = (n) => `₦${Math.round(n).toLocaleString()}`
