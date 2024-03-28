import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost'
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Admin from './components/AdminPage';
import NavBar from './components/NavBar';
// Import other components

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createpost" element={<CreatePost />}/>
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        {/* Define other routes */}
      </Routes>
    </Router>
  );
}

export default App;
