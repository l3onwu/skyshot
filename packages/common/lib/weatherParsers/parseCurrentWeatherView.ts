const parseCurrentWeatherView = (singleWeatherData) => {
  // TODO: This parse function can be optimized by getting the locale current time, and using the hour as index for weatherData[0]
  let currentWeatherObject = {};

  // Loop over all the retrieved weather data (arrays)
  for (let i = 0; i < singleWeatherData?.hourly?.time.length; i++) {
    let givenTime = new Date(singleWeatherData?.hourly?.time[i] * 1000);
    let weatherHour = givenTime?.getHours();
    let weatherDate = givenTime?.getDate();

    if (
      new Date().getHours() === weatherHour &&
      new Date().getDate() === weatherDate
    ) {
      currentWeatherObject = {
        time: givenTime,
        precipitation: parseFloat(singleWeatherData?.hourly?.precipitation[i]),
        temperature: parseFloat(singleWeatherData?.hourly?.temperature_2m[i]),
      };
      return currentWeatherObject;
    }
  }
};

export default parseCurrentWeatherView;
