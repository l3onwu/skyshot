import { useGlobalContext } from "../lib/context";
import { useState, useEffect } from "react";
import Standard33 from "./ViewTemplates/Standard33";
import parseDailyTemp from "common/lib/weatherParsers/parseDailyTemp";
import { Text, Box, Skeleton, Flex } from "@chakra-ui/react";

const DailyTemp = () => {
  // State
  const { weatherHook } = useGlobalContext();

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
      <Skeleton
        startColor="gray.900"
        endColor="gray.600"
        fadeDuration={2}
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
              Today's Temp
            </Text>
          </Box>
          <Flex direction="row">
            {/* Min */}
            <Box mr="30px">
              <Text color="gray.500" fontSize="12px" fontFamily="Oswald">
                MIN
              </Text>
              <Text fontSize={["12px", "14px", "24px", "36px"]}>
                {parsedWeather.min}°C
              </Text>
            </Box>

            {/* Max */}
            <Box>
              <Text color="gray.500" fontSize="12px" fontFamily="Oswald">
                MAX
              </Text>

              <Text fontSize={["12px", "14px", "24px", "36px"]}>
                {parsedWeather.max}°C
              </Text>
            </Box>
          </Flex>
        </Box>
      </Skeleton>
    </Standard33>
  );
};

export default DailyTemp;
