import { useCallback, useEffect, useState } from 'react';
import { useReveal } from './useReveal.jsx';
import { RESORT } from './content.js';
import { currentEvents, pastEvents, useNow } from './events.js';
import { peso, bookingLink } from './contact.js';
import Header from './components/Header.jsx';
import Icon from './components/Icon.jsx';
import Logo from './components/Logo.jsx';
import Photo from './components/Photo.jsx';
import { Countdown } from './components/Events.jsx';
import { Night, Pumpkin, Web } from './components/Spooky.jsx';
import { Footer, MobileBar } from './components/Sections.jsx';

/** /events/ — the next event in full (banner, activities, schedule, prices, poster),
 *  then anything else coming up, past events, and hosting your own. */
export default function EventsPage() {
  const now = useNow(60000);
  const [featured, ...more] = currentEvents(now);
  const past = pastEvents(now);
  const [poster, setPoster] = useState(null);
  const closePoster = useCallback(() => setPoster(null), []);
  useReveal(featured?.id ?? 'none');

  return (
    <>
      <Header current="events" />
      <div id="top" />
      <main className="ev-page">
        {featured ? (
          <>
            <EventHero ev={featured} onPoster={() => setPoster(featured)} />
            <Activities ev={featured} />
            <Plan ev={featured} />
            <Join ev={featured} onPoster={() => setPoster(featured)} />
          </>
        ) : <NoEvents />}
        {more.length > 0 && <EventList eyebrow="Coming up" title="More events" events={more} />}
        {past.length > 0 && <EventList eyebrow="Looking back" title="Past events" events={past} />}
        <HostEvent />
      </main>
      <Footer />
      <MobileBar />
      {poster && <PosterView ev={poster} onClose={closePoster} />}
    </>
  );
}

function EventHero({ ev, onPoster }) {
  const spooky = ev.theme === 'halloween';
  return (
    <section className={`ev-hero theme-${ev.theme ?? 'plain'}`}>
      <div className="ev-hero-bg" aria-hidden="true"><img src={ev.scene.src} alt="" /></div>
      {spooky && <Night />}
      <div className="wrap ev-hero-inner">
        <div className="ev-hero-copy">
          <span className="ev-presents"><Logo className="ev-mark" /> Grospe Resort Boracay presents</span>
          <h1 className="ev-title">{ev.title.split(' ').map((w, i) => <span key={i}>{w}</span>)}</h1>
          <div className="ev-ribbon">{ev.tagline}</div>
          <ul className="ev-facts">
            <li><Icon name="calendar" /><div><small>Date</small>{ev.when}</div></li>
            <li><Icon name="clock" /><div><small>Time</small>{ev.time}</div></li>
            <li><Icon name="pin" /><div><small>Where</small>Grospe Resort, Station 3</div></li>
          </ul>
          <Countdown ev={ev} />
          <div className="cta-row">
            <a {...bookingLink} className="btn btn-ember"><Icon name="calendar" size={18} /> Book your stay</a>
            {ev.poster && <button className="btn btn-outline-light" onClick={onPoster}>View the poster</button>}
          </div>
        </div>
        <div className="ev-hero-art">
          <figure className="ev-frame ev-f1"><Photo src={ev.photo.src} alt={ev.photo.alt} eager /></figure>
          <figure className="ev-frame ev-f2"><Photo src={ev.scene.src} alt={ev.scene.alt} eager /></figure>
          <div className="ev-badge" aria-hidden="true"><Icon name="trophy" size={22} />Prizes<strong>await!</strong></div>
          {spooky && <Pumpkin className="ev-pumpkin" />}
        </div>
      </div>
    </section>
  );
}

function Activities({ ev }) {
  return (
    <section className="ev-sec ev-acts">
      {ev.theme === 'halloween' && <Web className="web-tr" spider />}
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">What’s happening</span>
          <h2>{ev.activitiesTitle}</h2>
          <span className="ornament"><span /></span>
        </div>
        <div className="act-grid">
          {ev.activities.map((a, i) => (
            <div className="act reveal" style={{ '--i': i }} key={a.t}>
              <span className="act-icon"><Icon name={a.i} size={26} stroke={1.7} /></span>
              <h3>{a.t}</h3>
              <p>{a.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Plan({ ev }) {
  const rates = [
    { i: 'home', t: 'In-house guests', price: 'Free', d: 'No entrance fee — plus Halloween treats for every kid in the house.' },
    ev.dayPass && { i: 'ticket', t: 'Day-pass guests', price: peso.format(ev.dayPass), d: 'Entrance fee for guests visiting for the day.' },
    ev.facePainting && { i: 'palette', t: 'Face painting', price: peso.format(ev.facePainting.price), d: `Each, starting at ${ev.facePainting.from}.` },
  ].filter(Boolean);

  return (
    <section className="ev-sec ev-plan">
      <div className="wrap plan-grid">
        <div className="reveal from-left">
          <span className="eyebrow">The afternoon</span>
          <h2 className="plan-h">Schedule</h2>
          <ol className="timeline">
            {ev.schedule.map(s => (
              <li key={s.h}><span className="tl-time">{s.t}</span><h3>{s.h}</h3><p>{s.d}</p></li>
            ))}
          </ol>
        </div>
        <div className="reveal from-right">
          <span className="eyebrow">Getting in</span>
          <h2 className="plan-h">Prices</h2>
          <div className="tickets">
            {rates.map(r => (
              <div className="ticket" key={r.t}>
                <span className="ticket-icon"><Icon name={r.i} size={22} /></span>
                <div><h3>{r.t}</h3><p>{r.d}</p></div>
                <strong className="ticket-price">{r.price}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Next to the poster: how to come, with booking for guests who'd like to stay over. */
function Join({ ev, onPoster }) {
  return (
    <section className="ev-sec ev-join" id="join">
      <div className="wrap join-grid">
        <div className="join-card reveal from-left">
          <span className="eyebrow">Join the fun</span>
          <h2>See you on {ev.when.split(',').slice(0, 2).join(',')}</h2>
          <p className="join-when"><Icon name="clock" size={18} /> {ev.time}{ev.facePainting ? ` · face painting from ${ev.facePainting.from}` : ''}</p>
          {ev.join && <p>{ev.join}</p>}
          <div className="join-actions">
            <a {...bookingLink} className="btn btn-ember"><Icon name="calendar" size={18} /> Book your stay</a>
            <a href={RESORT.messenger} target="_blank" rel="noopener" className="btn btn-ghost-dark"><Icon name="chat" size={18} /> Message us</a>
            <a href={RESORT.mobile.href} className="btn btn-ghost-dark"><Icon name="phone" size={18} /> Call</a>
          </div>
        </div>

        {ev.poster && (
          <div className="join-poster reveal from-right">
            <button className="poster-thumb" onClick={onPoster} aria-label="View the event poster">
              <img src={ev.poster} alt="" loading="lazy" />
              <span className="poster-hint"><Icon name="search" size={16} /> Tap to enlarge</span>
            </button>
            <div className="poster-actions">
              <a className="btn btn-ghost-dark" href={ev.poster} download><Icon name="download" size={18} /> Save poster</a>
              <a className="btn btn-ghost-dark" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.origin + '/events/')}`} target="_blank" rel="noopener">
                <Icon name="facebook" size={18} /> Share
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PosterView({ ev, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${ev.title} poster`}>
      <button className="close" aria-label="Close">✕</button>
      <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
        <div className="frame poster"><img className="ph loaded" src={ev.poster} alt={`${ev.title} poster: ${ev.tagline}, ${ev.when} at ${ev.time}`} /></div>
      </figure>
    </div>
  );
}

function EventList({ eyebrow, title, events }) {
  return (
    <section className="ev-sec ev-list">
      <div className="wrap">
        <div className="sec-head reveal"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
        <div className="ev-cards">
          {events.map((ev, i) => (
            <article className="ev-card reveal" style={{ '--i': i }} key={ev.id}>
              <div className="ev-card-media"><Photo src={ev.photo.src} alt={ev.photo.alt} /></div>
              <div className="ev-card-body">
                <span className="eyebrow">{ev.when}</span>
                <h3>{ev.title}</h3>
                <p>{ev.lede}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NoEvents() {
  return (
    <section className="ev-hero ev-empty">
      <div className="wrap ev-empty-inner">
        <Logo className="ev-mark" />
        <h1>No events on the calendar right now</h1>
        <p>Follow us on Facebook to hear about the next one first — or plan your own celebration with us.</p>
        <div className="cta-row">
          <a href={RESORT.facebook} target="_blank" rel="noopener" className="btn btn-gold"><Icon name="facebook" size={18} /> Follow us</a>
          <a href="#host" className="btn btn-outline-light">Host an event</a>
        </div>
      </div>
    </section>
  );
}

function HostEvent() {
  return (
    <section className="host" id="host">
      <div className="wrap about-grid">
        <div className="about-copy reveal from-left">
          <span className="eyebrow">Celebrate with us</span>
          <h2>Planning a party or a meeting?</h2>
          <p>We have a venue at the resort for meetings and celebrations, a swimming pool and videoke for the family, and an all-day breakfast menu with drinks.</p>
          <p>Message us with your date and headcount, and we’ll help you plan the rest.</p>
          <div className="cta-row">
            <a href={RESORT.messenger} target="_blank" rel="noopener" className="btn btn-navy"><Icon name="chat" size={18} /> Message us</a>
            <a href={RESORT.landline.href} className="btn btn-ghost"><Icon name="phone" size={18} /> {RESORT.landline.label}</a>
          </div>
        </div>
        <div className="about-media reveal from-right">
          <figure className="am am-1"><Photo src="/photos/pool.jpg" alt="The resort swimming pool" /></figure>
          <figure className="am am-2"><Photo src="/photos/building.jpg" alt="Grospe Resort balconies" /></figure>
        </div>
      </div>
    </section>
  );
}
