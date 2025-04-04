import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config/url';
import { useAuth } from '../context/userContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        role: 'User',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const { user, login } = useAuth();
    const navigate = useNavigate();

    // Initialize form with user data
    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || '',
                role: user.role || 'User',
                password: ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Don't send password if it's empty
            const dataToSend = formData.password 
                ? formData 
                : { ...formData, password: undefined };

            const response = await axios.patch(
                `${BASE_URL}/api/auth/profile/${user.userId}`,
                dataToSend
            );

            console.log(response.data);
            login(response.data);
            toast.success('Profile updated successfully!');
            setFormData(prev => ({ ...prev, password: '' })); // Clear password field
            
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
            console.error('Update error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Your Profile</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Update your account information
                    </p>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            disabled={user?.role !== 'Admin'} // Only admin can change role
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password (leave blank to keep current)
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;