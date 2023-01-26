import { Stack, Text, SimpleGrid, Skeleton, Flex } from "@chakra-ui/react";
import { dayToDay, parseStart } from "../lib/helpers";
import Skybox from "./Skybox";
import { WeatherType } from "../lib/types";
import { useGlobalContext } from "../lib/context";

export default function Skyshot() {
  // State
  const { weatherHook, interfaceHook } = useGlobalContext();

  // TSX
  return (
    <Stack
      direction="row"
      spacing="5px"
      overflow="scroll"
      width="100%"
      height="calc(100vh - 130px)"
    >
      {/* Hour numbers */}
      {!weatherHook?.weatherLoading && !weatherHook?.weatherParsing && (
        <Stack
          direction="column"
          spacing="5px"
          pt="34px"
          mr="5px"
          minH="500px"
          width="fit-content"
        >
          {parseStart(
            interfaceHook?.startHour,
            interfaceHook?.endHour,
            interfaceHook?.timeUnit
          ).map((timeNumber, timeIndex) => {
            return (
              <Flex height="100%" key={timeIndex} align="center">
                <Text fontSize="8px">{`${timeNumber}`}</Text>
              </Flex>
            );
          })}
        </Stack>
      )}

      {/* Grid */}
      <SimpleGrid
        columns={7}
        spacing="5px"
        minW={["1200px", "1200px", "0px"]}
        width="100%"
        minH="500px"
      >
        {weatherHook?.allParsedWeather[0]?.weather?.map(
          (dayArray: WeatherType[], dayIndex) => {
            return (
              <Skeleton
                key={`day${dayIndex}`}
                startColor="gray.900"
                endColor="gray.600"
                fadeDuration={2}
                isLoaded={
                  !weatherHook?.weatherLoading && !weatherHook?.weatherParsing
                }
                height="100%"
                borderRadius="10px"
              >
                {/* Day columns */}
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
                    {dayToDay(new Date().getDay() + dayIndex)}
                  </Text>

                  {/* Skybox */}
                  {dayArray[0] &&
                    dayArray.map((hourData, hourIndex) => {
                      return (
                        <Skybox
                          key={`${dayIndex}, ${hourIndex}`}
                          hourData={hourData}
                        />
                      );
                    })}
                </Stack>
              </Skeleton>
            );
          }
        )}
      </SimpleGrid>
    </Stack>
  );
}
