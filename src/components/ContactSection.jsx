import React, { useState } from "react";
import { Phone, Mail, Instagram, MessageSquare, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "../hooks/useSiteContent";

const ContactSection = () => {
  const { branches, contactInfo, loading, error } = useSiteContent();
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);

  // ✅ Filter out "coming soon" branches
  const liveBranches = branches?.filter((b) => !b.comingSoon) || [];

  // Debugging logs (optional)
  console.log("Live branches:", liveBranches);
  console.log("Contact Info:", contactInfo);
  console.log("Error:", error);

  if (loading) return <p className="text-center">Loading contact info...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center">Error: {error.toString()}</p>
    );

  if (liveBranches.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        No active branches available for contact. Please check Firestore.
      </p>
    );
  }

  const branch = liveBranches[selectedBranchIndex] || {};

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-poppins font-semibold text-gray-800 mb-8 text-center">
        Get in Touch
      </h2>

      {/* Branch Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {liveBranches.map((b, idx) => (
          <button
            key={b.id || idx}
            onClick={() => setSelectedBranchIndex(idx)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
              selectedBranchIndex === idx
                ? "bg-green-100 text-green-800 border-none"
                : "text-gray-600 border-gray-200 hover:text-green-800 hover:border-green-800"
            }`}
          >
            {b.name || `Branch ${idx + 1}`}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Contact Info Card */}
        <div className="bg-white rounded-xl p-6 space-y-4 text-sm sm:text-base">
          <div className="flex items-start gap-3">
            <MapPinned className="text-gray-700 mt-1 shrink-0" />
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">
                Address
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {branch?.address || "No address available"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="text-gray-700 mt-1" />
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">
                Phone
              </h4>
              <Link
                to={`tel:${contactInfo?.phone || ""}`}
                className="text-green-900 hover:underline"
              >
                {contactInfo?.phone || "N/A"}
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
                href={contactInfo?.whatsapp || "#"}
                target="_blank"
                rel="noreferrer"
                className="text-green-900 hover:underline"
              >
                Click here
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
                href={`mailto:${contactInfo?.email || ""}`}
                target="_blank"
                rel="noreferrer"
                className="text-green-900 hover:underline"
              >
                {contactInfo?.email || "N/A"}
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
                href={contactInfo?.instagram || "#"}
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
            src={branch?.mapEmbedUrl || ""}
            width="100%"
            height="400"
            className="rounded-xl border-0 w-full"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="branch-map"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
