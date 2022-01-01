import { useState, useEffect } from "react";
import CurrentWeather from "./CurrentWeather";
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import MultipleWeather from "./MultipleWeather";
import ErrorBoundary from "./utils/ErrorBoundary";

function App() {
  const [city, setCity] = useState("London");
  let [weatherInfo, setWeatherInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const getWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.REACT_APP_KEY}`;
    try {
      const response = await fetch(url);
      const weather = await response.json();
      setWeatherInfo(weather);
      weatherInfo ? setLoading(false) : setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWeather();
  }, [city]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="h-screen flex flex-col items-center justify-evenly">
      {/* 
      1. Fetch function will be set up in App.js
      2. Search menu will be in App.js
      3. DailyWeather Component
      */}
      <ErrorBoundary>
        <SearchBar setCity={setCity} />
        <CurrentWeather {...weatherInfo} city={city} />
        <MultipleWeather city={city} coord={weatherInfo.coord} />
      </ErrorBoundary>
    </main>
  );
}

export default App;
