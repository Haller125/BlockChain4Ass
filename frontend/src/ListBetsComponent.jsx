import { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { weatherBettingContractAddress } from './abi/addreses';
import weatherBettingContractAbi from "./abi/weatherBettingContractAbi";
import { WalletContext } from "./WalletContext";
import { Table } from 'react-bootstrap';

const ListBetsComponent = () => {
    const [bets, setBets] = useState([]);
    const { provider } = useContext(WalletContext); // Assuming WalletContext provides a read-only provider

    useEffect(() => {
        const fetchBets = async () => {
            console.log("Start fetching count...")
            const contract = new ethers.Contract(weatherBettingContractAddress, weatherBettingContractAbi, provider);
            const betCount = await contract.getBetCount();
            console.log("betCount", betCount);

            const betsArray = [];
            for (let i = 0; i < betCount; i++) {
                const bet = await contract.bets(i);
                console.log(bet);
                betsArray.push(bet);
            }

            setBets(betsArray);
        };

        if (provider) {
            fetchBets();
        }
    }, [provider]);

    return (
        <div>
            <h2>All Bets</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Bettor</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Direction</th>
                        <th>Value</th>
                        <th>Timestamp Day</th>
                        <th>Coefficient</th>
                        <th>Processed</th>
                    </tr>
                </thead>
                <tbody>
                    {bets.map((bet, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{bet.bettor}</td>
                            <td>{bet.amount}</td>
                            <td>{bet.betType === 0 ? 'Temperature' : 'WindSpeed'}</td>
                            <td>{bet.direction === 0 ? 'Higher' : 'Lower'}</td>
                            <td>{bet.value.toString()}</td>
                            <td>{new Date(Number(bet.timestampDay) * 1000).toLocaleDateString()}</td>
                            <td>{bet.coefficient.toString()}</td>
                            <td>{bet.processed ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ListBetsComponent;
