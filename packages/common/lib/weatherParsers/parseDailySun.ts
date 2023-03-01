const parseDailySun = (singleWeatherData) => {
  return {
    sunrise: singleWeatherData?.daily?.sunrise[0],
    sunset: singleWeatherData?.daily?.sunset[0],
  };
};

export default parseDailySun;
