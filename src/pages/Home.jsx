import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider.jsx'
import DishImage from '../components/DishImage.jsx'
import { menu } from '../data/menu.js'
import { site, money } from '../data/site.js'

export default function Home() {
  const picks = menu.filter((d) => d.featured)

  return (
    <>
      <HeroSlider />

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1fr_1fr] md:gap-16 md:py-24" aria-labelledby="story-title">
        <div className="relative">
          <DishImage dish={picks[1] || picks[0]} className="aspect-[4/3] w-full rounded-[2rem] shadow-xl shadow-leaf/10" />
          <div className="absolute -bottom-5 right-4 rounded-2xl bg-white px-5 py-4 shadow-xl md:-right-5">
            <p className="font-display text-2xl font-extrabold text-leaf">Made with love</p>
            <p className="mt-1 text-sm text-ink/65">Fresh from our kitchen, every day.</p>
          </div>
        </div>
        <div className="pt-4 md:pt-0">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-pepper">A little taste of home</p>
          <h2 id="story-title" className="text-4xl font-extrabold leading-tight text-leaf md:text-5xl">
            Cooked in Community 25, since day one.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/75">
            {site.history.slice(0, 2).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-7 border-l-2 border-pepper/30 pl-4">
            <p className="font-semibold text-leaf">Come hungry. Leave happy.</p>
            <p className="mt-1 text-sm text-ink/65">{site.address}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-pepper">A few crowd favourites</p>
              <h2 className="text-3xl font-extrabold text-leaf md:text-4xl">The good stuff.</h2>
            </div>
            <Link to="/menu" className="rounded-full border border-leaf/20 px-5 py-2.5 text-sm font-semibold text-leaf transition-colors hover:bg-leaf hover:text-white">
              Explore the menu <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {picks.map((d) => (
              <li key={d.id}>
                <Link to="/menu" className="group block overflow-hidden rounded-3xl bg-mist pb-4">
                  <div className="overflow-hidden">
                    <DishImage dish={d} className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 pt-4">
                    <div>
                      <p className="font-display text-lg font-extrabold text-leaf">{d.name}</p>
                      <p className="mt-1 text-sm text-ink/60">{d.category}</p>
                    </div>
                    <p className="shrink-0 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-pepper">{money(d.price)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-leaf px-5 py-14 text-white md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-plantain">Good food, no fuss</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Your next favourite is on the menu.</h2>
            <p className="mt-2 text-white/75">Order ahead and pick it up fresh in Tema Community 25.</p>
          </div>
          <Link to="/menu" className="shrink-0 rounded-full bg-white px-6 py-3 font-semibold text-leaf transition-colors hover:bg-[#f1e7f6]">
            Order for pickup
          </Link>
        </div>
      </section>
    </>
  )
}
