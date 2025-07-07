import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FaqItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border rounded-xl bg-white shadow-sm transition-all duration-300">
      <button
        className="flex items-center justify-between w-full p-4 text-left text-lg font-medium text-gray-800 hover:bg-gray-100 rounded-t-xl"
        onClick={onToggle}
      >
        {question}
        <span className="ml-4">
          {isOpen ? (
            <ChevronUp className="text-green-600" size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </span>
      </button>

      <div
        className={`px-4 overflow-hidden transition-all duration-300 ${
          //we are conditionally shrinking container but aanswer still present hence overflow hidden
          isOpen ? "max-h-[500px] pb-4" : "max-h-0"
        }`}
      >
        <div className=" text-gray-600 font-jakarta">{answer}</div>
      </div>

      {/* Here it was just deleting and rendering from DOM hence animation impossible */}
      {/* {isOpen && (
        <div className="px-4 pb-4 text-gray-600 transition-all duration-300">
          {answer}
        </div>
      )} */}
    </div>
  );
};

export default FaqItem;
