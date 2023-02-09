const parseDailyTemp = (singleWeatherData) => {
  return {
    max: singleWeatherData?.daily?.temperature_2m_max[0],
    min: singleWeatherData?.daily?.temperature_2m_min[0],
  };
};

export default parseDailyTemp;
