import React, { useState, useEffect } from 'react';

const testimonials = [
    {
        id: 1,
        name: "John Anderson",
        role: "Grateful Son",
        image: "/chooseUs-1.png",
        quote: "Finding a senior living community for my mother felt overwhelming until I found this platform. The unbiased information and direct access to communities made all the difference.",
        rating: 5
    },
    {
        id: 2,
        name: "Linda Martinez",
        role: "Caregiver",
        image: "/chooseUs-1.png",
        quote: "I needed a trusted platform to compare different senior living options. This website provided clear, accurate information without the pressure of placement agencies.",
        rating: 5
    },
    {
        id: 3,
        name: "Robert Thompson",
        role: "Senior Living Resident",
        image: "/chooseUs-1.png",
        quote: "This platform helped me find a wonderful community that perfectly matches my lifestyle. The detailed profiles and transparent information gave me confidence in my decision.",
        rating: 4
    }
];


const TestimonialCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative">
                    {/* Main Testimonial Card */}
                    <div className="bg-white rounded-[20px] shadow-lg p-8 md:p-12 transition-all duration-500">
                        <div className="flex flex-col gap-6">
                            {/* Profile and Rating Section */}
                            <div className="flex items-center justify-between gap-4">
                                {/* Avatar and Info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 relative">
                                        <img
                                            src={testimonials[currentIndex].image}
                                            alt={testimonials[currentIndex].name}
                                            className="w-full h-full rounded-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-gray-800">{testimonials[currentIndex].name}</p>
                                        <p className="text-sm text-gray-600">{testimonials[currentIndex].role}</p>
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="flex items-center">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <img 
                                            key={i} 
                                            src="/star.png" 
                                            alt={`Star ${i + 1}`} 
                                            className="w-[15px] h-[15px]" 
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className='w-full h-[1px] bg-gray-200'></div>

                            {/* Quote */}
                            <blockquote className="text-xl italic text-gray-800">
                                "{testimonials[currentIndex].quote}"
                            </blockquote>
                        </div>
                    </div>

                    {/* Dots Navigation
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                role="button"
                                aria-label={`Go to testimonial ${index + 1}`}
                                aria-current={index === currentIndex ? 'true' : 'false'}
                                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                    index === currentIndex ? 'bg-[#b7eb46]' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default TestimonialCarousel;
