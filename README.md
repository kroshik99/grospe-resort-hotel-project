# Grospe Resort Boracay — landing page

A single customer-facing landing page for Grospe Resort Boracay (Station 3,
Boracay). Front end only: no backend, no database. Guests get rates and an
instant estimate, then inquire by Facebook Messenger, SMS or phone.

```
grospe-resort-boracay-project/
├── frontend-react/   the site (Vite + React 18)
└── Images/           the client's source files: logo, rate sheet, Ber-months flyer
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
rates, rooms, photos and contact details.
