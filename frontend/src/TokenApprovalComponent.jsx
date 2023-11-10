import React, { useState } from 'react';
import { ethers } from 'ethers';

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
            <h1>TokenApprovalComponent</h1>
            {!isConnected ? (
                <button onClick={connectWallet}>Connect to MetaMask</button>
            ) : (
                <div>
                    <div>
                        <label>Approval Amount:</label>
                        <input 
                            type="text" 
                            value={approvalAmount} 
                            onChange={e => setApprovalAmount(e.target.value)} 
                            placeholder="Amount to Approve" 
                        />
                    </div>
                    <button onClick={approveTokens}>Approve Tokens</button>
                </div>
            )}
        </div>
    );
};

export default TokenApprovalComponent;
