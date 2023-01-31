import axios from "axios";
import useSWR from "swr";

export interface weatherHookType {
  weatherData: any;
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

  return {
    weatherData,
    weatherLoading,
    weatherError,
  };
}
