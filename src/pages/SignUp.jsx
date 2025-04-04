import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config/url';

const SignUp = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('User');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
                fullName,
                email,
                password,
                phone,
                role
            });

            if (response.data) {
                setSuccess('Account created successfully! Redirecting to Sign In...');
                setTimeout(() => navigate('/'), 2000); // Redirect to Sign In
            } else {
                setError(response.data.message || 'Error signing up. Please try again.');
            }
        } catch (err) {
            setError('Error signing up. Please try again.', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md outline-none"
                        />
                    </div>

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 outline-non">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div> */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#b7eb46] text-white py-2 rounded-md hover:opacity/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-blue-500 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
