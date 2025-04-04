import React from "react";

const AboutUsSection = () => {
  return (
    <section className="w-full py-16 text-black bg-[#F8F8F8]">
      <div className="max-w-[1200px] mx-auto p-4 flex gap-4 justify-between">

        {/* Text Section */}
        <div className="flex-1 font-sans flex flex-col gap-10">
          {/* Header Section */}
          <div className="w-full flex items-center gap-2">

            <p className="text-sm font-normal font-onest leading-[15px] text-[#000000] tracking-[3.5px]">
              ABOUT US
            </p>
          </div>

          {/* Title Section */}
          <h1 className="text-4xl font-bold font-onest">Empowering Seniors with Transparent Information</h1>

          <p className="text-sm text-gray-500">
            At our website, we believe seniors and their families deserve clear, unbiased information when searching for a senior living community.
            Our platform offers direct access to a variety of verified communities without the hassle of placement agencies, ensuring you stay in control of your search.
          </p>

          {/* Key Points Section */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <img src="/check-mark.png" alt="check mark" className="w-[15px] h-[15px]" />
                <p className="text-sm">Direct connections with communities</p>
              </div>
              <div className="flex items-center gap-2">
                <img src="/check-mark.png" alt="check mark" className="w-[15px] h-[15px]" />
                <p className="text-sm">Transparent and verified information</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <img src="/check-mark.png" alt="check mark" className="w-[15px] h-[15px]" />
                <p className="text-sm">No hidden fees or placement agencies</p>
              </div>
              <div className="flex items-center gap-2">
                <img src="/check-mark.png" alt="check mark" className="w-[15px] h-[15px]" />
                <p className="text-sm">Empowering families with unbiased data</p>
              </div>
            </div>
          </div>

          {/* Numbers Section */}
          <div className='flex flex-col md:flex-row items-center justify-between p-4 gap-2'>
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-4xl font-bold text-[#b7eb46]">100+</h1>
              <p className="text-sm">Communities Verified</p>
            </div>

            <div className="h-full w-[1px] bg-gray-300"></div>

            <div className="flex flex-col items-center gap-2">
              <h1 className="text-4xl font-bold text-[#b7eb46]">50+</h1>
              <p className="text-sm">States Covered</p>
            </div>

            <div className="h-full w-[1px] bg-gray-300"></div>

            <div className="flex flex-col items-center gap-2">
              <h1 className="text-4xl font-bold text-[#b7eb46]">10K+</h1>
              <p className="text-sm">Families Empowered</p>
            </div>
          </div>
        </div>


        {/* Image Section */}
        <div className="flex flex-col flex-1 hidden md:flex">
          <img src="/1.jpg" alt="About Us" className="w-[555px] h-[555px] rounded-full object-cover" />
          <div className="flex justify-end -mt-40">
            <img src="/2.jpg" alt="About Us" className="w-[265px] h-[265px] rounded-full border-2 border-white object-cover" />
          </div>
        </div>


      </div>
    </section>
  );
};

export default AboutUsSection;
