import React from "react";
import ReusableCarousel from "../components/ReusableCarousel";

const comfortData = [
  {
    image: "/comfort/entrance",
    title: "Wheelchair Entry",
  },
  {
    image: "/comfort/relax",
    title: "Relaxation Areas",
  },
  {
    image: "/comfort/solar",
    title: "Solar Backup",
  },
  {
    image: "/comfort/staff",
    title: "Trained Staff",
  },
  {
    image: "/comfort/room",
    title: "Spacious Rooms",
  },
  {
    image: "/comfort/medical",
    title: "Electric Beds & Cubicles",
  },
  {
    image: "/comfort/view",
    title: "Nature View",
  },
  {
    image: "/comfort/hangout",
    title: "Hangout premises",
  },
];

const ResidentComfort = () => {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-poppins font-semibold mb-10">
          Comfort is {" "}
          <span className="text-orange-600 underline underline-offset-4 decoration-[3px]">
            Priority
          </span>
        </h2>

        <ReusableCarousel items={comfortData} />
      </div>
    </section>
  );
};

export default ResidentComfort;
