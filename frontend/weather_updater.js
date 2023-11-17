import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const weatherBettingContractAddress = process.env.VITE_WEATHER_BETTING_CONTRACT_ADDRESS;
import weatherBettingContractAbi from "./src/abi/weatherBettingContractAbi.js";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const provider = new ethers.EtherscanProvider("sepolia", "3FVTWVZH5M5WDEBEGJBT1BM1MTDY5GF8H4");
console.log("provider", provider);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
console.log("wallet", wallet);

const hardcodedWeatherData = [
  { temperature: 25, windSpeed: 5 },
  { temperature: 26, windSpeed: 6 },
  { temperature: 24, windSpeed: 4 },
  { temperature: 23, windSpeed: 5 },
  { temperature: 22, windSpeed: 6 },
  { temperature: 27, windSpeed: 7 },
  { temperature: 28, windSpeed: 8 },
];

const updateWeatherData = async () => {
  try {
    console.log("Updating weather data...");

    const weatherContract = new ethers.Contract(
      weatherBettingContractAddress,
      weatherBettingContractAbi,
      wallet
    );

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const oneDayInSeconds = 86400;

    let day = 0;
    let alwaystrue = true;

    do {
      const dayTimestamp = currentTimestamp + day * oneDayInSeconds;
      const { temperature, windSpeed } = hardcodedWeatherData[day];

      console.log(`Updating weather data for timestamp ${new Date(dayTimestamp * 1000)}: Temp = ${temperature}, Wind = ${windSpeed}`);

      const tx = await weatherContract.updateWeatherData(
        dayTimestamp,
        temperature,
        windSpeed
      );
      await tx.wait();

      console.log(`Weather data updated for timestamp ${dayTimestamp}: Temp = ${temperature}, Wind = ${windSpeed}`);

      day = (day + 1) % 7; // Loop from 0 to 6
    } while (alwaystrue); // Loop forever

  } catch (error) {
    console.error("Error updating weather data:", error);
  }
};

updateWeatherData();