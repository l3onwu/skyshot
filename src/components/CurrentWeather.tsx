import { Stack, Text, Skeleton } from "@chakra-ui/react";
import { BsCloudRain, BsFillSunFill } from "react-icons/bs";
import { IoIosWater } from "react-icons/io";
import { useGlobalContext } from "../lib/context";

export default function CurrentWeather() {
  // State
  const { weatherHook, interfaceHook } = useGlobalContext();

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
        isLoaded={!weatherHook?.weatherLoading}
        borderRadius="10px"
      >
        <Stack spacing="-2px" direction="column" width="60px" height="50px">
          <Stack direction="row" align="center">
            <Text
              color={
                weatherHook?.currentWeatherObject?.precipitation > 0
                  ? "blue"
                  : "orange"
              }
              fontSize="12px"
            >
              {weatherHook?.currentWeatherObject?.precipitation > 0 ? (
                <BsCloudRain />
              ) : (
                <BsFillSunFill />
              )}
            </Text>
            <Text fontSize="12px">
              {weatherHook?.currentWeatherObject?.temperature &&
              interfaceHook?.tempUnit === "C"
                ? `${weatherHook?.currentWeatherObject?.temperature}°C`
                : weatherHook?.currentWeatherObject?.temperature &&
                  interfaceHook?.tempUnit === "F"
                ? `${(
                    weatherHook?.currentWeatherObject?.temperature * 1.5 +
                    32
                  ).toFixed(1)}°F`
                : ""}
            </Text>
          </Stack>

          {/* Rain */}
          <Stack direction="row" align="center">
            <Text
              fontSize="12px"
              color={
                weatherHook?.currentWeatherObject?.precipitation > 0
                  ? "blue"
                  : "gray.400"
              }
            >
              <IoIosWater />
            </Text>
            <Text fontSize="12px">
              {weatherHook?.currentWeatherObject?.precipitation}{" "}
              <span style={{ fontSize: "9px" }}> mm</span>
            </Text>
          </Stack>
        </Stack>
      </Skeleton>
    </Stack>
  );
}
