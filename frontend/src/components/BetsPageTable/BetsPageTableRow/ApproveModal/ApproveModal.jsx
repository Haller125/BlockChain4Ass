import React from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import "./ApproveModal.css"
import "../../../../styles/WeatherBetting.css"

const ApproveModal = ({data, show, time}) => {
    if(!show){
        return
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-container">
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
                        />
                    </FormGroup>
                    <div className="bet-gain">
                        possible gain: <span>5.4 WBT</span>
                    </div>
                    <Button variant="primary" className="mainButton">Close</Button>
                </Form>
            </div>
        </div>
    );
};

export default ApproveModal;