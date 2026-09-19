/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR BUSINESS DETAILS
 *  Everything marked  // TODO:REAL  is placeholder data.
 *  Edit this one file. Every component reads from here.
 * ─────────────────────────────────────────────────────────────
 */

export const business = {
  name: 'Presspoint Laundry',
  tagline: 'Premium laundry & traditional garment care',
  foundedYear: 2008, // TODO:REAL: hero/about derive "years of service" from this

  phone: '+2348001234567',          // TODO:REAL: digits only, E.164, used for tel:
  phoneDisplay: '+234 800 123 4567', // TODO:REAL
  whatsapp: '2348001234567',         // TODO:REAL: no +, used for wa.me links
  email: 'info@presspointlaundry.com', // TODO:REAL

  address: {
    street: '123 Clean Street',      // TODO:REAL
    area: 'Victoria Island',         // TODO:REAL
    city: 'Lagos',
    country: 'Nigeria',
  },

  hours: [
    { days: 'Monday to Friday', open: '7:00 AM', close: '9:00 PM' },
    { days: 'Saturday', open: '8:00 AM', close: '8:00 PM' },
    { days: 'Sunday', open: 'Closed', close: '' },
  ],

  socials: {
    // TODO:REAL: set to null to hide the icon entirely (no dead "#" links)
    facebook: null,
    instagram: null,
    twitter: null,
    linkedin: null,
  },

  /**
   * Where form submissions go. Static hosting has no backend, so we post to a
   * form relay. Create a free endpoint at https://web3forms.com (or Formspree)
   * and paste the access key here. Until then the form falls back to WhatsApp.
   */
  formAccessKey: null, // TODO:REAL: e.g. 'a1b2c3d4-....'

  currency: '₦',
}

/** Service hubs shown on the live map. Coordinates are real Lagos areas. */
// TODO:REAL: replace with your actual branch coordinates & details
export const locations = [
  {
    id: 'vi',
    name: 'Victoria Island Hub',
    address: '123 Clean Street, Victoria Island',
    coords: [6.4281, 3.4219],
    hours: 'Mon to Sat, 7AM to 9PM',
    flagship: true,
  },
  {
    id: 'lekki',
    name: 'Lekki Phase 1',
    address: '14 Admiralty Way, Lekki',
    coords: [6.4474, 3.4736],
    hours: 'Mon to Sat, 7AM to 9PM',
  },
  {
    id: 'ikeja',
    name: 'Ikeja GRA',
    address: '9 Oba Akinjobi Way, Ikeja',
    coords: [6.5833, 3.3536],
    hours: 'Mon to Sat, 7AM to 8PM',
  },
  {
    id: 'yaba',
    name: 'Yaba Collection Point',
    address: '27 Herbert Macaulay Way, Yaba',
    coords: [6.5095, 3.3711],
    hours: 'Mon to Sat, 8AM to 7PM',
  },
  {
    id: 'surulere',
    name: 'Surulere Branch',
    address: '5 Adeniran Ogunsanya, Surulere',
    coords: [6.4923, 3.3549],
    hours: 'Mon to Sat, 8AM to 7PM',
  },
]

/** Neighbourhoods covered by free pickup & delivery. */
export const deliveryZones = [
  'Victoria Island', 'Ikoyi', 'Lekki', 'Ajah', 'Ikeja', 'Yaba',
  'Surulere', 'Maryland', 'Gbagada', 'Magodo', 'Oniru', 'Apapa',
]

export const whatsappLink = (message) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`

export const yearsOfService = new Date().getFullYear() - business.foundedYear
