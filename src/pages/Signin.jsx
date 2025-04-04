import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/userContext';
import { BASE_URL } from '../config/url';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${BASE_URL}/api/auth/signin`, {
                email,
                password
            });
            console.log('Response:', response.data);

            login(response.data.token);

            if (response.data) {
                navigate('/dashboard'); // Redirect on successful login
            } else {
                setError(response.data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Error signing in. Please try again.', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <label className="block text-sm font-medium text-gray-700 outline-none">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#b7eb46] text-white py-2 rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
