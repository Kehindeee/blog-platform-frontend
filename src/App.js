import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import NavBar from './components/NavBar';
// Import other components

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        {/* Define other routes */}
      </Routes>
    </Router>
  );
}

export default App;
