import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { business, whatsappLink } from '../data/business'
import { useOrder } from '../context/OrderContext'
import { spring } from '../lib/motion'

/**
 * Sticky call/WhatsApp bar for phones. Appears once the hero is behind you,
 * and steps aside when the order estimator takes over the bottom of the screen.
 * On larger screens the chat assistant covers this ground instead.
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

    </>
  )
}
