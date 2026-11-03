import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Overview from "./components/Overview";
import Offer from "./components/Offer";
import Amenities from "./components/Amenities";
import Gallery from "./components/Gallery";
import Residences from "./components/Residences";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import OfferPopup from "./components/OfferPopup";
import Location from "./components/Location";
import StickyActions from "./components/StickyActions";
import { project } from "./data/projectData";

// The estimator and FAQ are not in the primary navigation, so defer their code
// until a visitor scrolls near them without delaying section anchor targets.
const CostEstimator = lazy(() => import("./components/CostEstimator"));
const FAQ = lazy(() => import("./components/FAQ"));

function Deferred({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {visible ? (
        <Suspense
          fallback={
            <div className="container-x py-24">
              <div className="h-40 animate-pulse rounded-2xl bg-charcoal/5" />
            </div>
          }
        >
          {children}
        </Suspense>
      ) : (
        <div className="container-x py-24" aria-hidden="true">
          <div className="h-40 rounded-2xl bg-charcoal/5" />
        </div>
      )}
    </div>
  );
}

/**
 * Single-page landing site.
 *
 * The brochure-requested landing-page flow comes first; supporting detail
 * sections follow the floor plans.
 * Nav ids in Header.tsx must stay in sync with the ids below.
 */
export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Contact />
        <Overview />
        <Offer />
        <Amenities />
        <Gallery />
        <Residences />
        <Pricing />
        <Deferred>
          <CostEstimator />
        </Deferred>
        <Location />
        <Deferred>
          <FAQ />
        </Deferred>
      </main>
      <Footer />
      <OfferPopup />
      <StickyActions />
      <p className="sr-only">
        {project.name} — {project.locationLine}. {project.reraLabel}. Informational page
        built from the supplied brochure, promotional offer and price sheet.
      </p>
    </>
  );
}
