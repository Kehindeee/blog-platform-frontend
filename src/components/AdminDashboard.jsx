import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error.response?.data || error.message);
            }
        };

        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error.response?.data || error.message);
            }
        };

        fetchUsers();
        fetchPosts();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${userId}`);
            setUsers(users.filter((user) => user.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error.response?.data || error.message);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${postId}`);
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error.response?.data || error.message);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>
            <NavLink to="/createpost" className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out mb-8">Create Post</NavLink>
            <section className="mb-8">
                <h2 className="text-3xl font-semibold mb-4">Users</h2>
                <ul className="space-y-4">
                    {users.map((user) => (
                        <li key={user.id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                            <span>{user.name} - {user.email}</span>
                            <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-150 ease-in-out">Delete</button>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2 className="text-3xl font-semibold mb-4">Posts</h2>
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li key={post.id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                            <span>{post.title}</span>
                            <div>
                                <NavLink to={`/edit-post/${post.id}`} className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-150 ease-in-out mr-2">Edit</NavLink>
                                <button onClick={() => handleDeletePost(post.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-150 ease-in-out">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminDashboard;
