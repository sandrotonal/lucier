import type { Transition, Variants } from 'framer-motion'

export const EASE_OUT: Transition['ease'] = [0.25, 0.1, 0.25, 1]

export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: EASE_OUT },
}

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.8 },
}

export const fadeUpAnimate = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE_OUT },
}

export const stagger: Variants = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: EASE_OUT },
}

export const clipReveal = {
  initial: { clipPath: 'inset(0 100% 0 0)' },
  whileInView: { clipPath: 'inset(0 0% 0 0)' },
  viewport: { once: true },
  transition: { duration: 1, ease: EASE_OUT },
}
