// src/App.js
import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bet from './components/Bet.jsx';

const App = () => {
  const tokenContractAddress = '0x26F40E998788a7C21d08786A2360eef3C433e97f';
  const tokenContractAbi = /* Your token contract ABI here */;

  const weatherContractAddress = '0x99e9cDd5694fFE85e62B15e7691b3Ab6487E12F0';
  const weatherContractAbi = /* Your weather contract ABI here */;

  return (
    <>
       <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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
