import axios from "axios";
import typeOfBet from "./typeOfBet.js";

const apiUrl = "https://api.openweathermap.org/data/3.0/onecall";
const lat = 51.169392;
const lon = 71.449074;
const exclude = "current,minutely,hourly,alerts";
// const appid = import.meta.env.VITE_OPENWEATHERMAP_KEY;
const appid = "f1706d87612caed6900d28f07e3f451b";
const units = "metric";
const BASE_COEF = 1.2;
const WIND_SPEED_DELTA = 1.5;
const PLUS_DELTA = 5;

async function fetchWeatherData() {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        lat,
        lon,
        exclude,
        appid,
        units,
      },
    });

    if (response.status === 200) {
      const weatherData = response.data;

      const convertData = (weatherData, nextDayCount) => {
        const date = weatherData.dt;

        const moreThanTemp = Math.round(weatherData.temp.max);
        const moreThanTempCoef = Math.round(BASE_COEF ** nextDayCount * 100) / 100;

        const moreThanTempPlus = Math.round(weatherData.temp.max + PLUS_DELTA);
        const moreThanTempPlusCoef = Math.round(BASE_COEF ** (nextDayCount + 1) * 100) / 100;

        const lessThanTemp = Math.round(weatherData.temp.min);
        const lessThanTempCoef = Math.round(BASE_COEF ** nextDayCount * 100) / 100;

        const lessThanTempPlus = Math.round(weatherData.temp.min - PLUS_DELTA);
        const lessThanTempPlusCoef = Math.round(BASE_COEF ** (nextDayCount + 1) * 100) / 100;

        const moreThanWindSpeed = Math.round(weatherData.wind_speed * WIND_SPEED_DELTA);
        const moreThanWindSpeedCoef = Math.round(BASE_COEF ** nextDayCount * 100) / 100;
        
        const lessThanWindSpeed = Math.round(weatherData.wind_speed / WIND_SPEED_DELTA);
        const lessThanWindSpeedCoef = Math.round(BASE_COEF ** nextDayCount * 100) / 100;
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
                  coef:lessThanWindSpeedCoef,
                  type: typeOfBet.lessThanWindSpeed},]
        };
      };

      let convertedDatas = [];

      weatherData.daily.forEach((weatherData, index) => {
        const convedtedData = convertData(weatherData, index + 1);
        convertedDatas.push(convedtedData);
      });

      return convertedDatas;
    } else {
      console.error("Error fetching weather data:", response.statusText);
    }
  } catch (error) {
    console.error(
      "An error occurred while fetching weather data:",
      error.message
    );
  }
}

export default fetchWeatherData;
