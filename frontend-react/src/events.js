import { useEffect, useState } from 'react';
import { EVENTS } from './content.js';

/** 'upcoming' until it starts, 'live' while it's on, then 'past'. */
export function eventStatus(ev, now = Date.now()) {
  if (now >= Date.parse(ev.ends)) return 'past';
  return now >= Date.parse(ev.starts) ? 'live' : 'upcoming';
}

const byStart = (a, b) => Date.parse(a.starts) - Date.parse(b.starts);

/** Events that haven't ended yet, soonest first. The first one gets promoted. */
export const currentEvents = (now = Date.now()) => EVENTS.filter(e => eventStatus(e, now) !== 'past').sort(byStart);

/** Finished events, most recent first. */
export const pastEvents = (now = Date.now()) => EVENTS.filter(e => eventStatus(e, now) === 'past').sort((a, b) => byStart(b, a));

/** Whole days, hours, minutes and seconds left until `iso`. */
export function timeLeft(iso, now = Date.now()) {
  const s = Math.max(0, Math.floor((Date.parse(iso) - now) / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor(s / 3600) % 24, mins: Math.floor(s / 60) % 60, secs: s % 60 };
}

/** The current time, refreshed every `ms` — so countdowns tick and a finished event drops off. */
export function useNow(ms = 1000) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}
