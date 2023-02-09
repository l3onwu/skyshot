import { useGlobalContext } from "../lib/context";
import { useState, useEffect } from "react";
import Standard33 from "./ViewTemplates/Standard33";
import parseDailyTemp from "common/lib/weatherParsers/parseDailyTemp";

import { Text, Box, Stack, Flex } from "@chakra-ui/react";

const DailyTemp = () => {
  // State
  const { weatherHook, interfaceHook, geoHook } = useGlobalContext();

  // Set a default state with data structure, to load skeletons
  const [parsedWeather, setParsedWeather] = useState({
    min: 0,
    max: 0,
  });
  const [weatherParsing, setWeatherParsing] = useState(true);

  useEffect(() => {
    setWeatherParsing(true);
    if (weatherHook?.weatherData?.[0]) {
      let tempParsedWeather = parseDailyTemp(weatherHook?.weatherData?.[0]);
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
              Today's Temp
            </Text>
          </Box>
          <Flex direction="row">
            {/* Min */}
            <Box mr="30px">
              <Text color="gray.500" fontSize="12px" fontFamily="Oswald">
                MIN
              </Text>
              <Text fontSize={["14px", "20px", "32px", "48px"]}>{parsedWeather.min}°C</Text>
            </Box>

            {/* Max */}
            <Box>
              <Text color="gray.500" fontSize="12px" fontFamily="Oswald">
                MAX
              </Text>

              <Text fontSize={["14px", "20px", "32px", "48px"]}>{parsedWeather.max}°C</Text>

            </Box>
          </Flex>
        </Box>
      )}
    </Standard33>
  );
};

export default DailyTemp;
