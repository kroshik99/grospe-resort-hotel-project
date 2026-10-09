import { useEffect, useState } from 'react';
import { Brand } from './Logo.jsx';
import { currentEvents } from '../events.js';

// Root-relative, so they work from /events/ too (on the home page they just scroll).
const LINKS = [['/#rooms', 'Rooms'], ['/#packages', 'Packages'], ['/events/', 'Events', 'events'], ['/#services', 'Services'], ['/#gallery', 'Gallery'], ['/#location', 'Location'], ['/#faq', 'FAQ']];

/** `current` names this page's link (e.g. "events") so it's marked as the current page. */
export default function Header({ current }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);
  const eventOn = currentEvents().length > 0; // a pulsing dot on "Events" while one is coming up

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 12);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap nav">
        <Brand onClick={close} />
        <nav className={`navlinks${open ? ' open' : ''}`} onClick={close}>
          {LINKS.map(([href, label, page]) => (
            <a key={href} href={href} aria-current={page && page === current ? 'page' : undefined}
              className={page === 'events' && eventOn ? 'nav-hot' : undefined}>{label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <a href="/#book" className="btn btn-gold btn-book">Book now</a>
          <button className="icon-btn menu-toggle" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
