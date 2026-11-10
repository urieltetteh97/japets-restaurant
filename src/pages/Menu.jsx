import { useState } from 'react'
import { categories, menu } from '../data/menu.js'
import { money } from '../data/site.js'
import { useCart } from '../context/CartContext.jsx'
import DishImage from '../components/DishImage.jsx'

export default function Menu() {
  const [active, setActive] = useState('All')
  const { add, items } = useCart()
  const shown = active === 'All' ? menu : menu.filter((d) => d.category === active)

  return (
    <div className="bg-mist">
      <div className="bg-leaf px-5 pb-12 pt-32 text-white md:pb-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-plantain">Fresh from the kitchen</p>
          <h1 className="text-5xl font-extrabold md:text-6xl">Good food, your way.</h1>
          <p className="mt-3 max-w-xl leading-relaxed text-white/80">Pick your favourites, send your order on WhatsApp, and collect it hot at Community 25. Pay at pickup.</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active === c ? 'bg-leaf text-white shadow-sm' : 'bg-white text-leaf ring-1 ring-leaf/10 hover:bg-[#f1e7f6]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((d) => {
            const qty = items.find((i) => i.id === d.id)?.qty || 0
            return (
              <li key={d.id} className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-leaf/5 transition-shadow hover:shadow-xl hover:shadow-leaf/10">
                <div className="relative overflow-hidden">
                  <DishImage dish={d} className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-leaf backdrop-blur-sm">{d.category}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-extrabold leading-tight text-leaf">{d.name}</h2>
                    <p className="shrink-0 rounded-full bg-[#f7f0fa] px-3 py-1 font-bold text-pepper">{money(d.price)}</p>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{d.description}</p>
                  <button
                    onClick={() => add(d)}
                    className="mt-5 rounded-full bg-leaf py-3 text-sm font-semibold text-white transition-colors hover:bg-leaf-700"
                  >
                    {qty > 0 ? `Add another (${qty} in order)` : 'Add to order'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
