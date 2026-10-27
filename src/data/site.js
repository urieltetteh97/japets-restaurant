// PLACEHOLDERS: replace with the restaurant's real details before launch.
export const site = {
  name: 'JAPETS Restaurant',
  tagline: 'Home-style Ghanaian cooking in Tema Community 25',
  address: 'Community 25, Tema, Greater Accra, Ghana',
  phone: '+233 20 000 0000',
  // WhatsApp number in international format, digits only (no + or spaces)
  whatsapp: '233200000000',
  email: 'hello@japets.example',
  hours: [
    { days: 'Monday to Saturday', time: '8:00 am to 9:00 pm' },
    { days: 'Sunday', time: '11:00 am to 8:00 pm' },
  ],
  pickupSlots: ['As soon as possible', 'In 30 minutes', 'In 1 hour', 'In 2 hours'],
  currency: 'GH₵',
  history: [
    'JAPETS started as a single cooking pot and a handful of regulars in Community 25. Word travelled the way it does in Tema: a neighbour told a neighbour, and the queue at lunchtime got longer.',
    'Today we still cook the way we began. Stews are simmered slowly, jollof is cooked over a proper base of tomato and pepper, and fish arrives fresh from the Tema landing beach.',
    'Whether you are collecting lunch for the office or dinner for the family, you are getting the food we would serve at our own table.',
  ],
}

export const money = (n) => `${site.currency}${Number(n).toFixed(2)}`
