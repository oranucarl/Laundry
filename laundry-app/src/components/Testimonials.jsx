import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { fadeUp, inView, EASE, spring } from '../lib/motion'

// TODO:REAL: replace with genuine reviews. Never publish invented testimonials.
const testimonials = [
  {
    name: 'Adaeze N.',
    role: 'Lekki Phase 1',
    rating: 5,
    quote:
      'They handled my mum’s 20-year-old lace gown for my wedding. I was terrified to hand it over and it came back better than I remembered it.',
    initials: 'AN',
    tint: 'from-rose-500 to-pink-600',
  },
  {
    name: 'Chidi O.',
    role: 'Victoria Island',
    rating: 5,
    quote:
      'I send three senator sets a week. Never once late, never once a missing button. The WhatsApp updates are what sold me.',
    initials: 'CO',
    tint: 'from-primary-500 to-primary-700',
  },
  {
    name: 'Hotel Bellevue',
    role: 'Contract client, Ikeja',
    rating: 5,
    quote:
      'Two hundred sheets a day, collected at 6am, back by 6pm. They have not missed a single collection in two years.',
    initials: 'HB',
    tint: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Funmi A.',
    role: 'Surulere',
    rating: 5,
    quote:
      'My agbada came back with the embroidery still crisp. No shine, no flattening. That is the part everyone else gets wrong.',
    initials: 'FA',
    tint: 'from-emerald-500 to-teal-600',
  },
]

const AUTOPLAY_MS = 6000

export default function Testimonials() {
  const reduce = useReducedMotion()
  const [[index, direction], setState] = useState([0, 0])
  const [paused, setPaused] = useState(false)

  const paginate = useCallback((dir) => {
    setState(([i]) => [(i + dir + testimonials.length) % testimonials.length, dir])
  }, [])

  useEffect(() => {
    if (paused || reduce) return
    const id = setInterval(() => paginate(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, reduce, paginate, index])

  const t = testimonials[index]

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="text-center mb-14"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mt-2 mb-4">
            What Our Customers Say
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-14 min-h-[22rem] flex items-center">
            <Quote className="absolute top-8 left-8 w-16 h-16 text-primary-100" aria-hidden="true" />

            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.blockquote
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: EASE }}
                className="relative z-10 w-full text-center"
              >
                <div className="flex justify-center gap-1 mb-6" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={reduce ? false : { scale: 0, rotate: -40 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.15 + i * 0.07, ...spring }}
                    >
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    </motion.span>
                  ))}
                </div>

                <p className="text-xl sm:text-2xl text-secondary-800 leading-relaxed font-medium mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <footer className="flex items-center justify-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.tint} text-white font-bold flex items-center justify-center shadow-lg`}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div className="text-left">
                    <cite className="not-italic font-bold text-secondary-900 block">
                      {t.name}
                    </cite>
                    <span className="text-sm text-gray-500">{t.role}</span>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous review"
              className="p-3 rounded-xl bg-white border border-gray-200 text-secondary-700 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-colors shadow-sm focus-ring"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Show review from ${item.name}`}
                  aria-current={i === index}
                  className={`h-2.5 rounded-full transition-all focus-ring ${
                    i === index ? 'w-8 bg-primary-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              aria-label="Next review"
              className="p-3 rounded-xl bg-white border border-gray-200 text-secondary-700 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-colors shadow-sm focus-ring"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
