import { useId } from 'react';

/* Halloween set dressing for events with theme: 'halloween'. All of it is decorative
   (aria-hidden), animated in events.css, and frozen by the reduced-motion rule in styles.css. */

const BAT = 'M50 19L53 12L55 19Q74 6 98 12Q91 17 89 27Q83 22 76 29Q69 23 63 33Q58 30 54 38L50 42L46 38Q42 30 37 33Q31 23 24 29Q17 22 11 27Q9 17 2 12Q26 6 45 19L47 12Z';

// [top %, width px, seconds to cross, head start s] — negative delays so bats are mid-flight on load.
const FLIGHTS = [[12, 46, 17, 2], [24, 30, 22, 9], [7, 22, 26, 15], [34, 36, 19, 13], [18, 18, 29, 22]];

export function Bats({ count = FLIGHTS.length }) {
  return (
    <div className="bats" aria-hidden="true">
      {FLIGHTS.slice(0, count).map(([y, w, d, head], i) => (
        <span className="bat" key={i} style={{ '--y': `${y}%`, '--w': `${w}px`, '--d': `${d}s`, '--delay': `-${head}s` }}>
          <svg viewBox="0 0 100 50"><path d={BAT} /></svg>
        </span>
      ))}
    </div>
  );
}

// Glowing sparks drifting up, like the candlelight on the flyer.
const SPARKS = Array.from({ length: 16 }, (_, i) => ({ x: (i * 37 + 11) % 100, d: 7 + ((i * 5) % 7), head: i * 1.3, s: 2 + (i % 3) }));

export function Embers({ count = SPARKS.length }) {
  return (
    <div className="embers" aria-hidden="true">
      {SPARKS.slice(0, count).map((e, i) => (
        <span key={i} style={{ '--x': `${e.x}%`, '--d': `${e.d}s`, '--delay': `-${e.head}s`, '--s': `${e.s}px` }} />
      ))}
    </div>
  );
}

// Cobweb for a top-left corner (CSS mirrors it for the right): spokes from the corner,
// joined by rings that sag toward it.
const r1 = (n) => +n.toFixed(1);
const at = (r, deg) => [r1(r * Math.cos(deg * Math.PI / 180)), r1(r * Math.sin(deg * Math.PI / 180))].join(' ');
const SPOKES = [0, 18, 36, 54, 72, 90];
const RINGS = [20, 38, 56, 74, 92];
const WEB = [
  ...SPOKES.map(a => `M0 0L${at(104, a)}`),
  ...RINGS.map(r => `M${at(r, 0)}` + SPOKES.slice(1).map((a, i) => `Q${at(r * 0.84, (a + SPOKES[i]) / 2)} ${at(r, a)}`).join('')),
].join('');

export function Web({ className = '', spider = false }) {
  return (
    <svg className={`web ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      <path d={WEB} />
      {spider && (
        <g className="spider">
          <path d="M33.3 33.3V58M31 59.5l-3-2.2M30.8 61.2h-3.4M31 62.8l-3 2.2M35.6 59.5l3-2.2M35.8 61.2h3.4M35.6 62.8l3 2.2" />
          <circle cx="33.3" cy="61" r="2.6" /><circle cx="33.3" cy="57.6" r="1.5" />
        </g>
      )}
    </svg>
  );
}

/** A jack-o'-lantern with a flickering carved face. */
export function Pumpkin({ className = '' }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`pumpkin ${className}`} viewBox="0 0 120 110" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}s`} cx="50%" cy="42%" r="62%">
          <stop offset="0" stopColor="#FFBE55" /><stop offset=".55" stopColor="#EE7A1E" /><stop offset="1" stopColor="#8E3207" />
        </radialGradient>
      </defs>
      <path className="pk-stem" d="M56.5 31c-1-9 2-15.5 8.5-19.5l5 4.2c-5.5 3.3-7.3 8-6.3 15.3z" />
      <g fill={`url(#${id}s)`} stroke="#7A2A06" strokeOpacity=".45">
        <ellipse cx="38" cy="66" rx="28" ry="34" /><ellipse cx="82" cy="66" rx="28" ry="34" /><ellipse cx="60" cy="66" rx="25" ry="37" />
      </g>
      <path className="pk-face" d="M37 58h13l-6.5-11zM70 58h13l-6.5-11zM55 69h10l-5-7zM32 75l7 5 5-4 6 6 10-5 10 5 6-6 5 4 7-5c-5 15-17 21-28 21s-23-6-28-21z" />
    </svg>
  );
}

/** The whole night sky: moon, bats, drifting fog and sparks, with webs in the top corners. */
export function Night() {
  return (
    <div className="night" aria-hidden="true">
      <span className="moon" />
      <Bats />
      <Embers />
      <span className="fog fog-1" /><span className="fog fog-2" />
      <Web className="web-tl" spider /><Web className="web-tr" />
    </div>
  );
}
