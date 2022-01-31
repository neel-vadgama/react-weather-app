import React, { useState } from "react";
import { fetchForecast, fetchWeather } from "./api/weatherApi";
import ReactCountryFlag from "react-country-flag";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [clicked, setClicked] = useState(false);
  let currentDate = new Date();
  const search = async (e) => {
    try {
      if (e.key === "Enter" || e.type === "click") {
        const data = await fetchWeather(query);
        const forecast = await fetchForecast(query);

        const forecastData = forecast.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        setForecastData(forecastData);
        currentDate = await new Date(data.dt * 1000);

        setWeather(data);
        setQuery("");
        setClicked(true);
      }
    } catch (err) {
      return (
        <p>
          <center>Please Enter valid name: {err.message}</center>
        </p>
      );
    }
  };

  return (
    <div className="main-container">
      <div className="header">
        <h4>Weather App</h4>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search"
          placeholder="Enter City Name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
        <button onClick={search}>Search</button>
      </div>

      {weather.main && clicked && (
        <div className="weather-container">
          <div className="weather-header">
            <div className="weather-header-left">
              <img
                className="city-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <span>
                {Math.round(weather.main.temp)}
                <sup>&deg;C</sup>
                {" | "}
                {Math.round((weather.main.temp * 9) / 5 + 32)}
                <sup>&deg;F</sup>
              </span>
            </div>
            <div className="weather-header-right">
              <p>
                {weather.name}
                {`|`}
                <ReactCountryFlag
                  className="country-icon"
                  countryCode={weather.sys.country}
                  svg
                />
              </p>
              <p>{currentDate.toDateString()}</p>
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
          <div className="weather-info">
            <div className="weather-info-left">
              <p>Humidity: {weather.main.humidity} %</p>
              <p>
                Sunrise:{" "}
                {new Date(weather.sys.sunrise).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="weather-info-right">
              <p>Wind: {weather.wind.speed} km/h</p>
              <p>
                Sunset:{" "}
                {new Date(weather.sys.sunset).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}{" "}
                PM
              </p>
            </div>
          </div>
        </div>
      )}
      {clicked && (
        <div className="forecast-container">
          {forecastData.map((item) => (
            <div className="forecast-item" key={item.dt}>
              <img
                className="forecast-icon"
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />
              <p>
                {new Date(item.dt * 1000).toLocaleString("en-us", {
                  weekday: "long",
                })}
              </p>
              <p>
                {new Date(item.dt * 1000).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              </p>

              <p>
                {Math.round(item.main.temp)}
                <sup>&deg;C</sup>
                {" | "}
                {Math.round((item.main.temp * 9) / 5 + 32)}
                <sup>&deg;F</sup>
              </p>
              <p>{item.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
