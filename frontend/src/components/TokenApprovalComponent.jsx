import { useState } from 'react';
import { ethers } from 'ethers';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import "../styles/WeatherBetting.css"

const TokenApprovalComponent = ({ weatherBetTokenAddress, weatherBetTokenAbi, signer, spenderAddress }) => {
    const [approvalAmount, setApprovalAmount] = useState("0");

    const approveTokens = async () => {
        try {
            console.log("Approving tokens...");

            const tokenContract = new ethers.Contract(weatherBetTokenAddress, weatherBetTokenAbi, signer);

            const amountToApprove = ethers.parseEther(approvalAmount);

            const tx = await tokenContract.approve(spenderAddress, amountToApprove);
            await tx.wait();

            console.log(`Successfully approved ${approvalAmount} tokens.`);
        } catch (error) {
            console.error("Error in token approval", error);
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
