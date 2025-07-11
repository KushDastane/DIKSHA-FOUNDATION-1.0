import React, { useEffect, useState } from "react";
import {
  HandHeart,
  IndianRupee,
  Package,
  ClipboardList,
  User,
  Phone as PhoneIcon,
} from "lucide-react";
import Select from "react-select";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";

const DonationModal = () => {
  const [donationType, setDonationType] = useState("");
  const [utilities, setUtilities] = useState([]);
  const [selectedUtility, setSelectedUtility] = useState(null);
  const [donationQuantity, setDonationQuantity] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");

  // Fetch utilities from Firestore
  useEffect(() => {
    const fetchUtilities = async () => {
      try {
        const snapshot = await getDocs(collection(db, "utilityItems"));
        const utilityList = snapshot.docs.map((doc) => doc.data());
        setUtilities(utilityList);
      } catch (err) {
        console.error("Error fetching utilities:", err);
      }
    };
    fetchUtilities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donationDetails = {
      item: selectedUtility?.value || "",
      quantity: donationQuantity,
      name: donorName,
      phone: donorPhone,
      timestamp: Timestamp.now(),
      status: "pending",
    };

    try {
      await addDoc(collection(db, "donationSubmissions"), donationDetails);
      toast.success("Thank you for your donation! We'll contact you soon.");
      setSelectedUtility(null);
      setDonationQuantity("");
      setDonorName("");
      setDonorPhone("");
      setDonationType("");
    } catch (err) {
      toast.error("Error submitting donation. Try again.");
      console.error(err);
    }
  };

  const utilityOptions = utilities.map((u) => ({
    value: u.item,
    label: `${u.item} (${u.quantityNeeded})`,
  }));

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-semibold font-poppins text-gray-800 mb-8 flex items-center gap-3">
        <HandHeart className="text-green-700" size={32} />
        Donate to Support
      </h2>

      {/* Donation Type Dropdown */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-medium text-sm">
          Donation Type
        </label>
        <Select
          value={
            donationType ? { label: donationType, value: donationType } : null
          }
          onChange={(selected) => setDonationType(selected?.value || "")}
          options={[
            { value: "Donate Utilities", label: "Donate utilities" },
            { value: "Donate Money", label: "Donate money" },
          ]}
          placeholder="Select donation type"
          classNamePrefix="react-select"
          isSearchable={false}
          styles={{
            control: (base) => ({
              ...base,
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              minHeight: "42px",
              boxShadow: "none",
              "&:hover": { borderColor: "#d1d5db" },
            }),
          }}
        />
      </div>

      {/* Donate Money Section */}
      {donationType === "Donate Money" && (
        <div className="mt-6 flex items-start gap-4 bg-green-50 rounded-lg p-5">
          <IndianRupee className="text-green-700 mt-1" size={28} />
          <div>
            <p className="text-sm text-gray-800 mb-2">
              You can support us by donating money through our secure Razorpay
              page.
            </p>
            <button
              onClick={() =>
                window.open("https://razorpay.me/@dikshafoundation", "_blank")
              }
              className="mt-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded-md"
            >
              Donate via Razorpay
            </button>
          </div>
        </div>
      )}

      {/* Utilities Donation Form */}
      {donationType === "Donate Utilities" && (
        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-green-50 p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-xl font-semibold mb-4 text-green-900">
            Donate Required Items
          </h3>

          {/* Item Select */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Item to donate
            </label>
            <div className="flex items-center gap-2">
              <Package className="text-green-700" size={18} />
              <div className="w-full">
                <Select
                  value={selectedUtility}
                  onChange={setSelectedUtility}
                  options={utilityOptions}
                  placeholder="Select item"
                  classNamePrefix="react-select"
                  isSearchable={false}
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      minHeight: "42px",
                      boxShadow: "none",
                      "&:hover": { borderColor: "#d1d5db" },
                    }),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Quantity you can donate
            </label>
            <div className="flex items-center gap-2">
              <ClipboardList className="text-green-700" size={18} />
              <input
                type="text"
                value={donationQuantity}
                onChange={(e) => setDonationQuantity(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-green-500"
                placeholder="e.g. 5 packs"
              />
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Your Name
            </label>
            <div className="flex items-center gap-2">
              <User className="text-green-700" size={18} />
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-green-500"
                placeholder="Full Name"
              />
            </div>
          </div>

          {/* Phone Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Contact Number
            </label>
            <div className="flex items-center gap-2">
              <PhoneIcon className="text-green-700" size={18} />
              <input
                type="tel"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-green-500"
                placeholder="Mobile Number"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 text-sm font-medium"
          >
            Submit
          </button>
        </form>
      )}
    </section>
  );
};

export default DonationModal;
