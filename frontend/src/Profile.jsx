import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const AccountProfileComponent = ({ tokenContractAddress, tokenABI }) => {
    const [account, setAccount] = useState('');
    const [tokenBalance, setTokenBalance] = useState('0');
    const [provider, setProvider] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider(window.ethereum);
                setProvider(provider);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                await loadTokenBalance(address, provider);
            } catch (error) {
                console.error("Error connecting to MetaMask", error);
            }
        } else {
            alert("MetaMask not found. Please install MetaMask.");
        }
    };

    const loadTokenBalance = async (address, provider) => {
        const tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, provider);
        try {
            const balance = await tokenContract.balanceOf(address);
            const decimals = await tokenContract.decimals();
            console.log("Decimals: ", decimals);
            console.log("Balance: ", balance);
            setTokenBalance(ethers.formatUnits(balance, decimals));
        } catch (error) {
            console.error("Error fetching token balance", error);
        }
    };

    useEffect(() => {
        if (account && provider) {
            loadTokenBalance(account, provider);
        }
    }, [account, provider]);

    return (
        <div>
            {!account ? (
                <button onClick={connectWallet}>Connect to MetaMask</button>
            ) : (
                <div>
                    <p>Address: {account}</p>
                    <p>Token Balance: {tokenBalance} WBT</p>
                </div>
            )}
        </div>
    );
};

export default AccountProfileComponent;
