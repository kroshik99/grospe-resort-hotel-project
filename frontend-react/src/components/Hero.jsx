import Logo from './Logo.jsx';
import Icon from './Icon.jsx';
import Photo from './Photo.jsx';
import { RESORT, ROOMS } from '../content.js';
import { peso } from '../contact.js';

const fromRate = Math.min(...ROOMS.filter(r => !r.perPerson).map(r => r.price));

export default function Hero() {
  return (
    <section className="hero">
      {/* the pool, heavily blurred, as atmosphere behind the navy */}
      <div className="hero-bg" aria-hidden="true"><img src="/photos/pool.jpg" alt="" /></div>
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <Logo className="hero-mark" />
          <span className="eyebrow">Station 3 · Boracay Island</span>
          <h1>Peaceful comfort, <em>impeccable service</em></h1>
          <p className="hero-lede">
            Four ways to stay, with our own swimming pool and videoke — from a deluxe room for two
            to a two-storey villa for the whole barkada.
          </p>
          <div className="cta-row">
            <a href="#rooms" className="btn btn-gold">See rooms &amp; rates</a>
            <a href={RESORT.messenger} target="_blank" rel="noopener" className="btn btn-outline-light">
              <Icon name="chat" size={18} /> Message us
            </a>
          </div>
          <div className="hero-perk"><Icon name="car" size={18} /> Ber-months 4D/3N packages include round-trip transfer</div>
        </div>

        <div className="hero-collage" aria-hidden="true">
          <figure className="hc hc-1"><Photo src="/photos/aldrin-suite.jpg" eager /></figure>
          <figure className="hc hc-3"><Photo src="/photos/exterior.jpg" eager /></figure>
          <figure className="hc hc-2"><Photo src="/photos/pool.jpg" eager /></figure>
          <div className="hc-badge">Rooms from<strong>{peso.format(fromRate)}</strong>a night</div>
        </div>
      </div>
    </section>
  );
}
