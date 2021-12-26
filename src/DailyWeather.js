import { React, useState, useEffect } from "react";
const DailyWeather = ({ main, city, weather }) => {
  let [weatherIcon, setWeatherIcon] = useState(null);
  const { temp, pressure } = main;
  const [{ icon, description }] = weather;
  console.log(icon);

  const getIcon = async () => {
    try {
      const response = await fetch(
        `http://openweathermap.org/img/wn/${icon}.png`
      );
      const newIconBlob = await response.blob();
      const newIconUrl = await URL.createObjectURL(newIconBlob);
      setWeatherIcon(newIconUrl);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIcon();
  }, [weather]);

  return (
    <section className="w-64 border b-gray-400 rounded flex flex-col justify-center items-center text-center p-6 bg-white">
      <div>
        <h3>{city}</h3>
        <h4>{new Date().toString().split(" ").slice(0, 4).join(" ")}</h4>
        <h4>{weather.main}</h4>
        <img src={weatherIcon} alt={weather.main} />
        <h4>{description}</h4>
      </div>
      <h1>temperature: {temp}</h1>
      <h3>pressure {pressure}</h3>
    </section>
  );
};

export default DailyWeather;
