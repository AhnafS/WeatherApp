import { useState, useEffect } from "react";
import DailyWeather from "./DailyWeather";
import Loading from "./Loading";

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
    <main>
      {/* 
      1. Fetch function will be set up in App.js
      2. Search menu will be in App.js
      3. DailyWeather Component
      */}
      <DailyWeather {...weatherInfo} />
    </main>
  );
}

export default App;
