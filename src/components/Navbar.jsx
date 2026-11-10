import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { site } from '../data/site.js'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { count, setOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-white text-leaf' : 'text-white/85 hover:bg-white/10 hover:text-white'
    }`

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Main">
        <Link to="/" className="font-display text-2xl font-extrabold tracking-tight text-white">
          JAPETS<span className="text-plantain">.</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-leaf transition-colors hover:bg-[#f1e7f6]"
          >
            Your order{count > 0 ? ` (${count})` : ''}
          </button>
          <button
            className="rounded-full border border-white/40 px-3 py-2 text-sm text-white md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-nav" className="mx-5 flex flex-col gap-1 rounded-2xl bg-leaf/95 p-3 md:hidden">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end className={linkClass} onClick={() => setMenuOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <p className="px-4 pt-2 text-xs text-white/60">{site.address}</p>
        </div>
      )}
    </header>
  )
}
