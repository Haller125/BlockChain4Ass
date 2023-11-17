// Navbar.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import '../styles/Navbar.css'; // Import your CSS file for styling
import logo from '../images/logo.png'; // Import the logo image
import locationIcon from '../images/location.png'

const Navbar = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [walletAddress, setWalletAddress] = useState('');
    const navigate = useNavigate();  

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                const newProvider = new ethers.BrowserProvider(window.ethereum);
                setProvider(newProvider);

                const newSigner = await newProvider.getSigner();
                setSigner(newSigner);

                const newAddress = await newSigner.getAddress();
                setWalletAddress(newAddress);

                setIsConnected(true);
            } catch (error) {
                console.error("Error connecting to MetaMask", error);
            }
        } else {
            console.error("MetaMask not found. Please install MetaMask.");
        }
    };

    const goToProfilePage = () => {
        navigate('/profile'); // Use navigate to redirect to the /profile page
    };

    return (
        <nav>
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link"><img src={logo} alt="Logo" className="navbar-logo" /></Link>
                </li>
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/weather-betting" className="navbar-link">How it Works</Link>
                </li>
                <li className="navbar-item">
                    <p>The chosen city</p>
                    <p><img src={locationIcon} alt="Location Icon" />Almaty</p>
                </li>
                <li className="navbar-item">
                    {!isConnected ? (
                        <button className="connect-wallet-button" onClick={connectWallet}>
                            Connect to MetaMask
                        </button>
                    ) : (
                        <button className="connect-wallet-button" onClick={goToProfilePage}>
                            Go to Profile
                        </button>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;