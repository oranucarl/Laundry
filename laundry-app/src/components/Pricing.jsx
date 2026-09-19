import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion'
import { Plus, Minus, Zap, Clock, ShoppingBag, MessageCircle, X, Sparkles } from 'lucide-react'
import { catalogue, groups, turnarounds, formatNaira } from '../data/catalogue'
import { whatsappLink, business } from '../data/business'
import { useOrder, FREE_DELIVERY_OVER } from '../context/OrderContext'
import { fadeUp, stagger, inView, EASE, spring } from '../lib/motion'

export default function Pricing() {
  const reduce = useReducedMotion()
  const [group, setGroup] = useState('men')
  const { cart, setQty, clear, speed, setSpeed, multiplier, lines, itemCount, total, qualifiesFree } = useOrder()

  const visible = useMemo(() => catalogue.filter((i) => i.group === group), [group])
  const progress = Math.min((total / FREE_DELIVERY_OVER) * 100, 100)

  const orderMessage = () => {
    const speedLabel = turnarounds.find((t) => t.id === speed)
    const body = lines
      .map((l) => `• ${l.qty} × ${l.name}: ${formatNaira(l.lineTotal)}`)
      .join('\n')
    return (
      `Hello ${business.name}, I'd like to place an order.\n\n` +
      `${body}\n\n` +
      `Turnaround: ${speedLabel.label} (${speedLabel.detail})\n` +
      `Estimated total: ${formatNaira(total)}\n` +
      `${qualifiesFree ? 'Includes free pickup & delivery.' : ''}`
    )
  }

  return (
    <section id="pricing" className="relative py-24 bg-white overflow-hidden">
      {/* soft background wash */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[34rem] h-[34rem] rounded-full bg-primary-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-accent-green/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="text-center mb-12"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            Best Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mt-2 mb-4">
            Every Garment, Priced Up Front
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From agbada and lace to everyday shirts. Pick your pieces and watch
            your total build. No hidden charges, no surprises at delivery.
          </p>
        </motion.div>

        {/* ── Controls: category tabs + turnaround toggle ── */}
        <LayoutGroup id="pricing-controls">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between mb-12">
            {/* Category tabs */}
            <div
              role="tablist"
              aria-label="Garment category"
              className="flex flex-wrap gap-2 p-1.5 bg-gray-100 rounded-2xl"
            >
              {groups.map((g) => {
                const active = g.id === group
                return (
                  <button
                    key={g.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setGroup(g.id)}
                    className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors focus-ring ${
                      active ? 'text-white' : 'text-secondary-600 hover:text-secondary-900'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="tab-pill"
                        transition={spring}
                        className="absolute inset-0 bg-primary-600 rounded-xl"
                      />
                    )}
                    <span className="relative z-10">{g.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Turnaround toggle */}
            <div
              role="radiogroup"
              aria-label="Turnaround speed"
              className="flex gap-2 p-1.5 bg-gray-100 rounded-2xl self-start lg:self-auto"
            >
              {turnarounds.map((t) => {
                const active = t.id === speed
                return (
                  <button
                    key={t.id}
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSpeed(t.id)}
                    className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors focus-ring ${
                      active ? 'text-white' : 'text-secondary-600 hover:text-secondary-900'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="speed-pill"
                        transition={spring}
                        className={`absolute inset-0 rounded-xl ${
                          t.id === 'express' ? 'bg-accent-green' : 'bg-secondary-800'
                        }`}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {t.id === 'express' ? <Zap className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      {t.label}
                      <span className={active ? 'text-white/70' : 'text-gray-400'}>
                        {t.detail}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </LayoutGroup>

        {/* ── Garment grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={group}
            variants={stagger(0.07)}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {visible.map((item) => {
              const qty = cart[item.id] || 0
              const price = item.price * multiplier
              return (
                <motion.article
                  key={item.id}
                  variants={fadeUp}
                  whileHover={reduce ? undefined : { y: -8 }}
                  transition={spring}
                  className={`group relative flex flex-col rounded-3xl border-2 bg-white overflow-hidden transition-colors duration-300 ${
                    qty > 0
                      ? 'border-primary-500 shadow-xl shadow-primary-500/10'
                      : 'border-gray-100 hover:border-primary-200 shadow-lg'
                  }`}
                >
                  {item.popular && (
                    <span className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-accent-green text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                      <Sparkles className="w-3 h-3" /> Popular
                    </span>
                  )}

                  {/* Photograph */}
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                    <motion.img
                      src={`${import.meta.env.BASE_URL}images/garments/${item.image}.webp`}
                      alt={item.name}
                      loading="lazy"
                      width="800"
                      height="560"
                      className="w-full h-full object-cover"
                      whileHover={reduce ? undefined : { scale: 1.07 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                    {/* keeps the badge and card edge readable over any photo */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary-900/25 to-transparent" />
                    <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
                  </div>

                  {/* Copy */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-lg font-bold text-secondary-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1.5 mb-5 flex-1 leading-relaxed">
                      {item.blurb}
                    </p>

                    <div className="flex items-end justify-between mb-5">
                      <div>
                        <motion.div
                          key={price}
                          initial={reduce ? false : { opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-2xl font-bold text-secondary-900"
                        >
                          {formatNaira(price)}
                        </motion.div>
                        <div className="text-xs text-gray-400">{item.unit}</div>
                      </div>
                      {speed === 'express' && (
                        <span className="text-xs font-semibold text-accent-green bg-accent-green/10 px-2 py-1 rounded-lg">
                          24hr
                        </span>
                      )}
                    </div>

                    {/* Quantity stepper */}
                    <AnimatePresence mode="wait" initial={false}>
                      {qty === 0 ? (
                        <motion.button
                          key="add"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setQty(item.id, 1)}
                          className="w-full py-3 rounded-xl font-semibold text-sm bg-secondary-900 text-white hover:bg-primary-600 transition-colors focus-ring"
                        >
                          Add to order
                        </motion.button>
                      ) : (
                        <motion.div
                          key="stepper"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-between bg-primary-50 rounded-xl p-1.5"
                        >
                          <button
                            onClick={() => setQty(item.id, qty - 1)}
                            aria-label={`Remove one ${item.name}`}
                            className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary-700 hover:bg-primary-600 hover:text-white transition-colors focus-ring"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <motion.span
                            key={qty}
                            initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={spring}
                            className="font-bold text-secondary-900 tabular-nums"
                          >
                            {qty}
                          </motion.span>
                          <button
                            onClick={() => setQty(item.id, qty + 1)}
                            aria-label={`Add one ${item.name}`}
                            className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary-700 hover:bg-primary-600 hover:text-white transition-colors focus-ring"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="text-center text-sm text-gray-500 mt-10"
        >
          Free pickup &amp; delivery on orders over {formatNaira(FREE_DELIVERY_OVER)}.
          Bulk and contract rates available.{' '}
          <a href="#contact" className="text-primary-600 font-semibold hover:underline">
            Ask for a quote
          </a>.
        </motion.p>
      </div>

      {/* ── Live estimator dock ── */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={spring}
            className="fixed bottom-0 inset-x-0 z-40 px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none"
          >
            <div className="pointer-events-auto max-w-4xl mx-auto rounded-3xl bg-secondary-900/95 backdrop-blur-xl shadow-2xl border border-white/10 p-5 sm:p-6">
              {/* free-delivery progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-300">
                    {qualifiesFree ? (
                      <span className="text-accent-green font-semibold">
                        ✓ Free pickup &amp; delivery unlocked
                      </span>
                    ) : (
                      <>Add {formatNaira(FREE_DELIVERY_OVER - total)} more for free delivery</>
                    )}
                  </span>
                  <span className="text-gray-400 tabular-nums">{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${qualifiesFree ? 'bg-accent-green' : 'bg-primary-500'}`}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <motion.span
                      key={itemCount}
                      initial={reduce ? false : { scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={spring}
                      className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-accent-green text-white text-xs font-bold flex items-center justify-center"
                    >
                      {itemCount}
                    </motion.span>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs uppercase tracking-wide">
                      Estimated total
                    </div>
                    <motion.div
                      key={total}
                      initial={reduce ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-bold text-white tabular-nums"
                    >
                      {formatNaira(total)}
                    </motion.div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={clear}
                    className="px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium focus-ring"
                  >
                    <X className="w-4 h-4 inline mr-1" />
                    Clear
                  </button>
                  <motion.a
                    href={whatsappLink(orderMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={reduce ? undefined : { scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 sm:flex-none bg-accent-green hover:bg-accent-greenDark text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors focus-ring"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Send order
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
