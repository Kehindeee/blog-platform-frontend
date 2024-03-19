import React, { useState, useEffect } from 'react';
import { getPosts } from '../api'; // Import the function to fetch posts from the API

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts(); // Fetch posts from the API
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts(); // Call the fetchPosts function when the component mounts
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {posts.map(post => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
