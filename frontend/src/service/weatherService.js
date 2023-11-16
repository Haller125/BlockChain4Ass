import axios from "axios";

const apiUrl = "https://api.openweathermap.org/data/3.0/onecall";
const lat = 51.169392;
const lon = 71.449074;
const exclude = "current,minutely,hourly,alerts";
const appid = import.meta.env.VITE_OPENWEATHERMAP_KEY;
const units = "metric";

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
      console.log(weatherData.daily[0].temp.day);
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

fetchWeatherData();
