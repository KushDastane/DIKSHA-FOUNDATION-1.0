import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    youtube: "",
  });

  const docRef = doc(db, "contactInfo", "main");

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setFormData(snap.data());
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(docRef, formData);
      toast.success("Contact info updated!");
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-green-800 mb-4">
        Contact Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["email", "phone", "whatsapp", "facebook", "instagram", "youtube"].map(
          (field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize text-gray-700 mb-1">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded text-sm"
              />
            </div>
          )
        )}

        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 text-sm"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ContactInfo;
