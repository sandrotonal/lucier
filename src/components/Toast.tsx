import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/StoreContext'

export default function Toast() {
  const { toasts } = useStore()

  return (
    <div className="fixed bottom-28 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="bg-primary text-on-primary px-6 py-3 shadow-2xl font-label-caps text-label-caps uppercase whitespace-nowrap pointer-events-auto"
            style={{ borderRadius: '0' }}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
