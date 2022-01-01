import { React, useState, useEffect } from "react";
import SingleWeather from "./SingleWeather";
import data from "./data";
import Loading from "./Loading";

const MultipleWeather = ({ coord, city }) => {
  let [weathers, setWeathers] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const getWeathers = async () => {
    const { lon, lat } = coord;
    console.log(`Coordination: ${coord}`);
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_KEY}&units=imperial`;
    try {
      const response = await fetch(url);
      console.log(`Response of ONE CALL API: ${response.status}`);
      const newWeathers = await response.json();
      setWeathers(newWeathers.daily);
      setLoading(false);
      console.log(weathers);
    } catch (err) {
      console.log(err);
    }
  };

  const prevButton = () => setIndex(index - 1);
  const nextButton = () => setIndex(index + 1);

  useEffect(() => {
    getWeathers();
    console.log("MultipleWeather useEffect");
  }, [coord]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="h-1/2 w-3/4 bg-gray-50 mt-5 lg:mt-0 flex overflow-x-scroll">
      {weathers.map((weather, i) => {
        return <SingleWeather {...weathers[i]} city={city} key={i} />;
      })}
    </section>
  );
};

export default MultipleWeather;
