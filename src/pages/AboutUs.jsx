import React from 'react';
import { 
    HeartIcon, 
    UserGroupIcon, 
    LightBulbIcon, 
    BuildingOffice2Icon 
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
    const values = [
        {
            icon: <HeartIcon className="w-12 h-12" />,
            title: "Compassion",
            description: "We understand the emotional journey of finding the right senior living solution and approach every interaction with empathy."
        },
        {
            icon: <UserGroupIcon className="w-12 h-12" />,
            title: "Transparency",
            description: "We believe in providing clear, unbiased information without hidden agendas or unexpected placement fees."
        },
        {
            icon: <LightBulbIcon className="w-12 h-12" />,
            title: "Innovation",
            description: "We continuously improve our platform to make the search process easier and more informative for seniors and their families."
        },
        {
            icon: <BuildingOffice2Icon className="w-12 h-12" />,
            title: "Quality",
            description: "We maintain high standards in vetting and presenting senior living communities to ensure reliable information."
        }
    ];

    return (
        <div className="bg-gray-50">
            <section className="max-w-[1200px] mx-auto p-6 md:p-10 font-sans text-gray-700 mt-[80px]">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-bold text-[#b7eb46] mb-6">
                        About Us
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Empowering seniors and families to find their ideal living community through transparency and trust
                    </p>
                </div>

                {/* Mission Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            At <span className="text-[#b7eb46] font-semibold">Senior Living Communities</span>, our mission 
                            is to empower seniors and their families in finding the perfect senior living community. 
                            We believe everyone deserves access to transparent and unbiased information without the 
                            hassle of placement agencies.
                        </p>
                        <p className="text-lg leading-relaxed">
                            We are committed to providing a user-friendly platform that connects seniors with communities 
                            that meet their specific needs and preferences.
                        </p>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-[#b7eb46] mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Story Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            Our journey began when we saw the difficulty in searching for senior living communities. 
                            We found the process often resulted in providing personal information we didn't want to provide, 
                            searching on a website we didn't intend to conduct our search on, and entering into terms of 
                            agreement to be contacted by placement agencies and communities when we only wanted information.
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            Our team is passionate about making a difference in the lives of seniors. We are dedicated to 
                            providing transparent and comprehensive information about senior living communities.
                        </p>
                        <p className="text-lg leading-relaxed">
                            We believe that searching for senior living information should be an empowering, easy, and 
                            understandable experience. Let us help you access information that you can use.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center bg-[#b7eb46] bg-opacity-10 rounded-xl p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        Ready to Start Your Search?
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Let us help you find the perfect senior living community.
                    </p>
                    <Link to="/communities" className="bg-[#b7eb46] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors">
                        Search Communities
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;