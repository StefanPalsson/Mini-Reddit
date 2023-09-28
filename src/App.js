import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import SinglePostPage from './components/SinglePostPage';
import Users from './components/Users.js';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/post/:id" element={<SinglePostPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  )
}

export default App;
