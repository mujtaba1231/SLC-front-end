import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from './../config/url';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiArrowLeft, FiCalendar, FiEdit, FiTrash2 } from 'react-icons/fi';


const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/api/blog/getBlog/${id}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch blog');
                }
                
                const data = await response.json();
                setBlog(data[0]);
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

   

    

    if (loading) return <div className="flex justify-center items-center min-h-screen">loading...</div>
    if (error) return <div className="error-message">{error}</div>
    if (!blog) return <div className="text-center py-10">Blog not found</div>

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-16">
            {/* Back button */}
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
                <FiArrowLeft className="mr-2" /> Back to Blogs
            </button>

            {/* Featured Image */}
            {blog.image && (
                <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                    <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full max-h-[400px] object-cover"
                    />
                </div>
            )}

            {/* Blog Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
                
                <div className="flex items-center text-gray-600 mb-6">
                    <FiCalendar className="mr-2" />
                    <span>Published on {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>


            </div>

            

            {/* Description */}
            <p className="text-xl text-gray-700 mb-8">{blog.description}</p>

            {/* Content */}
            <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            
        </div>
    );
};

export default BlogDetail;