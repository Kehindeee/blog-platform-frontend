
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust this to your backend's base URL

// Fetch all posts
export const fetchAllPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      return [];
    }
  };

// Fetch recent posts
export const fetchRecentPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts/recent`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    throw error;
  }
};

// Search posts
export const searchPosts = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/posts/search`, { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};

// Fetch a single post by ID
export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

// Create a new post
export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating a post:', error);
    throw error;
  }
};


// Fetch comments for a post
export const fetchComments = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
};

// Add a comment to a post
export const addComment = async (postId, commentData) => {
  try {
    const response = await axios.post(`${API_URL}/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error(`Error adding comment to post ${postId}:`, error);
    throw error;
  }
};

export const getPosts = async () => {
  // Implement the logic to fetch posts from your API server

  const response = await fetch('http://localhost:8080/api/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const postsData = await response.json();
  return postsData;
};
export const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) throw new Error('Login failed');
  
      const data = await response.json();
      return data; // Return response data (e.g., user info, token)
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
