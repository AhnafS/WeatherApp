import React from "react";

const DailyWeather = ({ main }) => {
  const { temp, pressure } = main;
  console.log(main);
  return (
    <section className="text-2xl">
      <h1>{temp}</h1>
      <h3>{pressure}</h3>
    </section>
  );
};

export default DailyWeather;
