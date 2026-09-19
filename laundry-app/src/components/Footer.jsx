import { motion, useReducedMotion } from 'framer-motion'
import { Waves, Facebook, Twitter, Instagram, Linkedin, ArrowUp, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { business, whatsappLink, yearsOfService } from '../data/business'
import { fadeUp, stagger, inView, spring } from '../lib/motion'

/* Every link below resolves to a section that actually exists. */
const footerLinks = {
  Services: [
    { name: 'Traditional garments', href: '#pricing' },
    { name: 'Everyday wear', href: '#pricing' },
    { name: 'Household & bedding', href: '#pricing' },
    { name: 'Contract services', href: '#services' },
  ],
  Company: [
    { name: 'About us', href: '#about' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ],
  Support: [
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Locations', href: '#coverage' },
    { name: 'Get a quote', href: '#contact' },
  ],
}

// Only renders icons for socials that have a real URL in business.js.
const socialIcons = { facebook: Facebook, twitter: Twitter, instagram: Instagram, linkedin: Linkedin }

export default function Footer() {
  const reduce = useReducedMotion()
  const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  const activeSocials = Object.entries(business.socials).filter(([, url]) => Boolean(url))

  return (
    <footer className="bg-secondary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-12"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); go('#home') }}
              className="inline-flex items-center gap-2 mb-6 focus-ring-dark"
            >
              <Waves className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold font-display">{business.name}</span>
            </a>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              Specialist care for agbada, lace, senator and aso-ebi — alongside
              everyday wear and household linen. {yearsOfService} years serving Lagos.
            </p>

            {/* Contact details — all tappable */}
            <ul className="space-y-3 mb-6 text-sm">
              <li>
                <a href={`tel:${business.phone}`} className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors focus-ring-dark">
                  <Phone className="w-4 h-4 shrink-0" />
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors focus-ring-dark">
                  <Mail className="w-4 h-4 shrink-0" />
                  {business.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 shrink-0" />
                {business.address.street}, {business.address.area}, {business.address.city}
              </li>
            </ul>

            <div className="flex gap-3">
              <motion.a
                href={whatsappLink(`Hi ${business.name}, I'd like to book a pickup.`)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduce ? undefined : { scale: 1.05, y: -2 }}
                transition={spring}
                className="flex items-center gap-2 bg-accent-green hover:bg-accent-greenDark px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors focus-ring-dark"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </motion.a>

              {activeSocials.map(([key, url]) => {
                const Icon = socialIcons[key]
                return (
                  <motion.a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={reduce ? undefined : { scale: 1.1, y: -2 }}
                    transition={spring}
                    className="bg-secondary-800 hover:bg-primary-600 p-3 rounded-xl transition-colors focus-ring-dark"
                    aria-label={key}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <motion.div key={heading} variants={fadeUp}>
              <h4 className="text-lg font-semibold mb-4 font-display">{heading}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); go(link.href) }}
                      className="text-gray-400 hover:text-primary-400 transition-colors focus-ring-dark"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Opening hours */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-12 pt-8 border-t border-secondary-800 grid sm:grid-cols-3 gap-4"
        >
          {business.hours.map((h) => (
            <div key={h.days} className="text-sm">
              <div className="text-gray-300 font-medium">{h.days}</div>
              <div className="text-gray-500">
                {h.close ? `${h.open} – ${h.close}` : h.open}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="border-t border-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={reduce ? undefined : { scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={spring}
            className="bg-primary-600 hover:bg-primary-700 p-3 rounded-xl transition-colors focus-ring-dark"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
