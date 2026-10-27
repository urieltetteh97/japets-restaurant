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

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.2fr] md:gap-16" aria-labelledby="story-title">
        <div>
          <h2 id="story-title" className="text-4xl font-extrabold leading-tight text-leaf md:text-5xl">
            Cooked in Community 25 since day one
          </h2>
          <div className="mt-6 rounded-2xl bg-leaf p-5 text-white">
            <p className="font-semibold">Visit us</p>
            <p className="mt-1 text-sm text-white/80">{site.address}</p>
            {site.hours.map((h) => (
              <p key={h.days} className="mt-1 text-sm text-white/80">
                {h.days}: {h.time}
              </p>
            ))}
          </div>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-ink/85">
          {site.history.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-extrabold text-leaf md:text-4xl">Most ordered</h2>
            <Link to="/menu" className="font-semibold text-pepper hover:underline">
              See the full menu
            </Link>
          </div>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {picks.map((d) => (
              <li key={d.id}>
                <Link to="/menu" className="group block">
                  <DishImage dish={d} className="aspect-[4/3] w-full rounded-2xl transition-transform group-hover:scale-[1.02]" />
                  <p className="mt-3 font-display text-lg font-extrabold text-leaf">{d.name}</p>
                  <p className="text-sm text-ink/70">{money(d.price)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
