import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Phone,
  MapPin,
  ClipboardList,
  Mail,
  HandHeart,
  CalendarHeart,
} from "lucide-react";

const links = [
  { to: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  {
    to: "/admin/contact-info",
    label: "Contact Info",
    icon: <Phone size={18} />,
  },

  { to: "/admin/branches", label: "Branches", icon: <MapPin size={18} /> },
  {
    to: "/admin/utility-items",
    label: "Utility Items",
    icon: <ClipboardList size={18} />,
  },
  {
    to: "/admin/contact-submissions",
    label: "Contact Submissions",
    icon: <Mail size={18} />,
  },
  {
    to: "/admin/donation-submissions",
    label: "Donation Submissions",
    icon: <HandHeart size={18} />,
  },
  {
    to: "/admin/event-bookings",
    label: "Event Bookings",
    icon: <CalendarHeart size={18} />,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white shadow-md p-4">
      <h2 className="text-2xl font-bold mb-6 ml-2 text-green-700">
        Admin Panel
      </h2>
      <nav className="flex flex-col gap-1">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
