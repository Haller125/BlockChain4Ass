import { ethers } from 'ethers';
import { weatherBetTokenAddress, weatherBettingContractAddress } from "./abi/addreses.js"
import weatherBetTokenAbi from "./abi/weatherBetTokenAbi.js"
import weatherBettingContractAbi from "./abi/weatherBettingContractAbi.js"
import WeatherBettingComponent from './components/WeatherBettingComponent.jsx';
import TokenApprovalComponent from './components/TokenApprovalComponent.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import BetsPageTable from "./components/BetsPageTable/BetsPageTable.jsx";
import fetchWeatherData from "./service/weatherService.js";
import {useEffect, useState} from "react";
import AccountProfileComponent from '../src/components/Profile.jsx'; // Import your ProfilePage component

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

  // if (!isConnected) {
  //   return (
  //     <div>
  //       <h1 className="headings">You must connect your wallet to continue.</h1>
  //       <button onClick={connectWallet}>Connect to MetaMask</button>
  //     </div>
  //   );
  // }

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
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
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
              console.log("New wallet address:", newAddress);
              setWalletAddress(newAddress);

              setIsConnected(true);
          } catch (error) {
              console.error("Error connecting to MetaMask", error);
          }
      } else {
          console.error("MetaMask not found. Please install MetaMask.");
      }
  };

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Route path="/" element={<BetsPageTable items={data} />} />
            <Route
                        path="/profile"
                        element={
                            <AccountProfileComponent
                                walletAddress={walletAddress}
                                weatherBetTokenAddress={weatherBetTokenAddress}
                                weatherBetTokenAbi={weatherBetTokenAbi}
                                provider={provider}
                            />
                        }
                    />
            
          </Routes>
        </Router>
      </div>
      );
};

export default App;