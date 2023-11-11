import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Form, FormGroup, FormLabel, FormControl, Button, FormSelect } from 'react-bootstrap';

const TokenApprovalComponent = ({ tokenContractAddress, tokenABI, spenderAddress }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [signer, setSigner] = useState(null);
    const [tokenContract, setTokenContract] = useState(null);
    const [approvalAmount, setApprovalAmount] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                setSigner(signer);
                setIsConnected(true);

                const contract = new ethers.Contract(tokenContractAddress, tokenABI, signer);
                setTokenContract(contract);
            } catch (error) {
                console.error("Error connecting to MetaMask", error);
            }
        } else {
            alert("MetaMask not found. Please install MetaMask.");
        }
    };

    const approveTokens = async () => {
        if (!tokenContract) {
            alert("Please connect to MetaMask first.");
            return;
        }

        try {
            const amountToApprove = ethers.parseEther(approvalAmount);
            const tx = await tokenContract.approve(spenderAddress, amountToApprove);
            await tx.wait();
            alert(`Successfully approved ${approvalAmount} tokens.`);
        } catch (error) {
            console.error("Error in token approval", error);
            alert("Failed to approve tokens.");
        }
    };

    return (
        <div>
            <h2 className="text-primary">TokenApprovalComponent</h2>
            {!isConnected ? (
                <Button variant="primary"  onClick={connectWallet}>Connect to MetaMask</Button>
            ) : (
                <Form>
                    <FormGroup>
                        <FormLabel>Approval Amount:</FormLabel>
                        <FormSelect
                            type="text" 
                            value={approvalAmount} 
                            onChange={e => setApprovalAmount(e.target.value)} 
                            placeholder="Amount to Approve" 
                        />
                    </FormGroup>
                    <Button variant="primary" onClick={approveTokens}>Approve Tokens</Button>
                </Form>
            )}
        </div>
    );
};

export default TokenApprovalComponent;
