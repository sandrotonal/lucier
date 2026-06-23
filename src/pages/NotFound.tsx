import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 pb-section-gap px-container-margin max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center min-h-[60vh]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <span className="material-symbols-outlined text-[120px] md:text-[180px] text-primary/20">
              error
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display-xl text-[48px] md:text-display-xl uppercase tracking-tighter mb-4"
          >
            404
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-headline-md text-[20px] md:text-headline-md uppercase tracking-tighter mb-2"
          >
            Page Not Found
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-body-md text-body-md text-secondary max-w-md mb-8"
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/"
              className="border-2 border-primary bg-primary text-on-primary px-8 py-3 font-label-caps text-label-caps uppercase hover:opacity-90 transition-opacity"
            >
              Go Home
            </Link>
            <Link
              to="/shop"
              className="border-2 border-primary px-8 py-3 font-label-caps text-label-caps uppercase hover:bg-primary hover:text-on-primary transition-colors"
            >
              Shop Collection
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <MobileNav />
      <Footer />
    </>
  )
}
