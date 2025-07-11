import React from "react";
import { Facebook, Youtube, Instagram, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "../hooks/useSiteContent";

const Footer = () => {
  const { contactInfo } = useSiteContent();
  const phone = contactInfo?.phone;
  const phone2 =
    contactInfo?.whatsapp?.replace("https://wa.me/91", "+91-") || "+91-9029006592";
  const email = contactInfo?.email;
  const facebook = contactInfo?.facebook;
  const instagram = contactInfo?.instagram;
  const youtube = contactInfo?.youtube;


  return (
    <footer className="bg-[#618A70] text-white px-4 py-8 mt-5">
      {/* Top Row */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-6 sm:space-y-0 sm:space-x-10">
        {/* Contact Info */}
        <div className="flex flex-col space-y-2 items-center sm:items-start text-sm">
          <Link
            to={`tel:${phone}`}
            className="flex gap-2 text-gray-300 hover:text-white"
          >
            <Phone size={16} className="mt-0.5" />{phone}
          </Link>
          <Link
            to={`tel:${phone2}`}
            className="flex gap-2 text-gray-300 hover:text-white"
          >
            <Phone size={16} className="mt-0.5" />
            {phone2}
          </Link>
          <a
            href={`mailto:${email}`}
            className="flex gap-2 text-gray-300 hover:text-white"
          >
            <Mail size={16} className="mt-0.5" />
            {email}
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6">
          <a
            href={`${facebook}`}
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <Facebook size={22} />
          </a>
          <a
            href={`${youtube}`}
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <Youtube size={22} />
          </a>
          <a
            href={`${instagram}`}
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <Instagram size={22} />
          </a>
        </div>

        {/* Donate */}
        <div className="text-center sm:text-right">
          <Link
            to="/donate"
            className="inline-block text-sm text-gray-300 hover:text-white border border-white px-4 py-1 rounded-md mt-2 sm:mt-0"
          >
            Donate Us & Contribute Here
          </Link>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-6 text-center text-xs text-gray-200">
        © {new Date().getFullYear()} Diksha Foundation (V.V. Caring Center). All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
