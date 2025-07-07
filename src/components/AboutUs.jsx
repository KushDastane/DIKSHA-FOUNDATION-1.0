import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BranchList from "./BranchList";

const AboutUs = () => {
  // Create a reference for the left content box.
  const leftRef = useRef(null);
  // Set the height state; we'll store a string so we can assign "auto" or "600px", etc.
  const [leftHeight, setLeftHeight] = useState("auto");

  useEffect(() => {
    // Function that updates the height.
    const updateHeight = () => {
      // Check if leftRef is attached.
      if (leftRef.current) {
        // Tailwind's lg breakpoint is 1024px.
        if (window.innerWidth >= 1024) {
          // On large screens, measure the height of the left side and use it.
          setLeftHeight(`${leftRef.current.offsetHeight}px`);
        } else {
          setLeftHeight("auto"); // let it be flexible below 1024px
        }
      }
    };

    // Do the initial height update.
    updateHeight();

    // Re-measure on window resize.
    window.addEventListener("resize", updateHeight);
    // Clean up the listener when the component unmounts.
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <section className="py-16 px-5 sm:px-8 lg:px-16 bg-white text-gray-800 justify-between">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-10 items-start">
        {/* LEFT CONTENT */}
        <div ref={leftRef}>
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl font-semibold font-poppins mb-6">
            <span className="text-orange-600 underline decoration-[3px] underline-offset-4 border-orange-500 pb-1 mr-2">
              About
            </span>
            <span className="text-black">Us</span>
          </h2>

          {/* Description */}
          <p className="sm:text-lg leading-relaxed font-jakarta mb-6 text-justify">
            At the serene base of Yeoor Hills🌿🏡,
            <br />
            V.V. Caring Centre by Diksha Foundation being one of the finest old
            age homes in Thane, offers a peaceful home for elders, filled with
            dignity, care, and companionship. With dedicated staff and
            round-the-clock support, we ensure every resident feels safe,
            valued, and truly at home.
          </p>

          {/* Locations */}
          <BranchList/>
          
          {/* Button */}
          <Link to="/our-story">
            <button className="mt-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-poppins px-5 py-2 rounded-full transition">
              OUR STORY
            </button>
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="overflow-hidden rounded-3xl shadow-lg max-h-[280px] sm:max-h-[320px] md:max-h-[400px] lg:max-h-full"
          style={{ height: leftHeight }}
        >
          <img
            src="/infrastructure/bldg2.jpg" // Replace with the actual image path if needed.
            alt="VV Caring Center Building"
            className="h-full w-full object-cover cursor-pointer hover:scale-105 transition"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
