import { Stack, Flex, Text, Center, ScrollView } from "native-base";
import { WeatherType } from "common/lib/types";
import { chooseBG, dayToDay } from "common/lib/helpers";
import { useGlobalContext } from "../lib/Context";

const Skyshot = () => {
  const { weatherHook, geoHook } = useGlobalContext();
  const selectedWeatherData =
    weatherHook?.allParsedWeather[geoHook?.locationIndex]?.weather;

  return (
    <ScrollView bgColor="rgba(164, 164, 164, 0.2)" p="4" borderRadius="20">
      <Text fontSize={24} fontWeight="800">
        7 Day Temperature
      </Text>
      {/* TODO: Hour numbers */}

      {/* This is a grid of 8 even columns */}
      <Flex direction="row">
        {/* This is a map of the days array */}
        {!weatherHook?.weatherLoading &&
          !weatherHook?.weatherParsing &&
          selectedWeatherData?.map((dayArray: WeatherType[], dayIndex) => {
            return (
              // This is a column stack that maps the times of the day into each day column
              <Stack
                direction="column"
                flexGrow="1"
                textAlign="center"
                flex="1"
                m="1"
                key={dayIndex + "day"}
              >
                {/*  TODO: The first row should be a day label */}

                <Text fontSize={10} alignSelf="center">
                  {dayToDay(new Date().getDay() + dayIndex)}
                </Text>

                {dayArray[0] &&
                  dayArray.map((hourData, hourIndex) => {
                    return (
                      <Center
                        height="3.5"
                        textAlign={"center"}
                        bgColor={chooseBG(hourData, "temp")}
                        my="1"
                        key={hourIndex + "center"}
                        borderRadius="4"
                        borderColor="yellow.200"
                        borderWidth={
                          hourData.time.getDay() === new Date().getDay() &&
                          hourData.time.getHours() === new Date().getHours()
                            ? "1"
                            : 0
                        }
                      >
                        <Text fontSize={10} fontWeight="600" color="gray.100">
                          {hourData.temperature}
                        </Text>
                      </Center>
                    );
                  })}
              </Stack>
            );
          })}
      </Flex>
    </ScrollView>
  );
};

export default Skyshot;
