import React from "react";
import { HandHeart } from "lucide-react";
import { Sparkles } from "lucide-react";
import { House } from "lucide-react";

const StoryTimeline = () => {
  const iconMap = {
    HandHeart: HandHeart,
    Sparkles: Sparkles,
    House: House,
  };

  const timeline = [
    {
      sideIcon: "HandHeart",
      title: "A Personal Journey of Care",
      description: [
        "Mrs. Vijaya Salve, a school teacher, spent two years caring for her father-in-law.",
        "Through sleepless nights and gentle care, she saw both the beauty and challenge of elder care.",
        "She wondered, “If this is so hard for us, what about others with no help?”",
      ],
      bg: "bg-yellow-100",
      textColor: "text-yellow-700",
    },
    {
      sideIcon: "Sparkles",
      title: "Turning Grief into Purpose",
      description: [
        "After his passing, she couldn’t forget that question.",
        "Many elders suffer quietly—not from lack of love, but from lack of support.",
        "She decided to turn her pain into a mission to help them.",
      ],
      bg: "bg-purple-100",
      textColor: "text-purple-700",
    },
    {
      sideIcon: "House",
      title: "The Birth of V.V. Caring Centre",
      description: [
        "Vijaya founded a home at Yeoor Hills—calm, loving, and full of dignity.",
        "Here, elders are not patients but cherished lives with stories to share.",
        "Today, it’s one of Thane’s finest homes, offering round-the-clock care and warmth.",
      ],
      bg: "bg-green-100",
      textColor: "text-green-700",
    },
  ];

  return (
    <>
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-4xl font-poppins font-semibold mb-10">Our Story</h2>
        <div className="relative border-l-2 border-gray-300 pl-6">
          {timeline.map((item, index) => {
            const IconComponent = iconMap[item.sideIcon];

            return (
              <div
                key={index}
                className="mb-10 flex items-start gap-4 relative"
              >
                {/* Circle Icon */}
                <div className="absolute -left-[40px] bg-white rounded-full border-2 border-gray-300 w-8 h-8 flex items-center justify-center"></div>

                {/* Content */}
                <div>
                  <span
                    className={`inline-flex gap-3 ${item.bg} ${item.textColor} font-semibold px-4 py-1 rounded-md font-poppins mb-2`}
                  >
                    {item.title} <IconComponent className="text-gray-500" />
                  </span>
                  <div className="text-gray-700 font-jakarta space-y-2">
                    {item.description.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default StoryTimeline;
