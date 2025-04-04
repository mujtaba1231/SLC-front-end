import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomCarousel from "../component/ReactCarousel";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline"; // Updated imports for Heroicons v2

const CommunityDetails = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/communities/${id}`
        );
        setCommunity(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );

  if (!community)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Community not found
      </div>
    );

  return (
    <div className="max-w-[1200px] mt-[100px] mx-auto px-4 py-8">
      {/* Community Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Carousel */}
        <CustomCarousel
          images={community.images}
          communityName={community.name}
        />

        {/* Community Name and Description */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{community.name}</h2>
          <p className="text-gray-600">{community.description}</p>

          {/* Care Types Section */}
          <div className="mt-4">
            <p className="text-gray-600 font-semibold">Care Types:</p>
            <div className="flex items-center gap-2">
              {community.careTypes.map((type, index) => (
                <div key={index} className="px-4 py-2 bg-[#7aff8e] rounded-full text-gray-600">{type}</div>
              ))}
            </div>
          </div>

          {/* Amenities Section */}
          <div className="mt-4">
            <p className="text-gray-600 font-semibold">Amenities:</p>

            <div className="flex items-center gap-2">
              {community.amenities.map((type, index) => (
                <div key={index} className="px-4 py-2 bg-[#7aff8e] rounded-full text-gray-600">{type}</div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Contact {community.name}</h2>

        {/* Location */}
        <div className="flex items-center mb-4">
          <MapPinIcon className="w-6 h-6 mr-2 text-gray-600" />
          <p className="text-gray-600">
            {community.location.address}, {community.location.city},{" "}
            {community.location.state} {community.location.zipCode}
          </p>
        </div>

        {/* Phone */}
        <div className="flex items-center mb-4">
          <PhoneIcon className="w-6 h-6 mr-2 text-gray-600" />
          <p className="text-gray-600">{community.contactInfo.phone}</p>
        </div>

        {/* Email */}
        <div className="flex items-center mb-4">
          <p className="w-6 h-6 mr-2 text-gray-600">
            <EnvelopeIcon className="w-6 h-6 mr-2 text-gray-600" />{" "}
          </p>
          <p className="text-gray-600">{community.contactInfo.email}</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails;
