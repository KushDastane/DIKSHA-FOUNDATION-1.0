import React from "react";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { Star } from "lucide-react";

const testimonialData = [
  {
    stars: 5,
    review:
      "Felt so happy and positive after meeting all the elderly people.Vijaya madam, such a nice work you are doing.Deepak ji and staff, i must appreciate the way you are taking care of all these people.",
    name: "Yogini D.",
  },
  {
    stars: 5,
    review:
      "Perfect Place For Old Age People.Well Maintained & Good Atmosphere.Staff Is Polite & Well Mannered.Overall Good Place.",
    name: "Jayesh N.",
  },
  {
    stars: 5,
    review:
      "It has a very welcoming environment! The facility is clean, well-maintained, and provides a supportive and caring atmosphere for its residents. Truly a place that feels like home",
    name: "Avni G.",
  },
  {
    stars: 5,
    review:
      "The old age home is well-structured with spacious rooms, proper ventilation, and clean premises. The living spaces are simple yet comfortable. There is a garden where residents can sit and relax, and the dining area is hygienic.",
    name: "Saloni P.",
  },
  {
    stars: 5,
    review:
      "I had a nice experience of visiting V.V. Caring Centre. It's an NGO for old age people. The people living there are happy as good care of them were taken by the NGO staff. The Ngo is clean and hygienic. Also the staff is very helpful and understanding and guided us and helped us a lot during our visit.",
    name: "Suyog T.",
  },

  {
    stars: 5,
    review:
      "I recently visited this place with my friends, and it was an amazing experience. The care and attention they provide to the elderly are truly commendable. I loved interacting with everyone and had so much fun there. Seeing the elderly happy brought me immense joy. I would love to visit again.",
    name: "Sejal I.",
  },
];

const TestimonialCarousel = ({ items = testimonialData }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth < 640 ? 1 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.ceil(items.length / slidesPerView) - 1;

  return (
    <div className="relative flex flex-col max-w-7xl mx-auto overflow-visible px-6 py-16">
      <h2 className="text-4xl mx-auto sm:text-5xl font-poppins font-semibold mb-5">
        Testimonials
      </h2>
      <p className="text-sm text-gray-400 text-center">
        From Google Reviews.
      </p>
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={activeIndex === 0}
        className={`absolute left-3 sm:-left-1 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition ${
          activeIndex === 0 ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        <ChevronLeft size={25} className=" text-black" />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        disabled={activeIndex === maxIndex}
        className={`absolute right-3 sm:-right-1 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition ${
          activeIndex === maxIndex ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        <ChevronRight size={25} className=" text-black" />
      </button>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) =>
          setActiveIndex(Math.floor(swiper.activeIndex / slidesPerView))
        }
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerView} //inbuilt prop
        spaceBetween={24}
        loop={false}
        allowTouchMove={true}
        className="w-full"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="overflow-visible">
            <div className="bg-white rounded-2xl py-16 px-6 flex flex-col justify-between text-center h-full min-h-[360px]">
              {/* Profile Icon Inside */}
              <div className="w-14 h-14 mx-auto mb-3 bg-[#f0fdf4] rounded-full flex items-center justify-center shadow-sm border border-green-200">
                <CircleUserRound
                  className="text-green-600 w-6 h-6"
                  strokeWidth={1.2}
                />
              </div>

              {/* Star Rating */}
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(item.stars)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-orange-600 fill-orange-600"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm text-gray-700 italic leading-relaxed mb-4 font-jakarta">
                “{item.review}”
              </p>

              {/* Name */}
              <p className="text-green-700 font-semibold font-poppins tracking-wide mt-auto">
                — {item.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className=" flex justify-center items-center">
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

export default TestimonialCarousel;
