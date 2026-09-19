import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Waves } from 'lucide-react'
import { EASE } from '../lib/motion'

/** Brief brand curtain that lifts once the first paint settles. */
export default function Preloader() {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setDone(true), reduce ? 0 : 900)
    return () => clearTimeout(id)
  }, [reduce])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE } }}
          className="fixed inset-0 z-[100] bg-secondary-900 flex flex-col items-center justify-center gap-6"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Waves className="w-16 h-16 text-primary-400" strokeWidth={1.5} />
          </motion.div>
          <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 0.9, ease: EASE }}
              className="h-full bg-gradient-to-r from-primary-500 to-accent-green"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
