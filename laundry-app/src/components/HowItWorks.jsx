import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { CalendarCheck, Truck, Sparkles, PackageCheck } from 'lucide-react'
import { fadeUp, stagger, inView, spring } from '../lib/motion'

const steps = [
  {
    icon: CalendarCheck,
    title: 'Book a pickup',
    body: 'Choose your garments and a time that suits you, on WhatsApp, by phone, or right here on the site.',
  },
  {
    icon: Truck,
    title: 'We collect',
    body: 'Our rider arrives in the window you picked, counts your items with you and issues a receipt on the spot.',
  },
  {
    icon: Sparkles,
    title: 'Expert care',
    body: 'Each fabric is sorted and treated by hand. Lace, aso-oke and embroidery never share a cycle with everyday wash.',
  },
  {
    icon: PackageCheck,
    title: 'Delivered fresh',
    body: 'Pressed, wrapped and back at your door in 4 days, or within 24 hours on express. You approve before you pay.',
  },
]

export default function HowItWorks() {
  const reduce = useReducedMotion()
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.8', 'end 0.6'],
  })
  // The connecting line draws itself as the section scrolls past.
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="how-it-works" className="py-24 bg-secondary-900 relative overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full bg-primary-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="text-center mb-20"
        >
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
            Simple as that
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Four steps between you and a wardrobe that looks brand new.
          </p>
        </motion.div>

        <div ref={trackRef} className="relative">
          {/* connecting rail, horizontal on desktop, vertical on mobile */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-white/10">
            <motion.div
              style={{ scaleX: reduce ? 1 : lineScale }}
              className="h-full origin-left bg-gradient-to-r from-primary-500 to-accent-green"
            />
          </div>
          <div className="lg:hidden absolute top-0 bottom-0 left-10 w-0.5 bg-white/10">
            <motion.div
              style={{ scaleY: reduce ? 1 : lineScale }}
              className="w-full origin-top bg-gradient-to-b from-primary-500 to-accent-green"
            />
          </div>

          <motion.ol
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="grid lg:grid-cols-4 gap-12 lg:gap-8"
          >
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                variants={fadeUp}
                className="relative flex lg:flex-col gap-6 lg:gap-0 lg:text-center"
              >
                {/* numbered node */}
                <motion.div
                  whileHover={reduce ? undefined : { scale: 1.1 }}
                  transition={spring}
                  className="relative z-10 shrink-0 lg:mx-auto w-20 h-20 rounded-2xl bg-secondary-800 border border-white/10 flex items-center justify-center shadow-xl"
                >
                  <step.icon className="w-8 h-8 text-primary-400" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent-green text-white text-xs font-bold flex items-center justify-center ring-4 ring-secondary-900">
                    {i + 1}
                  </span>
                </motion.div>

                <div className="lg:mt-6">
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
