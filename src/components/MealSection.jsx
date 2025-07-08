import React, { useState } from "react";
import FallbackImage from "../components/FallbackImage";

const mealTabs = ["Breakfast", "Lunch", "Evening Snacks/Tea", "Dinner"];

const mealsData = {
  Breakfast: {
    title: "Bed Tea & Breakfast",
    desc: "Start your day with a tea & a variety of tasty + healthy options.",
    items: ["Tea", "Poha", "Upma", "Sheera", "Sabudana Khichdi", "Misal-Paav"],
    image: "/food/breakfast.jpg",
  },
  Lunch: {
    title: "Nutritious Lunch",
    desc: "A wholesome balanced diet with freshly prepared home-style meals.",
    items: ["Chapati", "Bhaji", "Dal", "Rice", "Salad", "Papad"],
    image: "/food/lunch.jpg",
  },
  "Evening Snacks/Tea": {
    title: "Evening Snacks & Tea",
    desc: "Light snacks to refresh you in the evening at 4pm, served with tea or coffee.",
    items: ["Tea", "Coffee", "Biscuits"],
    image: "/food/tea.jpg",
  },
  Dinner: {
    title: "Comfort Dinner",
    desc: "Light, nutritious food to end your day with warmth and care.",
    items: ["Khichdi", "Pickle", "Chapati", "Bhaji", "Curd"],
    image: "/food/dinner.jpg",
  },
};

const MealSection = () => {
  const [activeTab, setActiveTab] = useState("Breakfast");
  const data = mealsData[activeTab];

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 mt-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl sm:text-5xl font-semibold font-poppins text-gray-800 tracking-wide">
          Meals
        </h2>
        <FallbackImage src="/other/veg.png" className="w-7 h-7 mt-1" alt="Veg" />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-start gap-3 mb-8">
        {mealTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium font-poppins transition duration-200 whitespace-nowrap ${
              activeTab === tab
                ? "bg-[#E4FFCE] text-green-800 decoration-green-700"
                : "text-gray-600 hover:text-green-800 hover:bg-[#f0ffe3d3] "
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <hr className="border-gray-300 mb-8" />

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Text */}
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold font-poppins mb-2">
            {data.title}
          </h3>
          <p className="text-sm text-gray-600 mb-10 font-jakarta">
            {data.desc}
          </p>

          <div className="flex flex-wrap gap-2">
            {data.items.map((item, index) => (
              <span
                key={index}
                className="font-poppins bg-[#e9fdda] text-green-800 px-5 py-2 text-md rounded-full"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Common Note */}
          <p className="text-sm text-gray-500 mt-6 pr-28 font-jakarta italic hidden md:block">
            These are just a few examples of the wholesome meals we serve
            regularly. Menu may vary.
          </p>
        </div>

        {/* Right Image */}
        <div>
          <FallbackImage
            src={data.image}
            alt={data.title}
            className="w-full h-64 sm:h-80 md:h-100 rounded-xl object-cover shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default MealSection;
