import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRecentPosts, fetchAllPosts, searchPosts } from '../api';
import Spinner from './Spinner';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('recent'); // 'recent' or 'all'
  const [searchMessage, setSearchMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let data;
        if (viewMode === 'recent') {
          data = await fetchRecentPosts();
          data = data.slice(0, 4); // Only take the first 4 recent posts
        } else {
          data = await fetchAllPosts();
        }
        setPosts(data);
        setSearchMessage('');
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [viewMode]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <article key={post.id} className="bg-white shadow-lg p-4 rounded-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-bold hover:text-blue-600 transition duration-300">
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h3>
              <p className="mt-2 text-gray-600">{post.content.substring(0, 100)}...</p>
              <Link to={`/posts/${post.id}`} className="text-blue-600 hover:underline mt-4 block">Read more</Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
