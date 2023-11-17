# WeatherBet DApp

## Running the DApp

### Deployment:

#### Smart Contracts:

1. Deploy the `WeatherBetToken` and `WeatherBetting` smart contracts to your chosen Ethereum network. 
2. Provide the `WeatherBetToken` contract address when deploying the `WeatherBetting` contract.

#### Frontend:

1. Host the frontend of the DApp on a web server (e.g., Netlify, Vercel, GitHub Pages).
2. Update the contract addresses in your frontend code to point to the deployed contracts.

#### API Keys:

1. Acquire an API key from OpenWeatherMap.
2. Replace the `appid` variable in the `fetchWeatherData` function with your key.

#### User Setup:

1. **Connect MetaMask:**
   - Users need to have MetaMask installed in their browsers.
   - Connect MetaMask to the Ethereum network where the contracts are deployed.

2. **Load Wallet:**
   - Upon connecting, the DApp should load the user's wallet address and display it on the profile page.

### Project-Specific Details:

#### User Roles:

1. **Regular Users:**
   - Connect their wallets.
   - View their profile.
   - Place bets.
   - Check results.

2. **Owner:**
   - Manages the DApp.
   - Updates weather data.
   - Performs financial operations.

#### Owner Actions:

1. Deploy and manage smart contracts.
2. Update weather data.
3. Withdraw Sepolia from the contract.

## Financial Analysis

### Costs for Clients:

1. **Token Purchase:**
   - Users can buy tokens by sending Sepolia to the contract.
   - Each Sepolia sent corresponds to a certain number of WeatherBetTokens (WBT).

### Potential Earnings or Losses for the Owner:

1. **Token Minting:**
   - The owner earns by minting tokens. Users buy tokens by sending Sepolia, and the owner mints tokens at a predefined rate.

2. **Withdrawal:**
   - Users can withdraw Sepolia by burning their tokens. The owner needs to ensure a sufficient balance in the contract for withdrawals.

3. **Betting:**
   - If users win bets, they receive a payout in tokens. The owner might need to ensure enough tokens for potential winnings.

### Coefficients in Financial Analysis:

The DApp incorporates coefficients to enhance the complexity and potential returns for users engaging in weather betting. These coefficients are dynamically calculated based on weather data, creating a more engaging and unpredictable experience for users.

#### Code Implementation for Coefficients:

```javascript
// Code snippet for coefficient calculation
const BASE_COEF = 1.2;
const WIND_SPEED_DELTA = 1.5;
const PLUS_DELTA = 5;

const convertData = (weatherData, nextDayCount) => {
  // ... (Existing Code)

  return {
    date: date,
    betsData:[
      {temp: moreThanTemp,
       coef: moreThanTempCoef,
       type: typeOfBet.moreThanTemp},

      {temp: moreThanTempPlus,
       coef: moreThanTempPlusCoef,
       type: typeOfBet.moreThanTempPlus},

      {temp: lessThanTemp,
        coef: lessThanTempCoef,
        type: typeOfBet.lessThanTemp},

      {temp: lessThanTempPlus,
          coef: lessThanTempPlusCoef,
          type: typeOfBet.lessThanTempPlus},

      {temp: moreThanWindSpeed,
          coef: moreThanWindSpeedCoef,
          type: typeOfBet.moreThanWindSpeed},

      {temp: lessThanWindSpeed,
          coef: lessThanWindSpeedCoef,
          type: typeOfBet.lessThanWindSpeed},
    ]
  };
};
// ...
```

#### Explanation of Coefficient Types:

1. **Temperature Bets:**
   - `moreThanTemp`: Bet on the temperature being higher than a certain value.
   - `moreThanTempPlus`: Bet on the temperature being higher than a value plus a delta.

2. **Temperature Bets:**
   - `lessThanTemp`: Bet on the temperature being lower than a certain value.
   - `lessThanTempPlus`: Bet on the temperature being lower than a value minus a delta.

3. **Wind Speed Bets:**
   - `moreThanWindSpeed`: Bet on the wind speed being higher than a certain value times a delta.
   - `lessThanWindSpeed`: Bet on the wind speed being lower than a certain value divided by a delta.

#### Implications:

1. **Dynamic Coefficients:**
   - Coefficients change with each weather data fetch, introducing unpredictability.

2. **Risk and Reward:**
   - Users can choose bets with different coefficients, balancing risk and potential reward.

3. **Engagement:**
   - The dynamic coefficients aim to enhance user engagement and excitement.

It's important to consider the dynamic nature of coefficients in the financial analysis, providing users with a dynamic and engaging betting experience.
