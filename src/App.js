// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import NewReleases from './NewReleases';
import AuthorsChoice from './AuthorsChoice';
import Navbar from './components/Navbar';
import './App.css';

const App = () => (
  <Router>
    <div className="app">
      <Routes>
        <Route path="/new-releases" element={<NewReleases />} />
        <Route path="/authors-choice" element={<AuthorsChoice />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Navbar />
    </div>
  </Router>
);

export default App;
