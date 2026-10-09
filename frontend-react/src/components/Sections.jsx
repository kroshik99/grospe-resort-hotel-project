import { useEffect, useState } from 'react';
import Photo from './Photo.jsx';
import Icon from './Icon.jsx';
import Logo, { Brand } from './Logo.jsx';
import { CountUp } from '../useReveal.jsx';
import { RESORT, ROOMS, SERVICES, GALLERY, FAQ } from '../content.js';

// `.reveal` elements fade/slide in on scroll (see useReveal); `--i` staggers siblings.

export function About() {
  const beds = Math.min(...ROOMS.map(r => r.price));
  return (
    <section id="about">
      <div className="wrap about-grid">
        <div className="about-copy reveal from-left">
          <span className="eyebrow">Welcome</span>
          <h2>Your home base on the Station 3 side of Boracay</h2>
          <p>Grospe Resort Boracay sits in Ambulong, Manoc-Manoc, with its own swimming pool and videoke — and rooms for couples, families, barkadas and backpackers.</p>
          <p>We’ll help with the rest — transfers with our accredited partner, island activities and massages through people we trust, and an all-day breakfast menu when you get back.</p>
          <div className="stat-row">
            <div className="stat"><div className="n"><CountUp value={String(ROOMS.length)} /></div><div className="l">Room types</div></div>
            <div className="stat"><div className="n"><CountUp value="6" /></div><div className="l">Guests in a family suite or villa</div></div>
            <div className="stat"><div className="n">₱<CountUp value={String(beds)} /></div><div className="l">Backpacker beds, per guest</div></div>
          </div>
        </div>
        <div className="about-media reveal from-right">
          <figure className="am am-1"><Photo src="/photos/building.jpg" alt="Grospe Resort balconies" /></figure>
          <figure className="am am-2"><Photo src="/photos/living.jpg" alt="Suite living area" /></figure>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="tint">
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">Services</span>
          <h2>Everything taken care of</h2>
          <span className="ornament"><span /></span>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <div className="svc reveal" style={{ '--i': i }} key={s.t}>
              <span className="svc-icon"><Icon name={s.i} size={24} stroke={1.6} /></span>
              <div><h3>{s.t}</h3><p>{s.d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const [open, setOpen] = useState(null);
  const isOpen = open !== null;
  const nav = (step) => setOpen(i => (i + step + GALLERY.length) % GALLERY.length);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
      else if (e.key === 'ArrowRight') nav(1);
      else if (e.key === 'ArrowLeft') nav(-1);
    };
    addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; };
  }, [isOpen]);

  const stop = (fn) => (e) => { e.stopPropagation(); fn(); };

  return (
    <section id="gallery">
      <div className="wrap">
        <div className="sec-head reveal"><span className="eyebrow">Look around</span><h2>The resort</h2></div>
        <div className="gal-grid">
          {GALLERY.map((g, i) => (
            <button className={`gal-item reveal zoom ${g.cls}`} style={{ '--i': i }} key={g.src} onClick={() => setOpen(i)}>
              <Photo src={g.src} alt={g.c} />
              <span className="gal-cap">{g.c}</span>
            </button>
          ))}
        </div>
      </div>
      {isOpen && (
        <div className="lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={GALLERY[open].c}>
          <button className="close" aria-label="Close">✕</button>
          <button className="lb-nav prev" onClick={stop(() => nav(-1))} aria-label="Previous photo">‹</button>
          <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
            <div className="frame" key={open}><Photo src={GALLERY[open].src} alt={GALLERY[open].c} eager /></div>
            <figcaption className="cap">{GALLERY[open].c}<span>{open + 1} / {GALLERY.length}</span></figcaption>
          </figure>
          <button className="lb-nav next" onClick={stop(() => nav(1))} aria-label="Next photo">›</button>
        </div>
      )}
    </section>
  );
}

export function Location() {
  const q = encodeURIComponent(RESORT.mapQuery);
  return (
    <section id="location" className="tint">
      <div className="wrap loc-grid">
        <div className="reveal from-left">
          <span className="eyebrow">Find us</span>
          <h2 className="loc-h">In Station 3, Boracay</h2>
          <ul className="loc-list">
            <li><Icon name="pin" /><div><strong>Address</strong>{RESORT.address.join(', ')}</div></li>
            <li><Icon name="phone" /><div><strong>Call or text</strong>
              <a href={RESORT.landline.href}>{RESORT.landline.label}</a> · <a href={RESORT.mobile.href}>{RESORT.mobile.label}</a></div></li>
            <li><Icon name="facebook" /><div><strong>Facebook</strong>
              <a href={RESORT.facebook} target="_blank" rel="noopener">facebook.com/grosperesortboracay</a></div></li>
          </ul>
          <div className="loc-actions">
            <a className="btn btn-navy" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener"><Icon name="pin" size={18} /> Get directions</a>
            <a className="btn btn-ghost" href={RESORT.messenger} target="_blank" rel="noopener"><Icon name="chat" size={18} /> Message us</a>
          </div>
        </div>
        <div className="loc-map reveal zoom">
          <iframe title="Map to Grospe Resort Boracay" src={`https://maps.google.com/maps?q=${q}&z=16&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq">
      <div className="wrap">
        <div className="sec-head center reveal"><span className="eyebrow">Good to know</span><h2>Frequently asked</h2></div>
        <div className="faq-wrap">
          {FAQ.map((f, i) => (
            <div className={`faq reveal${open === i ? ' open' : ''}`} style={{ '--i': i }} key={f.q}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{f.q}</button>
              <div className="ans" style={{ maxHeight: open === i ? '260px' : 0 }}><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final">
      <div className="final-bg" aria-hidden="true"><img src="/photos/building.jpg" alt="" /></div>
      <div className="wrap inner reveal">
        <Logo full className="final-logo" />
        <h2>Your Boracay escape starts here</h2>
        <p>{RESORT.tagline}</p>
        <div className="cta-row">
          <a href={RESORT.messenger} target="_blank" rel="noopener" className="btn btn-gold"><Icon name="chat" size={18} /> Message us</a>
          <a href={RESORT.landline.href} className="btn btn-outline-light"><Icon name="phone" size={18} /> {RESORT.landline.label}</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Brand />
            <p>Rooms for couples, families, barkadas and backpackers in Station 3, Boracay Island.</p>
          </div>
          <div><h5>Visit</h5>{RESORT.address.map(l => <span key={l}>{l}</span>)}</div>
          <div><h5>Call</h5><a href={RESORT.landline.href}>{RESORT.landline.label}</a><a href={RESORT.mobile.href}>{RESORT.mobile.label}</a></div>
          <div><h5>Explore</h5><a href="#rooms">Rooms &amp; rates</a><a href="#packages">Packages</a><a href="#gallery">Gallery</a>
            <a href={RESORT.facebook} target="_blank" rel="noopener">Facebook</a></div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 {RESORT.name}. All rights reserved.</span>
          <span>Rates subject to availability and confirmation.</span>
        </div>
      </div>
    </footer>
  );
}

/** Phone-only bar: Message / Call always one tap away once you're past the hero. */
export function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(scrollY > 520);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`mobile-bar${show ? ' show' : ''}`}>
      <a href={RESORT.messenger} target="_blank" rel="noopener" className="btn btn-gold"><Icon name="chat" size={18} /> Message</a>
      <a href={RESORT.mobile.href} className="btn btn-navy"><Icon name="phone" size={18} /> Call</a>
    </div>
  );
}
