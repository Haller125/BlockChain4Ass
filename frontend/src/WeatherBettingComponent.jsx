import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Form, FormGroup, FormLabel, FormControl, Button, FormSelect } from 'react-bootstrap';

const WeatherBettingComponent = ({ weatherBettingContractAddress, weatherBettingABI }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [signer, setSigner] = useState(null);
    const [contractWithSigner, setContractWithSigner] = useState(null);

    const [betType, setBetType] = useState('0'); // Default to '0' for Temperature
    const [direction, setDirection] = useState('0'); // Default to '0' for Higher
    const [value, setValue] = useState('');
    const [tokenAmount, setTokenAmount] = useState('');

    const [processBetValue, setProcessBetValue] = useState('');

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

    const processBet = async () => {
        if (!contractWithSigner) {
            alert("Please connect to MetaMask first.");
            return;
        }

        try {
            const parsedProcessBetValue = ethers.BigNumber.from(processBetValue);
            const tx = await contractWithSigner.processBet(parsedProcessBetValue);
            await tx.wait();
            alert("Bet processed successfully!");
        } catch (error) {
            console.error("Error processing bet", error);
            alert("Failed to process bet.");
        }
    };

    return (
        <div>
            <h2 className="text-primary">WeatherBettingComponent</h2>
            {!isConnected ? (
                <Button variant="primary" onClick={connectWallet} >Connect to MetaMask</Button>
            ) : (
                <Form>
                    <FormGroup>
                        <FormLabel>Bet Type:</FormLabel>
                        <FormSelect value={betType} onChange={e => setBetType(e.target.value)}>
                            <option value="0">Temperature</option>
                            <option value="1">WindSpeed</option>
                        </FormSelect>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Direction:</FormLabel>
                        <FormSelect value={direction} onChange={e => setDirection(e.target.value)}>
                            <option value="0">Higher</option>
                            <option value="1">Lower</option>
                        </FormSelect>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Value:</FormLabel>
                        <FormControl type="number" value={value} onChange={e => setValue(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Token Amount:</FormLabel>
                        <FormControl type="text" value={tokenAmount} onChange={e => setTokenAmount(e.target.value)} />
                    </FormGroup>
                    <Button variant="primary" onClick={placeBet}>Place Bet</Button>
                </Form>
            )}
        </div>
    );
};

export default WeatherBettingComponent;
