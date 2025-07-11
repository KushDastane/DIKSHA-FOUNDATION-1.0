import React from "react";
import { Tv } from "lucide-react";
import { Lock } from "lucide-react";
import { Toilet } from "lucide-react";
import { BrushCleaning } from "lucide-react";
import { Carrot } from "lucide-react";
import { Bed } from "lucide-react";
import { SoapDispenserDroplet } from "lucide-react";
import { ChevronRight } from "lucide-react";

import { Clock } from "lucide-react";

const Amenities = () => {
  const iconMap = {
    Tv,
    Lock,
    Toilet,
    BrushCleaning,
    Carrot,
    Bed,
    SoapDispenserDroplet,

    Clock,
  };

  const amenityCard = [
    {
      icon: "Tv",
      title: "TVs & Radios",
    },
    {
      icon: "Lock",
      title: "Storage Cupboards",
    },
    {
      icon: "Toilet",
      title: "Assistive Washrooms",
    },
    {
      icon: "BrushCleaning",
      title: "Cleaning & Laundry",
    },
    {
      icon: "Carrot",
      title: "Pure Veg Meals",
    },
    {
      icon: "SoapDispenserDroplet",
      title: "Hygiene",
    },
    {
      icon: "Bed",
      title: "Electric Bed",
    },
    {
      icon: "Clock",
      title: "24x7 Support",
    },
  ];

  return (
    <>
      <section className="py-1 px-1 sm:px-8 lg:px-16 bg-white text-gray-800 justify-between">
        <div className="max-w-7xl mx-auto">
          <div className="flex ">
            <ChevronRight size={40} />
            <h2 className="text-3xl sm:text-4xl font-medium font-poppins">
              Amenities
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-5 ml-3 mr-3 ">
            {amenityCard.map((amenity, index) => {
              const IconComponent = iconMap[amenity.icon];

              return (
                <div key={index}>
                  <div className="flex gap-5 border items-center justify-center px-3 rounded-lg cursor-cell  min-h-[100px]">
                    <IconComponent />
                    <div className="font-semibold">{amenity.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Amenities;
