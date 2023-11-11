import './App.css'
import { ethers } from 'ethers';
import { tokenAddress as tokenContractAddress, weatherBettingAddress as weatherContractAddress } from "./abi/addreses.js"
import tokenContractAbi from "./abi/tokenAbi.js"
import weatherContractAbi from "./abi/bettingContractAbi.js"
import WeatherBettingComponent from './WeatherBettingComponent.jsx';
import TokenApprovalComponent from './TokenApprovalComponent.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccountProfileComponent from './Profile.jsx';
import { Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';




const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const newProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(newProvider);
        const newSigner = await newProvider.getSigner();
        setSigner(newSigner);

        const newAddress = await newSigner.getAddress();
        setAddress(newAddress);

        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("MetaMask not found. Please install MetaMask.");
    }
  };

  const updateWeatherData = async () => {
    console.log('updateWeatherData');
    const temperature = 25; // Example temperature
    const windSpeed = 5; // Example wind speed
    const timestampMinute = Math.floor(Date.now() / 60000);

    const weatherContract = new ethers.Contract(weatherContractAddress, weatherContractAbi, signer);
    console.log('weatherContract', weatherContract);

    try {
      console.log("Updating weather data...");
      const tx = await weatherContract.updateWeatherData(timestampMinute, temperature, windSpeed);
      await tx.wait();
      console.log(`Weather data updated for timestamp ${timestampMinute}`);
    } catch (error) {
      console.error("Error updating weather data:", error);
    }
  };


  useEffect(() => {
    setTimeout(() => {
      updateWeatherData();
    }, 0);
  }, []);

  if (!isConnected) {
    return (
      <div>
        <h1 className="text-primary">You must connect your wallet to continue.</h1>
        <button onClick={connectWallet}>Connect to MetaMask</button>
      </div>
    );
  }

  return (
    <div>
      <Router>
        <Navbar />
        <Container className={"container-lg"}>
          <h1 className="text-primary">Weather Betting App</h1>
          <AccountProfileComponent
            account={address}
            tokenContractAddress={tokenContractAddress}
            tokenABI={tokenContractAbi}
            provider={provider}
          />
          <WeatherBettingComponent
            weatherBettingContractAddress={weatherContractAddress}
            weatherBettingABI={weatherContractAbi}
            signer={signer}
          />
          <TokenApprovalComponent
            spenderAddress={weatherContractAddress}
            tokenContractAddress={tokenContractAddress}
            tokenABI={tokenContractAbi}
            signer={signer}
          />
        </Container>

      </Router>
    </div>
  );
};

export default App;
