// This component will be the main page of the blog platform. 
//It will display a list of recent posts by default, but users can also view all posts. 
// Users can also search for posts by entering a search query in the search bar. 
// The search results will be displayed below the search bar. 
//The Home component will fetch data from the API using the fetchRecentPosts, fetchAllPosts, and searchPosts functions.
// The PostList component will be used to display the list of posts.

import React, { useEffect, useState } from 'react';
import { fetchRecentPosts, fetchAllPosts, searchPosts } from '../api';
import Spinner from './Spinner';
import PostList from './PostList';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('recent');
  const [searchMessage, setSearchMessage] = useState('');
  const [loading, setLoading] = useState(false);

// Fetch recent posts when the component mounts
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let data;
        if (viewMode === 'recent') {
          data = await fetchRecentPosts();
          
          if (data) {
            data = data.slice(0, 4);
          }
        } else {
          data = await fetchAllPosts();
        }
        // Set an empty array as the default value for posts if data is undefined
        setPosts(data || []);
        setSearchMessage('');
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [viewMode]);
// Handle search functionality
  const handleSearch = async () => {
    setLoading(true);
    try {
      if (searchQuery.trim() !== '') {
        const results = await searchPosts(searchQuery);
        setPosts(results);
        setSearchMessage(`Posts containing "${searchQuery}"`);
      } else {
        setViewMode('recent');
      }
    } catch (error) {
      console.error('Error during search:', error);
      setSearchMessage('Error during search');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }
// Render the Home component
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Welcome to My Blog Platform</h1>
      <p className="text-lg text-center mb-10">
        Discover insightful articles, engage in discussions, and connect with writers.
      </p>

      {/* Search Section */}
      <div className="flex justify-center mb-10">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') { handleSearch(); }}}
            placeholder="Search posts..."
            className="border p-2 rounded w-full"
          />
          <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-2">
            Search
          </button>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${viewMode === 'recent' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
          onClick={() => setViewMode('recent')}
        >
          Recent Posts
        </button>
        <button
          className={`px-4 py-2 rounded ${viewMode === 'all' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
          onClick={() => setViewMode('all')}
        >
          All Posts
        </button>
      </div>

      {/* Posts and Search Message */}
      <div>
        {searchMessage && <p className="text-center text-lg">{searchMessage}</p>}
        <PostList posts={posts} /> {/* Use PostList here */}
      </div>
    </div>
  );
};

export default Home;
