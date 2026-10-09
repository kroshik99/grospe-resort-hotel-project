import { useEffect, useState } from 'react';
import { Brand } from './Logo.jsx';

const LINKS = [['#rooms', 'Rooms'], ['#packages', 'Packages'], ['#services', 'Services'], ['#gallery', 'Gallery'], ['#location', 'Location'], ['#faq', 'FAQ']];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

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
          {LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <a href="#book" className="btn btn-gold btn-book">Book now</a>
          <button className="icon-btn menu-toggle" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
