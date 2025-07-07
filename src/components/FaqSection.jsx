import React from "react";
import FaqItem from "./FaqItem";
import { useState } from "react";

const faqs = [
  {
    question: "Who can be admitted to V.V. Caring Centre?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Independent or semi-dependent elderly (60+)</li>
        <li>People with Dementia, Alzheimer’s, Parkinson’s</li>
        <li>Post-surgery recovery patients</li>
        <li>Bedridden or palliative/end-of-life care</li>
        <li>Short-term respite care seekers</li>
      </ul>
    ),
  },
  {
    question: "What kind of medical support is available at the centre?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>24x7 nursing care</li>
        <li>Regular doctor visits</li>
        <li>Emergency support with hospital tie-ups</li>
        <li>Medication & vital monitoring</li>
        <li>Physiotherapy and mobility assistance</li>
      </ul>
    ),
  },
  {
    question: "Is the food provided vegetarian?",
    answer:
      "Yes, we provide pure vegetarian meals prepared in a hygienic kitchen. We also cater to special diets (diabetic, low-salt, soft foods) based on doctor or family input.",
  },
  {
    question: "Can family members visit their elders?",
    answer:
      "Absolutely. Family visits are welcome during visiting hours. We also offer video calling for those living far away.",
  },
  {
    question: "Do you accept residents with Dementia or Alzheimer’s?",
    answer:
      "Yes, we offer trained caregivers, a secure routine, and emotional support specifically for memory care residents.",
  },

  {
    question: "What are the room options available?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Single, double, and shared rooms</li>
        <li>Elder-friendly features (anti-slip floors, attached bathrooms)</li>
        <li>Some rooms offer serene views of Yeoor Hills</li>
      </ul>
    ),
  },
  {
    question: "Is the centre equipped to handle bedridden patients?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Position changes & hygiene care</li>
        <li>Diaper care and tube feeding assistance</li>
        <li>Emotional and palliative support</li>
      </ul>
    ),
  },
  {
    question: "Is there a trial stay or short-term option available?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        Yes,
        <li>Post-surgery recovery</li>
        <li>Temporary respite for families</li>
        <li>Trial stays before long-term admission</li>
      </ul>
    ),
  },
  {
    question: "How can I get more details or schedule a visit?",
    answer:
      "You can call, email, or book a personal tour. We’ll guide you through the facility and answer any queries you have.",
  },
];


const FaqSection = () => {

    
const [openIndex, setOpenIndex] = useState(false);

const handleToggle = (index) =>{
    setOpenIndex(prevIndex =>(prevIndex===index? null : index));
};

  return (
    <section className="w-full py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4  font-poppins text-gray-800">
          FAQs
        </h2>
        <p className="text-center text-gray-600 mb-8  font-poppins">
          Diksha Foundation | Thane West
        </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-10  font-poppins">
          If you have any other questions, don’t hesitate to reach out. We’re
          always here to help—with honesty, warmth, and open arms.
        </p>
      </div>
    </section>
  );
};

export default FaqSection;
