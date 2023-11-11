import './App.css'
import Bet from './components/Bet.jsx';
import { tokenAddress as tokenContractAddress, weatherBettingAddress as weatherContractAddress } from "./abi/addreses.js"
import tokenContractAbi from "./abi/tokenAbi.js"
import weatherContractAbi from "./abi/bettingContractAbi.js"
import WeatherBettingComponent from './WeatherBettingComponent.jsx';
import TokenApprovalComponent from './TokenApprovalComponent.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <div>
        <Container className={"container-lg"}>
          <h1 className="text-primary">Weather Betting App</h1>
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
        </Container>
    </div>
  );
};

export default App;