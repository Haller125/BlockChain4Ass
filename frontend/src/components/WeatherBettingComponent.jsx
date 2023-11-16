import { useState } from 'react';
import { ethers } from 'ethers';
import { Form, FormGroup, FormLabel, FormControl, Button, FormSelect } from 'react-bootstrap';
import "../styles/WeatherBetting.css"

const BetType = {
    Temperature: '0',
    WindSpeed: '1'
};

const Direction = {
    Higher: '0',
    Lower: '1'
};


const WeatherBettingComponent = ({ weatherBettingContractAddress, weatherBettingContractAbi, signer }) => {
    const [betType, setBetType] = useState(BetType.Temperature);
    const [direction, setDirection] = useState(Direction.Higher);
    const [value, setValue] = useState('');
    const [tokenAmount, setTokenAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [coefficient, setCoefficient] = useState('');

    const placeBet = async () => {
        try {
            console.log("Placing bet...");
            
            const weatherContract = new ethers.Contract(weatherBettingContractAddress, weatherBettingContractAbi, signer);

            const parsedTokenAmount = ethers.parseEther(tokenAmount);
            const selectedDate = new Date(date);
            const timestampMinute = Math.floor(selectedDate.getTime() / 1000);

            const tx = await weatherContract.placeBet(
                parseInt(betType),
                parseInt(direction),
                parseInt(value),
                timestampMinute,
                parsedTokenAmount,
                parseInt(coefficient)
            );
            await tx.wait();

            console.log("Bet placed successfully!");
        } catch (error) {
            console.error("Error placing bet", error);
        }
    };

    return (
        <div>
            <h2 className="headings">WeatherBettingComponent</h2>
            <Form>
                <FormGroup>
                    <FormLabel>Bet Type:</FormLabel>
                    <FormSelect value={betType} onChange={e => setBetType(e.target.value)}>
                        <option value={BetType.Temperature}>Temperature</option>
                        <option value={BetType.WindSpeed}>WindSpeed</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Direction:</FormLabel>
                    <FormSelect value={direction} onChange={e => setDirection(e.target.value)}>
                        <option value={Direction.Higher}>Higher</option>
                        <option value={Direction.Lower}>Lower</option>
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
                <FormGroup>
                    <FormLabel>Date:</FormLabel>
                    <FormControl type="date" value={date} onChange={e => {
                        console.log(e.target.value);
                        setDate(e.target.value);
                    }} />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Coefficient:</FormLabel>
                    <FormControl type="number" value={coefficient} onChange={e => setCoefficient(e.target.value)} />
                </FormGroup>
                <Button variant="primary" className="mainButton" onClick={placeBet}>Place Bet</Button>
            </Form>
        </div>
    );
};

export default WeatherBettingComponent;
