import React from 'react';
import { 
    QuestionMarkCircleIcon, 
    MagnifyingGlassIcon, 
    CurrencyDollarIcon, 
    HeartIcon,
    UserGroupIcon,
    StarIcon,
    BuildingOfficeIcon,
    PhoneIcon
} from '@heroicons/react/24/outline';

const ResourcesPage = () => {
    const resources = [
        {
            category: "General Questions",
            icon: <QuestionMarkCircleIcon className="w-8 h-8" />,
            items: [
                {
                    question: "What types of senior living options do you cover?",
                    answer: "We cover Independent Living, Assisted Living, Memory Care, Skilled Nursing, and Continuing Care Retirement Communities (CCRCs).",
                    image: "/chooseUs-1.png",
                    icon: <BuildingOfficeIcon className="w-6 h-6" />
                },
                {
                    question: "Do you offer virtual tours?",
                    answer: "Yes, many of our listed communities offer virtual tours through our platform, allowing you to explore facilities from the comfort of your home.",
                    image: "/chooseUs-1.png",
                    icon: <UserGroupIcon className="w-6 h-6" />
                }
            ]
        },
        {
            category: "Search and Results",
            icon: <MagnifyingGlassIcon className="w-8 h-8" />,
            items: [
                {
                    question: "How can I search for a community?",
                    answer: "You can search by ZIP code, city, state, care type, amenities, or keywords.",
                    image: "/chooseUs-1.png",
                    icon: <MagnifyingGlassIcon className="w-6 h-6" />
                },
                {
                    question: "What kind of information is available about each community?",
                    answer: "Each community profile includes details about care levels offered, amenities, photos, resident testimonials, staff information, and more.",
                    image: "/chooseUs-1.png",
                    icon: <StarIcon className="w-6 h-6" />
                }
            ]
        },
        {
            category: "Financial Resources",
            icon: <CurrencyDollarIcon className="w-8 h-8" />,
            items: [
                {
                    question: "What payment options are available?",
                    answer: "Communities accept various payment methods including private pay, long-term care insurance, VA benefits, and in some cases, Medicaid/Medicare.",
                    image: "/chooseUs-1.png",
                    icon: <CurrencyDollarIcon className="w-6 h-6" />
                },
                {
                    question: "How can I understand the costs involved?",
                    answer: "We provide detailed pricing information, cost calculators, and financial planning resources to help you make informed decisions.",
                    image: "/chooseUs-1.png",
                    icon: <CurrencyDollarIcon className="w-6 h-6" />
                }
            ]
        },
        {
            category: "Health & Wellness",
            icon: <HeartIcon className="w-8 h-8" />,
            items: [
                {
                    question: "What health services are typically available?",
                    answer: "Communities often provide medication management, 24/7 nursing care, therapy services, and wellness programs.",
                    image: "/chooseUs-1.png",
                    icon: <HeartIcon className="w-6 h-6" />
                },
                {
                    question: "How do communities handle medical emergencies?",
                    answer: "Most communities have 24/7 emergency response systems and trained staff to handle medical emergencies promptly.",
                    image: "/chooseUs-1.png",
                    icon: <PhoneIcon className="w-6 h-6" />
                }
            ]
        }
    ];

    return (
        <div className="bg-gray-50">
            <section className="max-w-[1200px] mx-auto p-6 md:p-10 font-sans text-gray-700 mt-[80px]">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-[#b7eb46] mb-4">
                        Senior Living Resources
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need to know about finding the perfect senior living community
                    </p>
                </div>

                {resources.map((section, index) => (
                    <div key={index} className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="text-[#b7eb46]">
                                {section.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-[#b7eb46]">
                                {section.category}
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {section.items.map((item, idx) => (
                                <div key={idx} className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-[1.02]">
                                    <div className="flex items-start p-6">
                                        <div className="text-[#b7eb46] mr-4 mt-1">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold mb-3 text-gray-800">
                                                {item.question}
                                            </h3>
                                            <p className="text-gray-600">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                        <QuestionMarkCircleIcon className="w-8 h-8 text-[#b7eb46]" />
                        <h2 className="text-2xl font-bold text-[#b7eb46]">
                            Need More Help?
                        </h2>
                    </div>
                    <p className="text-gray-600 mb-6">
                        Our senior living advisors are here to help you navigate your options.
                    </p>
                    <button className="bg-[#b7eb46] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2">
                        <PhoneIcon className="w-5 h-5" />
                        Contact an Advisor
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ResourcesPage;