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