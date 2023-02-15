import { Flex, Box, Text } from "@chakra-ui/react";
import DailyPrecip from "../components/DailyPrecip";
import DailySun from "../components/DailySun";
import DailyTemp from "../components/DailyTemp";
import Skyshot from "../components/Skyshot";
import WeeklyOverview from "../components/WeeklyOverview";

const Main = () => {
  return (
    <Flex wrap="wrap" direction="row" justify="space-between">
      {/* Row 1*/}
      <DailyTemp />
      <DailyPrecip />
      <DailySun />

      {/* Row 2 */}
      <WeeklyOverview/>
      <Box width="66%" mb="50px">
        <Skyshot />
      </Box>
    </Flex>
  );
};

const Placeholder = ({ text }) => {
  return (
    <Box
      width="32%"
      height="200px"
      bgColor="gray.800"
      p="10px"
      borderRadius="10px"
      mb="30px"
    >
      <Text>{text}</Text>
    </Box>
  );
};

export default Main;
