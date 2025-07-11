import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import OurStory from "./pages/OurStory";
import NotFoundPage from "./pages/NotFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToSection from "./utils/ScrollToSection";
import ScrollToTop from "./utils/ScrollToTop";
import AdminPanel from "./adminPanel"; 

const App = () => {
  return (
    <>
      <ScrollToSection />
      <ScrollToTop />

      <Routes>
        {/* Public Site */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Panel */}
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
