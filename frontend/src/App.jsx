import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar.jsx';
import BetsPageTable from "./components/BetsPageTable/BetsPageTable.jsx";
import fetchWeatherData from "./service/weatherService.js";
import { useEffect, useState, useContext } from "react";
import { WalletContext } from './WalletContext';
import { BrowserRouter as Router } from 'react-router-dom';

// const App = () => {
//   const [isConnected, setIsConnected] = useState(false);
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [walletAddress, setWalletAddress] = useState(null);

// const connectWallet = async () => {
//   if (window.ethereum) {
//     try {  
//       await window.ethereum.request({ method: 'eth_requestAccounts' });

//       const newProvider = new ethers.BrowserProvider(window.ethereum);
//       setProvider(newProvider);

//       const newSigner = await newProvider.getSigner();
//       setSigner(newSigner);

//       const newAddress = await newSigner.getAddress();
//       setWalletAddress(newAddress);

//       setIsConnected(true);
//     } catch (error) {
//       console.error("Error connecting to MetaMask", error);
//     }
//   } else {
//     console.error("MetaMask not found. Please install MetaMask.");
//   }
// };

//   if (!isConnected) {
//     return (
//       <div>
//         <h1 className="headings">You must connect your wallet to continue.</h1>
//         <button onClick={connectWallet}>Connect to MetaMask</button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Router>
//         <Navbar />
// <Container className={"container-lg"}>
//   <h1 className="text-primary">Weather Betting App</h1>
//   <AccountProfileComponent
//     walletAddress={walletAddress}
//     weatherBetTokenAddress={weatherBetTokenAddress}
//     weatherBetTokenAbi={weatherBetTokenAbi}
//     provider={provider}
//   />
//   <WeatherBettingComponent
//     weatherBettingContractAddress={weatherBettingContractAddress}
//     weatherBettingContractAbi={weatherBettingContractAbi}
//     signer={signer}
//   />
//   <TokenApprovalComponent
//     spenderAddress={weatherBettingContractAddress}
//     weatherBetTokenAddress={weatherBetTokenAddress}
//     weatherBetTokenAbi={weatherBetTokenAbi}
//     signer={signer}
//   />
// </Container>
//       </Router>
//     </div>
//   );
// };

// export default App;

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { setProvider, setSigner } = useContext(WalletContext);
  const [walletAddress, setWalletAddress] = useState('');
  const [data, setData] = useState([]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const newProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(newProvider);

        const newSigner = await newProvider.getSigner();
        setSigner(newSigner);

        const newAddress = await newSigner.getAddress();
        setWalletAddress(newAddress);

        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      console.error("MetaMask not found. Please install MetaMask.");
    }
  };

  useEffect(() => {
    // Define the async function inside the effect
    const fetchData = async () => {
      const weatherData = await fetchWeatherData();
      setData(weatherData);
    };
    // Call the async function that was defined above
    fetchData();
  }, []);

  return (
    <div>
      <Router>
        <Navbar
          isConnected={isConnected}
          connectWallet={connectWallet}
          walletAddress={walletAddress}
        />
        <BetsPageTable items={data} />
      </Router>
    </div>
  );
};

export default App;