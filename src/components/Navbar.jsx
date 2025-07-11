import React, { useEffect, useRef, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { useSiteContent } from "../hooks/useSiteContent";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About Us", href: "#about" },
  { name: "Our Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [displayNumber, setDisplayNumber] = useState("9029006592");
  const [dialNumber, setDialNumber] = useState("919029006592");
  const { contactInfo, loading } = useSiteContent();

  useEffect(() => {
    if (!loading && contactInfo?.whatsapp) {
      const full = contactInfo.whatsapp.replace(/\D/g, ""); // 919029006592
      const display =
        full.startsWith("91") && full.length === 12
          ? full.slice(2) // ✅ Just 9029006592
          : full;
      setDisplayNumber(display); // for showing
      setDialNumber(full); // for tel: (no need to add +91 again!)
    }
  }, [loading, contactInfo]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);

    // Turn id like "#about" → "about"
    const hash = id.replace("#", "");

    if (location.pathname !== "/") {
      navigate("/#" + hash); // ✅ Use hash for react-scroll to pick up
    } else {
      window.history.pushState(null, "", `#${hash}`);
      scroller.scrollTo(hash, {
        duration: 800,
        delay: 100,
        smooth: true,
        offset: -80,
      });
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100); // wait for DOM to load after navigation
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      {/* Logo + Name */}
      <button
        onClick={handleLogoClick}
        className="flex items-center space-x-2"
        to="/"
      >
        <img
          src="/branding/logo.webp"
          alt="VV Caring Center Logo"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
          loading="eager"
          fetchpriority="high"
        />

        <h1 className="font-poppins text-[clamp(1rem,2vw,1.5rem)] font-bold text-gray-800">
          Diksha Foundation
        </h1>
      </button>

      {/* Desktop Nav */}
      <ul className="font-poppins hidden md:flex space-x-3 lg:space-x-10 text-gray-700 font-medium cursor-pointer">
        {navLinks.map(({ name, href }) => (
          <li key={name}>
            <a
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="text-[clamp(0.9rem,2vw,1.1rem)] hover:text-green-700 transition"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>

      {/* Call Button (Desktop) */}
      <a href={`tel:${dialNumber}`} className="hidden md:flex">
        <div className="font-poppins bg-amber-400 text-black px-4 py-2 rounded-full flex items-center space-x-2 hover:scale-105 transition duration-300">
          <Phone className="w-5 h-5 fill-black stroke-black" strokeWidth={1} />
          <span className="hidden lg:inline text-[clamp(0.9rem,1.8vw,1.2rem)] font-semibold">
            {displayNumber}
          </span>
        </div>
      </a>

      {/* Hamburger Icon (Mobile) */}
      <div
        className="md:hidden text-gray-800 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        ref={menuRef}
        className={`font-poppins md:hidden fixed top-[72px] left-0 w-full bg-white shadow-md px-6 py-4 flex flex-col space-y-4 z-40 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 max-h-screen pointer-events-auto"
            : "opacity-0 max-h-0 overflow-hidden pointer-events-none" //pointer event very necessary. unwanted Scroll top bug fixed
        }`}
      >
        {navLinks.map(({ name, href }) => (
          <a
            key={name}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className="text-gray-800 font-medium hover:text-green-700"
          >
            {name}
          </a>
        ))}
        <a href={`tel:${dialNumber}`} onClick={() => setIsOpen(false)}>
          <div className="bg-amber-400 text-black px-4 py-2 rounded-full flex items-center justify-center space-x-2 hover:scale-105 transition duration-300">
            <Phone size={18} />
            <span className="font-poppins font-semibold">{displayNumber}</span>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
