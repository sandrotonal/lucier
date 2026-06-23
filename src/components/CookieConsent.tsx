import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const COOKIE_KEY = 'lucir-cookie-consent'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) {
      setTimeout(() => setShow(true), 2000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setShow(false)
  }

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[999] bg-surface border-t-2 border-primary shadow-2xl"
        >
          <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary text-xl mt-1">cookie</span>
                  <div>
                    <h3 className="font-label-caps text-label-caps uppercase tracking-widest mb-2">
                      Cookie Notice
                    </h3>
                    <p className="font-body-md text-[13px] text-secondary leading-relaxed">
                      We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                      By clicking "Accept All", you consent to our use of cookies.{' '}
                      <a href="/info/privacy" className="underline hover:text-primary transition-colors">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={handleDecline}
                  className="border border-primary px-6 py-3 font-label-caps text-[11px] uppercase hover:bg-surface-container-low transition-colors whitespace-nowrap"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="border border-primary bg-primary text-on-primary px-6 py-3 font-label-caps text-[11px] uppercase hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
