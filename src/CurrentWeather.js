import { React, useState, useEffect } from "react";
import Loading from "./Loading";

const CurrentWeather = ({ main, city, weather }) => {
  let [weatherIcon, setWeatherIcon] = useState(null);
  const { temp, pressure } = main;
  const [{ icon, description }] = weather;
  const [loading, setLoading] = useState(true);

  const getIcon = async (icon) => {
    try {
      const response = await fetch(
        `https://openweathermap.org/img/wn/${icon}.png`
      );
      const newIconBlob = await response.blob();
      const newIconUrl = await URL.createObjectURL(newIconBlob);
      setWeatherIcon(newIconUrl);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIcon(icon);
    setLoading(false);
  }, []);

  if (loading) {
    <Loading />;
  }

  return (
    <section className="w-1/2 h-2/4 border bg-gray-50 rounded p-6 bg-white flex items-center justify-between flex-col text-xl shadow-md p-5 lg:flex-row lg:h-1/4 capitalize">
      <div className="text-center border-b-4 border-indigo-500">
        <h3>{city}</h3>
        <h4>{new Date().toString().split(" ").slice(0, 4).join(" ")}</h4>
      </div>
      <div className="flex justify-center flex-col items-center">
        <h4>{weather[0].main}</h4>
        <img src={weatherIcon} alt={weather.main} className="fill-black" />
        <h4>{description}</h4>
      </div>
      <div className="border-t-4 border-indigo-500 space-x-4 text-center lg:border-b-4 lg:border-t-0">
        <h3>pressure {pressure}</h3>
        <h1>temperature: {Math.round(temp)}F</h1>
      </div>
    </section>
  );
};

export default CurrentWeather;
