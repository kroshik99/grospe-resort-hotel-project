import { RESORT } from './content.js';

export const peso = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 });

export const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** Spread onto an <a>: opens the resort's booking page (SwiftBook) in a new tab. */
export const bookingLink = { href: RESORT.booking, target: '_blank', rel: 'noopener' };

/** Messenger can't be pre-filled, so copy the inquiry first and open the chat;
 *  the guest just pastes. Returns whether the copy worked, for the toast. */
export async function sendOnMessenger(text) {
  let copied = false;
  try { await navigator.clipboard.writeText(text); copied = true; } catch { /* insecure context or denied */ }
  window.open(RESORT.messenger, '_blank', 'noopener');
  return copied;
}
