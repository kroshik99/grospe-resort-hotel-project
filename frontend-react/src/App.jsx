import { useEffect, useState } from 'react';
import { useReveal } from './useReveal.jsx';
import { ROOMS } from './content.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Inquiry from './components/Inquiry.jsx';
import Rooms from './components/Rooms.jsx';
import Packages from './components/Packages.jsx';
import Icon from './components/Icon.jsx';
import { About, Services, Gallery, Location, Faq, FinalCta, Footer, MobileBar } from './components/Sections.jsx';

export default function App() {
  const [roomId, setRoomId] = useState(ROOMS[0].id);
  const [pulse, setPulse] = useState(0);
  const [toast, setToast] = useState('');
  useReveal('page');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3600);
    return () => clearTimeout(t);
  }, [toast]);

  // A room card's "Inquire" picks that room in the planner (the link itself scrolls to #book).
  function inquire(id) {
    setRoomId(id);
    setPulse(p => p + 1);
  }

  return (
    <>
      <Header />
      <div id="top" />
      <Hero />
      <Inquiry roomId={roomId} setRoomId={setRoomId} pulse={pulse} onToast={setToast} />
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
      {toast && <div className="toast" role="status" key={toast}><Icon name="check" size={18} stroke={2.4} />{toast}</div>}
    </>
  );
}
