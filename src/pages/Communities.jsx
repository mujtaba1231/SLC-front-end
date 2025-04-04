import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"; // Updated imports for Heroicons v2
import { useAuth } from "../context/userContext";
import { BASE_URL } from "../config/url";

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [filteredCommunities, setFilteredCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    careType: "",
    amenities: "",
    priceRange: { min: "", max: "" },
    communitySize: "",
    moveInDate: "",
  });
  const { user } = useAuth();

  // Fetch communities on component mount
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/communities`
        );
        setCommunities(response.data);
        setFilteredCommunities(response.data); // Initialize filtered communities
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let results = communities.filter((community) => {
      const matchesSearchQuery =
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.location.city
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        community.location.state
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        community.location.zipCode.includes(searchQuery);

      const matchesCareType =
        !filters.careType || community.careTypes.includes(filters.careType);

      const matchesAmenities =
        !filters.amenities ||
        community.amenities.some((amenity) =>
          amenity.toLowerCase().includes(filters.amenities.toLowerCase())
        );

      const matchesPriceRange =
        (!filters.priceRange.min ||
          community.priceRange.min >= filters.priceRange.min) &&
        (!filters.priceRange.max ||
          community.priceRange.max <= filters.priceRange.max);

      const matchesCommunitySize =
        !filters.communitySize ||
        community.communitySize === filters.communitySize;

      const matchesMoveInDate =
        !filters.moveInDate || community.moveInDate <= filters.moveInDate;

      return (
        matchesSearchQuery &&
        matchesCareType &&
        matchesAmenities &&
        matchesPriceRange &&
        matchesCommunitySize &&
        matchesMoveInDate
      );
    });

    setFilteredCommunities(results);
  }, [searchQuery, filters, communities]);

  // Handle input changes for search and filters
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: {
        ...prevFilters.priceRange,
        [name]: value,
      },
    }));
  };

  // Handle delete community
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this community?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/communities/${id}`);
        setCommunities((prevCommunities) =>
          prevCommunities.filter((community) => community._id !== id)
        );
        setFilteredCommunities((prevCommunities) =>
          prevCommunities.filter((community) => community._id !== id)
        );
        alert("Community deleted successfully!");
      } catch (err) {
        console.error("Error deleting community:", err);
        alert("Failed to delete community. Please try again.");
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="max-w-[1200px] pt-[100px] mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Senior Living Communities
      </h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by ZIP code, city, state, or keywords..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <select
          name="careType"
          value={filters.careType}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Care Types</option>
          <option value="Independent Living">Independent Living</option>
          <option value="Assisted Living">Assisted Living</option>
          <option value="Memory Care">Memory Care</option>
        </select>

        <input
          type="text"
          name="amenities"
          placeholder="Amenities (e.g., swimming pool)"
          value={filters.amenities}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="min"
          placeholder="Min Price"
          value={filters.priceRange.min}
          onChange={handlePriceRangeChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="max"
          placeholder="Max Price"
          value={filters.priceRange.max}
          onChange={handlePriceRangeChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {user && user.role == "Admin" && (
        <div className="w-full flex items-center justify-end">
          <Link
            to="/community"
            className="bg-[#b7eb46] px-4 py-2 rounded-md text-white hover:bg-[#b7eb46]/90 transition-all duration-300"
          >
            Add new Community
          </Link>
        </div>
      )}

      {/* Search Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((community) => (
          <div
            key={community._id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={community.images[0]}
              alt={community.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="w-full flex justify-between items-center mb-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {community.name}
              </h2>
              {user && user.role == "Admin" && (
              <div className="flex items-center gap-2">
                <Link
                  to={`/communities/edit/${community._id}`}
                  className="flex items-center gap-1 p-2 rounded-lg hover:bg-slate-300 cursor-pointer"
                >
                  <PencilSquareIcon className="h-6 w-6" />
                </Link>
                <div
                  onClick={() => handleDelete(community._id)}
                  className="flex items-center gap-1 p-2 rounded-lg hover:bg-slate-300 cursor-pointer"
                >
                  <TrashIcon className="h-6 w-6" />
                </div>
              </div>
              )}
            </div>
            <p className="text-gray-600 mb-2">
              location: {community.location.city}, {community.location.state}
            </p>
            <p className="text-[#b7eb46] font-medium mb-4">
              Starting from ${community.priceRange.min}/month
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {community.careTypes.map((type, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
            <p className="text-gray-700 text-sm">
              {community.description.substring(0, 150)}...
            </p>
            <Link
              to={`/communities/${community._id}`}
              className="flex items-center justify-center w-full py-2 border border-gray-500 mt-2 rounded-lg hover:bg-gray-200"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communities;
