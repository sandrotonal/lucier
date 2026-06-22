import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Navbar from '../components/Navbar'
import HeroNav from '../components/HeroNav'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import { useStore } from '../store/StoreContext'
import { featuredProducts } from '../data/products'
import { fadeUp, fadeIn, stagger, scaleIn, clipReveal } from '../lib/animations'

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const { toggleWishlist, isInWishlist } = useStore()

  return (
    <>
      <Navbar />

      <section ref={heroRef} className="relative w-full h-dvh overflow-hidden bg-primary flex flex-col justify-end">
        <motion.img
          style={{ scale: heroScale }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDej7A9GABFv18W3HW38PUR0xSaRjY23nSFvSIf9BCrX3iO_rVvBZrgZA2egjgWcG5QcD99axz5acLU4O6HX8Ae3vdTCHMJxsjBs1ouPbVqb2QC7IxHtRXGuP8QkhdxFfp3MjGiuAIXVEtX_CpAdE31NlFoTsNJleK8W4IzYcBWUnszUclhJgeVLlkzd2I-Hy7r_8kAjB3CTy8TwkyUfSWE1UTOSk6L2XIkPboiHJjzcYarF0eXfB_mV7UkHImpYagRn6RcQO9kmz0"
          alt="Hero fashion portrait"
        />
        <motion.div
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-4"
        >
          <motion.h1
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero-text-overlay font-display-xl text-on-tertiary font-extrabold text-center lowercase drop-shadow-2xl z-10 w-full select-none"
          >
            lucir
          </motion.h1>
        </motion.div>
        <HeroNav />
      </section>

      <motion.section {...fadeUp} className="px-container-margin py-section-gap w-full max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-6 md:mb-12">
          <motion.h2 {...clipReveal} className="font-headline-lg text-headline-lg uppercase tracking-tight">
            Bestseller Now
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="h-px flex-1 bg-primary/30 ml-6 hidden md:block"
          />
        </div>

        <motion.div {...stagger} className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-x-6 md:gap-y-12 items-start">
          {featuredProducts.map((p, i) => (
            <motion.article
              key={p.id}
              variants={{
                initial: { opacity: 0, y: 40 },
                whileInView: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`${p.col ?? 'md:col-span-3'} col-span-1 flex flex-col group relative`}
            >
              <Link to={p.slug} className={`relative w-full ${p.aspect ?? 'aspect-[4/5]'} bg-surface-container-low mb-3 md:mb-4 overflow-hidden block`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className={`w-full ${p.aspect ?? 'aspect-[4/5]'} bg-surface-container-low`}
                >
                  <img className="w-full h-full object-cover" src={p.img} alt={p.name} loading="lazy" />
                </motion.div>
                <button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(p.id) }}
                  className="absolute top-2 md:top-4 right-2 md:right-4 hover:scale-110 transition-transform"
                  aria-label="Favorite"
                >
                  <span
                    className={`material-symbols-outlined text-xl md:text-2xl ${isInWishlist(p.id) ? 'text-primary' : 'text-white'}`}
                    style={{ fontVariationSettings: isInWishlist(p.id) ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
              </Link>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-between items-end font-body-md text-[11px] md:text-body-md uppercase border-b border-primary pb-1 md:pb-2"
              >
                <span>{p.shortName}</span>
                <span>{p.priceLabel}</span>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-end mt-10 md:mt-16 w-full md:pr-[25%]"
        >
          <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 200 }}>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 font-headline-lg text-headline-lg uppercase tracking-tighter border-b-[3px] md:border-b-[4px] border-primary pb-1 hover:opacity-70 transition-opacity"
            >
              BUY NOW
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="material-symbols-outlined text-[32px] md:text-[48px]"
              >arrow_forward</motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section {...fadeIn} className="px-container-margin pb-section-gap w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-8 md:h-[800px]">
          <div className="col-span-2 md:col-span-4 flex flex-col gap-4 md:gap-8 h-full">
            <motion.div {...scaleIn} whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }} className="w-full aspect-square md:flex-1 bg-surface-container-low overflow-hidden relative group cursor-pointer">
              <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqt_XKVyvTzN2cBJG_Yv6f5zr4riinNz6vxkMxl2Vt6_fCsaFjo6pCurToAom9ODOaJRykC4i0X7uf4gKizuzhpQaL2DcAKXoO-5tPRRcFPh3fbEILsJQWtbOLxU9v0ZR01GMIKIdtr3UJHgmxGlDoqaQ9QWMkiPGcKjZn97A4k7ZoFexzutvKQ650JObBkxsovkfTvFNEC9Z-IBjN9qCtkyQia6UQWzZptFv5PO2-RaL0zIciRASHVSfumlV6wKzI9qYOvaYb_1w" alt="Puffer jacket portrait" loading="lazy" />
            </motion.div>
            <motion.div {...scaleIn} whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }} className="w-full aspect-square md:flex-1 bg-primary overflow-hidden relative cursor-pointer">
              <img className="w-full h-full object-cover scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBem5DSIXSK3CV3L0aM2X0aHcZf0cscC9rYl9JWdnlBhevP5SUDjJPYcGWX8cw_NxJvn25d3gTfLgRUUF1JzoplZTg-_8eJlB2ZVFd_b9QPycSSZtO4xObLkjS2hY_Y9j7MMfWUq3_Lp0KNGE1HhLoVmCrtSEbgl0JOBqrJcM4XXLpUgdw4j8HZkw-3564LClR4rKmPNiJpDoA_e4sWJXsIKtrOVZq_ywhri9Lg7yuclzQD7ce47gBJpP7oy_3FoJ8wMpudGToI2Gk" alt="Metallic sneaker" loading="lazy" />
            </motion.div>
          </div>

          <motion.div {...scaleIn} whileHover={{ scale: 1.015 }} transition={{ duration: 0.5 }} className="col-span-2 md:col-span-8 w-full aspect-square md:h-full relative overflow-hidden group cursor-pointer bg-surface-container-low">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW1TE5xhkAnz46L-FxV5S0We73IckViZdM0nWHvHDRt_Jhj6lU7y7X4cWr_g-_CAXTUipf_tm6qJi7_hqG3Z9BNt4sDLiWia_EHjhu5YnzzZMdq1hNJjx61csNn4Gf3ymphUPIbbiwy4Q7w2_HJwVm_Onmw5J4Y5uZSulLfM49IiCDFe2XjAgA4CDBoaoJ2bNwdw_Hv_Fk7groxH3TY93rfgwu8lxBanPrnw5CfZzfxQbyIX66fPVsPFfuOcUlV-g7LE6Ejqqt-y0" alt="Action fashion shot" loading="lazy" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-300">
              <Link to="/shop" className="w-16 h-16 md:w-24 md:h-24 bg-white/80 backdrop-blur-sm flex items-center justify-center text-primary shadow-2xl hover:bg-white transition-all duration-300" aria-label="Explore collection">
                <span className="material-symbols-outlined text-[32px] md:text-[48px] ml-1 md:ml-2" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <MobileNav />
      <Footer />
    </>
  )
}
