import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";

import Dashboard from "./Dashboard";
import ContactInfo from "./content/ContactInfo";

import Branches from "./content/Branches";
import UtilityItems from "./content/UtilityItems";
import ContactSubmissions from "./submissions/ContactSubmissions";
import DonationSubmissions from "./submissions/DonationSubmissions";
import EventBookings from "./submissions/EventBookings";


const AdminPanel = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="contact-info" element={<ContactInfo />} />

        <Route path="branches" element={<Branches />} />
        <Route path="utility-items" element={<UtilityItems />} />
        <Route path="contact-submissions" element={<ContactSubmissions />} />
        <Route path="donation-submissions" element={<DonationSubmissions />} />
        <Route path="event-bookings" element={<EventBookings />} />

      </Route>
    </Routes>
  );
};

export default AdminPanel;
