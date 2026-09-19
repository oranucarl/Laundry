import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Counts from 0 to `target` once the element scrolls into view.
 * Honours prefers-reduced-motion by jumping straight to the final value.
 */
export default function useCountUp(target, { duration = 1800, decimals = 0 } = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (reduceMotion) return setValue(target)

    let frame
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      // easeOutExpo: fast start, gentle settle
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setValue(target * eased)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, target, duration, reduceMotion])

  const display = decimals
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString()

  return { ref, display }
}
