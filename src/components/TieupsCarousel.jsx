// src/components/TieupsCarousel.jsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import SmartLazyImage from "./SmartLazyImage";

const TieupsCarousel = ({
  items,
  autoplay = false,
  slidesPerView = 3,
  breakpoints,
}) => {
  return (
    <Swiper
      modules={autoplay ? [Autoplay] : []}
      autoplay={autoplay ? { delay: 2000, disableOnInteraction: false } : false}
      spaceBetween={24}
      slidesPerView={slidesPerView}
      breakpoints={breakpoints}
      loop={true}
      className="w-full"
    >
      {items.map((item, index) => (
        <SwiperSlide key={index} className="!flex justify-center">
          <div className="flex flex-col items-center text-center text-gray-800">
            <img
              src={`${item.image}.webp`}
              alt={item.title}
              loading="eager"
              className="w-28 h-28 object-contain bg-white p-2 rounded-full shadow-none"
            />

            <p className="text-sm font-semibold font-jakarta text-gray-600">
              {item.title}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TieupsCarousel;
