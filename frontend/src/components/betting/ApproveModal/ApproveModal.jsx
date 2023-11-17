import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import "./ApproveModal.css"
import { ethers } from 'ethers';
import { BetType, Direction } from "../../../service/typeOfBet.js";
import { weatherBettingContractAddress } from "../../../abi/addreses.js";
import weatherBettingContractAbi from "../../../abi/weatherBettingContractAbi.js";
import { WalletContext } from "../../../context/WalletContext.jsx";
import { useContext, useState } from "react";
import iconX from "../../../../public/images/x.svg"

const ApproveModal = ({ data, show, time, handleClose }) => {
    const { signer } = useContext(WalletContext);
    const [gain, setGain] = useState(0);

    if (!show) {
        return;
    }

    const handleGain = (e) => {
        setGain(e.target.value)
    }

    const handleContainerClick = (e) => {
        e.stopPropagation();
    };

    const placeBet = async () => {
        console.log("data", data);
        console.log("time", time);
        console.log("show", show);

        const betType = data.type.endsWith("(°C)") ? BetType.Temperature : BetType.WindSpeed;
        const direction = data.type.startsWith("More") ? Direction.Higher : Direction.Lower;
        const value = data.temp;
        const timestampSecond = Math.floor(time.getTime() / 1000);
        const tokenAmount = ethers.parseEther(gain);
        const coefficient = data.coef * 100;

        const bet = {
            betType: parseInt(betType),
            direction: parseInt(direction),
            value: value.toString(),
            timestampSecond: timestampSecond,
            tokenAmount: tokenAmount,
            coefficient: coefficient
        }
        console.log("bet", bet);

        try {
            console.log("Placing bet...");

            console.log("signer", signer);

            const weatherContract = new ethers.Contract(weatherBettingContractAddress, weatherBettingContractAbi, signer);


            const tx = await weatherContract.placeBet(
                bet.betType,
                bet.direction,
                bet.value,
                bet.timestampSecond, // Make sure this matches the expected format in the contract
                bet.tokenAmount,
                bet.coefficient
            );
            
            await tx.wait();

            console.log("Bet placed successfully!");
        } catch (error) {
            console.error("Error placing bet", error);
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleClose}>
            <div className="modal-container" onClick={handleContainerClick}>
                <div className="modal-header">
                    <h2>Bet Approval</h2>
                    <div className={"img-x"} onClick={handleClose}>
                        <img src={iconX} alt="X"/>
                    </div>
                </div>
                <Form className="modal-content" onClick={e => e.stopPropagation()}>
                    <FormGroup className="bet-details">
                        <span className="bet-date">{time.getDate() + "/" + (time.getMonth() + 1)}</span>
                        <span className="bet-temperature">{data.type + " " + data.temp}</span>
                        <div className="bet-coefficient">
                            <span>{data.coef}</span>
                        </div>
                        <div className={"img-x"} >
                            <img src={iconX} alt="X"/>
                        </div>
                        <FormControl
                            className={"inputBet"}
                            type="number"
                            placeholder="Number of Tokens"
                            onChange={handleGain}
                        />
                    </FormGroup>
                    <div className="bet-gain">
                        possible gain: <span>{Math.round(gain*data.coef*100)/100} WBT</span>
                    </div>
                    <Button variant="primary" className="mainButton" onClick={placeBet}>Bet</Button>
                </Form>
            </div>
        </div>
    );
};

export default ApproveModal;