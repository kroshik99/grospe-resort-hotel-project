import Photo from './Photo.jsx';
import Icon from './Icon.jsx';
import { Checks } from './Rooms.jsx';
import { PACKAGES } from '../content.js';
import { peso, sendOnMessenger } from '../contact.js';

/** The Ber-months promo, styled after the resort's own navy-and-gold flyer. */
export default function Packages({ onToast }) {
  async function inquire(p) {
    const copied = await sendOnMessenger(
      `Hi Grospe Resort! I'd like to book the ${PACKAGES.title} ${PACKAGES.length} package — ${p.room} (${peso.format(p.price)}). My dates are: `);
    onToast(copied ? 'Inquiry copied — paste it into Messenger and add your dates.' : 'Opening Messenger — tell us your dates.');
  }

  return (
    <section id="packages" className="packages">
      <div className="wrap">
        <div className="pk-head reveal">
          <span className="ornament"><span /></span>
          <h2 className="pk-title">{PACKAGES.title}</h2>
          <div className="pk-ribbon">{PACKAGES.length}</div>
          <div className="pk-sub">★ {PACKAGES.sub} ★</div>
          <p className="pk-perk">{PACKAGES.perk}</p>
        </div>
        <div className="pk-grid">
          {PACKAGES.items.map((p, i) => (
            <article className="pk reveal" style={{ '--i': i }} key={p.room}>
              <div className="pk-inner">
                <div className="pk-photo"><Photo src={p.photo} alt={p.room} /></div>
                <div className="pk-body">
                  <span className="ornament"><span /></span>
                  <h3>{p.room}</h3>
                  <Checks items={p.points} />
                  <div className="pk-price"><small>Only</small><strong>{peso.format(p.price)}</strong></div>
                  <button className="btn btn-gold" onClick={() => inquire(p)}><Icon name="chat" size={18} /> Inquire</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
