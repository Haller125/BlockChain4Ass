import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import "./ApproveModal.css"
import "../../../../styles/WeatherBetting.css"
import { ethers } from 'ethers';
import { BetType, Direction } from "../../../../service/typeOfBet";
import { weatherBettingContractAddress } from "../../../../abi/addreses";
import weatherBettingContractAbi from "../../../../abi/weatherBettingContractAbi";
import { WalletContext } from "../../../../WalletContext";
import { useContext } from "react";

const ApproveModal = ({ data, show, time }) => {
    const { signer } = useContext(WalletContext);

    if (!show) {
        return;
    }

    const placeBet = async () => {
        console.log("data", data);
        console.log("time", time);
        console.log("show", show);

        const betType = data.type.endsWith("(°C)") ? BetType.Temperature : BetType.WindSpeed;
        const direction = data.type.startsWith("More") ? Direction.Higher : Direction.Lower;
        const value = data.temp;
        const timestampSecond = Math.floor(time.getTime() / 1000);
        // FIX: Get from Ergali's commit
        // const tokenAmount = ethers.parseEther(tokenAmount);
        const tokenAmount = ethers.parseEther("1");
        const coefficient = data.coef;

        const bet = { betType, direction, value, timestampSecond, tokenAmount, coefficient };
        console.log("bet", bet);

        try {
            console.log("Placing bet...");

            console.log("signer", signer);

            const weatherContract = new ethers.Contract(weatherBettingContractAddress, weatherBettingContractAbi, signer);


            const tx = await weatherContract.placeBet(
                bet
            );
            await tx.wait();

            console.log("Bet placed successfully!");
        } catch (error) {
            console.error("Error placing bet", error);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <h2>Bet Approval</h2>
                <Form className="modal-content" onClick={e => e.stopPropagation()}>
                    <FormGroup className="bet-details">
                        <span className="bet-date">{time.getDate() + "/" + (time.getMonth() + 1)}</span>
                        <span className="bet-temperature">{data.type + " " + data.temp}</span>
                        <div className="bet-coefficient">
                            <span>{data.coef}</span>
                        </div>
                        <FormControl
                            className={"inputBet"}
                            type="number"
                            placeholder="Number of Tokens"
                        />
                    </FormGroup>
                    <div className="bet-gain">
                        possible gain: <span>5.4 WBT</span>
                    </div>
                    <Button variant="primary" className="mainButton" onClick={placeBet}>Close</Button>
                </Form>
            </div>
        </div>
    );
};

export default ApproveModal;