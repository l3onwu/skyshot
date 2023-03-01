const parseDailyTemp = (singleWeatherData) => {
  return {
    rain: singleWeatherData?.daily?.rain_sum[0],
    snow: singleWeatherData?.daily?.snowfall_sum[0],
  };
};

export default parseDailyTemp;
