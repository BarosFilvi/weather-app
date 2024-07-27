import React, { useState, useEffect } from "react";
import "./style.css";

const api = {
  key: "26802e96d8e7dee3afae7cdcfad89a98",
  base: "https://api.openweathermap.org/data/2.5/",
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [isDayTime, setIsDayTime] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWeather("Ho Chi Minh City");
  }, []);

  async function getWeather(city) {
    const url = `${api.base}weather?q=${city}&appid=${api.key}&units=metric`;
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWeather(data);
      const currentTime = new Date().getTime() / 1000;
      setIsDayTime(
        currentTime >= data.sys.sunrise && currentTime < data.sys.sunset
      );
    } catch (error) {
      console.log("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`weather-widget ${isDayTime ? "day" : "night"}`}>
      <main>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="top-box">
              <div className="location-temp-box">
                <span className="temp">
                  {weather ? weather.main.temp : "..."}
                </span>
                <span className="temp-unit">°C</span>
                <div className="location">{weather ? weather.name : "..."}</div>
              </div>
              <div className="weather-box">
                <div
                  className={`weather-ic ${isDayTime ? "day" : "night"}`}
                ></div>
                <div className="weather">
                  {weather ? weather.weather[0].description : "..."}
                </div>
              </div>
            </div>
            <div className="middle-box">
              {isDayTime ? "Good Morning" : "Good Night"}
            </div>
            <div className="bottom-box">
              <div className="weather-details">
                <div className="humidity-details">
                  <div className="humidity-ic"></div>
                  <div className="value">
                    {weather ? `${weather.main.humidity}%` : "..."}
                  </div>
                </div>
                <div className="temp-details">
                  <div className="temp-ic"></div>
                  <span className="temp-max">
                    {weather ? weather.main.temp_max : "..."}
                  </span>
                  <span className="temp-unit-max">°C</span>
                  <span className="temp-min">
                    {weather ? weather.main.temp_min : "..."}
                  </span>
                  <span className="temp-unit-min">°C</span>
                </div>
                <div className="wind-details">
                  <div className="wind-ic"></div>
                  <div className="value">
                    {weather ? `${weather.wind.speed} m/s` : "..."}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default WeatherWidget;
