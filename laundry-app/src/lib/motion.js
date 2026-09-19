/** Shared easing + variants so every section animates with one voice. */

// A soft, slightly-overshooting ease. Used everywhere for a consistent feel.
export const EASE = [0.22, 1, 0.36, 1]
export const EASE_SOFT = [0.4, 0, 0.2, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

/** Standard viewport config: animate once, trigger slightly before entry. */
export const inView = { once: true, margin: '-80px' }

/** Spring used for hover lifts and the estimator drawer. */
export const spring = { type: 'spring', stiffness: 260, damping: 26 }
export const springSoft = { type: 'spring', stiffness: 170, damping: 24 }
