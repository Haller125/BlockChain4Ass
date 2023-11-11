import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
const weatherBettingContractAddress =
  process.env.VITE_WEATHER_BETTING_CONTRACT_ADDRESS;
import weatherBettingContractAbi from "./src/abi/weatherBettingContractAbi.js";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

console.log(weatherBettingContractAddress);
console.log('PRIVATE_KEY', PRIVATE_KEY);

const provider = new ethers.EtherscanProvider("sepolia");

console.log('provider', provider);

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

console.log('wallet', wallet);

// FIX: Doesn't work
const updateWeatherData = async () => {
  try {
    console.log("Updating weather data...");

    const temperature = 25;
    const windSpeed = 5;
    const timestampMinute = 100;
    const weatherContract = new ethers.Contract(
      weatherBettingContractAddress,
      weatherBettingContractAbi,
      wallet
    );
    console.log('weatherContract', weatherContract);

    const tx = await weatherContract.updateWeatherData(
      timestampMinute,
      temperature,
      windSpeed
    );
    await tx.wait();

    console.log(`Weather data updated for timestamp ${timestampMinute}`);
  } catch (error) {
    console.error("Error updating weather data:", error);
  }
};

setInterval(updateWeatherData, 1000 * 60);