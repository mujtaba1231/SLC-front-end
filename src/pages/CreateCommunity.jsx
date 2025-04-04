import React, { useState } from 'react';
import axios from 'axios';
import upload from '../utils/upload';
import { BASE_URL } from '../config/url';

const CreateCommunity = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: { address: '', city: '', state: '', zipCode: '' },
        careTypes: [], // Changed to an array
        amenities: [], // Changed to an array
        priceRange: { min: '', max: '' },
        communitySize: '',
        moveInDate: '',
        description: '',
        contactInfo: { phone: '', email: '' },
        images: [] // Changed to an array
    });
    const [imgUpload, setImgUpload] = useState(false);

    // Predefined options for care types and amenities
    const careTypeOptions = ['Independent Living', 'Assisted Living', 'Memory Care'];
    const amenityOptions = ['Swimming Pool', 'Fitness Center', 'Pet-Friendly'];
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData({
                ...formData,
                [parent]: { ...formData[parent], [child]: value }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        const updatedArray = checked
            ? [...formData[name], value] // Add value to array
            : formData[name].filter((item) => item !== value); // Remove value from array

        setFormData({ ...formData, [name]: updatedArray });
    };

    const handleFileChange = async (e) => {
        try {
            console.log("uploading");
            setImgUpload(true);
            const url = await upload(e.target.files[0]);
            formData.images.push(url);
            console.log("Files uploaded successfully:", url);
        } catch (error) {
            console.error("Failed to upload files:", error);
        } finally {
            setImgUpload(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                careTypes: formData.careTypes, // Already an array
                amenities: formData.amenities, // Already an array
                images: formData.images // Already an array
            };

            console.log(payload);

            const res = await axios.post(`${BASE_URL}/api/communities/`, payload);
            console.log(res.data);
            alert('Community created successfully!');
        } catch (error) {
            console.error('Error creating community:', error);
            alert('Failed to create community. Please try again.');
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-[600px] p-4 border border-gray-300 rounded-xl mt-[100px] mb-4">
            <h1 className="text-2xl text-center font-bold mb-4">Create Community</h1>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center gap-4">
                <input name="name" placeholder="Community Name" value={formData.name} onChange={handleChange} required className="py-2 w-full border border-gray-300 rounded-md px-4" />
                <input name="location.address" placeholder="Address" value={formData.location.address} onChange={handleChange} required className="w-full py-2 border border-gray-300 rounded-md px-4" />
                <input name="location.city" placeholder="City" value={formData.location.city} onChange={handleChange} required className="w-full py-2 border border-gray-300 rounded-md px-4" />
                <input name="location.state" placeholder="State" value={formData.location.state} onChange={handleChange} required className="w-full py-2 border border-gray-300 rounded-md px-4" />
                <input name="location.zipCode" placeholder="Zip Code" value={formData.location.zipCode} onChange={handleChange} required className="w-full py-2 border border-gray-300 rounded-md px-4" />

                {/* Care Types Checkboxes */}
                <div className="w-full">
                    <h3 className="text-lg font-semibold mb-2">Care Types</h3>
                    {careTypeOptions.map((option) => (
                        <div key={option} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                name="careTypes"
                                value={option}
                                checked={formData.careTypes.includes(option)}
                                onChange={handleCheckboxChange}
                                className="mr-2"
                            />
                            <label className="text-gray-600">{option}</label>
                        </div>
                    ))}
                </div>

                {/* Amenities Checkboxes */}
                <div className="w-full">
                    <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                    {amenityOptions.map((option) => (
                        <div key={option} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                name="amenities"
                                value={option}
                                checked={formData.amenities.includes(option)}
                                onChange={handleCheckboxChange}
                                className="mr-2"
                            />
                            <label className="text-gray-600">{option}</label>
                        </div>
                    ))}
                </div>

                <input name="priceRange.min" placeholder="Min Price" type="number" value={formData.priceRange.min} onChange={handleChange} required className="w-full py-2 border border-gray-300 rounded-md px-4" />
                <input name="priceRange.max" placeholder="Max Price" type="number" value={formData.priceRange.max} onChange={handleChange} required className="w-full py-2 border border-gray-300 rounded-md px-4" />

                <select name="communitySize" value={formData.communitySize} onChange={handleChange} required className="w-full py-2 border border-gray-300 rounded-md px-4">
                    <option value="">Select Community Size</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                </select>


                <div className='flex flex-col gap-2 w-full'>
                <h3 className="text-lg font-semibold text-start">Move-In Date</h3>
                <input name="moveInDate" type="date" value={formData.moveInDate} onChange={handleChange} className="w-full py-2 border border-gray-300 rounded-md px-4" />

                </div>
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full py-2 border border-gray-300 rounded-md px-4" />

                <input name="contactInfo.phone" placeholder="Contact Phone" value={formData.contactInfo.phone} onChange={handleChange} required className="w-full py-2 border border-gray-300 rounded-md px-4" />
                <input name="contactInfo.email" placeholder="Contact Email" value={formData.contactInfo.email} onChange={handleChange} required className="w-full py-2 border border-gray-300 rounded-md px-4" />

                {/* File input for multiple images */}
                {!imgUpload && (
                    <>
                    <input
                        type="file"
                        name="images"
                        onChange={handleFileChange}
                        className="py-2 border border-gray-300 rounded-md px-4"
                    />

                    <p className='text-gray-500 text-sm'>Add Image</p>
                    </>
                )}

                {imgUpload && <p className="flex items-center py-2 text-green-500">Wait, image uploading...</p>}

                <button disabled={loading} type="submit" className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                    Create Community
                </button>
            </form>
        </div>
    );
};

export default CreateCommunity;