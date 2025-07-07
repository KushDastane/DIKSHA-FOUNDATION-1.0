import React from "react";
import { Bed, Pill } from "lucide-react";
import { Heart } from "lucide-react";
import { Accessibility } from "lucide-react";
import { Activity } from "lucide-react";
import { Stethoscope } from "lucide-react";
import { Ambulance } from "lucide-react";
import { BriefcaseMedical } from "lucide-react";
import { HeartHandshake } from "lucide-react";

const Services = () => {
  const iconMap = {
    Bed,
    Pill,
    Heart,
    Accessibility,
    Activity,
    Stethoscope,
    Ambulance,
    BriefcaseMedical,
    HeartHandshake,
  };

  const serviceCard = [
    {
      icon: "Bed",
      title: " Age-Related Conditions",
      description: ["Assistance with speech, movement", " and healing."],
      titleStyle:
        "font-poppins text-2xl font-semibold leading-relaxed tracking-wide",
      descriptionStyle: "text-green-700 font-medium",
    },
    {
      icon: "Heart",
      title: "Dementia & Alzheimer’s",
      description: ["Safe routines and gentle memory-", "focused attention."],
      titleStyle:
        "font-poppins text-2xl font-semibold leading-relaxed tracking-wide",
      descriptionStyle: "text-green-700 font-medium",
    },
    {
      icon: "Pill",
      title: "Parkinson’s Support",
      description: ["Mobility help and emotional strength", "every day."],
      titleStyle:
        "font-poppins text-2xl font-semibold leading-relaxed tracking-wide",
      descriptionStyle: "text-green-700 font-medium",
    },
    {
      icon: "Accessibility",
      title: "Post-Operative Recovery",
      description: [" Rehab care after surgeries with close", "monitoring."],
      titleStyle:
        "font-poppins text-2xl font-semibold leading-relaxed tracking-wide",
      descriptionStyle: "text-green-700 font-medium",
    },
    {
      icon: "Activity",
      title: "Stroke & Neurological Care",
      description: ["Assistance with speech, movement, and", "healing."],
      titleStyle:
        "font-poppins text-2xl font-semibold leading-relaxed tracking-wide",
      descriptionStyle: "text-green-700 font-medium",
    },
    {
      icon: "Stethoscope",
      title: "Palliative & Bedridden Care",
      description: [" 24×7 comfort for fragile or end-of-life ", " residents."],
      titleStyle:
        "font-poppins text-2xl font-semibold leading-relaxed tracking-wide",
      descriptionStyle: "text-green-700 font-medium",
    },
    {
      icon: "Ambulance",
      title: "24 / 7 Medical Readiness",
      description: [
        " Routine checkups and emergency care",
        " to ensure prompt, reliable medical",
        "support.",
      ],
      titleStyle:
        "font-poppins text-2xl font-semibold leading-relaxed tracking-wide",
      descriptionStyle: "text-green-700 font-medium",
    },
    {
      icon: "BriefcaseMedical",
      title: "Daywise Medicine Box System",
      description: [
        " Daily-organized meds for safe, timely, ",
        " and error-free intake.",
      ],
      titleStyle:
        "font-poppins text-2xl font-semibold leading-relaxed tracking-wide",
      descriptionStyle: "text-green-700 font-medium",
    },
    {
      icon: "HeartHandshake",
      title: "Community Engagement",
      description: [
        " Celebrations, music, yoga, and spiritual",
        "sessions that bring joy and connection to",
        "daily life.",
      ],
      titleStyle:
        "font-poppins text-2xl font-semibold leading-relaxed tracking-wide",
      descriptionStyle: "text-green-700 font-medium",
    },
  ];

  return (
    <>
      <section className="py-16 px-5 sm:px-8 lg:px-16 bg-white text-gray-800 justify-between">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-semibold font-poppins mb-6">
            <span className="text-black">Our </span>
            <span className="text-orange-600 underline decoration-[3px] underline-offset-4 border-orange-500 pb-1 mr-2">
              Services
            </span>
          </h2>

          <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-2 items-start cursor-pointer">
            {serviceCard.map((service, index) => {
              const IconComponent = iconMap[service.icon];

              return (
                <div
                  key={index}
                  className="bg-[#f8f7f73c] hover:bg-[#E4FFCE] rounded-xl px-5 py-10"
                >
                  <div className="flex flex-col gap-2">
                    <IconComponent className=" text-gray-500 mb-2" />
                    <div className={`${service.titleStyle}`}>
                      {service.title}
                    </div>
                    <div className={`${service.descriptionStyle}`}>
                      {service.description.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
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

export default Services;
