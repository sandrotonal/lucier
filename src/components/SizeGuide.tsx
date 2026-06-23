import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

const SIZE_DATA = [
  { size: 'XS', chest: '34-36', waist: '28-30', hips: '34-36', length: '27' },
  { size: 'S', chest: '36-38', waist: '30-32', hips: '36-38', length: '28' },
  { size: 'M', chest: '38-40', waist: '32-34', hips: '38-40', length: '29' },
  { size: 'L', chest: '40-42', waist: '34-36', hips: '40-42', length: '30' },
  { size: 'XL', chest: '42-44', waist: '36-38', hips: '42-44', length: '31' },
]

export default function SizeGuide({ open, onClose }: Props) {
  const [unit, setUnit] = useState<'in' | 'cm'>('in')

  const convert = (inches: string) => {
    if (unit === 'in') return inches
    const parts = inches.split('-')
    if (parts.length === 2) {
      return `${Math.round(Number(parts[0]) * 2.54)}-${Math.round(Number(parts[1]) * 2.54)}`
    }
    return `${Math.round(Number(inches) * 2.54)}`
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[100] bg-surface border-2 border-primary w-auto md:w-[700px] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-primary bg-surface-container-low">
              <h2 className="font-headline-lg text-[24px] uppercase tracking-tighter">Size Guide</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center border border-primary hover:bg-primary hover:text-on-primary transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <p className="font-label-caps text-label-caps uppercase text-secondary">All measurements</p>
                <div className="flex gap-2 border border-primary">
                  <button
                    onClick={() => setUnit('in')}
                    className={`px-4 py-2 font-label-caps text-[10px] uppercase transition-colors ${
                      unit === 'in' ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-low'
                    }`}
                  >
                    Inches
                  </button>
                  <button
                    onClick={() => setUnit('cm')}
                    className={`px-4 py-2 font-label-caps text-[10px] uppercase transition-colors ${
                      unit === 'cm' ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-low'
                    }`}
                  >
                    CM
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse font-label-caps text-label-caps uppercase">
                  <thead>
                    <tr className="bg-surface-container-low border-b-2 border-primary">
                      <th className="text-left py-4 px-4">Size</th>
                      <th className="text-left py-4 px-4">Chest</th>
                      <th className="text-left py-4 px-4">Waist</th>
                      <th className="text-left py-4 px-4">Hips</th>
                      <th className="text-left py-4 px-4">Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/20">
                    {SIZE_DATA.map((item) => (
                      <tr key={item.size} className="hover:bg-surface-container-low transition-colors">
                        <td className="py-4 px-4 font-bold text-primary">{item.size}</td>
                        <td className="py-4 px-4">{convert(item.chest)}</td>
                        <td className="py-4 px-4">{convert(item.waist)}</td>
                        <td className="py-4 px-4">{convert(item.hips)}</td>
                        <td className="py-4 px-4">{convert(item.length)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-6 border border-primary/30 bg-surface-container-low">
                <div className="flex items-start gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary text-xl">info</span>
                  <div>
                    <h3 className="font-label-caps text-label-caps uppercase mb-2">Fit Guide</h3>
                    <p className="font-body-md text-body-md text-secondary mb-2">
                      Regular fit — true to size. Model is 6'1" (185 cm) wearing size M.
                    </p>
                    <ul className="font-body-md text-[13px] text-secondary space-y-1 list-disc list-inside">
                      <li>For relaxed fit → size up</li>
                      <li>For tailored fit → size down</li>
                      <li>Architectural pieces designed for layering</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="border border-primary/30 p-4">
                  <span className="material-symbols-outlined text-primary mb-2">straighten</span>
                  <h4 className="font-label-caps text-[11px] uppercase mb-1">How to Measure</h4>
                  <p className="font-body-md text-[11px] text-secondary">Use a soft tape measure. Keep it snug but not tight.</p>
                </div>
                <div className="border border-primary/30 p-4">
                  <span className="material-symbols-outlined text-primary mb-2">support_agent</span>
                  <h4 className="font-label-caps text-[11px] uppercase mb-1">Need Help?</h4>
                  <p className="font-body-md text-[11px] text-secondary">Contact us for personalized sizing advice.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
