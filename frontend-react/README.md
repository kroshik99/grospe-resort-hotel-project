# Grospe Resort Boracay — site

Vite + React 18 landing page. No backend: rooms, rates and copy live in one
file, and inquiries go to the resort through Messenger, SMS or a call.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ — upload to any static host
```

## Updating the page

Almost everything is in **`src/content.js`**:

| What | Where in `content.js` |
|---|---|
| Phone numbers, Facebook / Messenger link, address, map search | `RESORT` |
| Rooms, nightly rates, extra-guest fee, max guests, features | `ROOMS` |
| Ber-months 4D/3N packages | `PACKAGES` |
| The six services | `SERVICES` |
| Gallery photos and captions | `GALLERY` |
| FAQ | `FAQ` |

The "Plan your stay" estimator reads `price`, `goodFor`, `max` and `extra`
from `ROOMS`, so changing a rate there updates the room cards, the estimate and
the room dropdown together.

## Photos and logo

| File | What it is |
|---|---|
| `public/photos/*.jpg` | room and resort photos, cropped from the client's flyers |
| `public/logo.png`, `public/logo-mark.png` | the logo, extracted from the client's logo file as white-on-transparent masks; CSS colours them (gold on navy, navy on cream) |
| `public/favicon.png` | gold mark on navy |

The photos come from the flyers, so they're small (about 170–500px wide). For
sharper results, replace them with the original photos **using the same file
names**. Nothing else needs to change.

## Colours and fonts

Brand tokens are at the top of `src/styles.css` (`:root`): navy `#14234A`,
gold `#C9A24A` (plus the gold gradient), ivory `#F7F3EA`. Fonts: Cinzel for
the logo-style capitals, Cormorant Garamond for headings, Montserrat for body text.

## How inquiries work

- **Send on Messenger** copies the guest's inquiry (room, dates, guests,
  estimate) to the clipboard and opens `m.me/grosperesortboracay`. Messenger
  links can't be pre-filled, so the guest pastes it.
- **Text us** opens the phone's SMS app with the same message pre-filled to the mobile number.
- **Call** dials the mobile number. On phones, a Message / Call bar stays at
  the bottom of the screen once you scroll past the top.

## Motion

Hero copy staggers in while the photo frames drop in and float, sections reveal
on scroll, stats count up, cards lift on hover, the packages ribbon shimmers,
and the gallery opens in a lightbox (← → Esc). Chrome and Edge also show a
gold reading-progress line under the header. All of it is CSS or
`IntersectionObserver`, with no animation library, and it switches off for
visitors who set *reduce motion*.
