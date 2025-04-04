import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config/url';
import { useAuth } from '../context/userContext';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/blog/getBlogs`);
        const data = await response.json();
        setBlogs(data);
        setFilteredBlogs(data); // Initialize filtered blogs with all blogs
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs by title whenever searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchTerm, blogs]);

  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/blog/deleteBlog/${id}`, {
        method: 'DELETE',
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
      setFilteredBlogs(filteredBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className='max-w-[1200px] mx-auto pt-20 px-4 pb-10'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4'>
        <div>
          <h1 className='text-3xl font-bold mb-2'>Blog Articles</h1>
          <p className='text-gray-600'>Discover the latest insights and tutorials</p>
        </div>
        {user?.role === 'Admin' && (
          <Link 
            to="/write" 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium text-center md:text-left whitespace-nowrap"
          >
            Write a Blog
          </Link>
        )}
      </div>

      <div className='w-full mb-8'>
        <input 
          type="text" 
          placeholder="Search blogs by title..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredBlogs.length === 0 ? (
        <div className='w-full text-center py-10'>
          <p className='text-gray-500 text-lg'>
            {blogs.length === 0 ? 'No blogs available yet.' : 'No blogs found matching your search.'}
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredBlogs.map((blog) => (
            <div key={blog._id} className='border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full'>
              {blog.image && (
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className='w-full h-48 object-cover'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Available';
                  }}
                />
              )}
              <div className='p-6 flex-grow'>
                <h2 className='text-xl font-semibold mb-2'>{blog.title}</h2>
                <p className='text-gray-600 mb-4 line-clamp-2'>{blog.description}</p>
              </div>
              <div className='px-6 pb-4'>
                <p className='text-sm text-gray-400'>
                  Published on {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <Link 
                  to={`/blogs/${blog._id}`} 
                  className='mt-3 text-blue-600 hover:text-blue-800 font-medium transition-colors inline-block'
                >
                  Read more →
                </Link>
              </div>
              {user?.role === 'Admin' && (
                <button 
                  onClick={() => handleDelete(blog._id)} 
                  className='bg-red-500 text-white my-2 mx-4 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300'
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;