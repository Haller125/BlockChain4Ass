import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import "./styles/WeatherBetting.css"

const TokenApprovalComponent = ({ tokenContractAddress, tokenABI, signer, spenderAddress }) => {
    const [approvalAmount, setApprovalAmount] = useState("0");
    
    const approveTokens = async () => {
        if (!(tokenABI && tokenContractAddress)) {
            alert("Please connect to MetaMask first.");
            return;
        }

        const tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, signer);

        try {
            const amountToApprove = ethers.parseEther(approvalAmount);
            console.log("amountToApprove", amountToApprove);
            const tx = await tokenContract.approve(spenderAddress, amountToApprove);
            console.log("tx", tx);
            await tx.wait();
            alert(`Successfully approved ${approvalAmount} tokens.`);
        } catch (error) {
            console.error("Error in token approval", error);
            alert("Failed to approve tokens.");
        }
    };

    return (
        <div>
            <h2 className="headings">TokenApprovalComponent</h2>
            <Form>
                <FormGroup>
                    <FormLabel>Approval Amount:</FormLabel>
                    <FormControl
                        type="text"
                        value={approvalAmount}
                        onChange={e => setApprovalAmount(e.target.value)}
                        placeholder="Amount to Approve"
                    />
                </FormGroup>
                <Button variant="primary" className="mainButton" onClick={approveTokens}>Approve Tokens</Button>
            </Form>
        </div>
    );
};

export default TokenApprovalComponent;
