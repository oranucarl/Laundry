import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MessageCircle, X, Send, Phone, MapPin, Plus, ExternalLink, Sparkles } from 'lucide-react'
import { respond, greeting } from '../lib/assistant'
import { business, whatsappLink } from '../data/business'
import { useOrder } from '../context/OrderContext'
import { spring, EASE } from '../lib/motion'

/** Renders **bold** spans and newlines from the assistant's answers. */
function RichText({ text }) {
  return text.split('\n').map((line, i) => (
    <span key={i} className="block">
      {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={j} className="font-semibold text-secondary-900">{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )}
      {line === '' && <span className="block h-2" aria-hidden="true" />}
    </span>
  ))
}

const ACTION_ICON = { add: Plus, whatsapp: MessageCircle, call: Phone, scroll: MapPin }

export default function Assistant() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [thinking, setThinking] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(() => [{ from: 'bot', ...greeting() }])
  const [unread, setUnread] = useState(false)

  const { setQty, cart, itemCount } = useOrder()
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  // Keep the newest message in view.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [messages, thinking, reduce])

  useEffect(() => { if (open) { setUnread(false); inputRef.current?.focus() } }, [open])

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = useCallback((raw) => {
    const text = (raw ?? '').trim()
    if (!text) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setThinking(true)
    // A short pause reads as considered rather than instant and mechanical.
    const delay = reduce ? 0 : 420 + Math.min(text.length * 9, 500)
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', ...respond(text) }])
      setThinking(false)
      if (!open) setUnread(true)
    }, delay)
  }, [reduce, open])

  const runAction = (a) => {
    if (a.type === 'add') {
      setQty(a.itemId, (cart[a.itemId] || 0) + 1)
      setMessages((m) => [...m, {
        from: 'bot',
        text: `Added. Your order now has ${itemCount + 1} item${itemCount + 1 === 1 ? '' : 's'}. You can review the total at the bottom of the screen, or keep asking me about other garments.`,
        chips: ['Book a pickup', 'What else do you clean?'],
      }])
    } else if (a.type === 'whatsapp') {
      window.open(whatsappLink(a.message), '_blank', 'noopener')
    } else if (a.type === 'call') {
      window.location.href = `tel:${business.phone}`
    } else if (a.type === 'scroll') {
      document.querySelector(a.target)?.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
    }
  }

  return (
    <>
      {/* ── Launcher ── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={open}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={spring}
        className={`fixed right-5 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-2xl flex items-center justify-center text-white transition-colors focus-ring
          ${open ? 'bg-secondary-800' : 'bg-accent-green shadow-accent-green/30'}
          ${itemCount > 0 ? 'bottom-44 sm:bottom-40' : 'bottom-24 sm:bottom-6'}`}
      >
        {!open && !reduce && (
          <span className="absolute inset-0 rounded-2xl bg-accent-green animate-ping opacity-20" aria-hidden="true" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'chat'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="relative"
          >
            {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />}
          </motion.span>
        </AnimatePresence>
        {unread && !open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-500 ring-2 ring-white" />
        )}
      </motion.button>

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Chat assistant"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
            className={`fixed z-50 flex flex-col overflow-hidden bg-white shadow-2xl border border-gray-200
              inset-x-3 rounded-3xl sm:inset-x-auto sm:right-5 sm:w-[400px]
              ${itemCount > 0 ? 'bottom-60' : 'bottom-40 sm:bottom-24'}
              top-20 sm:top-auto sm:h-[540px] sm:max-h-[calc(100vh-17rem)]`}
          >
            {/* Header */}
            <div className="shrink-0 bg-secondary-900 text-white px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent-green flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm truncate">{business.name} Assistant</div>
                <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                  Answers from our live price list
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus-ring-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((m, i) => (
                <div key={i}>
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'ml-auto bg-primary-600 text-white rounded-br-md'
                        : 'bg-white text-secondary-700 border border-gray-200 rounded-bl-md'
                    }`}
                  >
                    {m.from === 'bot' ? <RichText text={m.text} /> : m.text}
                  </motion.div>

                  {/* Inline actions */}
                  {m.actions?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {m.actions.map((a, j) => {
                        const Icon = ACTION_ICON[a.type] ?? ExternalLink
                        return (
                          <button
                            key={j}
                            onClick={() => runAction(a)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-secondary-900 text-white hover:bg-primary-600 transition-colors focus-ring"
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {a.label}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {/* Suggested follow-ups */}
                  {m.chips?.length > 0 && i === messages.length - 1 && !thinking && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {m.chips.map((c) => (
                        <button
                          key={c}
                          onClick={() => send(c)}
                          className="text-xs px-3 py-1.5 rounded-full border border-primary-200 text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors focus-ring"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {thinking && (
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 w-16 flex gap-1.5">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      animate={reduce ? undefined : { y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                      className="w-1.5 h-1.5 rounded-full bg-gray-400"
                    />
                  ))}
                  <span className="sr-only">Assistant is typing</span>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input) }}
              className="shrink-0 border-t border-gray-200 bg-white p-3 flex items-center gap-2"
            >
              <label htmlFor="assistant-input" className="sr-only">Type your question</label>
              <input
                id="assistant-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about prices, delivery, timing..."
                autoComplete="off"
                className="flex-1 min-w-0 px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="shrink-0 w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-40 disabled:hover:bg-primary-600 transition-colors focus-ring"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
