import { React, useState, useEffect } from "react";
import getIcon from "./utils/getIcon";
import Loading from "./Loading";

const SingleWeather = ({ dt, temp, pressure, weather, city }) => {
  let [date, setDate] = useState(new Date());
  let [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(true);
  weather = weather[0];
  const { main, description, icon: preIcon } = weather;

  const getIcon = async (icon) => {
    try {
      const response = await fetch(
        `https://openweathermap.org/img/wn/${icon}.png`
      );
      const newIconBlob = await response.blob();
      const newIconUrl = await URL.createObjectURL(newIconBlob);
      setIcon(newIconUrl);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIcon(preIcon);
    setLoading(false);
    console.log(icon);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="h-full rounded p-6 bg-white flex items-center justify-around flex-col text-xl shadow-lg p-5 text-center capitalize pt-px lg:w-9/12 hover:border-2">
      <div className="border-b-4 border-indigo-500">
        <h2>
          {new Date(dt * 1000).toString().split(" ").slice(0, 4).join(" ")}
        </h2>
      </div>
      <div className="flex justify-center flex-col items-center pt-px">
        <h4>{main}</h4>
        <img src={icon} alt={city} />
        <h4>{description}</h4>
      </div>
      <div className="flex  justify-between border-t-4 border-indigo-500 py-1 items-center space-x-2">
        <h3 className="mr-2">Max: {Math.round(temp.max)}</h3>
        <h3> Min: {Math.round(temp.min)}</h3>
        <h4>Pressure: {pressure} </h4>
      </div>
    </section>
  );
};

export default SingleWeather;
