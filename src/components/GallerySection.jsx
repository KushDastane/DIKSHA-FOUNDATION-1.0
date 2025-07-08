import React, { useRef, useEffect } from "react";
import LightGallery from "lightgallery/react";

// Styles & plugins
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";

// Dynamically import both .webp and .jpg images
const webpImages = import.meta.glob("/src/assets/gallery/*.webp", {
  eager: true,
  import: "default",
});
const jpgImages = import.meta.glob("/src/assets/gallery/*.jpg", {
  eager: true,
  import: "default",
});

// Combine .webp + .jpg into fallback-aware image list
const galleryImages = Object.keys(webpImages).map((path) => {
  const webp = webpImages[path];
  const jpgPath = path.replace(".webp", ".jpg");
  const jpg = jpgImages[jpgPath];
  return { webp, jpg };
});

const GallerySection = () => {
  const lightboxRef = useRef(null);
  const wasGalleryOpen = useRef(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handlePop = () => {
      const galleryOpen = lightboxRef.current?.lgOpened;

      if (galleryOpen) {
        lightboxRef.current.closeGallery();
      } else if (wasGalleryOpen.current) {
        wasGalleryOpen.current = false;
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };

    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const openGallery = () => {
    wasGalleryOpen.current = true;
    window.history.pushState({ gallery: true }, "", "#gallery");
    lightboxRef.current?.openGallery(0);
  };

  const dynamicEl = galleryImages.map(({ webp }) => ({
    src: webp,
    thumb: webp,
  }));

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-3xl sm:text-5xl text-gray-800 font-poppins font-semibold text-center md:text-start mb-10 leading-relaxed tracking-wider">
        Gallery
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {galleryImages.slice(0, 3).map(({ webp, jpg }, index) => (
          <picture key={index}>
            <source srcSet={webp} type="image/webp" />
            <img
              src={jpg}
              alt={`Gallery ${index + 1}`}
              loading="lazy"
              className="w-full h-40 object-cover rounded-md shadow-md transition duration-300 hover:scale-105"
            />
          </picture>
        ))}

        {/* +More Button */}
        {galleryImages.length > 3 && (
          <div
            className="relative w-full h-40 rounded-md overflow-hidden cursor-pointer group"
            onClick={openGallery}
          >
            <picture>
              <source srcSet={galleryImages[3].webp} type="image/webp" />
              <img
                src={galleryImages[3].jpg || galleryImages[0].jpg}
                alt="More images"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
              />
            </picture>
            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-50 transition" />
            <div className="relative z-10 flex items-center justify-center h-full hover:bg-[#0707072b] transition">
              <span className="z-10 text-2xl font-bold text-white">+ More</span>
            </div>
          </div>
        )}
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
