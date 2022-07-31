import axios from "axios";
import useSWR from "swr";
import { WeatherType } from "./types";

export default function useWeatherData({ geoObject, startHour, endHour }) {
  // Retrieve weather data, manage with SWR
  const openMeteoFetcher = async () => {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${geoObject["lat"]}&longitude=${geoObject["lng"]}&hourly=temperature_2m,precipitation&timezone=Australia%2FSydney`
    );
    return response?.data;
  };
  const { data: weatherData, error: weatherError } = useSWR(
    () => "/weatherData" + geoObject["lat"],
    openMeteoFetcher,
    {
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    }
  );
  let weatherLoading = !weatherData && !weatherError;

  // PARSE weather data (divide into 7 day arrays of time objects)
  let parsedWeatherArray = [[], [], [], [], [], [], []];
  let currentWeatherObject = {};
  let dayIndex = 0;

  // Loop over all the retrieved weather data (arrays)
  for (let i = 0; i < weatherData?.hourly?.time.length; i++) {
    // Instantiate current parsed day cursor (using index)
    let parsedDay = parsedWeatherArray[dayIndex];

    // Create weather object from data, cast correct types
    let weatherObject: WeatherType = {
      time: new Date(weatherData?.hourly?.time[i]),
      precipitation: parseFloat(weatherData?.hourly?.precipitation[i]),
      temperature: parseFloat(weatherData?.hourly?.temperature_2m[i]),
    };

    // If weather data is different day to current cursor, increment day cursor
    let weatherDay = weatherObject?.time.getDay();
    if (parsedDay.length > 0) {
      let previousDay = parsedDay[0]?.time.getDay();
      if (previousDay !== weatherDay) {
        dayIndex += 1;
        parsedDay = parsedWeatherArray[dayIndex];
      }
    }

    // Store 'current' weatherData for navbar
    let weatherHour = weatherObject?.time.getHours();
    if (
      new Date().getHours() === weatherHour &&
      new Date().getDay() === weatherDay
    ) {
      currentWeatherObject = {
        ...weatherObject,
      };
    }

    // Filter out data not between startHour to endHour
    let startTime = parseInt(startHour.split(":")[0]);
    let endTime = parseInt(endHour.split(":")[0]);
    if (weatherHour < startTime || weatherHour > endTime) {
      continue;
    }

    // Push weather object to its correct day array
    parsedDay.push(weatherObject);
  }

  return {
    parsedWeatherArray,
    currentWeatherObject,
    weatherLoading,
    weatherError,
  };
}
