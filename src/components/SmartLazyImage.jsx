import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const SmartLazyImage = ({ base, alt, className = "", ...props }) => {
  const [src, setSrc] = useState(`${base}.webp`);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    if (src.endsWith(".webp")) {
      setSrc(`${base}.jpg`);
    }
  };

  return (
    <LazyLoadImage
      {...props}
      src={src}
      alt={alt}
      onError={handleError}
      afterLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-700 ease-in-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};

export default SmartLazyImage;
