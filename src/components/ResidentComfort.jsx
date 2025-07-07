import React from "react";
import ReusableCarousel from "../components/ReusableCarousel";

const comfortData = [
  {
    image: "/comfort/entrance.jpg",
    title: "Wheelchair Entry",
  },
  {
    image: "/comfort/relax.jpg",
    title: "Relaxation Areas",
  },
  {
    image: "/comfort/solar.jpg",
    title: "Solar Backup",
  },
  {
    image: "/comfort/staff.jpg",
    title: "Trained Staff",
  },
  {
    image: "/comfort/room.jpg",
    title: "Spacious Rooms",
  },
  {
    image: "/comfort/medical.jpg",
    title: "Electric Beds & Cubicles",
  },
  {
    image: "/comfort/view.png",
    title: "Nature View",
  },
  {
    image: "/comfort/hangout.jpg",
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
