import React, { useState } from 'react';
import { 
    PhoneIcon, 
    EnvelopeIcon, 
    MapPinIcon, 
    ClockIcon, 
    CheckCircleIcon 
} from '@heroicons/react/24/outline';

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const contactInfo = [
        { 
            icon: <PhoneIcon className="w-6 h-6" />, 
            title: "Phone", 
            content: "(555) 123-4567", 
            link: "tel:+15551234567" 
        },
        { 
            icon: <EnvelopeIcon className="w-6 h-6" />, 
            title: "Email", 
            content: "support@seniorliving.com", 
            link: "mailto:support@seniorliving.com" 
        },
        { 
            icon: <MapPinIcon className="w-6 h-6" />, 
            title: "Address", 
            content: "123 Senior Care Lane, Suite 100, City, State 12345" 
        },
        { 
            icon: <ClockIcon className="w-6 h-6" />, 
            title: "Hours", 
            content: "Monday - Friday: 8AM - 6PM EST" 
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsSubmitted(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-50">
            <section className="max-w-[1200px] mx-auto p-6 md:p-10 font-sans text-gray-700 mt-[80px]">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-[#b7eb46] mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We're here to help you find the perfect senior living solution for your needs
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {contactInfo.map((info, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-[#b7eb46] mb-3">
                                {info.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                            {info.link ? (
                                <a href={info.link} className="text-gray-600 hover:text-[#b7eb46] transition-colors">
                                    {info.content}
                                </a>
                            ) : (
                                <p className="text-gray-600">{info.content}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Contact Form Section */}
                    <div className="flex-1 bg-white shadow-lg rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
                        {isSubmitted ? (
                            <div className="text-center p-6">
                                <CheckCircleIcon className="w-16 h-16 text-[#b7eb46] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                                <p className="text-gray-600 mb-4">Your message has been sent successfully.</p>
                                <button 
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-[#b7eb46] hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        placeholder="Your Name" 
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7eb46]" 
                                        required
                                    />
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        placeholder="Your Email" 
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7eb46]" 
                                        required
                                    />
                                </div>
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    placeholder="Your Phone Number" 
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7eb46]" 
                                    required
                                />
                                <input 
                                    type="text" 
                                    name="subject" 
                                    value={formData.subject} 
                                    onChange={handleChange} 
                                    placeholder="Subject" 
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7eb46]" 
                                    required
                                />
                                <textarea 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    placeholder="Your Message" 
                                    rows="5"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7eb46]"
                                    required
                                ></textarea>

                                <button 
                                    type="submit" 
                                    className="w-full bg-[#b7eb46] text-white p-4 rounded-md hover:bg-[#a8cc5c] transition-all duration-300 flex items-center justify-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : null}
                                    {isLoading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>

                    
                </div>
            </section>
        </div>
    );
};

export default ContactUsPage;