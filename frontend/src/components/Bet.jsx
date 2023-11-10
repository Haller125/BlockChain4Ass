// src/components/Bet.js
import React, { useState } from 'react';
import { ethers } from 'ethers';

const Bet = ({ contractAddress, contractAbi, weatherContractAddress, weatherContractAbi }) => {
  const [betType, setBetType] = useState('');
  const [betAmount, setBetAmount] = useState('');
  // Add other state variables as needed

  const connectToContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create a contract instance for Weather Betting
      const weatherContract = new ethers.Contract(weatherContractAddress, weatherContractAbi, signer);

      // Create a contract instance for Token
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);

      // Perform contract operations
      // Example: const allowance = await contract.allowance(owner, spender);

      // You can interact with the contracts using the 'contract' instances
      // Add your contract interactions here

    } catch (error) {
      console.error('Error connecting to contract:', error);
    }
  };

  return (
    <div>
      <h2>Weather Betting App</h2>
      {/* Add your UI components and form elements */}
      <label>
        Bet Type:
        <select value={betType} onChange={(e) => setBetType(e.target.value)}>
          <option value="Temperature">Temperature</option>
          <option value="WindSpeed">Wind Speed</option>
        </select>
      </label>

      <label>
        Bet Amount:
        <input type="number" value={betAmount} onChange={(e) => setBetAmount(e.target.value)} />
      </label>

      <button onClick={connectToContract}>Connect to Contract</button>
    </div>
  );
};

export default Bet;