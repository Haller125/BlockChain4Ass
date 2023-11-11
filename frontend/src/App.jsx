import './App.css'
import Bet from './components/Bet.jsx';
import { tokenAddress as tokenContractAddress, weatherBettingAddress as weatherContractAddress } from "./abi/addreses.js"
import tokenContractAbi from "./abi/tokenAbi.js"
import weatherContractAbi from "./abi/bettingContractAbi.js"
import WeatherBettingComponent from './WeatherBettingComponent.jsx';
import TokenApprovalComponent from './TokenApprovalComponent.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  return (
    <div>
        <Container className={"container-lg"}>
          <h1 className="text-primary">Weather Betting App</h1>
          {/* <Bet
            contractAddress={tokenContractAddress}
            contractAbi={tokenContractAbi}
            weatherContractAddress={weatherContractAddress}
            weatherContractAbi={weatherContractAbi}
          /> */}
          <WeatherBettingComponent
            weatherBettingContractAddress={weatherContractAddress}
            weatherBettingABI={weatherContractAbi}
          />
          <TokenApprovalComponent
            tokenContractAddress={tokenContractAddress}
            tokenABI={tokenContractAbi}
            spenderAddress={weatherContractAddress}
          />
        </Container>
    </div>
  );
};

export default App;
