import { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { weatherBetTokenAddress, weatherBettingContractAddress } from '../abi/addreses';
import weatherBetTokenAbi from "../abi/weatherBetTokenAbi";
import  { WalletContext } from "../WalletContext";
import { FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';

const AccountProfileComponent = ({ walletAddress }) => {
    const [tokenBalance, setTokenBalance] = useState('0');
    const [sepoliaAmount, setSepoliaAmount] = useState('');
    const [tokensToBuy, setTokensToBuy] = useState('0');
    const [tokensPerSepolia, setTokensPerSepolia] = useState(0);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [approvalAmount, setApprovalAmount] = useState("0");
    const { signer, provider } = useContext(WalletContext);

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

        const loadTokensPerSepolia = async () => {
            try {
                const tokenContract = new ethers.Contract(weatherBetTokenAddress, weatherBetTokenAbi, provider);
                const value = await tokenContract.TOKENS_PER_SEPOLIA();
                setTokensPerSepolia(value);
            } catch (error) {
                console.error("Error fetching TOKENS_PER_SEPOLIA", error);
            }
        };

        if (provider) {
            loadTokensPerSepolia();
        }
    }, [provider, walletAddress]);

    useEffect(() => {
        if (sepoliaAmount && tokensPerSepolia) {
            console.log('Calculating tokens to buy...');
    
            const scaleFactor = BigInt("1000000000000000000");
    
            const scaledSepoliaAmount = BigInt(Math.round(parseFloat(sepoliaAmount) * 1e18));
            console.log('scaledSepoliaAmount', scaledSepoliaAmount);
    
            const tokensPerSepoliaBig = BigInt(tokensPerSepolia);
            console.log('tokensPerSepoliaBig', tokensPerSepoliaBig);
    
            const calculatedTokensBig = scaledSepoliaAmount * tokensPerSepoliaBig / scaleFactor;
            console.log('calculatedTokensBig', calculatedTokensBig);
    
            setTokensToBuy(calculatedTokensBig.toString());
        }
    }, [sepoliaAmount, tokensPerSepolia]);
    
    

    const buyTokens = async () => {
        if (!signer) {
            console.error('Wallet not connected');
            return;
        }

        try {
            const tokenContract = new ethers.Contract(weatherBetTokenAddress, weatherBetTokenAbi, signer);
            console.log('tokenContract', tokenContract);
            const transaction = await tokenContract.buyTokens({ value: ethers.parseEther(sepoliaAmount) });
            await transaction.wait();
            console.log('Tokens purchased successfully');
        } catch (error) {
            console.error('Error purchasing tokens:', error);
        }
    };

    const withdrawTokens = async () => {
        if (!signer) {
            console.error('Wallet not connected');
            return;
        }

        try {
            const tokenContract = new ethers.Contract(weatherBetTokenAddress, weatherBetTokenAbi, signer);
            console.log('tokenContract', tokenContract);
            const transaction = await tokenContract.withdraw();
            await transaction.wait();
            console.log('Tokens withdrawn successfully');
        } catch (error) {
            console.error('Error withdrawing tokens:', error);
        }
    };

    const approveTokens = async () => {
        try {
            console.log("Approving tokens...");

            const tokenContract = new ethers.Contract(weatherBetTokenAddress, weatherBetTokenAbi, signer);

            const decimals = await tokenContract.decimals();

            const amountToApprove = BigInt(approvalAmount) * BigInt(10) ** BigInt(decimals);

            const tx = await tokenContract.approve(weatherBettingContractAddress, amountToApprove);
            await tx.wait();

            console.log(`Successfully approved ${approvalAmount} tokens.`);
        } catch (error) {
            console.error("Error in token approval", error);
        }
    };

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
            <div>
                <label>
                    Sepolia to Spend: 
                    <input 
                        type="number" 
                        value={sepoliaAmount} 
                        onChange={(e) => setSepoliaAmount(e.target.value)} 
                    />
                </label>
                <p>Estimated Tokens to Buy: {tokensToBuy} WBT</p>
                <button onClick={buyTokens}>Buy Tokens</button>
            </div>
            <button onClick={withdrawTokens}>Withdraw All Tokens</button>
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
        </div>
    );
};

export default AccountProfileComponent;