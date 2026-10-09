import { useState } from 'react';
import Icon from './Icon.jsx';
import Photo from './Photo.jsx';
import { Bats, Embers, Pumpkin, Web } from './Spooky.jsx';
import { currentEvents, eventStatus, timeLeft, useNow } from '../events.js';
import { plural } from '../contact.js';

/** Days / hours / minutes / seconds to the start, then "Happening now". */
export function Countdown({ ev }) {
  const now = useNow();
  const status = eventStatus(ev, now);
  if (status !== 'upcoming') {
    return <div className={`cd-live ${status}`}><span className="cd-dot" />{status === 'live' ? 'Happening now — come join us!' : 'This event has ended'}</div>;
  }
  const t = timeLeft(ev.starts, now);
  const units = [['Days', t.days], ['Hours', t.hours], ['Mins', t.mins], ['Secs', t.secs]];
  return (
    <div className="countdown" role="timer" aria-label={`Starts in ${plural(t.days, 'day')}, ${plural(t.hours, 'hour')}`}>
      {units.map(([label, n]) => (
        <div className="cd-unit" key={label} aria-hidden="true">
          <span className="cd-num" key={n}>{String(n).padStart(2, '0')}</span>
          <span className="cd-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

const DISMISSED = 'grospe-event-bar-dismissed';
const readDismissed = () => { try { return localStorage.getItem(DISMISSED); } catch { return null; } };

/** Thin strip above the header announcing the next event. Hiding it lasts until a new event. */
export function EventBar() {
  const now = useNow(60000);
  const [dismissed, setDismissed] = useState(readDismissed);
  const ev = currentEvents(now)[0];
  if (!ev || dismissed === ev.id) return null;

  const live = eventStatus(ev, now) === 'live';
  const t = timeLeft(ev.starts, now);
  const left = t.days ? `${plural(t.days, 'day')} to go` : `${t.hours}h ${t.mins}m to go`;

  function dismiss() {
    setDismissed(ev.id);
    try { localStorage.setItem(DISMISSED, ev.id); } catch { /* private mode: hide for this visit only */ }
  }

  return (
    <div className={`ev-bar theme-${ev.theme ?? 'plain'}`}>
      <a href="/events/" className="ev-bar-link">
        <Icon name={ev.theme === 'halloween' ? 'pumpkin' : 'sparkle'} size={18} className="ev-bar-icon" />
        <strong>{ev.title}</strong>
        <span className="ev-bar-when">{live ? 'Happening now' : ev.short}</span>
        {!live && <span className="ev-bar-left">{left}</span>}
        <span className="ev-bar-cta">See the event <Icon name="arrow" size={14} stroke={2.2} /></span>
      </a>
      <button className="ev-bar-x" onClick={dismiss} aria-label="Hide this announcement"><Icon name="close" size={14} stroke={2.2} /></button>
    </div>
  );
}

/** Home-page banner for the next event, styled after its flyer. Gone once the event ends. */
export function EventPromo() {
  const now = useNow(60000);
  const ev = currentEvents(now)[0];
  if (!ev) return null;
  const spooky = ev.theme === 'halloween';

  return (
    <section className="evp-sec" aria-labelledby="evp-title">
      <div className="wrap">
        <div className={`evp theme-${ev.theme ?? 'plain'} reveal zoom`}>
          {spooky && <><Bats count={3} /><Embers count={10} /><Web className="web-tr" /></>}
          <div className="evp-copy">
            <span className="ev-kicker"><Icon name="sparkle" size={14} /> Upcoming event · {ev.short}</span>
            <h2 className="ev-title evp-title" id="evp-title">{ev.title}</h2>
            <p className="evp-tagline">{ev.tagline}</p>
            <p className="evp-lede">{ev.lede}</p>
            <ul className="ev-chips">
              {ev.chips.map(([icon, text]) => <li key={text}><Icon name={icon} size={16} />{text}</li>)}
            </ul>
            <Countdown ev={ev} />
            <div className="cta-row">
              <a href="/events/" className="btn btn-ember">See the event <Icon name="arrow" size={16} stroke={2.2} /></a>
              <a href="/events/#reserve" className="btn btn-outline-light">Reserve a spot</a>
            </div>
          </div>
          <a href="/events/" className="evp-media" aria-hidden="true" tabIndex={-1}>
            <figure className="ev-frame evp-f1"><Photo src={ev.photo.src} alt="" /></figure>
            <figure className="ev-frame evp-f2"><Photo src={ev.scene.src} alt="" /></figure>
            {spooky && <Pumpkin className="evp-pumpkin" />}
          </a>
        </div>
      </div>
    </section>
  );
}
