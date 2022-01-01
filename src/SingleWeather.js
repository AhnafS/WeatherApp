import { React, useState, useEffect } from "react";
import getIcon from "./utils/getIcon";

const SingleWeather = ({ dt, temp, pressure, weather, city }) => {
  let [date, setDate] = useState(new Date());
  let [icon, setIcon] = useState("");
  weather = weather[0];
  const { main, description, icon: preIcon } = weather;

  const unixDateFormater = () => {
    const milliseconds = dt * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject
      .toString()
      .split(" ")
      .slice(0, 4)
      .join(" ");
    setDate(humanDateFormat);
    console.log(`The Date from SingleWeather ${date}`);
  };

  useEffect(() => {
    unixDateFormater();
    getIcon(preIcon).then((newIcon) => setIcon(newIcon));
  }, []);

  return (
    <section className="h-full bg-gray-50 rounded p-6 bg-white flex items-center justify-around flex-col text-xl shadow-md p-5 text-center capitalize pt-px">
      <div className="border-b-4 border-indigo-500">
        <h1>{city}</h1>
        <h2>{date}</h2>
      </div>
      <div className="flex justify-center flex-col items-center pt-px">
        <h4>{main}</h4>
        <img src={icon} alt={city} />
        <h4>{description}</h4>
      </div>
      <div className="flex  justify-between border-t-4 border-indigo-500 py-1">
        <h3 className="mr-2">Max: {Math.round(temp.max)}</h3>
        <h3> Min: {Math.round(temp.min)}</h3>
        <h4>Pressure: {pressure}</h4>
      </div>
    </section>
  );
};

export default SingleWeather;
