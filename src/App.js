import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import AdminDashboard from './components/AdminDashboard'; // Ensure this component is correctly imported
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import EditPost from './components/EditPost';
import { ToastContainer } from 'react-toastify';


// Import other necessary components

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={5000} /> 
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        
        {/* Admin specific routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/createpost" element={
          <ProtectedRoute adminOnly={true}>
            <CreatePost />
          </ProtectedRoute>
        }/>
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/edit-post/:postId" element={<ProtectedRoute adminOnly={true}><EditPost /></ProtectedRoute>} />
        {/* Define other routes */}
      </Routes>
    </Router>
  );
}

export default App;
