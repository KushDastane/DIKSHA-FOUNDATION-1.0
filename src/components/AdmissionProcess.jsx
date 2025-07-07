import React from "react";
import { ArrowRight } from "lucide-react";
import { ArrowDown } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Contact Us",
    desc: "Reach out on 9029006592 / 9930531795 to inquire.",
  },
  {
    number: "2",
    title: "Visit the Centre",
    desc: "Come between 8–12 noon or 4–9 pm to explore & experience facilities.",
  },
  {
    number: "3",
    title: "Care Discussion & Documentation",
    desc: "Review the elder’s medical history and needs & submit verification id.",
  },
  {
    number: "4",
    title: "Fees & Onboarding",
    desc: "Complete the necessary formalities, make payment and begin a smooth, caring transition into our home.",
  },
];

const AdmissionProcess = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-4xl md:text-5xl font-poppins font-semibold text-gray-800 mb-12">
        Admission
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between hover:bg-gray-50"
          >
            {/* Circle Number */}
            <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-lg mb-4">
              {step.number}.
            </div>

            {/* Title */}
            <h3 className="text-md font-semibold text-gray-800 mb-2 font-poppins">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 font-jakarta">{step.desc}</p>

            {/* Arrow Right (except for last card) */}
            {index != steps.length - 1 && (
              <>
                <ArrowRight
                  className="hidden sm:block absolute right-3 top-3 text-gray-400 w-5 h-5"
                  strokeWidth={1.5}
                />
                <ArrowDown className="block sm:hidden absolute right-3 top-3 text-gray-400 w-5 h-5" />
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdmissionProcess;
