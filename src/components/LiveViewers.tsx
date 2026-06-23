import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LiveViewersProps {
  productId: number
}

export default function LiveViewers({ productId }: LiveViewersProps) {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const baseCount = Math.floor(Math.random() * 15) + 8
    setCount(baseCount)
    setShow(true)

    const interval = setInterval(() => {
      setCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1
        const newCount = Math.max(5, Math.min(30, prev + change))
        return newCount
      })
    }, 12000)

    return () => clearInterval(interval)
  }, [productId])

  if (!show || count === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="inline-flex items-center gap-2 bg-surface-container-low border border-primary/30 px-3 py-2 mb-4"
      >
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-primary rounded-full"
        />
        <p className="font-label-caps text-[11px] uppercase text-secondary">
          <span className="text-primary font-bold">{count}</span> people viewing this
        </p>
      </motion.div>
    </AnimatePresence>
  )
}
