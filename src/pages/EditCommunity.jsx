import React, { useEffect, useState } from 'react';
import axios from 'axios';
import upload from '../utils/upload';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config/url';

const EditCommunity = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        location: { address: '', city: '', state: '', zipCode: '' },
        careTypes: [],
        amenities: [],
        priceRange: { min: '', max: '' },
        communitySize: '',
        moveInDate: '',
        description: '',
        contactInfo: { phone: '', email: '' },
        images: [],
        isActive: true,
    });
    const [imgUpload, setImgUpload] = useState(false);
    const [loading, setLoading] = useState(false);

    // Predefined options for care types, amenities, and community sizes
    const careTypeOptions = ['Independent Living', 'Assisted Living', 'Memory Care'];
    const amenityOptions = ['Swimming Pool', 'Fitness Center', 'Pet-Friendly'];
    const communitySizeOptions = ['Small', 'Medium', 'Large'];

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData({
                ...formData,
                [parent]: { ...formData[parent], [child]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle checkbox changes for care types and amenities
    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        const updatedArray = checked
            ? [...formData[name], value]
            : formData[name].filter((item) => item !== value);
        setFormData({ ...formData, [name]: updatedArray });
    };

    // Handle file upload for images
    const handleFileChange = async (e) => {
        try {
            setImgUpload(true);
            const url = await upload(e.target.files[0]);
            setFormData((prevData) => ({
                ...prevData,
                images: [...prevData.images, url],
            }));
            console.log("File uploaded successfully:", url);
        } catch (error) {
            console.error("Failed to upload file:", error);
        } finally {
            setImgUpload(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (parseFloat(formData.priceRange.min) > parseFloat(formData.priceRange.max)) {
            alert('Minimum price cannot be greater than maximum price.');
            return;
        }
        setLoading(true);
        try {
            const payload = {
                ...formData,
                moveInDate: new Date(formData.moveInDate),
            };
            const res = await axios.patch(`${BASE_URL}/api/communities/${id}`, payload);
            console.log(res.data);
            alert('Community updated successfully!');
        } catch (error) {
            console.error('Error updating community:', error);
            alert('Failed to update community. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch community data on component mount
    useEffect(() => {
        const fetchCommunity = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/communities/${id}`);
                setFormData(response.data);
            } catch (err) {
                console.error('Error fetching community:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCommunity();
    }, [id]);

    return (
        <div className="container mx-auto max-w-[600px] p-4 border border-gray-300 rounded-xl mt-[100px] mb-4">
            <h1 className="text-2xl text-center font-bold mb-4">Edit Community</h1>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center gap-4">
                {/* Community Name */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Community Name</label>
                    <input
                        name="name"
                        placeholder="Community Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="py-2 w-full border border-gray-300 rounded-md px-4"
                    />
                </div>

                {/* Location Fields */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                        name="location.address"
                        placeholder="Address"
                        value={formData.location.address}
                        onChange={handleChange}
                        required
                        className="w-full py-2 border border-gray-300 rounded-md px-4"
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                        name="location.city"
                        placeholder="City"
                        value={formData.location.city}
                        onChange={handleChange}
                        required
                        className="w-full py-2 border border-gray-300 rounded-md px-4"
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                        name="location.state"
                        placeholder="State"
                        value={formData.location.state}
                        onChange={handleChange}
                        required
                        className="w-full py-2 border border-gray-300 rounded-md px-4"
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <input
                        name="location.zipCode"
                        placeholder="Zip Code"
                        value={formData.location.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full py-2 border border-gray-300 rounded-md px-4"
                    />
                </div>

                {/* Care Types Checkboxes */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Care Types</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
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

                {/* Price Range */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Price</label>
                    <input
                        name="priceRange.min"
                        placeholder="Min Price"
                        type="number"
                        value={formData.priceRange.min}
                        onChange={handleChange}
                        required
                        className="w-full py-2 border border-gray-300 rounded-md px-4"
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Price</label>
                    <input
                        name="priceRange.max"
                        placeholder="Max Price"
                        type="number"
                        value={formData.priceRange.max}
                        onChange={handleChange}
                        required
                        className="w-full py-2 border border-gray-300 rounded-md px-4"
                    />
                </div>

                {/* Community Size Dropdown */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Community Size</label>
                    <select
                        name="communitySize"
                        value={formData.communitySize}
                        onChange={handleChange}
                        required
                        className="w-full py-2 border border-gray-300 rounded-md px-4"
                    >
                        <option value="">Select Community Size</option>
                        {communitySizeOptions.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Move-In Date */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Move-In Date</label>
                    <input
                        name="moveInDate"
                        type="date"
                        value={formData.moveInDate}
                        onChange={handleChange}
                        className="w-full py-2 border border-gray-300 rounded-md px-4"
                    />
                </div>

                {/* Description */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full py-2 border border-gray-300 rounded-md px-4"
                    />
                </div>

                {/* Contact Info */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                    <input
                        name="contactInfo.phone"
                        placeholder="Contact Phone"
                        value={formData.contactInfo.phone}
                        onChange={handleChange}
                        required
                        className="w-full py-2 border border-gray-300 rounded-md px-4"
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                    <input
                        name="contactInfo.email"
                        placeholder="Contact Email"
                        value={formData.contactInfo.email}
                        onChange={handleChange}
                        required
                        className="w-full py-2 border border-gray-300 rounded-md px-4"
                    />
                </div>

                {/* Uploaded Images */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Uploaded Images</label>
                    <div className="flex flex-wrap gap-2">
                        {formData.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Uploaded ${index}`}
                                className="w-20 h-20 object-cover rounded-md"
                            />
                        ))}
                    </div>
                </div>

                {/* File Input for Images */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                    {!imgUpload && (
                        <input
                            type="file"
                            name="images"
                            onChange={handleFileChange}
                            className="py-2 border border-gray-300 rounded-md px-4"
                        />
                    )}
                    {imgUpload && <p className="flex items-center py-2 text-green-500">Wait, image uploading...</p>}
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Update Community
                    </button>
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCommunity;