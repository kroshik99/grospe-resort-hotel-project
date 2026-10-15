import { RESORT } from './content.js';

export const peso = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 });

export const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** Fired by bookingLink; <BookingNotice> cancels it and shows itself. */
export const BOOKING_NOTICE = 'booking-notice';

/** Spread onto an <a>: the resort's booking page (SwiftBook) in a new tab. */
export const bookingPage = { href: RESORT.booking, target: '_blank', rel: 'noopener' };

/** Spread onto an <a>: "Book now". The booking page is another site, so a plain click asks first
 *  (BookingNotice); modified or middle clicks, or a page without the notice, go straight there. */
export const bookingLink = {
  ...bookingPage,
  onClick(e) {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (!dispatchEvent(new Event(BOOKING_NOTICE, { cancelable: true }))) e.preventDefault();
  },
};

/** Messenger can't be pre-filled, so copy the inquiry first and open the chat;
 *  the guest just pastes. Returns whether the copy worked, for the toast. */
export async function sendOnMessenger(text) {
  let copied = false;
  try { await navigator.clipboard.writeText(text); copied = true; } catch { /* insecure context or denied */ }
  window.open(RESORT.messenger, '_blank', 'noopener');
  return copied;
}
