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
import { BsCloudRain, BsFillSunFill } from "react-icons/bs";
import { checkNow, chooseBG } from "../lib/helpers";
import { WeatherType } from "../lib/types";
import { useGlobalContext } from "../lib/context";

export default function Skybox({ hourData }: { hourData: WeatherType }) {
  // State
  const { interfaceHook } = useGlobalContext();

  // TSX
  return (
    <Popover placement="auto" trigger="hover">
      {/* Popover Trigger Box */}
      <PopoverTrigger>
        <Box
          width="100%"
          height="100%"
          p="1px"
          borderRadius="5px"
          borderWidth="1px"
          borderColor={checkNow(hourData["time"]) ? "yellow" : "transparent"}
          bgColor={chooseBG(hourData, interfaceHook?.mode)}
          transition="background-color 200ms linear"
          _hover={{
            borderColor: "white",
            cursor: "pointer",
          }}
        ></Box>
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
                color={hourData?.precipitation > 0 ? "blue" : "orange"}
                fontSize="20px"
              >
                {hourData?.precipitation > 0 ? (
                  <BsCloudRain />
                ) : (
                  <BsFillSunFill />
                )}
              </Text>
              <Text>
                {interfaceHook?.tempUnit === "C"
                  ? `${hourData["temperature"]}°C`
                  : `${hourData["temperature"] * 1.5 + 32}°F`}
              </Text>
            </Stack>

            {/* Rain */}
            <Text>
              {hourData?.precipitation}
              <span style={{ fontSize: "11px" }}> mm</span> rainfall
            </Text>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
