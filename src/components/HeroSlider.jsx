import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { menu } from '../data/menu.js'
import { money, site } from '../data/site.js'
import { useCart } from '../context/CartContext.jsx'
import DishImage from './DishImage.jsx'

const slides = menu.filter((d) => d.featured)
const INTERVAL = 6000

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const { add, setOpen } = useCart()
  const dish = slides[index]

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL)
    return () => clearInterval(t)
  }, [paused])

  return (
    <section
      className="relative h-[88svh] min-h-[620px] w-full overflow-hidden bg-leaf text-white md:h-[92svh]"
      aria-roledescription="carousel"
      aria-label="Featured meals"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={dish.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <DishImage dish={dish} eager className="h-full w-full" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-[#24132f]/95 via-[#351a48]/65 to-[#351a48]/10" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#24132f]/50 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-14 pt-28 md:pb-20">
        <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-plantain" />
          {site.name} · Tema Community 25
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={dish.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            aria-live="polite"
          >
            <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.94] sm:text-7xl md:text-8xl">{dish.name}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">{dish.description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              add(dish)
              setOpen(true)
            }}
            className="rounded-full bg-white px-6 py-3 font-semibold text-leaf shadow-lg transition-colors hover:bg-[#f1e7f6]"
          >
            Add to order, {money(dish.price)}
          </button>
          <Link to="/menu" className="rounded-full border border-white/55 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm hover:bg-white/20">
            See the full menu
          </Link>
        </div>

        <div className="mt-8 flex gap-2" role="group" aria-label="Choose a slide">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Show ${s.name}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-12 bg-plantain' : 'w-6 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
