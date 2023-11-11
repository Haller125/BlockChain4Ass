import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Form, FormGroup, FormLabel, FormControl, Button, FormSelect } from 'react-bootstrap';
import "./styles/WeatherBetting.css"

const WeatherBettingComponent = ({ weatherBettingContractAddress, weatherBettingABI, signer }) => {
    const [betType, setBetType] = useState('0'); // Default to '0' for Temperature
    const [direction, setDirection] = useState('0'); // Default to '0' for Higher
    const [value, setValue] = useState('');
    const [tokenAmount, setTokenAmount] = useState('');

    const placeBet = async () => {
        if (!(weatherBettingABI && weatherBettingContractAddress)) {
            alert("Please connect to MetaMask first.");
            return;
        }

        const weatherContract = new ethers.Contract(weatherBettingContractAddress, weatherBettingABI, signer);

        try {
            const parsedTokenAmount = ethers.parseEther(tokenAmount);
            const timestampMinute = Math.floor(Date.now() / 60000); // current time in minute UNIX format

            const tx = await weatherContract.placeBet(
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
            <h2 className="headings">WeatherBettingComponent</h2>
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
                <Button variant="primary" className="mainButton" onClick={placeBet}>Place Bet</Button>
            </Form>
        </div>
    );
};

export default WeatherBettingComponent;
