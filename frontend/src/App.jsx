import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar.jsx';
import BetsPageTable from "./components/BetsPageTable/BetsPageTable.jsx";
import fetchWeatherData from "./service/weatherService.js";
import { useEffect, useState, useContext } from "react";
import { WalletContext } from './WalletContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './components/Profile.jsx';
import Footer from './components/footer.jsx';
import ErrorNotFound from "./components/ErrorNotFound/ErrorNotFound.jsx";
import ErrorNoConnction from "./components/ErrorNoConnection/ErrorNoConnection";
import TermsOfService from "./components/TermsOfService/TermsOfService.jsx";
import "./styles/main.css";
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy.jsx';

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

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <ErrorNoConnction /> ;
  }

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
          <Routes>
            
            <Route path="/" element={<BetsPageTable items={data}  />} />
            <Route 
              path="/profile" 
              element={
                <ProfilePage
                  walletAddress={walletAddress}
              />} 
            />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />


            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
          <Footer />
      </Router>
    </div>
  );
};

export default App;