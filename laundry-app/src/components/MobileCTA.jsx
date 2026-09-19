import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { business, whatsappLink } from '../data/business'
import { useOrder } from '../context/OrderContext'
import { spring } from '../lib/motion'

/**
 * Sticky call/WhatsApp bar for phones. Appears once the hero is behind you,
 * and steps aside when the order estimator takes over the bottom of the screen.
 */
export default function MobileCTA() {
  const [visible, setVisible] = useState(false)
  const { itemCount } = useOrder()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const show = visible && itemCount === 0

  return (
    <>
      {/* Phones: full-width bar */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={spring}
            className="sm:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-white/90 backdrop-blur-xl border-t border-gray-200 flex gap-3"
          >
            <a
              href={`tel:${business.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-secondary-900 text-white font-semibold focus-ring"
            >
              <Phone className="w-5 h-5" />
              Call
            </a>
            <a
              href={whatsappLink(`Hi ${business.name}, I'd like to book a pickup.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-accent-green text-white font-semibold focus-ring"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tablet & up: floating action button */}
      <AnimatePresence>
        {show && (
          <motion.a
            href={whatsappLink(`Hi ${business.name}, I'd like to book a pickup.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={spring}
            className="hidden sm:flex fixed bottom-6 right-6 z-40 w-16 h-16 rounded-2xl bg-accent-green text-white shadow-2xl shadow-accent-green/30 items-center justify-center group"
          >
            <span className="absolute inset-0 rounded-2xl bg-accent-green animate-ping opacity-20" />
            <MessageCircle className="w-7 h-7 relative" />
            <span className="absolute right-full mr-3 whitespace-nowrap bg-secondary-900 text-white text-sm font-medium px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Chat with us
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </>
  )
}
