// Code to edit a post
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
// EditPost component
const EditPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: '',
        content: '',
        
    });
// Fetch the post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/posts/${postId}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post:", error.response?.data || error.message);
            }
        };
        fetchPost();
    }, [postId]);
// Handle changes to the form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };
// Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/posts/${postId}`, post);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Error updating post:", error.response?.data || error.message);
        }
    };
// Render the EditPost component
    return (
        <div className="p-8">
            <h1 className="text-3xl font-semibold mb-4">Edit Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    data-cy="edit-button"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default EditPost;
