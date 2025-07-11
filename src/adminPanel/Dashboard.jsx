import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { HandHeart, Mail, CalendarHeart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    contact: 0,
    donations: 0,
    events: 0,
    branches: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const contactSnap = await getDocs(collection(db, "contactSubmissions"));
      const donationSnap = await getDocs(collection(db, "donationSubmissions"));
      const eventSnap = await getDocs(collection(db, "eventBookings"));
      const branchSnap = await getDocs(collection(db, "branches"));

      setStats({
        contact: contactSnap.size,
        donations: donationSnap.size,
        events: eventSnap.size,
        branches: branchSnap.size,
      });
    };

    fetchCounts();
  }, []);

  const cards = [
    {
      label: "Contact Enquiries",
      count: stats.contact,
      icon: <Mail size={24} />,
      to: "/admin/contact-submissions",
    },
    {
      label: "Donation Submissions",
      count: stats.donations,
      icon: <HandHeart size={24} />,
      to: "/admin/donation-submissions",
    },
    {
      label: "Event Bookings",
      count: stats.events,
      icon: <CalendarHeart size={24} />,
      to: "/admin/event-bookings",
    },
    {
      label: "Branches",
      count: stats.branches,
      icon: <MapPin size={24} />,
      to: "/admin/branches",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 font-poppins">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ label, count, icon, to }) => (
          <Link
            key={label}
            to={to}
            className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border border-gray-200 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500 mb-1">{label}</p>
              <h3 className="text-xl font-bold text-gray-800">{count}</h3>
            </div>
            <div className="text-green-600">{icon}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
