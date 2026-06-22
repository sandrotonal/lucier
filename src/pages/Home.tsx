import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Navbar from '../components/Navbar'
import HeroNav from '../components/HeroNav'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import { useStore } from '../store/StoreContext'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
}

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.8 },
}

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
}

const clipReveal = {
  initial: { clipPath: 'inset(0 100% 0 0)' },
  whileInView: { clipPath: 'inset(0 0% 0 0)' },
  viewport: { once: true },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
}

const products = [
  { name: "Jacket", price: "$999", slug: "/jacket", aspect: "aspect-[4/5]",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD9stzL_31ZS2yA8ZJ164hNNO8HDopcdy9xxpJlQnLisamKNAt3CJgJAPui0Ki8RoP979rQyHqFOzsYnbYX68NT24ORyAOaZHIEl8Shxz8VMypUCE-wXnXY-G-XI6J4_K6_hO4VPAPW4tDQzGR02h00Cz-Fb7nZplb_XL705834Wd6X9Anadm9clNfw968a-Q2Bpm3Mb8BrYsnSrK-MLoF_qMwpon2PPb_LW6odCpiWNkyAEUYm6JOXKzyCf2YsOxmGjfq3YNKePA" },
  { name: "Bag", price: "$1299", slug: "#", aspect: "aspect-[4/5]", col: "md:col-span-6",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDc_8bddtRVi9O7pMBoQvs7QuACtQeh2n82cx36eK7-9GDloXyiOL9IVHUEO5s0-1QCr4v_4WANz8NO_1mquwFDRKagZpcYjXs4af9dAO3iKVPfs8D4wTrv3B-VFE3DqxjYoWr03SFnBdAz1Bvc-1ikR2ga-hJ7re28Ni1kiYqYrJungHHddvgVovnHy9_bHfoY-eQyOfLkQcuwocrtuPmavGKVCp3PYDl6-zfoSBEUnOLqtrykIwMg21uUS5RxJV4Mw3GppqJV-x4" },
  { name: "Glasses", price: "$759", slug: "#", aspect: "aspect-square",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB64NTAOjwpWdDbtD3pcQOm76SyuEfSiDblt6RMXbq7n6V5U9yA9Ul7w1X2bCBKfmJ0NiB3pg_tZQhIVlKDJfaq17imvoa_pbXxA7wbdAT_JtljsmyNepIykzf6LbXxLq4Xn9AbrHsqSW07ex_jF0P_0NjSSAtyIy-L9maXOPPgTlL9xwky__llbFIm6NAiaHkX7YSfqehXbArEyiZG-XQuwGWga4ggB58N0s6kTrW3IwpThyl8KLfiafE8ewy-3WfXPnaYDF8zyN4" },
  { name: "Longsleeve", price: "$459", slug: "#", aspect: "aspect-[3/4]",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ3oZUsS_kvVH8C45eagr3ppvn3pTJ5fJG64aR6egnhbX0xbqr81cITk9mu0BlepLQ73bMDkCd-U_lzLDLZuQ_ZRLEjHXnHACTkLsIf5mVSx8WIaqkQ8yZ4w_PW31tcJ48JJxdXn3-UF9kPS-GhhrAU8pH09hknm133mmESqY8CR52bfxAEa4T1nXMNOno4gpG2WClYfYfoE1lWLEyxvnleSndAZBo-yvcGOFhwSNAor-X3QiuaEJLzo0I2cWqNjf0As9JAas3b-Y" },
]

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
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
          {products.map((p, i) => (
            <motion.article
              key={p.name}
              variants={{
                initial: { opacity: 0, y: 40 },
                whileInView: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`${p.col || "md:col-span-3"} col-span-1 flex flex-col group relative`}
            >
              <Link to={p.slug} className={`relative w-full ${p.aspect} bg-surface-container-low mb-3 md:mb-4 overflow-hidden block`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className={`w-full ${p.aspect} bg-surface-container-low`}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={p.img}
                    alt={p.name}
                  />
                </motion.div>
                <button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(i + 10) }}
                  className="absolute top-2 md:top-4 right-2 md:right-4 hover:scale-110 transition-transform"
                  aria-label="Favorite"
                >
                  <span
                    className={`material-symbols-outlined text-xl md:text-2xl ${isInWishlist(i + 10) ? 'text-primary' : 'text-white'}`}
                    style={{ fontVariationSettings: isInWishlist(i + 10) ? "'FILL' 1" : "'FILL' 0" }}
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
                <span>{p.name}</span>
                <span>{p.price}</span>
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
              BUY NOW <motion.span
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
            <motion.div
              {...scaleIn}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
              className="w-full aspect-square md:flex-1 bg-surface-container-low overflow-hidden relative group cursor-pointer"
            >
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqt_XKVyvTzN2cBJG_Yv6f5zr4riinNz6vxkMxl2Vt6_fCsaFjo6pCurToAom9ODOaJRykC4i0X7uf4gKizuzhpQaL2DcAKXoO-5tPRRcFPh3fbEILsJQWtbOLxU9v0ZR01GMIKIdtr3UJHgmxGlDoqaQ9QWMkiPGcKjZn97A4k7ZoFexzutvKQ650JObBkxsovkfTvFNEC9Z-IBjN9qCtkyQia6UQWzZptFv5PO2-RaL0zIciRASHVSfumlV6wKzI9qYOvaYb_1w"
                alt="Puffer jacket portrait"
              />
            </motion.div>
            <motion.div
              {...scaleIn}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
              className="w-full aspect-square md:flex-1 bg-primary overflow-hidden relative cursor-pointer"
            >
              <img
                className="w-full h-full object-cover scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBem5DSIXSK3CV3L0aM2X0aHcZf0cscC9rYl9JWdnlBhevP5SUDjJPYcGWX8cw_NxJvn25d3gTfLgRUUF1JzoplZTg-_8eJlB2ZVFd_b9QPycSSZtO4xObLkjS2hY_Y9j7MMfWUq3_Lp0KNGE1HhLoVmCrtSEbgl0JOBqrJcM4XXLpUgdw4j8HZkw-3564LClR4rKmPNiJpDoA_e4sWJXsIKtrOVZq_ywhri9Lg7yuclzQD7ce47gBJpP7oy_3FoJ8wMpudGToI2Gk"
                alt="Metallic sneaker"
              />
            </motion.div>
          </div>

          <motion.div
            {...scaleIn}
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.5 }}
            className="col-span-2 md:col-span-8 w-full aspect-square md:h-full relative overflow-hidden group cursor-pointer bg-surface-container-low"
          >
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW1TE5xhkAnz46L-FxV5S0We73IckViZdM0nWHvHDRt_Jhj6lU7y7X4cWr_g-_CAXTUipf_tm6qJi7_hqG3Z9BNt4sDLiWia_EHjhu5YnzzZMdq1hNJjx61csNn4Gf3ymphUPIbbiwy4Q7w2_HJwVm_Onmw5J4Y5uZSulLfM49IiCDFe2XjAgA4CDBoaoJ2bNwdw_Hv_Fk7groxH3TY93rfgwu8lxBanPrnw5CfZzfxQbyIX66fPVsPFfuOcUlV-g7LE6Ejqqt-y0"
              alt="Action fashion shot"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Video coming soon")}
                className="w-16 h-16 md:w-24 md:h-24 bg-white/80 backdrop-blur-sm flex items-center justify-center text-primary shadow-2xl hover:bg-white transition-all duration-300"
                aria-label="Play video"
              >
                <span className="material-symbols-outlined text-[32px] md:text-[48px] ml-1 md:ml-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <MobileNav />
      <Footer />
    </>
  )
}
