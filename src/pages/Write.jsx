"use client";

import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../config/url";



Quill.register("modules/imageUploader", ImageUploader);

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
  imageUploader: {
    upload: (file) => {
      toast.info("Uploading Image");
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", file);

        fetch(
          "https://api.imgbb.com/1/upload?key=055aee72cc2132ca184d425fba12b72a",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((result) => resolve(result.data.url))
          .catch(() => reject("Upload failed"));
      });
    },
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "link",
  "image",
];

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContentChange = (value) => setContent(value);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("No file selected!");

    const formData = new FormData();
    formData.append("image", file);

    toast.info("Uploading cover image...");

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=055aee72cc2132ca184d425fba12b72a",
        { method: "POST", body: formData }
      );
      const result = await response.json();
      if (result.success) {
        setCoverImage(result.data.url);
        toast.success("Cover image uploaded successfully!");
      } else throw new Error(result.error.message);
    } catch (error) {
      toast.error("Failed to upload cover image. Please try again.", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!coverImage) {
      toast.error("Please upload a cover image!");
      setIsSubmitting(false);
      return;
    }

    const formData = {
      title,
      image: coverImage,
      description,
      content,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/blog/createBlog`, formData);
      console.log(response.data);
      toast.success("Blog published successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setContent("");
      setCoverImage(null);
    } catch (error) {
      toast.error("Error publishing blog. Please try again.",error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 py-28 bg-gray-50 min-h-screen">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Write New Blog Post</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="cover-image"
              onChange={handleImageUpload}
            />
            <div className="flex items-center gap-4">
              <label
                htmlFor="cover-image"
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow cursor-pointer hover:bg-blue-700 transition-colors"
              >
                {coverImage ? "Change Cover Image" : "Upload Cover Image"}
              </label>
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Cover Preview"
                  className="max-w-xs h-32 object-cover rounded-md border border-gray-200"
                />
              )}
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a short description"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <div className="bg-white rounded-md">
              <ReactQuill
                value={content}
                onChange={handleContentChange}
                className="h-96"
                theme="snow"
                placeholder="Write your blog content here..."
                modules={modules}
                formats={formats}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 mt-8 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteBlog;