import { useGlobalContext } from "../lib/context";
import { useState, useEffect } from "react";
import Standard33 from "./ViewTemplates/Standard33";
import parseDailyPrecip from "common/lib/weatherParsers/parseDailyPrecip";
import { Text, Box, Flex, Skeleton } from "@chakra-ui/react";

const DailyPrecip = () => {
  // State
  const { weatherHook } = useGlobalContext();

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
      <Skeleton
        startColor="gray.900"
        endColor="gray.600"
        isLoaded={!weatherHook?.weatherLoading && !weatherParsing}
        height="100%"
        borderRadius="10px"
      >
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
              Today's Precipitation
            </Text>
          </Box>
          <Flex direction="row">
            {/* Min */}
            <Box mr="30px">
              <Text color="gray.500" fontSize="12px" fontFamily="Oswald">
                RAIN
              </Text>
              <Text fontSize={["12px", "14px", "24px", "36px"]}>
                {parsedWeather.rain}mm
              </Text>
            </Box>

            {/* Max */}
            <Box>
              <Text color="gray.500" fontSize="12px" fontFamily="Oswald">
                SNOW
              </Text>

              <Text fontSize={["12px", "14px", "24px", "36px"]}>
                {parsedWeather.snow}mm
              </Text>
            </Box>
          </Flex>
        </Box>
      </Skeleton>
    </Standard33>
  );
};

export default DailyPrecip;
