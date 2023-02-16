import { Box, Flex, Stack, Text, Skeleton } from "@chakra-ui/react";
import { useGlobalContext } from "../lib/context";
import { useState, useEffect } from "react";
import parseWeekOverview from "common/lib/weatherParsers/parseWeekOverview";
import { utcToZonedTime, format } from "date-fns-tz";
import {
  BsCloudRain,
  BsFillSunFill,
  BsSnow3,
  BsSunset,
  BsSunrise,
} from "react-icons/bs";

const WeeklyOverview = () => {
  // State
  const { weatherHook, geoHook } = useGlobalContext();

  // Set a default state with data structure, to load skeletons
  const [parsedWeather, setParsedWeather] = useState(
    [1, 2, 3, 4, 5, 6, 7].map(() => {
      return { min: 0, max: 0, snow: 0, rain: 0, sunrise: 0, sunset: 0 };
    })
  );
  const [weeklyMin, setWeeklyMin] = useState(0);
  const [weeklyMax, setWeeklyMax] = useState(0);
  const [weeklyDiff, setWeeklyDiff] = useState(weeklyMax - weeklyMin);
  const [weatherParsing, setWeatherParsing] = useState(true);

  useEffect(() => {
    setWeatherParsing(true);
    if (weatherHook?.weatherData?.[0]) {
      let tempParsedWeather = parseWeekOverview(weatherHook?.weatherData?.[0]);
      setParsedWeather(tempParsedWeather?.sevenDays);
      setWeeklyMin(tempParsedWeather?.weeklyMin);
      setWeeklyMax(tempParsedWeather?.weeklyMax);
      setWeeklyDiff(tempParsedWeather?.weeklyDiff);
      setWeatherParsing(false);
    }
  }, [weatherHook?.weatherData]);

  // Functions
  const renderConditionsIcon = (rain, snow) => {
    switch (true) {
      case snow > 0:
        return <BsSnow3 />;
      case rain > 0:
        return <BsCloudRain />;
      default:
        return <BsFillSunFill />;
    }
  };

  // TSX
  return (
    <Box width="32%" mb="50px" p="20px" borderRadius="10px" overflow="scroll">
      <Skeleton
        startColor="gray.900"
        endColor="gray.600"
        fadeDuration={2}
        isLoaded={!weatherHook?.weatherLoading && !weatherParsing}
        height="100%"
        borderRadius="10px"
      >
        {parsedWeather?.map((dayObj, dayIndex) => {
          // Functions
          // Min calculations to find start of temperature bar
          // Eg. weeklow = 3, daylow = 5, distance = 2, totaldistance = 22, 2/22 = 0.09, 0.09*100px = 18px
          let dayMinDiff = dayObj?.min - weeklyMin;
          let minDiff = weeklyDiff - dayMinDiff;
          let minPercentage = weeklyDiff !== 0 ? 1 - minDiff / weeklyDiff : 0;
          let pixelStart = minPercentage * 100;

          // Max calculations. Need to use to calculate temperature  bar width
          let dayDiff = dayObj?.max - dayObj?.min;
          let dayDiffPercentage = dayDiff / weeklyDiff;
          let pixelWidth = dayDiffPercentage * 100;

          // Sunrise times converted to local
          const zonedSunrise = utcToZonedTime(
            new Date(dayObj.sunrise * 1000),
            geoHook?.geoObject?.timezoneID
          );
          const sunriseLocaleTime = format(zonedSunrise, "p");

          const zonedSunset = utcToZonedTime(
            new Date(dayObj.sunset * 1000),
            geoHook?.geoObject?.timezoneID
          );
          const sunsetLocaleTime = format(zonedSunset, "p");

          // TODO: Better to get day data from openMeteo field, as sunrise may occur on day before
          const niceDayFormat = format(zonedSunrise, "E do LLL");

          // TSX
          return (
            <Box mb="30px" key={"weekOv" + dayIndex}>
              <Text
                textTransform="uppercase"
                bgColor="gray.700"
                width="fit-content"
                px="12px"
                py="3px"
                borderRadius="20px"
                mb="5px"
                fontSize="14px"
                fontFamily="Oswald"
              >
                {niceDayFormat}
              </Text>

              {/* Row of data */}
              <Flex direction="row" px="5px" py="5px">
                {/* Icon condition, if raining, rain. If cloudy, cloud. If sunny, sun */}
                <Stack direction="column" mr="20px">
                  <Text fontSize="36px">
                    {renderConditionsIcon(dayObj?.rain, dayObj?.snow)}
                  </Text>
                  {dayObj?.rain && <Text fontSize="8px">{dayObj?.rain}mm</Text>}
                  {dayObj?.snow && <Text fontSize="8px">{dayObj?.snow}mm</Text>}
                </Stack>

                {/* Sunrise/Sunset */}
                <Stack direction="column" spacing="0px" mr="10px">
                  <Stack direction="row" mr="10px">
                    <Text fontSize="18px">
                      <BsSunrise />
                    </Text>
                    <Text fontSize="8px">{sunriseLocaleTime}</Text>
                  </Stack>
                  <Stack direction="row">
                    <Text fontSize="18px">
                      <BsSunset />
                    </Text>
                    <Text fontSize="8px">{sunsetLocaleTime}</Text>
                  </Stack>
                </Stack>

                {/* Min/Max + temperature bar */}
                <Stack direction="row" align="center">
                  <Text fontSize="10px">{dayObj?.min}°C</Text>
                  <Box
                    position="relative"
                    width="100px"
                    height="7px"
                    bgColor="gray.700"
                    borderRadius="40px"
                    overflow="clip"
                  >
                    <Box
                      position="absolute"
                      bgColor="gray.200"
                      left={pixelStart}
                      width={pixelWidth}
                      height="100%"
                    ></Box>
                  </Box>
                  <Text fontSize="10px">{dayObj?.max}°C</Text>
                </Stack>
              </Flex>
            </Box>
          );
        })}
      </Skeleton>
    </Box>
  );
};

export default WeeklyOverview;
