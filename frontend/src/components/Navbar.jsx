// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import your CSS file for styling

const Navbar = () => {
    return (
        <nav>
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">WeatherBet</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/weather-betting" className="navbar-link">How it Works</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/token-approval" className="navbar-link">Leaderboard</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;