import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const ReusableCarousel = ({ items }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);

  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth < 640 ? 1 : 4);
    };
    handleResize(); // set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.ceil(items.length / slidesPerView) - 1;

  return (
    <div className="relative max-w-7xl mx-auto px-6 overflow-visible">
      {/* Left Arrow */}
      <button
        onClick={() => swiperRef.current?.slidePrev()} //? Optional Chaining for abvoiding errors. if  swipeRef exists then call slidePrev swiper method to go to previous
        disabled={activeIndex === 0} //disabled prebuilt by html
        className={` absolute left-3 sm:-left-1 top-1/3 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-gray-100 transition ${
          activeIndex === 0 ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        <ChevronLeft size={25} className=" text-black" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        disabled={activeIndex === maxIndex}
        className={` absolute right-3 sm:-right-1 top-1/3 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-gray-100 transition ${
          activeIndex === maxIndex ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        <ChevronRight size={25} className="text-black" />
      </button>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) =>
          setActiveIndex(Math.floor(swiper.activeIndex / slidesPerView))
        }
        slidesPerView={slidesPerView} //left is prop by Swiper and right is state we defined(so it says set to value acc to phone/desktop)
        slidesPerGroup={slidesPerView} //sets number of items = no of items to shift in grp
        spaceBetween={24}
        loop={false}
        allowTouchMove={true}
        className="w-full"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-xl overflow-hidden ">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="mt-3 px-3 pb-5">
                <h3 className="font-bold text-lg font-poppins">
                  {item.title}
                </h3>
                <div className={`${item.descriptionStyle}`}>
                    {item.description}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mini Progress Bar */}
      <div className=" flex justify-center items-center mb-10">
        <div className="w-36 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-700 transition-all duration-500"
            style={{ width: `${((activeIndex + 1) / (maxIndex + 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReusableCarousel;
