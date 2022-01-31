import axios from "axios";

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (query) => {
  const { data } = await axios.get(WEATHER_URL, {
    params: {
      q: query,
      units: "metric",
      APPID: process.env.REACT_APP_API_KEY,
    },
  });

  return data;
};

const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const fetchForecast = async (query) => {
  const { data } = await axios.get(FORECAST_URL, {
    params: {
      q: query,
      units: "metric",
      APPID: process.env.REACT_APP_API_KEY,
    },
  });

  return data;
};
