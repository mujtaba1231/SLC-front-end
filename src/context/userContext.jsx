import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

// Create Context
const UserContext = createContext();

// Custom Hook for easier access
export const useAuth = () => useContext(UserContext);

// Provider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check for token in localStorage on initial load
    useEffect(() => {
        console.log('Checking for token in localStorage...');
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        if (token) {
            const decoded = jwtDecode(token);
            console.log('Decoded token:', decoded);
            setUser(decoded);
        }
    }, []);

    // Login Function
    const login = (token) => {
        console.log('Logging in with token:', token);
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);
        setUser(decoded);
    };

    // Logout Function
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
