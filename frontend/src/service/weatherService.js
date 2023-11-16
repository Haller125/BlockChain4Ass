import axios from "axios";

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
        const moreThanTemp = weatherData.temp.max;
        const moreThanTempCoef = Math.round(BASE_COEF ** nextDayCount * 100) / 100;
        const moreThanTempPlus = weatherData.temp.max + PLUS_DELTA;
        const moreThanTempPlusCoef = Math.round(BASE_COEF ** (nextDayCount + 1) * 100) / 100;
        const lessThanTemp = weatherData.temp.min;
        const lessThanTempCoef = Math.round(BASE_COEF ** nextDayCount * 100) / 100;
        const lessThanTempPlus = weatherData.temp.min - PLUS_DELTA;
        const lessThanTempPlusCoef = Math.round(BASE_COEF ** (nextDayCount + 1) * 100) / 100;
        const moreThanWindSpeed = weatherData.wind_speed * WIND_SPEED_DELTA;
        const moreThanWindSpeedCoef = Math.round(BASE_COEF ** nextDayCount * 100) / 100;
        const lessThanWindSpeed = weatherData.wind_speed / WIND_SPEED_DELTA;
        const lessThanWindSpeedCoef = Math.round(BASE_COEF ** nextDayCount * 100) / 100;
        return {
          date,
          moreThanTemp,
          moreThanTempCoef,
          moreThanTempPlus,
          moreThanTempPlusCoef,
          lessThanTemp,
          lessThanTempCoef,
          lessThanTempPlus,
          lessThanTempPlusCoef,
          moreThanWindSpeed,
          moreThanWindSpeedCoef,
          lessThanWindSpeed,
          lessThanWindSpeedCoef,
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
