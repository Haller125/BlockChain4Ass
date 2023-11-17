import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/common/Navbar/Navbar.jsx';
import BetsPageTable from "./components/betting/BetsPageTable/BetsPageTable.jsx";
import fetchWeatherData from "./service/weatherService.js";
import { useEffect, useState, useContext } from "react";
import { WalletContext } from './context/WalletContext.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './components/Profile/Profile.jsx';
import Footer from './components/common/Footer/Footer.jsx';
import ErrorNotFound from "./components/error/ErrorNotFound/ErrorNotFound.jsx";
import ErrorNoConnection from "./components/error/ErrorNoConnection/ErrorNoConnection";
import TermsOfService from "./components/policy/TermsOfService/TermsOfService.jsx";
import ListBetsComponent from './components/betting/ListBetsComponent.jsx';
import "./App.css";
import PrivacyPolicy from './components/policy/PrivacyPolicy/PrivacyPolicy.jsx';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { setProvider, setSigner } = useContext(WalletContext);
  const [walletAddress, setWalletAddress] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define the async function inside the effect
    const fetchData = async () => {
      const weatherData = await fetchWeatherData();
      setData(weatherData);
    };
    // Call the async function that was defined above
    fetchData();
  }, []);

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
        alert("Error connecting to MetaMask")
      }
    } else {
      console.error("MetaMask not found. Please install MetaMask.");
      alert("MetaMask not found. Please install MetaMask.")
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
    return <ErrorNoConnection /> ;
  }

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
            <Route path="/all" element={<ListBetsComponent />} />

            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
          <Footer />
      </Router>
    </div>
  );
};

export default App;