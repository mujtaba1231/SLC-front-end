import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const ChooseUsSection = () => {
  return (
    <div className="py-8 md:py-16 px-4 md:p-10">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-14">
        {/* Image Section */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div className="flex items-center justify-center lg:justify-end">
            <img 
              src="/1.jpg" 
              alt="chooseus-1" 
              className="w-full max-w-[350px] md:max-w-[480px] h-auto rounded-[20px]" 
            />
          </div>
          
          <img 
            src="/4.webp" 
            alt="chooseus-2" 
            className="w-full max-w-[300px] md:max-w-[412px] h-auto mt-[-50px] md:mt-[-100px] rounded-[20px] border-[8px] md:border-[15px] border-white self-start md:self-auto" 
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col font-sans gap-4 w-full lg:w-1/2 px-4 md:px-0">
          <div className="w-full flex items-center gap-2">
            
            <p className="text-sm font-normal font-onest leading-[15px] text-[#000000] tracking-[3.5px]">
              CHOOSE US
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold font-onest">
            Connecting Families with Trusted Communities
          </h1>
          
          <p className="text-sm md:text-base text-gray-500 leading-relaxed">
            At our website, we are committed to simplifying the search for senior living communities. Our platform offers direct access to verified communities, ensuring you receive transparent and unbiased information — all without the hassle of placement agencies.
          
            Our dedication to clear, trustworthy data empowers seniors and their families to make informed decisions with confidence. We prioritize your needs by providing detailed community profiles, unbiased reviews, and direct contact options for each community.
          </p>
        
          {/* Button */}
          <Link to="/about" className='w-[150px] h-[45px] bg-[#b7eb46] text-black flex items-center justify-center gap-2 px-4 py-2 rounded-full hover:bg-[#a8cc5c] transition-colors duration-300 mt-4'>
            About Us
            <ArrowRightIcon className="w-[20px] h-[20px]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseUsSection;
