import './App.css'
import Bet from './components/Bet.jsx';
import { tokenAddress as tokenContractAddress, weatherBettingAddress as weatherContractAddress } from "./abi/addreses.js"
import tokenContractAbi from "./abi/tokenAbi.js"
import weatherContractAbi from "./abi/bettingContractAbi.js"
import WeatherBettingComponent from './WeatherBettingComponent.jsx';
import TokenApprovalComponent from './TokenApprovalComponent.jsx';

const App = () => {
  return (
    <>
      <h1>Weather Betting App</h1>
      {/* <Bet
        contractAddress={tokenContractAddress}
        contractAbi={tokenContractAbi}
        weatherContractAddress={weatherContractAddress}
        weatherContractAbi={weatherContractAbi}
      /> */}
      <WeatherBettingComponent
        weatherBettingContractAddress={weatherContractAddress}
        weatherBettingABI={weatherContractAbi}
      />
      <TokenApprovalComponent
        tokenContractAddress={tokenContractAddress}
        tokenABI={tokenContractAbi}
        spenderAddress={weatherContractAddress}
      />

    </>
  );
};

export default App;