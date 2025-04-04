import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <div className="max-w-[1200px] mx-auto p-4 flex flex-col gap-8 mb-4 font-sans">
      

      <div className="w-full flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="flex flex-col justify-between gap-4 w-full md:w-1/3 h-full">
          <div>
            

            <div className="flex flex-col md:justify-between md:flex-row gap-4 md:gap-8 mb-8">
              <div className="flex flex-col gap-2">
                <p className="text-sm">Free Customer care</p>
                <p className="text-sm font-bold font-onest">+1 (800) 123-4567</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm">Need live support!</p>
                <p className="text-sm font-bold font-onest">info@seniorliving.com</p>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <p className="text-sm font-bold mb-4">Follow on</p>
            <div className="flex items-center gap-2">
              {/* Social Media Links */}
              {/* <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[40px] bg-[#b7eb46] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#a8cc5c] transition-all duration-300"
                aria-label="Pinterest"
              >
                <img
                  src="/pinterest.png"
                  alt="Pinterest"
                  className="w-[20px] h-[20px]"
                />
              </a> */}

              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[40px] bg-[#b7eb46] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#a8cc5c] transition-all duration-300"
                aria-label="Facebook"
              >
                <img
                  src="/facebook.png"
                  alt="Facebook"
                  className="w-[20px] h-[20px]"
                />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[40px] bg-[#b7eb46] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#a8cc5c] transition-all duration-300"
                aria-label="Instagram"
              >
                <img
                  src="/instagram.png"
                  alt="Instagram"
                  className="w-[20px] h-[20px]"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Divider - visible only on desktop */}
        <div className="hidden md:block w-[1px] max-h-[200px] bg-[#E5E5E5] self-stretch"></div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 w-full md:w-2/3">
          <div className="flex items-center justify-between gap-4">
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full h-[40px] border border-[#b7eb46] rounded-full px-4 py-2 outline-none "
            />
            <button className="w-[40px] h-[40px] bg-[#b7eb46] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#a8cc5c] transition-all duration-300">
              <img src="/send.png" alt="send" className="w-[20px] h-[20px]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-bold mb-2 font-onest">Quick Links</h2>
              <a
                href="/"
                className="text-sm hover:text-[#b7eb46] transition-colors duration-300"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-sm hover:text-[#b7eb46] transition-colors duration-300"
              >
                About Us
              </a>
              <a
                href="/services"
                className="text-sm hover:text-[#b7eb46] transition-colors duration-300"
              >
                Services
              </a>
              <a
                href="/blog"
                className="text-sm hover:text-[#b7eb46] transition-colors duration-300"
              >
                Blog
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-bold mb-2 font-onest">Services</h2>
              <a
                href="/food-security"
                className="text-sm hover:text-[#b7eb46] transition-colors duration-300"
              >
                Food Security Initiative
              </a>
              <a
                href="/healthcare"
                className="text-sm hover:text-[#b7eb46] transition-colors duration-300"
              >
                Healthcare Access
              </a>
              <a
                href="/education"
                className="text-sm hover:text-[#b7eb46] transition-colors duration-300"
              >
                Education
              </a>
              <a
                href="/women-empowerment"
                className="text-sm hover:text-[#b7eb46] transition-colors duration-300"
              >
                Women Empowerment
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-bold mb-2 font-onest">Support</h2>
              <a
                href="/faq"
                className="text-sm hover:text-[#b7eb46] transition-colors duration-300"
              >
                FAQ
              </a>
              <a
                href="/support"
                className="text-sm hover:text-[#b7eb46] transition-colors duration-300"
              >
                Support
              </a>
              <a
                href="/terms"
                className="text-sm hover:text-[#b7eb46] transition-colors duration-300"
              >
                Terms & Conditions
              </a>
              <a
                href="/privacy"
                className="text-sm hover:text-[#b7eb46] transition-colors duration-300"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
