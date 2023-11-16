import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const AccountProfileComponent = ({ walletAddress, weatherBetTokenAddress, weatherBetTokenAbi, provider }) => {
    const [tokenBalance, setTokenBalance] = useState('0');

    useEffect(() => {
        const loadTokenBalance = async (address, provider) => {
            try {
                console.log("Fetching token balance...");
    
                const tokenContract = new ethers.Contract(weatherBetTokenAddress, weatherBetTokenAbi, provider);
                const balance = await tokenContract.balanceOf(address);
                const decimals = await tokenContract.decimals();
                setTokenBalance(ethers.formatUnits(balance, decimals));
    
                console.log("Token balance fetched successfully!");
            } catch (error) {
                console.error("Error fetching token balance", error);
            }
        };

        if (walletAddress && provider) {
            loadTokenBalance(walletAddress, provider);
        }
    }, [provider, walletAddress, weatherBetTokenAbi, weatherBetTokenAddress]);

    if (!(walletAddress && provider)) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <p>Your address: {walletAddress}</p>
                <p>Token Balance: {tokenBalance} WBT</p>
            </div>
        </div>
    );
};

export default AccountProfileComponent;
