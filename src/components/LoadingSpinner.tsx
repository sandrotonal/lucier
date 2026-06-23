import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

export default function LoadingSpinner({ size = 'md', fullScreen = false }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  const spinner = (
    <motion.div
      className={`${sizes[size]} border-2 border-primary border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[999] bg-surface/80 backdrop-blur-sm flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          <p className="font-label-caps text-label-caps uppercase tracking-widest">Loading...</p>
        </div>
      </div>
    )
  }

  return spinner
}
