import { WeatherType } from "../types";

const parseSevenDayTempPrecipView = (singleWeatherData) => {
  // PARSE weather data (divide into 7 day arrays of time objects)
  let parsedWeatherArray = [[], [], [], [], [], [], []];
  let dayIndex = 0;
  let hoursAddedToDayCounter = 0;

  // Loop over all the retrieved weather data (arrays)
  for (let i = 0; i < singleWeatherData?.hourly?.time.length; i++) {
    // Instantiate current parsed day cursor (using index)
    let parsedDay = parsedWeatherArray[dayIndex];

    // Create weather object from data, cast correct types
    let weatherObject = {
      time: new Date(singleWeatherData?.hourly?.time[i] * 1000),
      rain: parseFloat(singleWeatherData?.hourly?.rain[i]) + parseFloat(singleWeatherData?.hourly?.showers[i]),
      snowfall: parseFloat(singleWeatherData?.hourly?.snowfall[i]),
      temperature: parseFloat(singleWeatherData?.hourly?.temperature_2m[i]),
    };

    // Instead, just increment if we hit the specified day length
    // TODO: Replace hardcoded 24 with {variable} based on set time period
    if (hoursAddedToDayCounter === 24) {
      dayIndex += 1;
      parsedDay = parsedWeatherArray[dayIndex];
      hoursAddedToDayCounter = 0;
    }

    // Filter out data not between startHour to endHour
    // let startTime = parseInt(startHour.split(":")[0]);
    // let endTime = parseInt(endHour.split(":")[0]);
    // if (weatherHour < startTime || weatherHour > endTime) {
    //   continue;
    // }

    // Push weather object to its correct day array
    parsedDay.push(weatherObject);
    hoursAddedToDayCounter += 1;
  }
  return { weather: parsedWeatherArray };
};

export default parseSevenDayTempPrecipView;
