import {
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { BsCloudRain, BsFillSunFill, BsSnow3 } from "react-icons/bs";
import { checkNow, chooseBG } from "common/lib/helpers";
import { WeatherType } from "common/lib/types";
import { useGlobalContext } from "../lib/context";

export default function Skybox({
  hourData,
  mode,
  numberMode,
}: {
  hourData: WeatherType;
  mode: string;
  numberMode: boolean;
}) {
  // State
  const { interfaceHook } = useGlobalContext();

  // TSX
  return (
    <Popover placement="auto" trigger="hover">
      {/* Popover Trigger Box */}
      <PopoverTrigger>
        <Flex
          direction="row"
          alignItems="center"
          width="100%"
          height="100%"
          p="1px"
          borderRadius="5px"
          borderWidth="1px"
          borderColor={checkNow(hourData["time"]) ? "yellow" : "transparent"}
          bgColor={chooseBG(hourData, mode)}
          transition="background-color 200ms linear"
          _hover={{
            borderColor: "white",
            cursor: "pointer",
          }}
        >
          {/* Conditional snow icon */}
          {mode === "Rain" && hourData["snowfall"] ? (
            <Box position="relative" left="2px" fontSize="8px" color="gray.700">
              <BsSnow3 />
            </Box>
          ) : (
            ""
          )}

          {/* Numbers */}
          <Text
            width="100%"
            fontSize="10px"
            color={
              !numberMode
                ? "transparent"
                : mode === "Rain" && hourData["snowfall"]
                ? "gray.800"
                : "gray.100"
            }
            fontWeight="bold"
            align="center"
          >
            {interfaceHook?.tempUnit === "C"
              ? `${hourData["temperature"]}°C`
              : `${(hourData["temperature"] * 1.5 + 32).toFixed(1)}°F`}
          </Text>
        </Flex>
      </PopoverTrigger>

      {/* Popover Content */}
      <PopoverContent bgColor="black" borderWidth="0px" width="fit-content">
        <PopoverBody>
          {/* Time */}
          <Flex direction="column">
            <Text fontSize="12px" mb="5px">
              {new Date(hourData["time"]).toLocaleTimeString()}
            </Text>

            {/* Temperature */}
            <Stack direction="row" mb="-3px">
              <Text
                color={hourData?.rain > 0 ? "blue" : "orange"}
                fontSize="20px"
              >
                {hourData?.rain > 0 ? <BsCloudRain /> : <BsFillSunFill />}
              </Text>
              <Text>
                {interfaceHook?.tempUnit === "C"
                  ? `${hourData["temperature"]}°C`
                  : `${(hourData["temperature"] * 1.5 + 32).toFixed(1)}°F`}
              </Text>
            </Stack>

            {/* Rain */}
            <Text>
              {hourData?.rain}
              <span style={{ fontSize: "11px" }}> mm</span> rainfall
            </Text>

            {/* Snow */}
            <Text>
              {hourData?.snowfall}
              <span style={{ fontSize: "11px" }}> mm</span> snowfall
            </Text>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
