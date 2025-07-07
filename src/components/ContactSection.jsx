import React, { useState } from "react";
import { Phone, Mail, Instagram, MessageSquare, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";

// Sample branch data
const branches = [
  {
    name: "Upwan Branch",
    address:
      "Khandekar Compound Rambaug, Pokharan Rd Number 1, Upvan, Thane, Maharashtra 400606",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3787.0912795138715!2d72.94769831078783!3d19.218379481940765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b987196251c7%3A0xd0b7f120021b70fb!2sOld%20Age%20Home%20(V.%20V.%20CARING%20CENTRE)!5e1!3m2!1sen!2sin!4v1751790917953!5m2!1sen!2sin",
  },
  {
    name: "Location 2 Branch",
    address: "Address 2",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3787.0912795138715!2d72.94769831078783!3d19.218379481940765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b987196251c7%3A0xd0b7f120021b70fb!2sOld%20Age%20Home%20(V.%20V.%20CARING%20CENTRE)!5e1!3m2!1sen!2sin!4v1751790917953!5m2!1sen!2sin",
  },
];

// Common contact details
const commonContact = {
  phone: "+91-9930531795",
  whatsapp: "Click here",
  email: "dikshafoundation77@gmail.com",
  instagram: "https://www.instagram.com/v.v._caring_centre",
};

const ContactSection = () => {
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);
  const branch = branches[selectedBranchIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-poppins font-semibold text-gray-800 mb-8 text-center">
        Get in Touch
      </h2>

      {/* Branch Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {branches.map((b, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedBranchIndex(idx)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
              selectedBranchIndex === idx
                ? "bg-green-100 text-green-800 border-none"
                : "text-gray-600 border-gray-200 hover:text-green-800 hover:border-green-800"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Contact Info Card */}
        <div className="bg-white rounded-xl  p-6 space-y-4 text-sm sm:text-base">
          <div className="flex items-start gap-3">
            <MapPinned className="text-gray-700 mt-1 shrink-0" />
            {/* SHRINK ZERO IS IMPORTANT */}
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">
                Address
              </h4>
              <p className="text-gray-600 leading-relaxed">{branch.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="text-gray-700 mt-1" />
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">
                Phone
              </h4>
              <Link
                text-green-900
                hover:underline
                to="tel:9930531795"
                className="text-green-900 hover:underline"
              >
                {commonContact.phone}
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MessageSquare className="text-gray-700 mt-1" />
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">
                WhatsApp
              </h4>
              <a
                href="https://wa.me/919029006592"
                target="_blank"
                rel="noreferrer"
                className="text-green-900 hover:underline"
              >
                {commonContact.whatsapp}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="text-gray-700 mt-1" />
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">
                Email
              </h4>
              <a
                href="https://wa.me/919029006592"
                target="_blank"
                rel="noreferrer"
                className="text-green-900 hover:underline"
              >
                {commonContact.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Instagram className="text-gray-700 mt-1" />
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">
                Instagram
              </h4>
              <a
                href={commonContact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-900 hover:underline"
              >
                @v.v._caring_centre
              </a>
            </div>
          </div>
        </div>

        {/* Map Card */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <iframe
            src={branch.mapEmbedUrl}
            width="100%"
            height="400"
            className="rounded-xl border-0 w-full"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
