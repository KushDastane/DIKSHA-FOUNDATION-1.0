import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
