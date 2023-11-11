import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const AccountProfileComponent = ({ account, tokenContractAddress, tokenABI, provider  }) => {
    const [tokenBalance, setTokenBalance] = useState('0');

    const loadTokenBalance = async (address, provider) => {
        const tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, provider);
        console.log("tokenContract", tokenContract);
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

    if (!(account && provider)) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <p>Address: {account}</p>
                <p>Token Balance: {tokenBalance} WBT</p>
            </div>
        </div>
    );
};

export default AccountProfileComponent;
