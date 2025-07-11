import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Phone,
  MapPin,
  ClipboardList,
  Mail,
  HandHeart,
  CalendarHeart,
  LogOut,
} from "lucide-react";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/admin-login");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-md p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6 ml-2 text-green-700">
          Admin Panel
        </h2>

        {/* Show current admin email */}
        {user && (
          <div className="text-xs text-gray-500 mb-4 ml-2">
            Logged in as: <br />
            <span className="font-medium">{user.email}</span>
          </div>
        )}

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
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium px-4 py-2 rounded transition hover:bg-red-50"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
