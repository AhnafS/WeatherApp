import { React, useState, useEffect } from "react";
import SingleWeather from "./SingleWeather";

const MultipleWeather = ({ coord }) => {
  let [weathers, setWeathers] = useState({});

  const getWeathers = async () => {
    const { lon, lat } = coord;
    console.log(`Coordination: ${coord}`);
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_KEY}&units=imperial`;
    try {
      const response = await fetch(url);
      const newWeathers = await response.json();
      setWeathers(newWeathers.daily);
      console.log(weathers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWeathers();
  }, [coord]);

  return (
    <section className="h-2/4 w-2/4 bg-slate-500 mt-5 lg:mt-0">
      <SingleWeather {...weathers[0]} />
    </section>
  );
};

export default MultipleWeather;
