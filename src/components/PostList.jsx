import React, { useState, useEffect } from 'react';
import { getPosts } from '../api';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Posts</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="space-y-8">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg p-5 hover:shadow-2xl transition duration-300 ease-in-out">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.content}</p>
              <p className="text-gray-500 text-sm">{formatDate(post.created_at)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
