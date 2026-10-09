import { useEffect, useState } from 'react';
import { useReveal } from './useReveal.jsx';
import { ROOMS } from './content.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Inquiry from './components/Inquiry.jsx';
import Rooms from './components/Rooms.jsx';
import Packages from './components/Packages.jsx';
import Toast, { useToast } from './components/Toast.jsx';
import { EventBar, EventPromo } from './components/Events.jsx';
import { About, Services, Gallery, Location, Faq, FinalCta, Footer, MobileBar } from './components/Sections.jsx';

export default function App() {
  const [roomId, setRoomId] = useState(ROOMS[0].id);
  const [pulse, setPulse] = useState(0);
  const [toast, setToast] = useToast();
  useReveal('page');

  // Arriving from another page at /#rooms etc.: the sections only exist once React has rendered,
  // after the browser's own jump to the anchor, so jump again now.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  // A room card's "Inquire" picks that room in the planner (the link itself scrolls to #book).
  function inquire(id) {
    setRoomId(id);
    setPulse(p => p + 1);
  }

  return (
    <>
      <EventBar />
      <Header />
      <div id="top" />
      <Hero />
      <Inquiry roomId={roomId} setRoomId={setRoomId} pulse={pulse} onToast={setToast} />
      <EventPromo />
      <About />
      <Rooms onInquire={inquire} />
      <Packages onToast={setToast} />
      <Services />
      <Gallery />
      <Location />
      <Faq />
      <FinalCta />
      <Footer />
      <MobileBar />
      <Toast text={toast} />
    </>
  );
}
