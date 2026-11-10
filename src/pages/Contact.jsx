import { useState } from 'react'
import { site } from '../data/site.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', message: '' })
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const text = `Hello JAPETS, this is ${form.name}. ${form.message}`
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  const field = 'mt-1 w-full rounded-xl border border-leaf/20 bg-white px-3 py-2.5 focus:border-leaf focus:outline-none'
  const mapQuery = encodeURIComponent('Community 25, Tema, Ghana')

  return (
    <div>
      <div className="bg-leaf px-5 pb-14 pt-32 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-plantain">We'd love to hear from you</p>
          <h1 className="text-5xl font-extrabold md:text-6xl">Contact</h1>
          <p className="mt-3 max-w-lg text-white/80">Questions about an order, a party tray or our hours? Reach us here.</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-extrabold text-leaf">Find us</h2>
          <p className="mt-3">{site.address}</p>
          <p className="mt-1">
            Phone: <a className="font-semibold text-pepper hover:underline" href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
          </p>
          <p className="mt-1">
            Email: <a className="font-semibold text-pepper hover:underline" href={`mailto:${site.email}`}>{site.email}</a>
          </p>

          <h3 className="mt-8 text-lg font-extrabold text-leaf">Opening hours</h3>
          {site.hours.map((h) => (
            <p key={h.days} className="mt-1">
              {h.days}: {h.time}
            </p>
          ))}

          <iframe
            title="Map showing JAPETS Restaurant in Community 25, Tema"
            className="mt-8 h-64 w-full rounded-2xl border-0"
            loading="lazy"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          />
        </div>

        <form onSubmit={submit} className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-leaf/5 md:p-8">
          <h2 className="text-2xl font-extrabold text-leaf">Send us a message</h2>
          <label className="mt-5 block text-sm font-medium">
            Your name
            <input required value={form.name} onChange={update('name')} className={field} autoComplete="name" />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Message
            <textarea required rows={5} value={form.message} onChange={update('message')} className={field} />
          </label>
          <button className="mt-5 w-full rounded-full bg-pepper py-3 font-semibold text-white transition-colors hover:bg-pepper-700">
            Send on WhatsApp
          </button>
        </form>
      </div>
    </div>
  )
}
