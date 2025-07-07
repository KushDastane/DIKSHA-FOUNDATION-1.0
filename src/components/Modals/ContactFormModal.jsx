import React, { useState } from "react";
import { X } from "lucide-react";
import { db } from "../../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import Select from "react-select";

const residentOptions = [
  { value: "assisted", label: "Assisted Living" },
  { value: "independent", label: "Independent Living" },
];

const ContactFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    residentType: "",
    medicalNeeds: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResidentTypeChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      residentType: selectedOption?.value || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "contactSubmissions"), {
      ...formData,
      timestamp: Timestamp.now(),
    });

    toast.success("Thanks! Our team will contact you shortly.");

    setFormData({
      name: "",
      age: "",
      residentType: "",
      medicalNeeds: "",
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
            Get in Touch
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-green-500"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-green-500"
          />

          <div>
            <Select
              options={residentOptions}
              value={residentOptions.find(
                (opt) => opt.value === formData.residentType
              )}
              onChange={handleResidentTypeChange}
              placeholder="Select Resident Type"
              className="react-select-container"
              classNamePrefix="react-select"
              isSearchable={false}
              styles={{
                control: (base) => ({
                  ...base,
                  border: "1px solid #d1d5db", // Tailwind's gray-300
                  borderRadius: "0.375rem",
                  boxShadow: "none",
                  paddingLeft: "0.25rem",
                  minHeight: "42px",
                  fontSize: "0.875rem",
                  "&:hover": {
                    borderColor: "#d1d5db",
                  },
                }),
                menu: (base) => ({
                  ...base,
                  fontSize: "0.875rem",
                }),
              }}
            />
          </div>

          <textarea
            name="medicalNeeds"
            placeholder="Medical Needs (if any)"
            value={formData.medicalNeeds}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-green-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-green-500"
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

export default ContactFormModal;
