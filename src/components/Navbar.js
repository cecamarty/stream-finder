// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
import './Navbar.css';

const Navbar = () => (
  <nav className="bottom-nav">
    <NavLink exact to="/" activeClassName="active-link">
      Home
    </NavLink>
    <NavLink to="/new-releases" activeClassName="active-link">
      New&Hot
    </NavLink>
    <NavLink to="/authors-choice" activeClassName="active-link">
      Profile
    </NavLink>
  </nav>
);

export default Navbar;
