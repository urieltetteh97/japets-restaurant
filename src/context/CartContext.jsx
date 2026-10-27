import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'japets-cart'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load) // [{ id, name, price, qty }]
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable: cart still works for this visit */
    }
  }, [items])

  const value = useMemo(() => {
    const add = (dish) =>
      setItems((prev) => {
        const found = prev.find((i) => i.id === dish.id)
        if (found) return prev.map((i) => (i.id === dish.id ? { ...i, qty: i.qty + 1 } : i))
        return [...prev, { id: dish.id, name: dish.name, price: dish.price, qty: 1 }]
      })
    const setQty = (id, qty) =>
      setItems((prev) =>
        qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))
      )
    const clear = () => setItems([])
    const count = items.reduce((n, i) => n + i.qty, 0)
    const total = items.reduce((n, i) => n + i.qty * i.price, 0)
    return { items, add, setQty, clear, count, total, open, setOpen }
  }, [items, open])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
