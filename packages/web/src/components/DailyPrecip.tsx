import { useGlobalContext } from "../lib/context";
import { useState, useEffect } from "react";
import Standard33 from "./ViewTemplates/Standard33";
import parseDailyPrecip from "common/lib/weatherParsers/parseDailyPrecip";

import { Text, Box, Stack, Flex } from "@chakra-ui/react";

const DailyPrecip = () => {
  // State
  const { weatherHook, interfaceHook, geoHook } = useGlobalContext();

  // Set a default state with data structure, to load skeletons
  const [parsedWeather, setParsedWeather] = useState({
    rain: 0,
    snow: 0,
  });
  const [weatherParsing, setWeatherParsing] = useState(true);

  useEffect(() => {
    setWeatherParsing(true);
    if (weatherHook?.weatherData?.[0]) {
      let tempParsedWeather = parseDailyPrecip(weatherHook?.weatherData?.[0]);
      setParsedWeather(tempParsedWeather);
      setWeatherParsing(false);
    }
  }, [weatherHook?.weatherData]);

  return (
    <Standard33>
      {!weatherHook?.weatherLoading && !weatherParsing && (
        <Box overflow="scroll">
          <Box mb="20px">
            <Text fontFamily="Oswald" fontSize="20px" >
              Today's Precipitation
            </Text>
          </Box>
          <Flex direction="row">
            {/* Min */}
            <Box mr="30px">
              <Text color="gray.500" fontSize="12px" fontFamily="Oswald">
                RAIN
              </Text>
              <Text fontSize={["14px", "20px", "32px", "48px"]}>{parsedWeather.rain}mm</Text>
            </Box>

            {/* Max */}
            <Box>
              <Text color="gray.500" fontSize="12px" fontFamily="Oswald">
                SNOW
              </Text>

              <Text fontSize={["14px", "20px", "32px", "48px"]}>{parsedWeather.snow}mm</Text>

            </Box>
          </Flex>
        </Box>
      )}
    </Standard33>
  );
};

export default DailyPrecip;
