/**
 * Garment catalogue driving the Pricing section and the live estimator.
 * Prices are in naira, for a single garment, on standard 4 day turnaround.
 *
 * Photography: Pexels (pexels.com/license), free for commercial use, no
 * attribution required. Files live in public/images/garments/.
 */
// TODO:REAL: confirm every price against your actual rate card.

export const groups = [
  { id: 'men', label: 'Men' },
  { id: 'women', label: 'Women' },
  { id: 'everyday', label: 'Everyday Wear' },
  { id: 'home', label: 'Household' },
]

export const catalogue = [
  // ── Traditional menswear ──
  {
    id: 'agbada', group: 'men', image: 'agbada',
    name: 'Agbada',
    blurb: 'Three-piece. Hand-finished embroidery, starched and pressed.',
    price: 8500, unit: 'per set', popular: true,
  },
  {
    id: 'senator', group: 'men', image: 'senator',
    name: 'Senator Style',
    blurb: 'Two-piece. Crisp placket press, collar reshaped.',
    price: 5500, unit: 'per set', popular: true,
  },
  {
    id: 'dashiki', group: 'men', image: 'dashiki',
    name: 'Dashiki',
    blurb: 'Colour-safe wash that protects the embroidered yoke.',
    price: 3500, unit: 'per piece',
  },
  {
    id: 'kaftan', group: 'men', image: 'kaftan',
    name: 'Kaftan',
    blurb: 'Gentle cycle, full-length press, no shine on the fabric.',
    price: 4000, unit: 'per piece',
  },

  // ── Traditional womenswear ──
  {
    id: 'iro-buba', group: 'women', image: 'iro-buba',
    name: 'Iro & Buba',
    blurb: 'Wrapper and blouse cleaned together, sash re-pressed.',
    price: 6500, unit: 'per set', popular: true,
  },
  {
    id: 'ankara-gown', group: 'women', image: 'ankara-gown',
    name: 'Ankara Gown',
    blurb: 'Cold wash that keeps wax-print colours from bleeding.',
    price: 4500, unit: 'per piece',
  },
  {
    id: 'gele', group: 'women', image: 'gele',
    name: 'Gele',
    blurb: 'Steamed and re-stiffened so it holds its shape.',
    price: 2500, unit: 'per piece',
  },
  {
    id: 'lace-gown', group: 'women', image: 'lace-gown',
    name: 'Lace / Aso Ebi',
    blurb: 'Hand-finished dry clean for beaded and sequinned lace.',
    price: 9000, unit: 'per piece', popular: true,
  },

  // ── Everyday ──
  {
    id: 'shirt', group: 'everyday', image: 'shirt',
    name: 'Shirt',
    blurb: 'Washed, starched to your preference, pressed on the board.',
    price: 1200, unit: 'each',
  },
  {
    id: 'trousers', group: 'everyday', image: 'trousers',
    name: 'Trousers',
    blurb: 'Crease set sharp, waistband and pockets reshaped.',
    price: 1500, unit: 'each',
  },
  {
    id: 'suit', group: 'everyday', image: 'suit',
    name: 'Suit',
    blurb: 'Two-piece dry clean with shoulder and lapel shaping.',
    price: 6000, unit: 'per set',
  },

  // ── Household ──
  {
    id: 'duvet', group: 'home', image: 'duvet',
    name: 'Duvet & Bedding',
    blurb: 'Industrial wash and tumble dry. Pillowcases included.',
    price: 7000, unit: 'per set',
  },
  {
    id: 'curtains', group: 'home', image: 'curtains',
    name: 'Curtains',
    blurb: 'Dust extraction, wash and steam finish while hanging.',
    price: 3500, unit: 'per panel',
  },
]

/** Express cuts the turnaround to a single day and adds a surcharge. */
export const turnarounds = [
  { id: 'standard', label: 'Standard', detail: '4 days', multiplier: 1 },
  { id: 'express', label: 'Express', detail: '24 hours', multiplier: 1.4 },
]

export const formatNaira = (n) => `₦${Math.round(n).toLocaleString()}`
