import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { RESORT, ROOMS } from '../content.js';
import { peso, smsHref, sendOnMessenger } from '../contact.js';

// Local (not UTC) date, so "today" is right for Philippine mornings too.
const today = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const nice = (iso) => new Date(`${iso}T00:00`).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** No backend: guests get an instant estimate from the published rates, then send the
 *  inquiry by Messenger, SMS or a call. The front desk confirms availability. */
export default function Inquiry({ roomId, setRoomId, pulse, onToast }) {
  const room = ROOMS.find(r => r.id === roomId) ?? ROOMS[0];
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [flash, setFlash] = useState(false);

  // A room card's "Inquire" button bumps `pulse`: highlight the card it lands on.
  useEffect(() => {
    if (!pulse) return;
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 1200);
    return () => clearTimeout(t);
  }, [pulse]);

  const g = Math.min(guests, room.max);
  const nights = checkIn && checkOut ? Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000) : 0;
  const ready = nights > 0;
  const base = room.perPerson ? room.price * g * nights : room.price * nights;
  const extraGuests = room.perPerson ? 0 : Math.max(0, g - room.goodFor);
  const extraCost = extraGuests * (room.extra ?? 0) * nights;
  const total = base + extraCost;

  const message = ready
    ? `Hi Grospe Resort! I'd like to inquire about the ${room.name} for ${plural(g, 'guest')}, ${nice(checkIn)} – ${nice(checkOut)} (${plural(nights, 'night')}). The website estimate is ${peso.format(total)}. Is it available?`
    : '';

  function pickCheckIn(v) {
    setCheckIn(v);
    if (checkOut && checkOut <= v) setCheckOut('');
  }

  async function messenger() {
    const copied = await sendOnMessenger(message);
    onToast(copied ? 'Inquiry copied — paste it into the Messenger chat.' : 'Opening Messenger — tell us your dates and room.');
  }

  return (
    <div className="wrap book reveal" id="book">
      <div className={`book-card${flash ? ' flash' : ''}`}>
        <div className="book-title">
          <h2>Plan your stay</h2>
          <p>Instant estimate · we confirm by message</p>
        </div>
        <div className="book-fields">
          <div className="field field-room">
            <label htmlFor="room">Room</label>
            <select id="room" value={room.id} onChange={e => setRoomId(e.target.value)}>
              {ROOMS.map(r => <option key={r.id} value={r.id}>{r.name} — {peso.format(r.price)}/{r.unit}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="in">Check-in</label>
            <input id="in" type="date" min={today()} value={checkIn} onChange={e => pickCheckIn(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="out">Check-out</label>
            <input id="out" type="date" min={checkIn || today()} value={checkOut} onChange={e => setCheckOut(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="guests">Guests</label>
            <select id="guests" value={g} onChange={e => setGuests(+e.target.value)}>
              {Array.from({ length: room.max }, (_, i) => i + 1).map(n => <option key={n} value={n}>{plural(n, 'guest')}</option>)}
            </select>
          </div>
        </div>

        {!ready && (
          <p className={`book-hint${checkIn && checkOut ? ' err' : ''}`}>
            {checkIn && checkOut ? 'Check-out must be after check-in.' : 'Pick your dates to see an estimate.'}
          </p>
        )}

        <div className={`estimate${ready ? ' open' : ''}`} aria-live="polite">
          <div>
            {ready && (
              <div className="est-body">
                <div className="est-lines">
                  <strong>{room.name} · {plural(nights, 'night')} · {plural(g, 'guest')}</strong>
                  <span>
                    {room.perPerson
                      ? `${peso.format(room.price)} × ${plural(g, 'guest')} × ${plural(nights, 'night')}`
                      : `${peso.format(room.price)} × ${plural(nights, 'night')}`} = {peso.format(base)}
                  </span>
                  {extraGuests > 0 && (
                    <span>+ {plural(extraGuests, 'extra guest')} × {peso.format(room.extra)} × {plural(nights, 'night')} = {peso.format(extraCost)}</span>
                  )}
                </div>
                <div className="est-total">
                  <small>Estimated total</small>
                  <strong key={total}>{peso.format(total)}</strong>
                </div>
                <div className="est-actions">
                  <button className="btn btn-gold" onClick={messenger}><Icon name="chat" size={18} /> Send on Messenger</button>
                  <a className="btn btn-ghost" href={smsHref(message)}><Icon name="sms" size={18} /> Text us</a>
                  <a className="btn btn-ghost" href={RESORT.mobile.href}><Icon name="phone" size={18} /> Call {RESORT.mobile.label}</a>
                </div>
                <p className="est-note">Estimate from our published rates. We’ll confirm availability and your final price.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
