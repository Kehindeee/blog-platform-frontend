import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchAllPosts } from '../api';
import Spinner from './Spinner';
import PostList from './PostList'; 

const Profile = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const postsData = await fetchAllPosts();
          setPosts(postsData);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  if (!user || loading) {
    return <Spinner />;
  }

  return (
    <>
  
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold">Welcome, {user.name}!</h1>
        <h2 className="text-lg font-semibold my-2">Browse Posts</h2>
        <PostList posts={posts} /> {/* Use PostList to display posts */}
      </div>
    </>
  );
};

export default Profile;
