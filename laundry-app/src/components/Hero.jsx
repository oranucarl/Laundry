import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Play, Pause, Truck, Clock3, ShieldCheck } from 'lucide-react'
import useCountUp from '../hooks/useCountUp'
import { business, yearsOfService } from '../data/business'
import { EASE, spring } from '../lib/motion'

const B = import.meta.env.BASE_URL
const heroImages = [
  { src: `${B}images/banner1.webp`, alt: 'Freshly pressed garments on a rail' },
  { src: `${B}images/banner2.webp`, alt: 'Folded laundry ready for delivery' },
  { src: `${B}images/banner3.webp`, alt: 'Commercial washing machines in operation' },
  { src: `${B}images/banner4.webp`, alt: 'Clean linen being sorted' },
  { src: `${B}images/banner5.webp`, alt: 'Neatly stacked clean towels' },
]

const SLIDE_MS = 5500

function Stat({ target, suffix = '', label, decimals }) {
  const { ref, display } = useCountUp(target, { decimals })
  return (
    <div ref={ref}>
      <div className="text-3xl font-bold text-white tabular-nums">
        {display}
        {suffix}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)

  // Gentle parallax: the backdrop drifts slower than the page.
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 700], [0, 140])
  const contentY = useTransform(scrollY, [0, 700], [0, 60])
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0])

  const go = useCallback((i) => setIndex((i + heroImages.length) % heroImages.length), [])

  useEffect(() => {
    if (!playing || reduce) return
    const id = setInterval(() => go(index + 1), SLIDE_MS)
    return () => clearInterval(id)
  }, [playing, reduce, index, go])

  // Preload the first frame so the hero never flashes empty.
  useEffect(() => {
    const img = new Image()
    img.src = heroImages[0].src
  }, [])

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background carousel (crossfade, no blank gap) ── */}
      <motion.div style={{ y: reduce ? 0 : bgY }} className="absolute inset-0 -top-[10%] h-[120%]">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2, ease: EASE }, scale: { duration: 7, ease: 'linear' } }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImages[index].src})` }}
            role="img"
            aria-label={heroImages[index].alt}
          />
        </AnimatePresence>
      </motion.div>

      {/* Layered scrim. Phones get a flat, heavier tint because the copy runs
          the full width; wider screens get the directional wash instead. */}
      <div className="absolute inset-0 bg-secondary-950/75 lg:bg-secondary-950/40" />
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/70 via-secondary-900/45 to-primary-900/65" />
      <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-secondary-950/85 via-secondary-950/45 to-transparent" />

      {/* ── Content ── */}
      <motion.div
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, ease: EASE }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/10"
            >
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-primary-200 text-sm font-medium">
                Specialists in traditional garment care
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-6"
            >
              Agbada, lace &amp; everyday wear
              <br />
              <span className="text-gradient">cared for properly.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, ease: EASE }}
              className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed"
            >
              Embroidery that keeps its relief. Lace that keeps its beading. Gele
              that holds its shape. Free pickup and delivery across Lagos, with
              24-hour express when you need it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, ease: EASE }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={reduce ? undefined : { scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
                onClick={() => scrollTo('#pricing')}
                className="bg-accent-green hover:bg-accent-greenDark text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-colors focus-ring-dark shadow-lg shadow-accent-green/25"
              >
                See prices &amp; order
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={reduce ? undefined : { scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
                onClick={() => scrollTo('#how-it-works')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition-colors border border-white/20 focus-ring-dark"
              >
                How it works
              </motion.button>
            </motion.div>

            {/* trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.45 }}
              className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-gray-300"
            >
              {[
                { icon: Truck, text: 'Free pickup & delivery' },
                { icon: Clock3, text: '24hr express' },
                { icon: ShieldCheck, text: 'Damage guarantee' },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-accent-green" />
                  {text}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="flex gap-10 mt-10"
            >
              <Stat target={yearsOfService} suffix="+" label="Years of service" />
              <Stat target={24} suffix="hr" label="Express delivery" />
              <Stat target={10} suffix="k+" label="Orders completed" />
            </motion.div>
          </div>

          {/* ── Live order card (replaces the old placeholder icon) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
            className="hidden lg:flex justify-center"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-sm"
            >
              <div className="absolute -inset-8 bg-primary-500/25 blur-3xl rounded-full" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white/60 text-xs uppercase tracking-widest">
                    Order #CL-2481
                  </span>
                  <span className="flex items-center gap-1.5 text-accent-green text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                    In transit
                  </span>
                </div>

                {[
                  { label: 'Collected', time: 'Today, 8:12 AM', done: true },
                  { label: 'Cleaning & pressing', time: 'Today, 11:40 AM', done: true },
                  { label: 'Quality check', time: 'In progress', done: false },
                  { label: 'Out for delivery', time: 'Tomorrow, 9:00 AM', done: false },
                ].map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + i * 0.16 }}
                    className="flex gap-4 pb-5 last:pb-0 relative"
                  >
                    {i < 3 && (
                      <span className="absolute left-[11px] top-6 bottom-0 w-px bg-white/15" />
                    )}
                    <span
                      className={`relative z-10 w-6 h-6 rounded-full shrink-0 border-2 flex items-center justify-center ${
                        step.done
                          ? 'bg-accent-green border-accent-green'
                          : 'bg-white/10 border-white/30'
                      }`}
                    >
                      {step.done && (
                        <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true">
                          <path d="M2 6l3 3 5-6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className={`text-sm font-semibold ${step.done ? 'text-white' : 'text-white/50'}`}>
                        {step.label}
                      </div>
                      <div className="text-xs text-white/40">{step.time}</div>
                    </div>
                  </motion.div>
                ))}

                <div className="mt-2 pt-5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-white/60 text-sm">3 items · Express</span>
                  <span className="text-white font-bold">
                    {business.currency}18,200
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Carousel controls ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause background slideshow' : 'Play background slideshow'}
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-ring-dark"
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <div className="flex gap-2" role="tablist" aria-label="Background image">
          {heroImages.map((img, i) => (
            <button
              key={img.src}
              onClick={() => go(i)}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show image ${i + 1}: ${img.alt}`}
              className={`h-2 rounded-full transition-all focus-ring-dark ${
                i === index ? 'w-8 bg-primary-400' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 hidden md:block"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/40 text-xs flex flex-col items-center gap-2"
        >
          <span className="[writing-mode:vertical-rl] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
