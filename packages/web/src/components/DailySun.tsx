import { useGlobalContext } from "../lib/context";
import { useState, useEffect } from "react";
import Standard33 from "./ViewTemplates/Standard33";
import parseDailySun from "common/lib/weatherParsers/parseDailySun";
import { utcToZonedTime, format } from "date-fns-tz";
import { Text, Box, Stack, Flex } from "@chakra-ui/react";

const DailySun = () => {
  // State
  const { weatherHook, interfaceHook, geoHook } = useGlobalContext();

  // Set a default state with data structure, to load skeletons
  const [parsedWeather, setParsedWeather] = useState({
    sunrise: 0,
    sunset: 0,
  });
  const [weatherParsing, setWeatherParsing] = useState(true);

  const zonedSunrise = utcToZonedTime(
    new Date(parsedWeather.sunrise * 1000),
    geoHook?.geoObject?.timezoneID
  );
  const sunriseLocaleTime = format(zonedSunrise, "p");

  const zonedSunset = utcToZonedTime(
    new Date(parsedWeather.sunset * 1000),
    geoHook?.geoObject?.timezoneID
  );
  const sunsetLocaleTime = format(zonedSunset, "p");

  useEffect(() => {
    setWeatherParsing(true);
    if (weatherHook?.weatherData?.[0]) {
      let tempParsedWeather = parseDailySun(weatherHook?.weatherData?.[0]);
      setParsedWeather(tempParsedWeather);
      setWeatherParsing(false);
    }
  }, [weatherHook?.weatherData]);

  return (
    <Standard33>
      {!weatherHook?.weatherLoading && !weatherParsing && (
        <Box overflow="scroll">
          <Box mb="20px">
            <Text
              textTransform="uppercase"
              bgColor="pink.700"
              width="fit-content"
              px="12px"
              py="3px"
              borderRadius="20px"
              mb="5px"
              fontSize="14px"
              fontFamily="Oswald"
            >
              Today's Sunrise/Sunset
            </Text>
          </Box>
          <Flex direction="row">
            {/* Min */}
            <Box mr="30px">
              <Text color="gray.500" fontSize="12px" fontFamily="Oswald">
                SUN RISES AT
              </Text>
              <Text fontSize={["12px", "14px", "24px", "36px"]}>
                {sunriseLocaleTime}
              </Text>
            </Box>

            {/* Max */}
            <Box>
              <Text color="gray.500" fontSize="12px" fontFamily="Oswald">
                SUNSET AT
              </Text>

              <Text fontSize={["12px", "14px", "24px", "36px"]}>
                {sunsetLocaleTime}
              </Text>
            </Box>
          </Flex>
        </Box>
      )}
    </Standard33>
  );
};

export default DailySun;
