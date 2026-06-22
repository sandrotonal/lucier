import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import { infoPages } from '../data/siteContent'
import { fadeUpAnimate } from '../lib/animations'

export default function InfoPage() {
  const { slug } = useParams<{ slug: string }>()
  const page = slug ? infoPages[slug] : undefined

  if (!page) return <Navigate to="/" replace />

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 px-container-margin max-w-3xl mx-auto w-full pb-section-gap">
        <motion.div {...fadeUpAnimate} className="mt-8 md:mt-12">
          <Link to="/" className="inline-flex items-center gap-1 text-secondary hover:text-primary transition-colors font-label-caps text-label-caps uppercase mb-6">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Home
          </Link>
          <h1 className="font-headline-lg text-[28px] md:text-headline-lg uppercase tracking-tighter mb-10 md:mb-14">
            {page.title}
          </h1>
          <div className="space-y-10 md:space-y-12">
            {page.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-headline-md text-[18px] md:text-headline-md uppercase tracking-tighter mb-4 border-b border-primary pb-3">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </motion.div>
      </main>
      <MobileNav />
      <Footer />
    </>
  )
}
