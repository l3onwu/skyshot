import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { WeatherType } from "./types";

export interface weatherHookType {
  weatherData: any;
  allParsedWeather: any;
  weatherLoading: boolean;
  weatherError: Error;
}

export default function useWeatherData({
  geoObjectsArray,
  startHour,
  endHour,
}) {
  // Retrieve weather data, manage with SWR
  const openMeteoFetcher = async () => {
    // Map over geoObjectsArray
    let weatherDataArray = [];
    for (let i = 0; i < geoObjectsArray?.length; i++) {
      const timezoneQuery = `&timezone=auto`;
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${geoObjectsArray[i]["lat"]}&longitude=${geoObjectsArray[i]["lng"]}&hourly=temperature_2m,relativehumidity_2m,precipitation,rain,snowfall,snow_depth,cloudcover,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,snowfall_sum,shortwave_radiation_sum${timezoneQuery}&timeformat=unixtime`
        );
        weatherDataArray.push(response?.data);
        // console.log(response?.data)
      } catch (err) {
        console.log(err);
      }
    }
    return weatherDataArray;
  };

  const { data: weatherData, error: weatherError } = useSWR(
    () => "/weatherData" + JSON.stringify(geoObjectsArray),
    openMeteoFetcher,
    {
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    }
  );
  let weatherLoading = !weatherData && !weatherError;

  const parseWeather = (singleWeatherData) => {
    // PARSE weather data (divide into 7 day arrays of time objects)
    let parsedWeatherArray = [[], [], [], [], [], [], []];
    let currentWeatherObject = {};
    let dayIndex = 0;
    let hoursAddedToDayCounter = 0;

    // Loop over all the retrieved weather data (arrays)
    for (let i = 0; i < singleWeatherData?.hourly?.time.length; i++) {
      // Instantiate current parsed day cursor (using index)
      let parsedDay = parsedWeatherArray[dayIndex];

      // Create weather object from data, cast correct types
      let weatherObject: WeatherType = {
        time: new Date(singleWeatherData?.hourly?.time[i] * 1000),
        precipitation: parseFloat(singleWeatherData?.hourly?.precipitation[i]),
        temperature: parseFloat(singleWeatherData?.hourly?.temperature_2m[i]),
      };

      // Instead, just increment if we hit the specified day length
      // TODO: Replace hardcoded 24 with {variable} based on set time period
      if (hoursAddedToDayCounter === 24) {
        dayIndex += 1;
        parsedDay = parsedWeatherArray[dayIndex];
        hoursAddedToDayCounter = 0;
      }

      // Store 'current' singleWeatherData for navbar
      // Use the exact date object, takes into account diff timezone
      let weatherHour = weatherObject?.time.getHours();
      let weatherDate = weatherObject?.time.getDate();
      if (
        new Date().getHours() === weatherHour &&
        new Date().getDate() === weatherDate
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
      hoursAddedToDayCounter += 1;
    }
    return { weather: parsedWeatherArray, current: currentWeatherObject };
  };

  // Per location weather, parse
  // TODO: these parsed default states vary between parsers/views
  // Set a default state with data structure, to load skeletons
  const [allParsedWeather, setAllParsedWeather] = useState([
    { weather: [[], [], [], [], [], [], []] },
  ]);
  const [weatherParsing, setWeatherParsing] = useState(true);

  useEffect(() => {
    setWeatherParsing(true);
    if (weatherData) {
      let tempParsedWeather = [];
      const loopParseWeather = () => {
        for (let a = 0; a < weatherData?.length; a++) {
          let newWeatherObj = parseWeather(weatherData[a]);
          tempParsedWeather.push(newWeatherObj);
        }
        setAllParsedWeather(tempParsedWeather);
      };
      loopParseWeather();
      setWeatherParsing(false);
    }
  }, [weatherData]);

  return {
    weatherData,
    allParsedWeather,
    weatherLoading,
    weatherError,
    weatherParsing,
  };
}
