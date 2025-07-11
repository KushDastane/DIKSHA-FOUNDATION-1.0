import React from "react";
import TieupsCarousel from "./TieupsCarousel";

const csrData = [
  { image: "/CSR/amazon", title: "Amazon" },
  { image: "/CSR/iqvia", title: "IQVIA" },
  { image: "/CSR/kia", title: "Kia Motors" },
  { image: "/CSR/tcs", title: "TCS" },
  { image: "/CSR/tp", title: "Torrent Power" },
];

const CSR = () => {
  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-5xl text-gray-800 font-poppins font-semibold text-center md:text-start mb-10 leading-relaxed tracking-wider">
        CSR Partners
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

export default CSR;
