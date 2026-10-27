# JAPETS Restaurant website

React + Vite + Tailwind CSS v4 + Framer Motion + React Router.

## Run

```bash
npm install
npm run dev      # development
npm run build    # production build in dist/
```

## Pages

- `/` Home: dish slider with overlay text, restaurant story, most ordered
- `/menu` Menu: category filter, dish cards, add to order
- `/contact` Contact: address, hours, map, message form

Ordering: the cart drawer collects name, phone and pickup time, then opens a pre-filled WhatsApp message to the restaurant. Payment is at pickup.

## Replace before launch

1. `src/data/site.js`: address, phone, WhatsApp number (digits only), email, hours, history text, pickup slots.
2. `src/data/menu.js`: dishes, prices, descriptions, categories, and which dishes are `featured` (these appear in the hero slider).
3. Photos: put images in `public/images/` using the file names in `menu.js`. Until a photo exists, the card shows a coloured placeholder with the dish name.

## Next steps (when the client wants them)

- Real order handling: a small backend or Supabase table so orders are stored, plus Paystack for mobile money and card payment.
- Opening-hours check so pickup slots only show when the kitchen is open.
