import { useState, useEffect } from "react";
import { Stack, Text, Skeleton, Flex, IconButton, Box } from "@chakra-ui/react";
import { dayToDay, parseStart } from "common/lib/helpers";
import Skybox from "./Skybox";
import { WeatherType } from "common/lib/types";
import { useGlobalContext } from "../lib/context";
import { utcToZonedTime, format } from "date-fns-tz";
import parseSevenDayTempPrecipView from "common/lib/weatherParsers/parseSevenDayTempPrecipView";
import { BsCloudRain, BsThermometerHalf } from "react-icons/bs";
import { ImListNumbered } from "react-icons/im";

export default function Skyshot() {
  // State
  const { weatherHook, interfaceHook, geoHook } = useGlobalContext();

  // Set a default state with data structure, to load skeletons
  const [parsedWeather, setParsedWeather] = useState({
    weather: [[], [], [], [], [], [], []],
  });
  const [weatherParsing, setWeatherParsing] = useState(true);

  useEffect(() => {
    setWeatherParsing(true);
    if (weatherHook?.weatherData?.[0]) {
      let tempParsedWeather = parseSevenDayTempPrecipView(
        weatherHook?.weatherData?.[0]
      );
      setParsedWeather(tempParsedWeather);
      setWeatherParsing(false);
    }
  }, [weatherHook?.weatherData]);

  // TSX
  return (
    <>
      {/* Navbar */}
      {interfaceHook?.mode === "Detail" && (
        <Flex
          direction="row"
          justify="flex-end"
          align="center"
          width="100%"
          borderBottomWidth="1px"
          borderColor="gray.700"
          pb="5px"
          mb="15px"
        >
          <SkyshotNavbar
            mode={interfaceHook?.calendarMode}
            setMode={interfaceHook?.setCalendarMode}
            numberMode={interfaceHook?.numberMode}
            setNumberMode={interfaceHook?.setNumberMode}
          />
        </Flex>
      )}

      {/* Grid container */}
      <Box overflow="scroll" width="100%">
        {/* Grid */}
        <Flex
          minW={["1200px", "1200px", "0px"]}
          width="100%"
          height="calc(100vh - 100px)"
        >
          {/* Hour numbers */}
          {!weatherHook?.weatherLoading && !weatherParsing && (
            <Stack
              direction="column"
              spacing="5px"
              mr="5px"
              height="100%"
              width="fit-content"
              align="center"
            >
              <Text
                color="transparent"
                py="3px"
                mb="5px"
                fontSize="11px"
                fontFamily="Oswald"
              >
                ..
              </Text>
              {parseStart(
                interfaceHook?.startHour,
                interfaceHook?.endHour,
                interfaceHook?.timeUnit
              ).map((timeNumber, timeIndex) => {
                return (
                  <Flex
                    direction="row"
                    alignItems="center"
                    width="100%"
                    height="100%"
                    p="1px"
                    borderWidth="1px"
                    borderColor="transparent"
                    key={timeIndex}
                  >
                    <Text
                      width="100%"
                      fontSize="9px"
                      color="gray.600"
                      align="center"
                    >
                      {`${timeNumber}`}
                    </Text>
                  </Flex>
                );
              })}
            </Stack>
          )}
          {/* Day columns */}
          {parsedWeather?.weather?.map((dayArray: WeatherType[], dayIndex) => {
            // Parse first time data of day into locale day index
            let firstDataDayIndex = 0;
            if (dayArray[0]?.time) {
              const zonedDate = utcToZonedTime(
                dayArray[0]?.time,
                geoHook?.geoObject?.timezoneID
              );
              const output = format(zonedDate, "e");
              firstDataDayIndex = +output - 1;
            }
            return (
              <Skeleton
                key={`day${dayIndex}`}
                startColor="gray.900"
                endColor="gray.600"
                fadeDuration={2}
                isLoaded={!weatherHook?.weatherLoading && !weatherParsing}
                height="100%"
                minHeight="calc(100vh - 130px)"
                borderRadius="10px"
                width="20%"
                mr="5px"
              >
                <Stack
                  direction="column"
                  spacing="5px"
                  align="center"
                  height="100%"
                >
                  {/* Day tag */}
                  <Text
                    textTransform="uppercase"
                    bgColor="pink.700"
                    width="fit-content"
                    px="12px"
                    py="3px"
                    borderRadius="20px"
                    mb="5px"
                    fontSize="11px"
                    fontFamily="Oswald"
                  >
                    {dayToDay(firstDataDayIndex)}
                  </Text>

                  {/* Skybox */}
                  {dayArray[0] &&
                    dayArray.map((hourData, hourIndex) => {
                      return (
                        <Skybox
                          key={`${dayIndex}, ${hourIndex}`}
                          hourData={hourData}
                          mode={interfaceHook?.calendarMode}
                          numberMode={interfaceHook?.numberMode}
                        />
                      );
                    })}
                </Stack>
              </Skeleton>
            );
          })}
        </Flex>
      </Box>
    </>
  );
}

export const SkyshotNavbar = ({ mode, setMode, numberMode, setNumberMode }) => {
  return (
    <Stack direction="row" align="center" spacing="-10px">
      {/* Temperature */}
      <IconButton
        aria-label="Temperature"
        icon={<BsThermometerHalf />}
        size="md"
        variant="link"
        color={mode === "Temp" ? "white" : "gray.600"}
        _hover={{
          color: "white",
        }}
        onClick={() => {
          setMode("Temp");
        }}
      />

      {/* Rain */}
      <IconButton
        aria-label="Rainfall"
        icon={<BsCloudRain />}
        size="md"
        variant="link"
        color={mode === "Rain" ? "white" : "gray.600"}
        _hover={{
          color: "white",
        }}
        onClick={() => {
          setMode("Rain");
        }}
      />

      <Text color="gray.700" px="15px">
        |
      </Text>

      {/* Numbers */}
      <IconButton
        aria-label="Numbers"
        icon={<ImListNumbered />}
        size="sm"
        variant="link"
        color={numberMode ? "facebook.400" : "gray.600"}
        _hover={{
          color: "white",
        }}
        onClick={() => {
          setNumberMode(!numberMode);
        }}
      />
    </Stack>
  );
};
