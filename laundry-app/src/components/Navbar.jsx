import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, Waves, Phone, ShoppingBag } from 'lucide-react'
import useScrollSpy from '../hooks/useScrollSpy'
import { useOrder } from '../context/OrderContext'
import { business } from '../data/business'
import { spring, EASE } from '../lib/motion'

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Locations', href: '#coverage' },
  { name: 'FAQ', href: '#faq' },
]

const SECTION_IDS = ['home', 'services', 'how-it-works', 'pricing', 'about', 'coverage', 'testimonials', 'faq', 'contact']

export default function Navbar() {
  const reduce = useReducedMotion()
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(SECTION_IDS)
  const { itemCount } = useOrder()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const go = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const solid = isScrolled || menuOpen

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid ? 'glass shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); go('#home') }}
            className="flex items-center gap-2 shrink-0 focus-ring"
            whileHover={reduce ? undefined : { scale: 1.04 }}
          >
            <Waves className={`w-8 h-8 ${solid ? 'text-primary-600' : 'text-white'}`} />
            <span className={`text-lg sm:text-xl font-bold font-display ${solid ? 'text-secondary-900' : 'text-white'}`}>
              Carlson&rsquo;s Laundry
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = `#${activeId}` === link.href
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); go(link.href) }}
                  aria-current={active ? 'true' : undefined}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors focus-ring ${
                    solid
                      ? active ? 'text-primary-600' : 'text-secondary-700 hover:text-primary-600'
                      : active ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      transition={spring}
                      className={`absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full ${
                        solid ? 'bg-primary-600' : 'bg-white'
                      }`}
                    />
                  )}
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Order count — appears once the estimator has items */}
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={spring}
                  onClick={() => go('#pricing')}
                  aria-label={`${itemCount} items in your order`}
                  className={`relative p-2.5 rounded-xl transition-colors focus-ring ${
                    solid ? 'text-secondary-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-accent-green text-white text-[10px] font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            <a
              href={`tel:${business.phone}`}
              className={`hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors focus-ring ${
                solid ? 'text-secondary-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">{business.phoneDisplay}</span>
            </a>

            <motion.a
              href="#pricing"
              onClick={(e) => { e.preventDefault(); go('#pricing') }}
              whileHover={reduce ? undefined : { scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={spring}
              className="hidden sm:block bg-accent-green hover:bg-accent-greenDark text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors focus-ring"
            >
              Order now
            </motion.a>

            {/* Mobile toggle */}
            <button
              className={`lg:hidden p-2 rounded-lg focus-ring ${solid ? 'text-secondary-900' : 'text-white'}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="lg:hidden overflow-hidden glass border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); go(link.href) }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`block font-medium py-3 px-3 rounded-xl transition-colors focus-ring ${
                    `#${activeId}` === link.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-secondary-700 hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="pt-3 flex gap-3">
                <a
                  href={`tel:${business.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-secondary-800 py-3 rounded-xl font-medium focus-ring"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
                <a
                  href="#pricing"
                  onClick={(e) => { e.preventDefault(); go('#pricing') }}
                  className="flex-1 bg-accent-green text-white text-center py-3 rounded-xl font-semibold focus-ring"
                >
                  Order now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
