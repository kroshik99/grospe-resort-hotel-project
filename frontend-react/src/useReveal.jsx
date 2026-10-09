import { useEffect, useRef, useState } from 'react';

/** Marks every `.reveal` element with `data-in` as it scrolls into view (the CSS does the rest).
 *  An attribute rather than a class: React rewrites `className` whenever it changes (e.g. an FAQ
 *  item gaining `open`), which would wipe an added class and hide the element again.
 *  Re-scans whenever `key` changes, so a freshly rendered hotel animates in again. */
export function useReveal(key) {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.setAttribute('data-in', '');
        io.unobserve(e.target);
      }
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal:not([data-in])').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Counts a stat like "4.8", "12" or "2 min" up from zero the first time it's on screen. */
export function CountUp({ value }) {
  const ref = useRef(null);
  const [, num, rest] = String(value).match(/^([\d.]+)(.*)$/) ?? [null, null, ''];
  const decimals = num?.split('.')[1]?.length ?? 0;
  const [shown, setShown] = useState(num ? (0).toFixed(decimals) : value);

  useEffect(() => {
    if (!num) return;
    if (reducedMotion()) { setShown(num); return; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now(), target = parseFloat(num), dur = 1400;
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur), eased = 1 - Math.pow(1 - p, 3);
        setShown((target * eased).toFixed(decimals));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [num, decimals]);

  return <span ref={ref}>{num ? shown + rest : value}</span>;
}
