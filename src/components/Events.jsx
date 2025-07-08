import React from "react";
import ReusableCarousel from "../components/ReusableCarousel";
import { Calendar } from "lucide-react";

const EventData = [
  {
    image: "/events/yoga",
    title: "Yoga & Meditation",
    description: " Relaxing yoga sessions for seniors",
    descriptionStyle: "text-green-700 font-medium",
  },
  {
    image: "/events/puja",
    title: " Spiritual Sessions",
    description: "Kathavachan, satsang, bhajans",
    descriptionStyle: "text-green-700 font-medium",
  },
  {
    image: "/events/orchestra",
    title: "90s Live singing / Karaoke",
    description: "Generation friendly songs",
    descriptionStyle: "text-green-700 font-medium",
  },
  {
    image: "/events/board",
    title: "Board / Card Games",
    description: "Residents play indoors games",
    descriptionStyle: "text-green-700 font-medium",
  },
  {
    image: "/events/bday",
    title: "Birthday Celebrations",
    description: "Blends the lovely elderly into happiness of others",
    descriptionStyle: "text-green-700 font-medium",
  },
  {
    image: "/events/art",
    title: "Arts & Creativity",
    description: "Brings out the child within the elders!",
    descriptionStyle: "text-green-700 font-medium",
  },
  {
    image: "/events/camp",
    title: "Regular Health Camps",
    description: "Ensures time to time health tracking of each individual",
    descriptionStyle: "text-green-700 font-medium",
  },
  {
    image: "/events/diwali",
    title: "Festivals Celebration",
    description: "Every festival is celebrated",
    descriptionStyle: "text-green-700 font-medium",
  },
];

const Events = ({onEventClick}) => {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-poppins font-semibold mb-10">
          Events
        </h2>

        <ReusableCarousel items={EventData} />

        <div className="flex">
          <button onClick={onEventClick} className="flex gap-2 text-xl text-green-800 bg-white border-2 font-semibold border-green-800 px-4 py-4 rounded-full items-center mx-auto my-5 hover:bg-green-800 transition-all hover:text-white hover:border-white">
            <Calendar /> Book an Event
          </button>
        </div>
      </div>
    </section>
  );
};

export default Events;
