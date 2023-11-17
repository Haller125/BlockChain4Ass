import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const AccountProfileComponent = ({ walletAddress, weatherBetTokenAddress, weatherBetTokenAbi, provider }) => {
    const [tokenBalance, setTokenBalance] = useState('0');
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const loadTokenBalance = async (address, provider) => {
            try {
                console.log("Fetching token balance...");

                const tokenContract = new ethers.Contract(weatherBetTokenAddress, weatherBetTokenAbi, provider);
                const balance = await tokenContract.balanceOf(address);
                const decimals = await tokenContract.decimals();
                setTokenBalance(ethers.formatUnits(balance, decimals));

                console.log("Token balance fetched successfully!");
                setIsDataLoaded(true);
            } catch (error) {
                console.error("Error fetching token balance", error);
            }
        };

        if (walletAddress && provider) {
            loadTokenBalance(walletAddress, provider);
        }
    }, [provider, walletAddress, weatherBetTokenAbi, weatherBetTokenAddress]);

    if (!(walletAddress && provider) || !isDataLoaded) {
        console.log("Wallet address:", walletAddress);
        console.log("Provider:", provider);
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <div>
                <strong>Wallet Address:</strong> {walletAddress}
            </div>
            <div>
                <strong>WBT Token Balance:</strong> {tokenBalance} WBT
            </div>
        </div>
    );
};

export default AccountProfileComponent;