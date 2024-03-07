import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";

function WeatherApp() {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [city, setCity] = useState("Nairobi");
  const [weatherData, setWeatherData] = useState(null);

  const api_key = "5565e86e2569c9a6ef923e393129487b";

  const fetchData = async () => {
    const url = `http://api.openweathermap.org/data/2.5/weather?appid=${api_key}&q=${city}&units=imperial`;

    try {
      setLoading(true);
      const response = await axios.get(url);
      console.log(response.data);
      if (response.data && Object.keys(response.data).length > 0) {
        setWeatherData(response.data);
        setLoading(false);
        // setCity("");
      }
    } catch (error) {
      console.log(error);
      setErrMsg(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    fetchData();
  };

  const getCurrentDate = () => {
    const date = new Date();

    return date.toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="center">
        <h1>Data loading. Please wait ...</h1>
      </section>
    );
  }

  if (errMsg) {
    return (
      <section className="center">
        <h1>{errMsg}</h1>
      </section>
    );
  }

  console.log(weatherData);

  return (
    <section className="wrapper">
      <section className="app">
        <section className="inputs">
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Enter City Name"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <button className="search" onClick={handleSearch}>
            Search
          </button>
        </section>
        <section className="content">
          {weatherData && Object.keys(weatherData).length > 0 ? (
            <section className="data">
              <h2>
                {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
              </h2>
              <h4>{getCurrentDate()}</h4>
              <h5>Temperature: {weatherData?.main?.temp}</h5>
              <h5>Feels Like: {weatherData?.main?.feels_like}</h5>
              <h5>Humidity: {weatherData?.main?.humidity}</h5>
              <h5>Pressure: {weatherData?.main?.pressure}</h5>
              <h5>Max Temperature: {weatherData?.main?.temp_max}</h5>
              <h5>Min Temperature: {weatherData?.main?.temp_min}</h5>
              <p>Weather Description: {weatherData?.weather[0].description}</p>
            </section>
          ) : (
            <section className="center">
              <p>No Weather Data</p>{" "}
            </section>
          )}
        </section>
      </section>
    </section>
  );
}

export default WeatherApp;
