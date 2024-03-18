import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRecentPosts, fetchAllPosts, searchPosts } from '../api'; // Adjust the import path as necessary

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('recent'); // 'recent' or 'all'

  useEffect(() => {
    const fetchMode = viewMode === 'recent' ? fetchRecentPosts : fetchAllPosts;
    fetchMode().then(setPosts);
  }, [viewMode]);

  const handleSearch = async () => {
    const fetchResults = searchQuery.trim() !== '' ? searchPosts : (viewMode === 'recent' ? fetchRecentPosts : fetchAllPosts);
    fetchResults(searchQuery).then(setPosts);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">Welcome to My Blog Platform</h1>
      <p className="text-lg text-center mb-10">
        Discover insightful articles, engage in discussions, and connect with writers.
      </p>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="border p-2 rounded w-full md:w-auto"
        />
        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto">
          Search
        </button>
      </div>
      <div className="text-center mb-10">
        <Link to="/posts" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Explore Posts
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button onClick={() => setViewMode('recent')} className={`py-2 px-4 rounded ${viewMode === 'recent' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}>
          Recent Posts
        </button>
        <button onClick={() => setViewMode('all')} className={`py-2 px-4 rounded ${viewMode === 'all' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}>
          All Posts
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-center mb-4">{viewMode === 'recent' ? 'Recent Posts' : 'All Posts'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white shadow p-4 rounded-lg">
              <Link to={`/posts/${post.id}`} className="text-xl font-bold hover:text-blue-600">{post.title}</Link>
              <p className="text-sm mt-2">{post.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
