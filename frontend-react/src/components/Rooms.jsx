import Photo from './Photo.jsx';
import Icon from './Icon.jsx';
import { ROOMS } from '../content.js';
import { peso } from '../contact.js';

export function Checks({ items }) {
  return (
    <ul className="checks">
      {items.map(t => <li key={t}><span className="tick"><Icon name="check" size={11} stroke={3.2} /></span>{t}</li>)}
    </ul>
  );
}

export default function Rooms({ onInquire }) {
  return (
    <section id="rooms">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Stay with us</span>
          <h2>Rooms &amp; rates</h2>
          <p className="lede">From a deluxe room for two to a two-storey villa with its own kitchen — plus bunk beds for backpackers.</p>
        </div>
        <div className="rooms-grid">
          {ROOMS.map((room, i) => (
            <article className="room reveal" style={{ '--i': i }} key={room.id}>
              <div className="room-media">
                <Photo src={room.photo} alt={room.name} />
                <span className="room-tag">{room.tag}</span>
              </div>
              <div className="room-body">
                <h3>{room.name}</h3>
                <Checks items={room.features} />
                <div className="room-foot">
                  <div className="price">
                    <span className="line"><span className="amt">{peso.format(room.price)}</span> <span className="per">/ {room.unit}</span></span>
                    {room.extra && <small>+{peso.format(room.extra)} per extra guest</small>}
                  </div>
                  <a href="#book" className="btn btn-navy" onClick={() => onInquire(room.id)}>Inquire</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
