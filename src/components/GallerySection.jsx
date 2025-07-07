import React, { useRef, useEffect } from "react";
import LightGallery from "lightgallery/react";

// Styles & plugins
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";

// Dynamically import images from src/assets/gallery
const imageModules = import.meta.glob(
  "/src/assets/gallery/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);
const imageUrls = Object.values(imageModules);

const GallerySection = () => {
  const lightboxRef = useRef(null);
  const wasGalleryOpen = useRef(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handlePop = () => {
      const galleryOpen = lightboxRef.current?.lgOpened;

      if (galleryOpen) {
        // User hit back while gallery is open => close gallery
        lightboxRef.current.closeGallery();
      } else if (wasGalleryOpen.current) {
        // User hit back *after* gallery closed => scroll to section
        wasGalleryOpen.current = false;
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100); // delay to allow history change
      }
    };

    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  // Triggered when +More is clicked
  const openGallery = () => {
    wasGalleryOpen.current = true;
    window.history.pushState({ gallery: true }, "", "#gallery");
    lightboxRef.current?.openGallery(0);
  };

  const dynamicEl = imageUrls.map((src) => ({ src, thumb: src }));

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-3xl sm:text-5xl text-gray-800 font-poppins font-semibold text-center md:text-start mb-10 leading-relaxed tracking-wider">
        Gallery
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {imageUrls.slice(0, 3).map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery ${index + 1}`}
            className="w-full h-40 object-cover rounded-md shadow-md transition duration-300 hover:scale-105"
          />
        ))}

        <div
          className="relative w-full h-40 rounded-md overflow-hidden cursor-pointer group"
          onClick={openGallery}
        >
          <img
            src={imageUrls[3] || imageUrls[0]}
            alt="More images"
            className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-50 transition" />
          <div className="relative z-10 flex items-center justify-center h-full hover:bg-[#0707072b] transition">
            <span className="z-10 text-2xl font-bold text-white">+ More</span>
          </div>
        </div>
      </div>

      {/* Hidden LightGallery */}
      <LightGallery
        dynamic
        dynamicEl={dynamicEl}
        onInit={(detail) => (lightboxRef.current = detail.instance)}
        plugins={[lgZoom, lgThumbnail]}
        speed={500}
        hash={false}
      />
    </section>
  );
};

export default GallerySection;
