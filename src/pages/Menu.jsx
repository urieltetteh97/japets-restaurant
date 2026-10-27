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
      <div className="bg-leaf px-5 pb-14 pt-28 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-5xl font-extrabold md:text-6xl">Menu</h1>
          <p className="mt-3 max-w-lg text-white/80">Add what you want, send the order on WhatsApp, and collect it hot at Community 25. Pay at pickup.</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === c ? 'bg-leaf text-white' : 'bg-white text-leaf hover:bg-leaf/10'
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
              <li key={d.id} className="flex flex-col overflow-hidden rounded-2xl bg-white">
                <DishImage dish={d} className="aspect-[4/3] w-full" />
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-extrabold leading-tight text-leaf">{d.name}</h2>
                    <p className="shrink-0 font-semibold text-pepper">{money(d.price)}</p>
                  </div>
                  <p className="mt-2 flex-1 text-sm text-ink/70">{d.description}</p>
                  <button
                    onClick={() => add(d)}
                    className="mt-4 rounded-full bg-leaf py-2.5 text-sm font-semibold text-white transition-colors hover:bg-leaf-700"
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
