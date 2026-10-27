import { useState } from 'react'

const tints = ['#1d4a33', '#8a2a17', '#7a5a12', '#2f5d50', '#5b2a1d', '#3a4d1c']

// Shows the dish photo; falls back to a coloured panel with the dish name if the file is missing.
export default function DishImage({ dish, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)
  const tint = tints[dish.name.length % tints.length]

  if (failed) {
    return (
      <div
        role="img"
        aria-label={dish.name}
        className={`flex items-end p-4 ${className}`}
        style={{ background: `linear-gradient(135deg, ${tint}, #10301f)` }}
      >
        <span className="font-display text-xl font-extrabold leading-tight text-white/80">{dish.name}</span>
      </div>
    )
  }

  return (
    <img
      src={dish.image}
      alt={dish.name}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}
