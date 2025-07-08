import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import FallbackImage from "../components/FallbackImage";

const team = [
  {
    name: "Mrs. Vijaya Salve",
    position: "Director",
    image: "/avatar/mam.jpg",
  },
  {
    name: "Mr. Yash Raut",
    position: "PR Head",
    image: "/avatar/PR.jpg",
  },
  {
    name: "Mr. Deepak Gupta",
    position: "Manager",
    image: "/avatar/manager.jpg",
  },
  {
    name: "Ms.Neela Qureshi",
    position: "Female Caregiver",
    image: "/avatar/care1.jpg",
  },
  {
    name: "Ms. Laxmi Waghmare",
    position: "Chef",
    image: "/avatar/cook.jpg",
  },
  {
    name: "Ms. Ashwini Sakole",
    position: "Female Caregiver",
    image: "/avatar/care2.jpg",
  },
  {
    name: "Mr. Sudhir Chavhan",
    position: "Male Caregiver",
    image: "/avatar/care3.jpg",
  },
];

const Team = () => {
  const swiperRef = useRef(null);
  const [realIndex, setRealIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  const totalSlides = team.length;

  const updateSlideState = (swiper) => {
    setRealIndex(swiper.realIndex);

    // Handle dynamic slidesPerView from breakpoints
    const currentSlidesPerView =
      swiper.params.breakpoints &&
      swiper.currentBreakpoint &&
      swiper.params.breakpoints[swiper.currentBreakpoint]?.slidesPerView
        ? swiper.params.breakpoints[swiper.currentBreakpoint].slidesPerView
        : swiper.params.slidesPerView;

    setSlidesPerView(currentSlidesPerView);
  };

  return (
    <section className="relative py-10 px-4 sm:px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-poppins font-semibold text-center mb-14">
        Our Team
      </h2>

      {/* Arrows */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={realIndex === 0}
        className={`absolute left-1 sm:-left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-gray-100 transition ${
          realIndex === 0 ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        <ChevronLeft size={28} className="text-black" />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        disabled={realIndex + slidesPerView >= totalSlides}
        className={`absolute right-1 sm:-right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-gray-100 transition ${
          realIndex + slidesPerView >= totalSlides
            ? "opacity-40 cursor-not-allowed"
            : ""
        }`}
      >
        <ChevronRight size={28} className="text-black" />
      </button>

      {/* Swiper */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateSlideState(swiper);
        }}
        onSlideChange={(swiper) => updateSlideState(swiper)}
        onResize={(swiper) => updateSlideState(swiper)}
        spaceBetween={24}
        slidesPerView={3}
        slidesPerGroup={3}
        onsli
        breakpoints={{
          0: { slidesPerView: 1, slidesPerGroup: 1 },
          768: { slidesPerView: 1, slidesPerGroup: 1 },
          1024: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
        className="w-full"
      >
        {team.map((member, index) => (
          <SwiperSlide key={index} className="!flex justify-center">
            <div className="flex flex-col items-center text-center">
              <FallbackImage
                src={member.image}
                alt={member.name}
                className="w-48 h-48 rounded-full object-cover mb-4"
              />
              <h4 className="text-lg font-semibold font-poppins">
                {member.name}
              </h4>
              <p className="text-gray-600 font-jakarta">{member.position}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Progress Bar */}
      <div className="mt-8 flex justify-center items-center">
        <div className="w-36 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-700 transition-all duration-500"
            style={{
              width: `${((realIndex + slidesPerView) / totalSlides) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Team;
