import { useEffect, useRef } from 'react';
import { RESORT } from '../content.js';
import { BOOKING_NOTICE, bookingPage } from '../contact.js';
import Icon from './Icon.jsx';

const host = new URL(RESORT.booking).host;

/** "You're leaving our site" check before the SwiftBook booking page. Every bookingLink opens it;
 *  mount once per page. A native <dialog> gives us Esc, focus trapping and the backdrop for free. */
export default function BookingNotice() {
  const dialog = useRef(null);
  const go = useRef(null);

  useEffect(() => {
    const open = (e) => { e.preventDefault(); dialog.current.showModal(); go.current.focus(); };
    addEventListener(BOOKING_NOTICE, open);
    return () => removeEventListener(BOOKING_NOTICE, open);
  }, []);

  const close = () => dialog.current.close();

  return (
    // Clicks on the dialog element itself (not its contents) land on the backdrop.
    <dialog ref={dialog} className="leave" aria-labelledby="leave-title" aria-describedby="leave-text"
      onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="leave-body">
        <span className="leave-icon"><Icon name="calendar" size={22} /></span>
        <span className="eyebrow">Leaving our site</span>
        <h2 id="leave-title">Continue to our booking page?</h2>
        <p id="leave-text">
          Rooms are booked on SwiftBook, the resort’s online reservation system. It opens in a new tab
          at <strong>{host}</strong>, so this page stays right here.
        </p>
        <div className="leave-actions">
          <button type="button" className="btn btn-ghost" onClick={close}>Stay here</button>
          <a ref={go} {...bookingPage} className="btn btn-gold" onClick={close}>
            Continue to booking <Icon name="arrow" size={16} />
          </a>
        </div>
      </div>
    </dialog>
  );
}
