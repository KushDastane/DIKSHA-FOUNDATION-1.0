import React from "react";
import TieupsCarousel from "./TieupsCarousel";

const csrData = [
  { image: "/hospitals/jupiter2", title: "Jupiter Hospital" },
  { image: "/hospitals/bethany", title: "Bethany Hospital" },
  { image: "/hospitals/vedant", title: "Vedant Hospital" },
  { image: "/hospitals/hiranandani", title: "Hiranandani Hospital" },
  { image: "/hospitals/ambulance", title: "24x7 Ambulance" },
];

const Hospitals = () => {
  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-5xl text-gray-800 font-poppins font-semibold text-center md:text-start  mb-10 leading-relaxed tracking-wider">
        Health Partners
      </h2>
      <TieupsCarousel
        items={csrData}
        autoplay={true}
        slidesPerView={3}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      />
    </section>
  );
};

export default Hospitals;
