const parseWeekOverview = (singleWeatherData) => {
  let parsedWeatherArray = [1, 2, 3, 4, 5, 6, 7].map(() => {
    return { min: 0, max: 0, snow: 0, rain: 0, sunrise: 0, sunset: 0 };
  });

  // Counters to get weekly min and max
  let weeklyMin = singleWeatherData?.daily?.temperature_2m_min[0];
  let weeklyMax = singleWeatherData?.daily?.temperature_2m_max[0];

  // Loop over seven days of temps, precips, etc.
  for (let i = 0; i < 7; i++) {
    // For each day, create a day object
    let dayObject = {
      max: singleWeatherData?.daily?.temperature_2m_max[i],
      min: singleWeatherData?.daily?.temperature_2m_min[i],
      rain: singleWeatherData?.daily?.rain_sum[i],
      snow: singleWeatherData?.daily?.snowfall_sum[i],
      sunrise: singleWeatherData?.daily?.sunrise[i],
      sunset: singleWeatherData?.daily?.sunset[i],
    };
    if (dayObject?.min < weeklyMin) {
      weeklyMin = dayObject?.min;
    }
    if (dayObject?.max > weeklyMax) {
      weeklyMax = dayObject?.max;
    }
    parsedWeatherArray[i] = dayObject;
  }

  return {
    sevenDays: parsedWeatherArray,
    weeklyMin,
    weeklyMax,
    weeklyDiff: weeklyMax - weeklyMin,
  };
};

export default parseWeekOverview;
