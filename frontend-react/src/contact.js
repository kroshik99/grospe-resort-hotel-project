import { RESORT } from './content.js';

export const peso = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 });

export const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** Spread onto an <a>: opens the resort's online booking page in a new tab.
 *  Until RESORT.booking is filled in, "Book now" opens the Messenger chat instead. */
export const bookingLink = { href: RESORT.booking || RESORT.messenger, target: '_blank', rel: 'noopener' };

/** Messenger can't be pre-filled, so copy the inquiry first and open the chat;
 *  the guest just pastes. Returns whether the copy worked, for the toast. */
export async function sendOnMessenger(text) {
  let copied = false;
  try { await navigator.clipboard.writeText(text); copied = true; } catch { /* insecure context or denied */ }
  window.open(RESORT.messenger, '_blank', 'noopener');
  return copied;
}
