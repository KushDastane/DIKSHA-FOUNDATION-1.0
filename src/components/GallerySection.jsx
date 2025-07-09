import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";

// Load images
const webpImages = import.meta.glob("/src/assets/gallery/*.webp", {
  eager: true,
  import: "default",
});
const jpgImages = import.meta.glob("/src/assets/gallery/*.jpg", {
  eager: true,
  import: "default",
});

const sortedWebpKeys = Object.keys(webpImages).sort((a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
);

const galleryImages = sortedWebpKeys.map((webpPath) => {
  const webp = webpImages[webpPath];
  const jpgPath = webpPath.replace(".webp", ".jpg");
  const jpg = jpgImages[jpgPath];
  return {
    webp,
    jpg,
    lightboxSrc: webp,
  };
});

const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // 🔄 Open Lightbox + Push History State
  const openFromIndex = (index) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
    window.history.pushState({ lightbox: true }, "", "#gallery/lightbox");
  };

  useEffect(() => {
    const handlePopState = (event) => {
      const isLightboxState = event.state?.lightbox;

      if (isLightboxState) {
        // 🟢 Forward navigation into lightbox
        setLightboxOpen(true);
      } else {
        // 🔙 Back navigation out of lightbox
        setLightboxOpen(false);
        setTimeout(() => {
          document
            .getElementById("gallery")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  
  return (
    <section className="max-w-7xl mx-auto px-4 py-20" id="gallery">
      <h2 className="text-3xl sm:text-5xl text-gray-800 font-poppins font-semibold text-center md:text-start mb-10 leading-relaxed tracking-wider">
        Gallery
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {galleryImages.slice(0, 3).map(({ webp, jpg }, index) => (
          <div
            key={index}
            onClick={() => openFromIndex(index)}
            className="block w-full h-40 overflow-hidden rounded-md shadow-md cursor-zoom-in"
          >
            <picture>
              <source srcSet={webp} type="image/webp" />
              <img
                src={jpg}
                alt={`Gallery ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition duration-300 hover:scale-105"
              />
            </picture>
          </div>
        ))}

        {galleryImages.length > 3 && (
          <div
            onClick={() => openFromIndex(3)}
            className="relative w-full h-40 rounded-md overflow-hidden cursor-pointer group"
          >
            <picture>
              <source srcSet={galleryImages[3].webp} type="image/webp" />
              <img
                src={galleryImages[3].jpg}
                alt="More images"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
              />
            </picture>
            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <span className="text-2xl font-bold text-white">+ More</span>
            </div>
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => {
          setLightboxOpen(false);
          // Go back if lightbox was opened via pushState
          if (window.history.state?.lightbox) window.history.back();
        }}
        index={photoIndex}
        slides={galleryImages.map((img) => ({ src: img.lightboxSrc }))}
        plugins={[Zoom, Fullscreen]}
        animation={{ fade: 300 }}
      />
    </section>
  );
};

export default GallerySection;
