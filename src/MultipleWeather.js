import { React, useState, useEffect } from "react";
import SingleWeather from "./SingleWeather";

const MultipleWeather = ({ coord, city }) => {
  let [weathers, setWeathers] = useState({});

  const getWeathers = async () => {
    const { lon, lat } = coord;
    console.log(`Coordination: ${coord}`);
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_KEY}&units=imperial`;
    try {
      const response = await fetch(url);
      const newWeathers = await response.json();
      setWeathers(newWeathers.daily);
      console.log(newWeathers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWeathers();
  }, [coord]);

  return (
    <section className="h-1/2 w-2/4 bg-gray-50 mt-5 lg:mt-0">
      <SingleWeather {...weathers[3]} city={city} />
    </section>
  );
};

export default MultipleWeather;
