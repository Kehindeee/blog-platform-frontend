import axios from 'axios';
axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:8080/api'; 

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
    // Check if error response is available and has a data object
    const errorMessage = error.response && error.response.data && error.response.data.message 
                         ? error.response.data.message 
                         : 'An unexpected error occurred while searching posts.';
    console.error('Error searching posts:', errorMessage);
    throw new Error(errorMessage); // This will pass the error message up to the caller
  }
};

// Fetch a single post by ID
export const fetchPostById = async (postId) => {
  if (!postId) {
    throw new Error('Post ID is undefined');
  }
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch post');
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
    const response = await axios.post(`${API_URL}/posts/${postId}/comments`, commentData, {
      withCredentials: true // Assuming you're using sessions and cookies
    });
    return response.data;
  } catch (error) {
    handleError(error);
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
      const response = await axios.post(`${API_URL}/login`, {
          email,
          password
      });
      // Assuming your backend sends back a token or user data
      return response.data; // This will contain the token or user data
  } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error);
      throw error;
  }
};
  
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // The response from the server
  } catch (error) {
    // Handle the error accordingly
    // This will pass the error message up to the component
    throw new Error(error.response.data.message || 'Failed to register');
  }
};

export const fetchPostsForUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/posts`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    throw error;
  }
};

//Edit a comment on a post
export const editComment = async (commentId, commentData, options = {}) => {
  try {
    const response = await axios.put(`${API_URL}/comments/${commentId}`, commentData, options);
    return response.data;
  } catch (error) {
    console.error(`Error editing comment ${commentId}:`, error);
    throw error;
  }
};

export const deleteComment = async (commentId, options = {}) => {
  try {
    const response = await axios.delete(`${API_URL}/comments/${commentId}`, options);
    return response.data;
  } catch (error) {
    console.error(`Error deleting comment ${commentId}:`, error);
    throw error;
  }
};

const handleError = (error) => {
  // Extract the response error message if it exists or use a generic message
  const errorMessage = error.response && error.response.data && error.response.data.message 
                       ? error.response.data.message 
                       : 'An unexpected error occurred.';
  console.error('API Error:', errorMessage);
  throw new Error(errorMessage); // This will pass the error message up to the caller
};

