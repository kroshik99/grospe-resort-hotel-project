# Grospe Resort Boracay — landing page

A customer-facing site for Grospe Resort Boracay (Station 3, Boracay): the
landing page plus an events page. Front end only: no backend, no database.
Guests see rooms and rates, then book on the resort's swift.io booking page or
get in touch by Facebook Messenger or phone.

```
grospe-resort-boracay-project/
├── frontend-react/   the site (Vite + React 18): / and /events/
└── Images/           the client's source files: logo, rate sheet, Ber-months flyer, Halloween poster (events.jpg)
```

## Run it

```bash
cd frontend-react
npm install
npm run dev        # http://localhost:5173
```

## Publish it

```bash
cd frontend-react
npm run build      # outputs dist/
```

Upload `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub
Pages, or plain web hosting). There's nothing to run on a server.

See [`frontend-react/README.md`](frontend-react/README.md) for how to change
rates, rooms, events, photos and contact details.
