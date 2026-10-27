import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext.jsx'
import { site, money } from '../data/site.js'

export default function CartDrawer() {
  const { items, setQty, clear, total, open, setOpen } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', slot: site.pickupSlots[0], notes: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const lines = items.map((i) => `${i.qty} x ${i.name} (${money(i.price * i.qty)})`)
    const message = [
      `New pickup order for ${site.name}`,
      '',
      ...lines,
      '',
      `Total: ${money(total)}`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Pickup: ${form.slot}`,
      form.notes ? `Notes: ${form.notes}` : null,
    ]
      .filter((l) => l !== null)
      .join('\n')
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener')
    setSent(true)
    clear()
  }

  const field =
    'mt-1 w-full rounded-xl border border-leaf/20 bg-white px-3 py-2.5 text-sm focus:border-leaf focus:outline-none'

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-mist shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <div className="flex items-center justify-between border-b border-leaf/10 px-5 py-4">
              <h2 className="text-xl font-extrabold text-leaf">Your order</h2>
              <button onClick={() => setOpen(false)} className="rounded-full px-3 py-1 text-sm font-medium text-leaf hover:bg-leaf/10">
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {sent && items.length === 0 ? (
                <div className="rounded-2xl bg-white p-5">
                  <p className="font-display text-lg font-extrabold text-leaf">Order sent to WhatsApp</p>
                  <p className="mt-2 text-sm text-ink/70">
                    Send the pre-filled message in WhatsApp to confirm. We will reply when your order is ready for pickup at {site.address}.
                  </p>
                </div>
              ) : items.length === 0 ? (
                <p className="text-sm text-ink/70">Your order is empty. Add meals from the menu to get started.</p>
              ) : (
                <>
                  <ul className="divide-y divide-leaf/10">
                    {items.map((i) => (
                      <li key={i.id} className="flex items-center justify-between gap-3 py-3">
                        <div>
                          <p className="font-medium">{i.name}</p>
                          <p className="text-sm text-ink/60">{money(i.price)} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button aria-label={`Remove one ${i.name}`} onClick={() => setQty(i.id, i.qty - 1)} className="h-8 w-8 rounded-full border border-leaf/30 text-leaf hover:bg-leaf hover:text-white">
                            -
                          </button>
                          <span className="w-5 text-center text-sm font-semibold" aria-live="polite">
                            {i.qty}
                          </span>
                          <button aria-label={`Add one ${i.name}`} onClick={() => setQty(i.id, i.qty + 1)} className="h-8 w-8 rounded-full border border-leaf/30 text-leaf hover:bg-leaf hover:text-white">
                            +
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <form id="pickup-form" onSubmit={submit} className="mt-5 space-y-3">
                    <label className="block text-sm font-medium">
                      Your name
                      <input required value={form.name} onChange={update('name')} className={field} autoComplete="name" />
                    </label>
                    <label className="block text-sm font-medium">
                      Phone number
                      <input required type="tel" value={form.phone} onChange={update('phone')} className={field} autoComplete="tel" />
                    </label>
                    <label className="block text-sm font-medium">
                      Pickup time
                      <select value={form.slot} onChange={update('slot')} className={field}>
                        {site.pickupSlots.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block text-sm font-medium">
                      Notes for the kitchen (optional)
                      <textarea rows={2} value={form.notes} onChange={update('notes')} className={field} />
                    </label>
                  </form>
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-leaf/10 bg-white px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-ink/70">Total, pay at pickup</span>
                  <span className="font-display text-xl font-extrabold text-leaf">{money(total)}</span>
                </div>
                <button type="submit" form="pickup-form" className="w-full rounded-full bg-pepper py-3 font-semibold text-white transition-colors hover:bg-pepper-700">
                  Send order on WhatsApp
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
