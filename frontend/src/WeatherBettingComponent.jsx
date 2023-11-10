import React, { useState } from 'react';
import { ethers } from 'ethers';

const WeatherBettingComponent = ({ weatherBettingContractAddress, weatherBettingABI }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [signer, setSigner] = useState(null);
    const [contractWithSigner, setContractWithSigner] = useState(null);

    const [betType, setBetType] = useState('0'); // Default to '0' for Temperature
    const [direction, setDirection] = useState('0'); // Default to '0' for Higher
    const [value, setValue] = useState('');
    const [tokenAmount, setTokenAmount] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log(ethers.providers);
                const provider = new ethers.BrowserProvider(window.ethereum);
                console.log("provider", provider);
                const signer = await provider.getSigner();
                console.log("signer", signer);
                setSigner(signer);
                setIsConnected(true);

                const contract = new ethers.Contract(weatherBettingContractAddress, weatherBettingABI, signer);
                console.log("contract", contract);
                setContractWithSigner(contract);
            } catch (error) {
                console.error("Error connecting to MetaMask", error);
            }
        } else {
            alert("MetaMask not found. Please install MetaMask.");
        }
    };

    const placeBet = async () => {
        if (!contractWithSigner) {
            alert("Please connect to MetaMask first.");
            return;
        }

        try {
            const parsedTokenAmount = ethers.parseEther(tokenAmount);
            const timestampMinute = Math.floor(Date.now() / 60000); // current time in minute UNIX format

            const tx = await contractWithSigner.placeBet(
                parseInt(betType),
                parseInt(direction),
                parseInt(value),
                timestampMinute,
                parsedTokenAmount
            );
            await tx.wait();
            alert("Bet placed successfully!");
        } catch (error) {
            console.error("Error placing bet", error);
            alert("Failed to place bet.");
        }
    };

    return (
        <div>
            <h1>WeatherBettingComponent</h1>
            {!isConnected ? (
                <button onClick={connectWallet}>Connect to MetaMask</button>
            ) : (
                <div>
                    <div>
                        <label>Bet Type:</label>
                        <select value={betType} onChange={e => setBetType(e.target.value)}>
                            <option value="0">Temperature</option>
                            <option value="1">WindSpeed</option>
                        </select>
                    </div>
                    <div>
                        <label>Direction:</label>
                        <select value={direction} onChange={e => setDirection(e.target.value)}>
                            <option value="0">Higher</option>
                            <option value="1">Lower</option>
                        </select>
                    </div>
                    <div>
                        <label>Value:</label>
                        <input type="number" value={value} onChange={e => setValue(e.target.value)} />
                    </div>
                    <div>
                        <label>Token Amount:</label>
                        <input type="text" value={tokenAmount} onChange={e => setTokenAmount(e.target.value)} />
                    </div>
                    <button onClick={placeBet}>Place Bet</button>
                </div>
            )}
        </div>
    );
};

export default WeatherBettingComponent;
