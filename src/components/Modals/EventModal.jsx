import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, X } from "lucide-react";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Select from "react-select";

// Occasion Options
const occasionOptions = [
  { value: "Birthday", label: "Birthday" },
  { value: "Aniversary", label: "Aniversary" },
  { value: "Music event", label: "Music event" },
  { value: "Field Trip", label: "Field Trip" },
  { value: "Fun Activities", label: "Fun Activities" },
  { value: "Other", label: "Other" },
];

// Custom date input (prevents keyboard + adds icon)
const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-2 cursor-pointer text-sm focus-within:border-green-500"
  >
    <span className={`${value ? "text-gray-900" : "text-gray-400"}`}>
      {value || "Select event date"}
    </span>
    <Calendar size={18} className="text-gray-500" />
  </div>
));

const EventModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    occasion: "",
    otherOccasion: "",
    date: null,
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      occasion: selectedOption?.value || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      name: formData.name,
      occasion:
        formData.occasion === "Other"
          ? formData.otherOccasion
          : formData.occasion,
      date: formData.date?.toISOString().split("T")[0],
      phone: formData.phone,
      timestamp: Timestamp.now(),
    };

    await addDoc(collection(db, "eventBookings"), finalData);

    toast.success("Thanks! Your event request has been submitted.");

    setFormData({
      name: "",
      occasion: "",
      otherOccasion: "",
      date: null,
      phone: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <X size={20} />
        </button>

        <form className="font-jakarta space-y-4" onSubmit={handleSubmit}>
          <h2 className="font-poppins font-bold text-xl mb-4 text-center">
            Book a Celebration or Event
          </h2>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-md px-4 py-2 outline-none border border-gray-300 focus:border-green-500"
          />

          {/* Occasion */}
          <Select
            options={occasionOptions}
            value={occasionOptions.find(
              (opt) => opt.value === formData.occasion
            )}
            onChange={handleSelectChange}
            placeholder="Select occasion"
            className="react-select-container"
            classNamePrefix="react-select"
            isSearchable={false}
            styles={{
              control: (base) => ({
                ...base,
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                boxShadow: "none",
                minHeight: "42px",
                fontSize: "0.875rem",
                "&:hover": { borderColor: "#d1d5db" },
              }),
              menu: (base) => ({
                ...base,
                fontSize: "0.875rem",
              }),
            }}
          />

          {/* Other occasion input */}
          {formData.occasion === "Other" && (
            <input
              type="text"
              name="otherOccasion"
              placeholder="Please specify the occasion"
              value={formData.otherOccasion}
              onChange={handleChange}
              required
              className="w-full rounded-md px-4 py-2 outline-none border border-gray-300 focus:border-green-500"
            />
          )}

          {/* Date */}
          <DatePicker
            selected={formData.date}
            onChange={(date) =>
              setFormData((prev) => ({
                ...prev,
                date,
              }))
            }
            customInput={<CustomDateInput />}
            dateFormat="yyyy-MM-dd"
            calendarClassName="rounded-md shadow-lg"
            wrapperClassName="w-full"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Enter contact number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded-md px-4 py-2 outline-none border border-gray-300 focus:border-green-500"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
