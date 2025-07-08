import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import FallbackImage from "../components/FallbackImage";

const Carousel = ({
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
            <FallbackImage
              src={item.image}
              alt={item.title}
              className="w-36 h-36 object-contain rounded-full mb-4"
            />
            <p className="text-sm font-semibold font-jakarta text-gray-600">{item.title}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
