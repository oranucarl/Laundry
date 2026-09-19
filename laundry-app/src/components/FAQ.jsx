import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MessageCircle } from 'lucide-react'
import { whatsappLink, business } from '../data/business'
import { fadeUp, stagger, inView, EASE } from '../lib/motion'

// TODO:REAL: confirm these answers match your actual policies.
const faqs = [
  {
    q: 'How long does a normal order take?',
    a: 'Standard service is 4 days from collection. Express turns your order around in 24 hours for a 40% surcharge. Traditional pieces with heavy beading may need an extra day, and we will always tell you before we start.',
  },
  {
    q: 'Do you really handle agbada, lace and aso-oke?',
    a: 'Yes, and they never go through a normal cycle. Embroidered and beaded pieces are cleaned by hand, pressed on a padded board so the stitching keeps its relief, and gele is re-stiffened so it holds its shape.',
  },
  {
    q: 'What does pickup and delivery cost?',
    a: `Free on orders over ${business.currency}15,000 within our Lagos delivery zones. Below that it is a flat ${business.currency}1,500 per trip. Outside Lagos we ship by courier at cost.`,
  },
  {
    q: 'How do I pay?',
    a: 'Bank transfer, card on delivery, or USSD. You inspect your order before you pay. If something is not right, we take it back and redo it at no charge.',
  },
  {
    q: 'What if a garment is damaged or lost?',
    a: 'Every item is tagged and logged at collection with a receipt you keep. In the rare case we damage or lose something, we reimburse up to 10 times the cleaning cost of that item, or replace it outright where we can.',
  },
  {
    q: 'Do you offer contracts for hotels and offices?',
    a: 'We do. Scheduled daily or weekly collections, bulk rates, dedicated account manager and consolidated monthly invoicing. Get in touch and we will build a rate card around your volume.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="text-center mb-14"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            Questions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mt-2 mb-4">
            Frequently Asked
          </h2>
          <p className="text-gray-600 text-lg">
            Everything people ask us before their first order.
          </p>
        </motion.div>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="space-y-3"
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={faq.q}
                variants={fadeUp}
                className={`rounded-2xl border-2 bg-white overflow-hidden transition-colors ${
                  isOpen ? 'border-primary-300 shadow-lg' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between gap-4 text-left p-6 focus-ring"
                  >
                    <span className="font-semibold text-secondary-900 text-lg">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className={`shrink-0 p-2 rounded-xl transition-colors ${
                        isOpen ? 'bg-primary-600 text-white' : 'bg-gray-100 text-secondary-600'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-12 text-center bg-white rounded-3xl p-8 border border-gray-100 shadow-lg"
        >
          <h3 className="text-xl font-bold text-secondary-900 mb-2">
            Still have a question?
          </h3>
          <p className="text-gray-600 mb-6">
            Message us on WhatsApp. We usually reply within a few minutes.
          </p>
          <a
            href={whatsappLink(`Hi ${business.name}, I have a question about your service.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-green hover:bg-accent-greenDark text-white px-6 py-3.5 rounded-xl font-semibold transition-colors focus-ring"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with us
          </a>
        </motion.div>
      </div>
    </section>
  )
}
