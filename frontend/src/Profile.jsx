import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const AccountProfileComponent = ({ account, tokenContract }) => {
    const [tokenBalance, setTokenBalance] = useState('0');

    const loadTokenBalance = async (address) => {
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
        loadTokenBalance(account);
    }, []);

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
