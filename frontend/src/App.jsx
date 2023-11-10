// src/App.js
import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bet from './components/Bet.jsx';
import {tokenAddress as tokenContractAddress, weatherBettingAddress as weatherContractAddress} from "./abi/addreses.js"
import tokenContractAbi from "./abi/tokenAbi.js"
import weatherContractAbi from "./abi/bettingContractAbi.js"


const App = () => {
  return (
    <>
      <h1>Weather Betting App</h1>
      <Bet
        contractAddress={tokenContractAddress}
        contractAbi={tokenContractAbi}
        weatherContractAddress={weatherContractAddress}
        weatherContractAbi={weatherContractAbi}
      />
    </>
  );
};

export default App;