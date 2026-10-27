import { Link } from 'react-router-dom'
import { site } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="bg-leaf text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-extrabold">JAPETS</p>
          <p className="mt-2 max-w-xs text-sm text-white/70">{site.tagline}</p>
        </div>
        <div className="text-sm text-white/80">
          <p className="font-semibold text-white">Opening hours</p>
          {site.hours.map((h) => (
            <p key={h.days} className="mt-1">
              {h.days}: {h.time}
            </p>
          ))}
        </div>
        <div className="text-sm text-white/80">
          <p className="font-semibold text-white">Find us</p>
          <p className="mt-1">{site.address}</p>
          <p className="mt-1">{site.phone}</p>
          <Link to="/menu" className="mt-3 inline-block font-semibold text-plantain hover:underline">
            Order for pickup
          </Link>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  )
}
