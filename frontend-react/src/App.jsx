import { useEffect } from 'react';
import { useReveal } from './useReveal.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Rooms from './components/Rooms.jsx';
import Packages from './components/Packages.jsx';
import Toast, { useToast } from './components/Toast.jsx';
import { EventBar, EventPromo } from './components/Events.jsx';
import { About, Services, Gallery, Location, Faq, FinalCta, Footer, MobileBar } from './components/Sections.jsx';

export default function App() {
  const [toast, setToast] = useToast();
  useReveal('page');

  // Arriving from another page at /#rooms etc.: the sections only exist once React has rendered,
  // after the browser's own jump to the anchor, so jump again now.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <EventBar />
      <Header />
      <div id="top" />
      <Hero />
      <EventPromo />
      <About />
      <Rooms />
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
