import React from "react";
import TestimonialCarousel from "./TestimonialCarousel";

const Testimonials = () => {
    return (
        <div className="font-sans bg-[#F8F8F8] w-full py-8 md:py-16">
            <div className="max-w-[1200px] mx-auto p-4 flex flex-col lg:flex-row gap-8 lg:gap-12">

                {/* text section */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        
                        <p className="text-sm font-onest tracking-[3.5px]">TESTIMONIALS</p>   
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 font-onest">
                        What People Say About Us
                    </h2>

                    <div className="mt-4 md:mt-8">
                        <TestimonialCarousel />
                    </div>
                </div>

                {/* image section */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <img 
                        src="/3.jpeg" 
                        alt="testimonials"  
                        className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] h-auto rounded-[60px]" 
                    />
                </div>


            </div>
        </div>
    );
};

export default Testimonials;