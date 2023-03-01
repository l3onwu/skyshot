import { useState, useEffect } from "react";
import { Stack, Text, Skeleton } from "@chakra-ui/react";
import { BsCloudRain, BsFillSunFill } from "react-icons/bs";
import { IoIosWater } from "react-icons/io";
import { useGlobalContext } from "../lib/context";
import parseCurrentWeatherView from "common/lib/weatherParsers/parseCurrentWeatherView";

export default function CurrentWeather() {
  // State
  const { weatherHook, interfaceHook } = useGlobalContext();

  // Set a default state with data structure, to load skeletons
  const [parsedCurrentWeather, setParsedCurrentWeather] = useState({
    precipitation: null,
    temperature: null,
  });
  const [parsing, setParsing] = useState(true);

  useEffect(() => {
    setParsing(true);
    if (weatherHook?.weatherData?.[0]) {
      let currentWeather = parseCurrentWeatherView(
        weatherHook?.weatherData?.[0]
      );
      // @ts-ignore
      setParsedCurrentWeather(currentWeather);
      setParsing(false);
    }
  }, [weatherHook?.weatherData]);

  // TSX
  return (
    <Stack spacing="-3px" direction="row" align="center" justify="center">
      <Text
        style={{ transform: "rotate(300deg)" }}
        fontFamily="Oswald"
        fontSize="10px"
        mr="10px"
      >
        NOW
      </Text>

      {/* Temperature */}
      <Skeleton
        width="60px"
        height="30px"
        startColor="gray.900"
        endColor="gray.600"
        fadeDuration={2}
        isLoaded={!weatherHook?.weatherLoading && !parsing}
        borderRadius="10px"
      >
        <Stack spacing="-2px" direction="column" width="60px" height="50px">
          <Stack direction="row" align="center">
            <Text
              color={
                parsedCurrentWeather?.precipitation > 0 ? "blue" : "orange"
              }
              fontSize="12px"
            >
              {parsedCurrentWeather?.precipitation > 0 ? (
                <BsCloudRain />
              ) : (
                <BsFillSunFill />
              )}
            </Text>
            <Text fontSize="12px">
              {parsedCurrentWeather?.temperature &&
              interfaceHook?.tempUnit === "C"
                ? `${parsedCurrentWeather?.temperature}°C`
                : parsedCurrentWeather?.temperature &&
                  interfaceHook?.tempUnit === "F"
                ? `${(parsedCurrentWeather?.temperature * 1.5 + 32).toFixed(
                    1
                  )}°F`
                : ""}
            </Text>
          </Stack>

          {/* Rain */}
          <Stack direction="row" align="center">
            <Text
              fontSize="12px"
              color={
                parsedCurrentWeather?.precipitation > 0 ? "blue" : "gray.400"
              }
            >
              <IoIosWater />
            </Text>
            <Text fontSize="12px">
              {parsedCurrentWeather?.precipitation}{" "}
              <span style={{ fontSize: "9px" }}> mm</span>
            </Text>
          </Stack>
        </Stack>
      </Skeleton>
    </Stack>
  );
}
