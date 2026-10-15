// Everything the page says, in one place. Source: the resort's rate sheet and Ber-months flyer.
// Photos live in public/photos/ — swap in higher-resolution originals with the same file names.

export const RESORT = {
  name: 'Grospe Resort Boracay',
  tagline: 'An unforgettable blend of peaceful comfort and impeccable service.',
  address: ['Station 3, #3687 Ambulong', 'Brgy. Manoc-Manoc, Boracay', 'Malay, Aklan'],
  landline: { label: '036-2862544', href: 'tel:+63362862544' },
  mobile: { label: '0985-0821245', href: 'tel:+639850821245', sms: '+639850821245' },
  facebook: 'https://www.facebook.com/grosperesortboracay/',
  messenger: 'https://m.me/grosperesortboracay',
  booking: 'https://www.swiftbook.io/inst/#home?propertyId=521Ns5fUeMB9jeVCIfDZjiQ0XDGlFyTU3ODg=&JDRN=Y', // SwiftBook — every "Book now" button opens it
  mapQuery: 'Grospe Resort Boracay, Ambulong, Manoc-Manoc, Malay, Aklan',
};

// goodFor = guests included in the rate; max = most the room takes; extra = per extra guest, per night.
export const ROOMS = [
  {
    id: 'aj', name: 'AJ Deluxe Room', tag: 'Couples', photo: '/photos/aj-deluxe.jpg',
    price: 2800, unit: 'night', goodFor: 2, max: 3, extra: 1200,
    features: ['Queen bed or two single beds', 'Good for 2 · up to 3 guests', 'Wi-Fi, TV & mini fridge'],
  },
  {
    id: 'aldrin', name: 'Aldrin Family Suite', tag: 'Families', photo: '/photos/aldrin-suite-2.jpg',
    price: 5000, unit: 'night', goodFor: 4, max: 6, extra: 1200,
    features: ['1 queen + 1 king bed', 'Good for 4 · up to 6 guests', 'Wi-Fi, TV & mini fridge'],
  },
  {
    id: 'elsa', name: 'Elsa Villa', tag: 'Two storeys', photo: '/photos/elsa-villa.jpg',
    price: 6000, unit: 'night', goodFor: 4, max: 6, extra: 1200,
    features: ['2-storey villa with kitchen', 'Pool view', 'Good for 4 · up to 6 guests'],
  },
  {
    id: 'backpackers', name: 'Backpackers', tag: 'Bunk room', photo: '/photos/backpackers.jpg',
    price: 850, unit: 'pax', perPerson: true, goodFor: 4, max: 4,
    features: ['Bunk beds, good for 4', 'Air-conditioned', 'Wi-Fi & cable TV', 'Free use of the pool'],
  },
];

export const PACKAGES = {
  title: 'Ber-Months Room Rates',
  length: '4 Days / 3 Nights',
  sub: 'Value-packed holiday',
  perk: 'Round-trip transfer included',
  items: [
    {
      room: 'AJ Deluxe Room', price: 8500, photo: '/photos/aj-deluxe-twin.jpg',
      points: ['Good for 2 persons', '₱4,300 per extra person', 'Complimentary breakfast', 'Accommodates up to 3'],
    },
    {
      room: 'Aldrin Family Suite', price: 16800, photo: '/photos/aldrin-suite.jpg',
      points: ['Good for 4 persons', '₱4,200 per extra person', 'Complimentary breakfast', 'Accommodates up to 6'],
    },
  ],
};

export const SERVICES = [
  { t: 'Business & event spaces', d: 'A venue for meetings and celebrations is available.', i: 'event' },
  { t: 'Recreational activities', d: 'We’ll refer you to our partners so you can enjoy island activities safely.', i: 'kayak' },
  { t: 'Wellness', d: 'We’ll refer you to our partner’s professional, experienced massage therapists.', i: 'spa' },
  { t: 'Dining & room service', d: 'An all-day breakfast menu, plus non-alcoholic and alcoholic drinks.', i: 'dining' },
  { t: 'Transport services', d: 'Transfers with our accredited partner, for your safety and convenience.', i: 'van' },
  { t: 'Karaoke & swimming pool', d: 'Family bonding in our videoke and family time in our swimming pool.', i: 'pool' },
];

// cls: big (2×2) · tall (1×2). This order fills the 4-column grid with no gaps.
export const GALLERY = [
  { c: 'Aldrin Family Suite', cls: 'big', src: '/photos/aldrin-suite.jpg' },
  { c: 'The resort', cls: 'tall', src: '/photos/exterior.jpg' },
  { c: 'Suite living area', cls: 'tall', src: '/photos/living.jpg' },
  { c: 'Swimming pool', cls: '', src: '/photos/pool.jpg' },
  { c: 'Balconies', cls: '', src: '/photos/building.jpg' },
  { c: 'AJ Deluxe — twin beds', cls: '', src: '/photos/aj-deluxe-twin.jpg' },
  { c: 'Elsa Villa', cls: '', src: '/photos/elsa-villa.jpg' },
];

// The events page (/events/), plus the home-page banner and announcement bar. Times are Philippine
// time (+08:00). An event is promoted until `ends`, then moves to "Past events" by itself.
// theme: 'halloween' adds the bats, pumpkins and cobwebs; leave it out for the plain navy-and-gold look.
// Source: the resort's Halloween Treats flyer (Images/events.jpg).
export const EVENTS = [
  {
    id: 'halloween-2026',
    theme: 'halloween',
    title: 'Halloween Treats',
    tagline: 'Trick-or-Treat Adventure',
    starts: '2026-10-31T15:00:00+08:00',
    ends: '2026-11-01T00:00:00+08:00', // the flyer gives no end time, so it runs to midnight
    when: 'Saturday, October 31, 2026',
    time: '3:00 PM',
    short: 'Sat, Oct 31 · 3:00 PM',
    lede: 'Trick-or-treating, face painting, games, a pumpkin hunt and a costume contest — with prizes waiting for the little ghosts and goblins.',
    photo: { src: '/events/halloween-treats.jpg', alt: 'A Halloween treats board with spider cookies, ghost strawberries and candy' },
    scene: { src: '/events/halloween-resort.jpg', alt: 'Grospe Resort decorated with jack-o’-lanterns and scarecrows' },
    poster: '/events/halloween-poster.jpg',
    dayPass: 100, // entrance fee for day-pass guests; in-house guests get in free
    facePainting: { price: 50, from: '2:30 PM' },
    chips: [['palette', 'Face painting from 2:30 PM'], ['gift', 'Prizes await'], ['ticket', 'Free for in-house guests']],
    join: 'Staying with us on the 31st? There’s no entrance fee, and every kid in the house gets Halloween treats. Day-pass guests are welcome too.',
    activitiesTitle: 'An afternoon of tricks & treats',
    activities: [
      { i: 'candy', t: 'Trick or treat', d: 'Our in-house guests get Halloween treats for every kid in the house.' },
      { i: 'palette', t: 'Face painting', d: '₱50 each, starting at 2:30 PM — before the trick-or-treating begins.' },
      { i: 'search', t: 'Find the pumpkins', d: 'A pumpkin hunt around the resort for sharp-eyed little explorers.' },
      { i: 'trophy', t: 'Best Halloween costume', d: 'Come dressed up. The best costume takes home a prize.' },
      { i: 'dice', t: 'Games & kids activities', d: 'Lots of games and activities for the kids — and lots more.' },
      { i: 'cocktail', t: 'Pica-pica & cocktails', d: 'Halloween pica-pica, cocktails and Halloween chills for the grown-ups.' },
    ],
    schedule: [
      { t: '2:30 PM', h: 'Face painting opens', d: '₱50 each. Come early to get the kids ready.' },
      { t: '3:00 PM', h: 'Trick or treat', d: 'The Halloween treats come out for every kid in the house.' },
      { t: 'Then', h: 'Games, pumpkin hunt & costume contest', d: 'Find the pumpkins, show off your costume and play for prizes.' },
    ],
  },
];

export const FAQ = [
  { q: 'How do I book?', a: 'Tap “Book now”, or message us on Facebook or call 036-2862544 / 0985-0821245 with your dates, room and number of guests. We’ll confirm availability and your final rate.' },
  { q: 'How much is an extra guest?', a: '₱1,200 per extra person for the AJ Deluxe Room, Aldrin Family Suite and Elsa Villa. On the Ber-months 4D/3N packages it’s ₱4,300 (AJ Deluxe) or ₱4,200 (Aldrin Family Suite) per extra person.' },
  { q: 'Is breakfast included?', a: 'Complimentary breakfast comes with the Ber-months 4D/3N packages. We also serve an all-day breakfast menu with non-alcoholic and alcoholic drinks.' },
  { q: 'Do you arrange transfers?', a: 'Yes. Round-trip transfer is included in the Ber-months packages, and for other stays we arrange transport with our accredited partner.' },
  { q: 'Can you book island activities or a massage?', a: 'We’ll refer you to trusted partners for island activities and to professional, experienced massage therapists.' },
  { q: 'Can we hold an event at the resort?', a: 'Yes — we have a venue for meetings and celebrations. Message us with your date and headcount.' },
];
