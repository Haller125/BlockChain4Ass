import axios from "axios";

const apiUrl = "https://api.openweathermap.org/data/3.0/onecall";
const lat = 51.169392;
const lon = 71.449074;
const exclude = "current,minutely,hourly,alerts";
// const appid = import.meta.env.VITE_OPENWEATHERMAP_KEY;
const appid = "f1706d87612caed6900d28f07e3f451b";
const units = "metric";
const BASE_COEF = 1.2;

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
        const moreThanTempCoef = BASE_COEF ** nextDayCount;
        const moreThanTempPlus = weatherData.temp.max * 2;
        const moreThanTempPlusCoef = BASE_COEF ** (nextDayCount + 1);
        const lessThanTemp = weatherData.temp.min;
        const lessThanTempCoef = BASE_COEF ** nextDayCount;
        const lessThanTempPlus = weatherData.temp.min * 2;
        const lessThanTempPlusCoef = BASE_COEF ** (nextDayCount + 1);
        const moreThanWindSpeed = weatherData.wind_speed * 1.5;
        const moreThanWindSpeedCoef = BASE_COEF ** nextDayCount;
        const lessThanWindSpeed = weatherData.wind_speed / 1.5;
        const lessThanWindSpeedCoef = BASE_COEF ** nextDayCount;
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
