import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Overview from "./components/Overview";
import Residences from "./components/Residences";
import Amenities from "./components/Amenities";
import Offer from "./components/Offer";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import OfferPopup from "./components/OfferPopup";
import { project } from "./data/projectData";

// Below-the-fold sections that are heavier (grid + lightbox + form math) load
// after the first paint so the hero stays immediate.
const CostEstimator = lazy(() => import("./components/CostEstimator"));
const Location = lazy(() => import("./components/Location"));
const Gallery = lazy(() => import("./components/Gallery"));
const FAQ = lazy(() => import("./components/FAQ"));

function Deferred({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="container-x py-24">
          <div className="h-40 animate-pulse rounded-2xl bg-charcoal/5" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

/**
 * Single-page landing site.
 *
 * Section order leads with the offer, followed by the project overview.
 * Nav ids in Header.tsx must stay in sync with the ids below.
 */
export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Offer />
        <Overview />
        <Residences />
        <Amenities />
        <Pricing />
        <Deferred>
          <CostEstimator />
        </Deferred>
        <Deferred>
          <Location />
        </Deferred>
        <Deferred>
          <Gallery />
        </Deferred>
        <Deferred>
          <FAQ />
        </Deferred>
        <Contact />
      </main>
      <Footer />
      <OfferPopup />
      <p className="sr-only">
        {project.name} — {project.locationLine}. {project.reraLabel}. Informational page
        built from the supplied brochure, promotional offer and price sheet.
      </p>
    </>
  );
}
