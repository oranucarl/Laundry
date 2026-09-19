/**
 * The assistant's knowledge layer.
 *
 * Every answer is generated from the same data the rest of the site renders
 * (catalogue.js, business.js), so a price shown here can never drift from the
 * price on a pricing card. There is no model and no guessing: if nothing
 * matches confidently, we say so and hand off to a human.
 *
 * Pure functions only, so this file can be tested without a browser.
 */
import { catalogue, turnarounds, formatNaira } from '../data/catalogue'
import { business, locations, deliveryZones, yearsOfService } from '../data/business'

const FREE_DELIVERY_OVER = 15000

const standard = turnarounds.find((t) => t.id === 'standard')
const express = turnarounds.find((t) => t.id === 'express')

/* ── Text normalisation ──────────────────────────────────── */

const normalise = (s) =>
  s.toLowerCase()
    .replace(/[''`]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/* ── Garment synonyms, so natural phrasing resolves ──────── */

const GARMENT_TERMS = {
  agbada: ['agbada', 'babariga', 'grand boubou', 'flowing gown'],
  senator: ['senator', 'senate', 'kaftan senator'],
  dashiki: ['dashiki', 'dashkiki'],
  kaftan: ['kaftan', 'caftan', 'kaftans'],
  'iro-buba': ['iro', 'buba', 'iro and buba', 'wrapper', 'wrapper and blouse'],
  'ankara-gown': ['ankara', 'african print', 'wax print', 'print gown'],
  gele: ['gele', 'head wrap', 'headwrap', 'head tie', 'headtie'],
  'lace-gown': ['lace', 'aso ebi', 'asoebi', 'aso oke', 'asooke', 'beaded', 'sequin', 'sequinned'],
  shirt: ['shirt', 'shirts', 'blouse', 'top'],
  trousers: ['trouser', 'trousers', 'pants', 'pant', 'slacks'],
  suit: ['suit', 'suits', 'blazer', 'jacket', 'two piece suit'],
  duvet: ['duvet', 'bedding', 'bed sheet', 'bedsheet', 'sheet', 'blanket', 'comforter', 'pillow', 'linen'],
  curtains: ['curtain', 'curtains', 'drapes', 'blinds'],
}

/** Returns catalogue items mentioned in the text, longest term first. */
function findGarments(text) {
  const hits = []
  for (const [id, terms] of Object.entries(GARMENT_TERMS)) {
    const term = [...terms].sort((a, b) => b.length - a.length)
      .find((t) => new RegExp(`\\b${t}(s|es)?\\b`).test(text))
    if (term) hits.push({ item: catalogue.find((c) => c.id === id), term })
  }
  return hits
}

/** Matches a Lagos area against the delivery zones and the branch list. */
function findZone(text) {
  const all = [
    ...deliveryZones.map((z) => ({ name: z, covered: true })),
    ...locations.map((l) => ({ name: l.name.replace(/ (Hub|Branch|Collection Point|Phase 1|GRA)$/,''), covered: true })),
  ]
  return all.find((z) => new RegExp(`\\b${normalise(z.name)}\\b`).test(text)) || null
}

/* ── Reusable answer fragments ───────────────────────────── */

const priceLine = (item) => {
  const s = item.price * standard.multiplier
  const e = item.price * express.multiplier
  return `**${item.name}** is ${formatNaira(s)} ${item.unit} on standard (${standard.detail}), or ${formatNaira(e)} on express (${express.detail}).`
}

const hoursText = () =>
  business.hours.map((h) => (h.close ? `${h.days}: ${h.open} to ${h.close}` : `${h.days}: ${h.open}`)).join('\n')

/* ── Intents, checked in order ───────────────────────────── */

const has = (t, ...words) => words.some((w) => new RegExp(`\\b${w}\\b`).test(t))

const INTENTS = [
  {
    id: 'greeting',
    test: (t) => has(t, 'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening') && t.split(' ').length <= 4,
    reply: () => ({
      text: `Hello. I can check prices, turnaround, delivery areas and our branches. What do you need?`,
      chips: ['Price for agbada', 'Do you deliver to Lekki?', 'How long does it take?', 'Book a pickup'],
    }),
  },
  {
    id: 'price',
    test: (t, g) => g.length > 0 && (has(t, 'price', 'cost', 'how much', 'charge', 'rate', 'fee', 'quote') || g.length > 0),
    reply: (t, g) => {
      if (g.length === 1) {
        const { item } = g[0]
        return {
          text: `${priceLine(item)}\n\n${item.blurb}`,
          actions: [{ type: 'add', itemId: item.id, label: `Add ${item.name} to order` }],
          chips: ['What else do you clean?', 'Do you pick up?', 'Book a pickup'],
        }
      }
      return {
        text: `Here is what those cost on standard (${standard.detail}):\n\n` +
          g.map(({ item }) => `• **${item.name}** ${formatNaira(item.price * standard.multiplier)} ${item.unit}`).join('\n') +
          `\n\nExpress (${express.detail}) adds ${Math.round((express.multiplier - 1) * 100)}%.`,
        actions: g.map(({ item }) => ({ type: 'add', itemId: item.id, label: `Add ${item.name}` })),
        chips: ['Book a pickup', 'Do you deliver to my area?'],
      }
    },
  },
  {
    id: 'turnaround',
    test: (t) => has(t, 'how long', 'turnaround', 'ready', 'take', 'fast', 'quick', 'when', 'days', 'express', 'urgent', 'same day'),
    reply: () => ({
      text: `Standard service is **${standard.detail}** from collection.\n\nExpress is **${express.detail}** and adds ${Math.round((express.multiplier - 1) * 100)}% to the price.\n\nHeavily beaded pieces sometimes need an extra day. We always tell you before we start.`,
      chips: ['Book a pickup', 'Price for lace', 'Do you deliver to my area?'],
    }),
  },
  {
    id: 'book',
    test: (t) =>
      has(t, 'book', 'booking', 'schedule', 'arrange', 'request') ||
      (has(t, 'want', 'need', 'like') && has(t, 'pickup', 'pick up', 'collect', 'order')),
    reply: () => ({
      text: `Happy to get that moving. The quickest way is WhatsApp, where we confirm a pickup window with you.\n\nYou can also build your order on the pricing section and send the whole list in one message.`,
      actions: [
        { type: 'whatsapp', label: 'Book on WhatsApp', message: `Hi ${business.name}, I'd like to book a laundry pickup.` },
        { type: 'scroll', target: '#pricing', label: 'Build my order' },
        { type: 'call', label: `Call ${business.phoneDisplay}` },
      ],
    }),
  },
  {
    id: 'delivery',
    test: (t) => has(t, 'deliver', 'delivery', 'pickup', 'pick up', 'collect', 'come to', 'my area', 'zone', 'cover'),
    reply: (t) => {
      const zone = findZone(t)
      if (zone) {
        return {
          text: `Yes, we cover **${zone.name}**. Pickup and delivery are free on orders over ${formatNaira(FREE_DELIVERY_OVER)}, and ${formatNaira(1500)} per trip below that.`,
          actions: [{ type: 'whatsapp', label: 'Book a pickup', message: `Hi ${business.name}, I'd like to book a pickup in ${zone.name}.` }],
          chips: ['How long does it take?', 'See all locations'],
        }
      }
      return {
        text: `We pick up and deliver free across Lagos on orders over ${formatNaira(FREE_DELIVERY_OVER)}. Our zones are:\n\n${deliveryZones.join(', ')}.\n\nOutside those we still deliver nationwide by courier. Which area are you in?`,
        chips: deliveryZones.slice(0, 4).map((z) => `Do you deliver to ${z}?`),
      }
    },
  },
  {
    id: 'locations',
    test: (t) => has(t, 'location', 'locations', 'branch', 'branches', 'where', 'address', 'shop', 'store', 'drop off', 'dropoff', 'near'),
    reply: () => ({
      text: `We have ${locations.length} hubs across Lagos:\n\n` +
        locations.map((l) => `• **${l.name}** ${l.address} (${l.hours})`).join('\n'),
      actions: [{ type: 'scroll', target: '#coverage', label: 'Show me on the map' }],
      chips: ['What are your opening hours?', 'Book a pickup'],
    }),
  },
  {
    id: 'hours',
    test: (t) => has(t, 'hours', 'open', 'opening', 'close', 'closing', 'sunday', 'saturday', 'weekend'),
    reply: () => ({
      text: `Our opening hours:\n\n${hoursText()}\n\nYou can message us on WhatsApp any time and we will reply when we open.`,
      chips: ['Where are you located?', 'Book a pickup'],
    }),
  },
  {
    id: 'payment',
    test: (t) => has(t, 'pay', 'payment', 'transfer', 'card', 'cash', 'ussd', 'pos'),
    reply: () => ({
      text: `Bank transfer, card on delivery, or USSD.\n\nYou inspect your order before you pay. If something is not right we take it back and redo it at no charge.`,
      chips: ['What if something is damaged?', 'Book a pickup'],
    }),
  },
  {
    id: 'damage',
    test: (t) => has(t, 'damage', 'damaged', 'lost', 'lose', 'ruin', 'shrink', 'insurance', 'guarantee', 'missing'),
    reply: () => ({
      text: `Every item is tagged and logged at collection, and you keep a receipt.\n\nIf we damage or lose something we reimburse up to **10 times** the cleaning cost of that item, or replace it outright where we can.`,
      chips: ['How do I pay?', 'Book a pickup'],
    }),
  },
  {
    id: 'traditional',
    test: (t) => has(t, 'traditional', 'embroidery', 'embroidered', 'beading', 'delicate', 'special care', 'hand wash', 'handwash', 'dry clean', 'dryclean'),
    reply: () => ({
      text: `Traditional pieces never go through a normal cycle.\n\nEmbroidered and beaded garments are cleaned by hand and pressed on a padded board so the stitching keeps its relief. Gele is steamed and re-stiffened so it holds its shape. Wax print is cold washed so the colours do not bleed.`,
      actions: [{ type: 'scroll', target: '#pricing', label: 'See traditional prices' }],
      chips: ['Price for agbada', 'Price for lace', 'How long does it take?'],
    }),
  },
  {
    id: 'contract',
    test: (t) => has(t, 'contract', 'business', 'hotel', 'office', 'bulk', 'corporate', 'company', 'volume', 'wholesale'),
    reply: () => ({
      text: `We do contract work for hotels, offices and institutions: scheduled daily or weekly collections, bulk rates, a dedicated account manager and consolidated monthly invoicing.\n\nTell us your volume and we will build a rate card around it.`,
      actions: [
        { type: 'whatsapp', label: 'Ask about contract rates', message: `Hi ${business.name}, I'd like to discuss contract rates for my business.` },
        { type: 'scroll', target: '#contact', label: 'Use the contact form' },
      ],
    }),
  },
  {
    id: 'catalogue',
    test: (t) => has(t, 'what do you clean', 'what else', 'services', 'service', 'items', 'accept', 'handle', 'list', 'everything'),
    reply: () => ({
      text: `We clean:\n\n` +
        ['men', 'women', 'everyday', 'home'].map((g) => {
          const names = catalogue.filter((c) => c.group === g).map((c) => c.name).join(', ')
          return `• ${names}`
        }).join('\n') +
        `\n\nAsk me the price of any of them.`,
      actions: [{ type: 'scroll', target: '#pricing', label: 'See all prices' }],
      chips: ['Price for agbada', 'Price for duvet', 'Price for suit'],
    }),
  },
  {
    id: 'contact',
    test: (t) => has(t, 'contact', 'phone', 'call', 'number', 'email', 'reach', 'speak', 'human', 'someone', 'agent'),
    reply: () => ({
      text: `You can reach us on:\n\n• Phone **${business.phoneDisplay}**\n• WhatsApp, usually answered within minutes\n• Email ${business.email}`,
      actions: [
        { type: 'whatsapp', label: 'Message on WhatsApp', message: `Hi ${business.name}, I have a question.` },
        { type: 'call', label: 'Call us' },
      ],
    }),
  },
  {
    id: 'about',
    test: (t) => has(t, 'who are you', 'about', 'how long have you', 'experience', 'trust', 'reliable', 'years'),
    reply: () => ({
      text: `${business.name} has been caring for garments in Lagos for ${yearsOfService} years. We specialise in traditional Nigerian wear alongside everyday clothing and household linen, with free pickup and delivery across the city.`,
      chips: ['What do you clean?', 'Where are you located?'],
    }),
  },
  {
    id: 'thanks',
    test: (t) => has(t, 'thanks', 'thank you', 'thx', 'appreciate', 'great', 'nice', 'cool', 'ok', 'okay'),
    reply: () => ({
      text: `Any time. Anything else I can check for you?`,
      chips: ['Book a pickup', 'See all prices', 'Do you deliver to my area?'],
    }),
  },
]

/** The honest fallback: say we do not know, then route to a person. */
const fallback = () => ({
  text: `I am not sure about that one. I can help with prices, turnaround, delivery areas, our branches, payment and damage cover.\n\nFor anything else our team will answer on WhatsApp in a few minutes.`,
  actions: [{ type: 'whatsapp', label: 'Ask the team', message: `Hi ${business.name}, I have a question.` }],
  chips: ['See all prices', 'How long does it take?', 'Where are you located?'],
})

/** Main entry point: a user message in, a structured reply out. */
export function respond(input) {
  const t = normalise(input)
  if (!t) return fallback()
  const garments = findGarments(t)

  for (const intent of INTENTS) {
    if (intent.test(t, garments)) return { id: intent.id, ...intent.reply(t, garments) }
  }
  return { id: 'fallback', ...fallback() }
}

export const greeting = () => ({
  id: 'welcome',
  text: `Hi, I am the ${business.name} assistant. I can quote a price, check if we deliver to your area, or book a pickup.`,
  chips: ['Price for agbada', 'Do you deliver to Lekki?', 'How long does it take?', 'Book a pickup'],
})

export { FREE_DELIVERY_OVER }
