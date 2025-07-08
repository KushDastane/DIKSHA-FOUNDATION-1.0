import React from "react";
import { scroller } from "react-scroll";
import { useLocation } from "react-router-dom";
import { useState,  useEffect } from "react";
import Hero from "../components/Hero";
import ContactFormModal from "../components/Modals/ContactFormModal";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import ResidentComfort from "../components/ResidentComfort";
import Events from "../components/Events";
import Amenities from "../components/Amenities";
import FaqSection from "../components/FaqSection";
import TestimonialCarousel from "../components/TestimonialCarousel";
import CSR from "../components/CSR";
import Hospitals from "../components/Hospitals";
import MealSection from "../components/MealSection";
import GallerySection from "../components/GallerySection";
import AdmissionProcess from "../components/AdmissionProcess";
import ContactSection from "../components/ContactSection";
import EventModal from "../components/Modals/EventModal";

const Home = () => {
  const [showContact, setShowContact] = useState(false);
  const [showEventBooking, setShowEventBooking] = useState(false); // new
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (hash) {
      // Scroll after slight delay to ensure DOM is ready
      setTimeout(() => {
        scroller.scrollTo(hash, {
          duration: 800,
          delay: 0,
          smooth: true,
          offset: -80, // adjust based on your sticky navbar height
        });
      }, 200);
    }
  }, [location]);
  return (
    <>
      <section id="hero" name="hero">
        <Hero
          onContactClick={() => {
            setShowContact(true);
            console.log("Modal opened!");
          }}
        />
      </section>

      <section id="about" name="about">
        <AboutUs />
      </section>

      <section id="services" name="services">
        <Services />
      </section>

      <section>
        <ResidentComfort />
      </section>

      <section>
        <Amenities />
      </section>

      <section>
        <MealSection />
      </section>

      <section>
        <Events
          onEventClick={() => {
            setShowEventBooking(true);
            console.log("Event booking modal opened!");
          }}
        />
      </section>

      <section>
        <CSR />
      </section>

      <section>
        <Hospitals />
      </section>

      <section id="gallery" name="gallery">
        <GallerySection />
      </section>

      <section>
        <AdmissionProcess />
      </section>

      <section>
        <FaqSection />
      </section>

      <section>
        <TestimonialCarousel />
      </section>

      <section id="contact" name="contact">
        <ContactSection />
      </section>

      {showContact && (
        <ContactFormModal onClose={() => setShowContact(false)} />
      )}
      {/* Event Booking Modal */}
      {showEventBooking && (
        <EventModal onClose={() => setShowEventBooking(false)} />
      )}
    </>
  );
};

export default Home;
