import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/userContext';
import { UserCircleIcon } from '@heroicons/react/24/outline';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();


  return (
    <nav className="fixed top-0 left-0 px-4 right-0 bg-white z-50 pt-2 font-sans">
      <div className="max-w-[1200px] mx-auto py-2 font-size-14 h-[57px] relative">
        <div className="flex justify-between items-center h-full">
          {/* Rest of the navbar content stays the same */}
          <div className='flex items-center gap-4'>
            <img src={"/logo.webp"} alt="logo" width={100} height={100} className=""/>
            
            
            <div className="hidden md:flex items-center gap-4">
              <Link to="/" className="hover:text-[#b7eb46] transition-colors duration-300">Home</Link>
              <Link to="/communities" className="hover:text-[#b7eb46] transition-colors duration-300">Communities</Link>
              <Link to="/blogs" className="hover:text-[#b7eb46] transition-colors duration-300">Blogs</Link>
              <Link to="/resources" className="hover:text-[#b7eb46] transition-colors duration-300">Resources</Link>
              <Link to="/about" className="hover:text-[#b7eb46] transition-colors duration-300">About Us</Link>
              <Link to="/contact" className="hover:text-[#b7eb46] transition-colors duration-300">Contact Us</Link>
            </div>
          </div>

          {user ? (
            <div className='flex items-center gap-4'>
              <Link to="/profile" className='flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md'>
              <UserCircleIcon className='h-8 w-8 text-black' />
              <p className='text-black'>{user.fullName}</p>

              </Link>
              
              <button onClick={logout} className='bg-[#b7eb46] text-black px-4 py-2 rounded-md'>Logout</button>
            </div>
          ) : (
            <div className='flex items-center gap-4'>
              <Link to="/signin" className='bg-[#b7eb46] text-black px-4 py-2 rounded-md'>Login</Link>
              <Link to="/signup" className='bg-[#b7eb46] text-black px-4 py-2 rounded-md'>Signup</Link>
            </div>
          )}

          

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black mb-1.5 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`
          absolute top-[57px] left-0 right-0 bg-white shadow-lg rounded-b-lg
          transform transition-all duration-300 ease-in-out
          md:hidden
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
        `}>
          <div className="flex flex-col p-4 gap-4">
              <Link to="/" className="hover:text-[#b7eb46] transition-colors duration-300">Home</Link>
              <Link to="/communities" className="hover:text-[#b7eb46] transition-colors duration-300">Communities</Link>
              <Link to="/blogs" className="hover:text-[#b7eb46] transition-colors duration-300">Blogs</Link>
              <Link to="/resources" className="hover:text-[#b7eb46] transition-colors duration-300">Resources</Link>
              <Link to="/about" className="hover:text-[#b7eb46] transition-colors duration-300">About Us</Link>
              <Link to="/contact" className="hover:text-[#b7eb46] transition-colors duration-300">Contact Us</Link>
            
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;