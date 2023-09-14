import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import SinglePostPage from './components/SinglePostPage';
import Users from './components/Users.js';

function App() {
  return (

    
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* {<Users />}
        <Route path="/components/Users.js" element={<Users />} /> */}
        <Route path="/post/:id" element={<SinglePostPage />} />
      </Routes>
    </Router>
  );
}

export default App
