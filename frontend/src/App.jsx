import './App.css'
import { useState } from 'react';
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
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { contractAddress, contractAbi } from './abi/addreses';
import cron from 'node-cron';


    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [weatherBettingContract, setWeatherBettingContract] = useState(null);

    useEffect(() => {
        const web3Modal = new Web3Modal({
            network: "testnet", // change to your preferred network
            cacheProvider: true
        });

        async function connectWallet() {
            try {
                const instance = await web3Modal.connect();
                const provider = new ethers.providers.Web3Provider(instance);
                const signer = provider.getSigner();

                setProvider(provider);
                setSigner(signer);

                const contract = new ethers.Contract(contractAddress, contractAbi, signer);
                setWeatherBettingContract(contract);
            } catch (error) {
                console.error("Could not connect to wallet:", error);
            }
        }

        connectWallet();
    }, []);

    const updateWeatherData = async () => {
        console.log("Updating weather data...");
        const temperature = 25; // Example temperature
        const windSpeed = 5; // Example wind speed
        const timestampMinute = Math.floor(Date.now() / 60000);

        if (weatherBettingContract) {
            try {
                const tx = await weatherBettingContract.updateWeatherData(timestampMinute, temperature, windSpeed);
                await tx.wait();
                console.log(`Weather data updated for timestamp ${timestampMinute}`);
            } catch (error) {
                console.error("Error updating weather data:", error);
            }
        }
    };


    // Schedule to run every minute
    cron.schedule('* * * * *', () => {
        updateWeatherData();
    });



const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [weatherContract, setWeatherContract] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const newProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(newProvider);
        const newSigner = await newProvider.getSigner();
        setSigner(newSigner);

        const contract1 = new ethers.Contract(tokenContractAddress, tokenContractAbi, signer);
        console.log("contract1", contract1);
        setTokenContract(contract1);

        const contract2 = new ethers.Contract(weatherContractAddress, weatherContractAbi, signer);
        console.log("contract2", contract2);
        setWeatherContract(contract2);

        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("MetaMask not found. Please install MetaMask.");
    }
  };

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
      <Container className={"container-lg"}>
        <h1 className="text-primary">Weather Betting App</h1>
        <AccountProfileComponent
          tokenContractAddress={tokenContractAddress}
          tokenABI={tokenContractAbi}
        />
        <WeatherBettingComponent
          weatherContract={weatherContract}
        />
        <TokenApprovalComponent
          tokenContract={tokenContract}
          spenderAddress={weatherContractAddress}
        />
      </Container>
    </div>
  );
};

export default App;
