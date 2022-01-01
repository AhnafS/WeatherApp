const getIcon = async (icon) => {
  try {
    const response = await fetch(
      `http://openweathermap.org/img/wn/${icon}.png`
    );
    const newIconBlob = await response.blob();
    const newIconUrl = await URL.createObjectURL(newIconBlob);
    return newIconUrl;
  } catch (err) {
    console.log(err);
  }
};

export default getIcon;
