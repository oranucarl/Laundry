import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Send, MapPin, Phone, Mail, Clock, Loader2, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react'
import { business, whatsappLink } from '../data/business'
import { formatNaira } from '../data/catalogue'
import { useOrder } from '../context/OrderContext'
import { fadeUp, stagger, inView, spring } from '../lib/motion'

const serviceOptions = [
  'Door to Door Pickup',
  'Traditional Garment Care',
  'Contract / Business Service',
  'Retail Drop-off',
  'Express (24 hour)',
  'Bulk / Household',
]

const EMPTY = { firstName: '', lastName: '', email: '', phone: '', service: '', message: '' }

export default function Contact() {
  const reduce = useReducedMotion()
  const { lines, total, itemCount } = useOrder()

  const [formData, setFormData] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const contactInfo = [
    {
      icon: MapPin, label: 'Address',
      value: `${business.address.street}, ${business.address.area}, ${business.address.city}`,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${business.address.street} ${business.address.area} ${business.address.city}`
      )}`,
    },
    { icon: Phone, label: 'Phone', value: business.phoneDisplay, href: `tel:${business.phone}` },
    { icon: Mail, label: 'Email', value: business.email, href: `mailto:${business.email}` },
    {
      icon: Clock, label: 'Hours',
      value: business.hours.map((h) => (h.close ? `${h.days}: ${h.open}–${h.close}` : `${h.days}: ${h.open}`)).join(' · '),
    },
  ]

  const validate = () => {
    const e = {}
    if (!formData.firstName.trim()) e.firstName = 'First name is required'
    if (!formData.lastName.trim()) e.lastName = 'Last name is required'
    if (!formData.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Please enter a valid email'
    if (!formData.phone.trim()) e.phone = 'Phone number is required'
    if (!formData.service) e.service = 'Please select a service'
    return e
  }

  /** Human-readable summary of anything picked in the pricing estimator. */
  const cartSummary = () =>
    itemCount === 0
      ? 'No items selected in the estimator.'
      : lines.map((l) => `${l.qty} x ${l.name} (${formatNaira(l.lineTotal)})`).join(', ') +
        ` — estimated total ${formatNaira(total)}`

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length) return

    // Honeypot: bots fill hidden fields, humans never see them.
    if (e.target.company?.value) return

    setStatus('sending')

    // No relay configured yet → hand the order to WhatsApp so nothing is lost.
    if (!business.formAccessKey) {
      const msg =
        `New enquiry from the website\n\n` +
        `Name: ${formData.firstName} ${formData.lastName}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Service: ${formData.service}\n` +
        `Order: ${cartSummary()}\n` +
        (formData.message ? `\nMessage: ${formData.message}` : '')
      window.open(whatsappLink(msg), '_blank', 'noopener')
      setStatus('sent')
      setFormData(EMPTY)
      setTimeout(() => setStatus('idle'), 6000)
      return
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: business.formAccessKey,
          subject: `New order enquiry — ${formData.firstName} ${formData.lastName}`,
          from_name: `${business.name} website`,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          order_summary: cartSummary(),
          message: formData.message || '—',
        }),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      setStatus('sent')
      setFormData(EMPTY)
      setTimeout(() => setStatus('idle'), 6000)
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const field = (name) =>
    `w-full px-4 py-3 rounded-xl border bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
      errors[name] ? 'border-red-500' : 'border-gray-200'
    }`

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-secondary-900 to-secondary-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Contact Us</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Book a pickup, ask about a fabric, or request a contract rate card.
            We reply within a few minutes during opening hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* ── Contact details ── */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item) => {
              const Inner = (
                <>
                  <div className="bg-primary-500/20 p-3 rounded-xl shrink-0">
                    <item.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-gray-400 text-sm">{item.label}</div>
                    <div className="text-white font-medium break-words">{item.value}</div>
                  </div>
                </>
              )
              return (
                <motion.div key={item.label} variants={fadeUp}>
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(item.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="flex items-start gap-4 group focus-ring-dark rounded-xl"
                    >
                      <div className="flex items-start gap-4 group-hover:opacity-80 transition-opacity">
                        {Inner}
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-4">{Inner}</div>
                  )}
                </motion.div>
              )
            })}

            <motion.a
              variants={fadeUp}
              href={whatsappLink(`Hi ${business.name}, I'd like to book a pickup.`)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduce ? undefined : { scale: 1.02 }}
              transition={spring}
              className="flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-greenDark text-white py-4 rounded-2xl font-semibold transition-colors focus-ring-dark"
            >
              <MessageCircle className="w-5 h-5" />
              Message us on WhatsApp
            </motion.a>

            <motion.div
              variants={fadeUp}
              className="bg-secondary-800/50 rounded-2xl p-6 border border-secondary-700"
            >
              <h4 className="text-white font-semibold mb-3">Why choose us?</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• 24-hour express turnaround available</li>
                <li>• Free pickup &amp; delivery across Lagos</li>
                <li>• Hand finishing for lace, beading and embroidery</li>
                <li>• Inspect before you pay — redo at no charge</li>
              </ul>
            </motion.div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-2xl" noValidate>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">Place Your Order</h3>
              <p className="text-sm text-gray-500 mb-6">
                Fields marked * are required.
              </p>

              {/* Carries whatever the visitor picked in the pricing estimator */}
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mb-6 p-4 rounded-2xl bg-primary-50 border border-primary-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-primary-900">
                          Your selection ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                        </span>
                        <span className="font-bold text-primary-900">{formatNaira(total)}</span>
                      </div>
                      <ul className="text-sm text-primary-800 space-y-0.5">
                        {lines.map((l) => (
                          <li key={l.id}>
                            {l.qty} × {l.name}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-primary-700 mt-2">
                        This is attached automatically when you send the form.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* honeypot — hidden from people, irresistible to bots */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] w-px h-px opacity-0"
              />

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { name: 'firstName', label: 'First Name *', type: 'text', placeholder: 'John', autoComplete: 'given-name' },
                  { name: 'lastName', label: 'Last Name *', type: 'text', placeholder: 'Doe', autoComplete: 'family-name' },
                  { name: 'email', label: 'Email Address *', type: 'email', placeholder: 'john@example.com', autoComplete: 'email' },
                  { name: 'phone', label: 'Phone Number *', type: 'tel', placeholder: '+234 800 000 0000', autoComplete: 'tel' },
                ].map((f) => (
                  <div key={f.name}>
                    <label htmlFor={f.name} className="block text-sm font-medium text-secondary-700 mb-2">
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      autoComplete={f.autoComplete}
                      value={formData[f.name]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      aria-invalid={Boolean(errors[f.name])}
                      aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                      className={field(f.name)}
                    />
                    {errors[f.name] && (
                      <p id={`${f.name}-error`} role="alert" className="text-red-500 text-sm mt-1">
                        {errors[f.name]}
                      </p>
                    )}
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label htmlFor="service" className="block text-sm font-medium text-secondary-700 mb-2">
                    Service Type *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.service)}
                    className={field('service')}
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <p role="alert" className="text-red-500 text-sm mt-1">{errors.service}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your garments, any stains, or a preferred pickup time..."
                    className={`${field('message')} resize-none`}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                whileHover={reduce || status !== 'idle' ? undefined : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={spring}
                className={`w-full mt-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors focus-ring disabled:opacity-80 ${
                  status === 'sent'
                    ? 'bg-accent-green text-white'
                    : status === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
              >
                {status === 'sending' && (<><Loader2 className="w-5 h-5 animate-spin" />Sending…</>)}
                {status === 'sent' && (<><CheckCircle className="w-5 h-5" />Order sent — we&rsquo;ll be in touch</>)}
                {status === 'error' && (<><AlertCircle className="w-5 h-5" />Something went wrong — try again</>)}
                {status === 'idle' && (<><Send className="w-5 h-5" />Submit Order</>)}
              </motion.button>

              {status === 'error' && (
                <p role="alert" className="text-sm text-center text-gray-600 mt-4">
                  You can also{' '}
                  <a
                    href={whatsappLink(`Hi ${business.name}, I tried the website form and it failed.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 font-semibold hover:underline"
                  >
                    message us on WhatsApp
                  </a>{' '}
                  or call {business.phoneDisplay}.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
