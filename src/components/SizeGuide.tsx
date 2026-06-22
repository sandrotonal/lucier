import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  open: boolean
  onClose: () => void
}

export default function SizeGuide({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[100] bg-[#F7F4EF] border border-primary w-auto md:w-[600px] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-primary">
              <h2 className="font-headline-md text-[20px] uppercase tracking-tighter">Size Guide</h2>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center border border-primary hover:bg-primary hover:text-surface transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6">
              <table className="w-full border-collapse font-label-caps text-label-caps uppercase">
                <thead>
                  <tr className="border-b border-primary">
                    <th className="text-left py-3 pr-4">Size</th>
                    <th className="text-left py-3 pr-4">Chest (in)</th>
                    <th className="text-left py-3 pr-4">Waist (in)</th>
                    <th className="text-left py-3">Length (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/20">
                  {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
                    <tr key={s} className="hover:bg-black/5 transition-colors">
                      <td className="py-3 pr-4 font-bold">{s}</td>
                      <td className="py-3 pr-4">{Math.floor(34 + ['XS', 'S', 'M', 'L', 'XL'].indexOf(s) * 2)}-{Math.floor(36 + ['XS', 'S', 'M', 'L', 'XL'].indexOf(s) * 2)}</td>
                      <td className="py-3 pr-4">{Math.floor(28 + ['XS', 'S', 'M', 'L', 'XL'].indexOf(s) * 2)}-{Math.floor(30 + ['XS', 'S', 'M', 'L', 'XL'].indexOf(s) * 2)}</td>
                      <td className="py-3">27-28</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-8 font-body-md text-body-md text-secondary">
                <p className="mb-2">Fit: Regular — true to size. Model is 6'1" (185 cm) and wears size M.</p>
                <p>For a relaxed fit, size up. For a tailored fit, size down.</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
