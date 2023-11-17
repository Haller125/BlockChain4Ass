import React, {useState} from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import "./ApproveModal.css"
import "../../../../styles/WeatherBetting.css"

const ApproveModal = ({data, show, time, handleClose}) => {
    if(!show){
        return
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [gain, setGain] = useState(null)

    const handleGain = (e) => {
        setGain(e.target.value)
    }

    const handleContainerClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-backdrop" onClick={handleClose}>
            <div className="modal-container" onClick={handleContainerClick}>
                <h2>Bet Approval</h2>
                <Form className="modal-content" onClick={e => e.stopPropagation()}>
                    <FormGroup className="bet-details">
                        <span className="bet-date">{time.getDate()+"/"+(time.getMonth()+1)}</span>
                        <span className="bet-temperature">{data.type + " " + data.temp}</span>
                        <div className="bet-coefficient">
                            <span>{data.coef}</span>
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
                    <Button variant="primary" className="mainButton">Close</Button>
                </Form>
            </div>
        </div>
    );
};

export default ApproveModal;