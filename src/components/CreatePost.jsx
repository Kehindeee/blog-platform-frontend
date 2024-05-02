// Create a new component called CreatePost that allows users to create a new post.
// The component should have a form with two input fields: title and content.
// When the form is submitted, the component should call the createPost function from the api module to create a new post. 
//If the post is created successfully, the form fields should be reset, and a success message should be displayed using the toast module. 
//If there is an error creating the post, an error message should be displayed using the toast module.

import React, { useState } from 'react';
import { createPost } from '../api';
import { toast } from 'react-toastify'; 

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate input data
    if (!title || !content) {
      toast.error('Title and content are required'); // Use toast for error message
      return;
    }
    try {
      await createPost({ title, content });
      // Reset form fields
      setTitle('');
      setContent('');
      toast.success('Post created successfully!'); 
      // Optionally, redirect the user to the posts page or clear the form
    } catch (error) {
      console.error('Failed to create the post', error);
      toast.error('Failed to create the post'); // Use toast for error message
    }
  };

// Add a form to create a new post
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
