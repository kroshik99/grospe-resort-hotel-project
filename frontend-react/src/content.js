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

export const FAQ = [
  { q: 'How do I book?', a: 'Message us on Facebook or call 036-2862544 / 0985-0821245 with your dates, room and number of guests. We’ll confirm availability and your final rate. The “Plan your stay” form above writes the message for you.' },
  { q: 'How much is an extra guest?', a: '₱1,200 per extra person for the AJ Deluxe Room, Aldrin Family Suite and Elsa Villa. On the Ber-months 4D/3N packages it’s ₱4,300 (AJ Deluxe) or ₱4,200 (Aldrin Family Suite) per extra person.' },
  { q: 'Is breakfast included?', a: 'Complimentary breakfast comes with the Ber-months 4D/3N packages. We also serve an all-day breakfast menu with non-alcoholic and alcoholic drinks.' },
  { q: 'Do you arrange transfers?', a: 'Yes. Round-trip transfer is included in the Ber-months packages, and for other stays we arrange transport with our accredited partner.' },
  { q: 'Can you book island activities or a massage?', a: 'We’ll refer you to trusted partners for island activities and to professional, experienced massage therapists.' },
  { q: 'Can we hold an event at the resort?', a: 'Yes — we have a venue for meetings and celebrations. Message us with your date and headcount.' },
];
