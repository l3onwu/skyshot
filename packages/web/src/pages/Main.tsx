import { Flex, Box } from "@chakra-ui/react";
import DailyPrecip from "../components/DailyPrecip";
import DailySun from "../components/DailySun";
import DailyTemp from "../components/DailyTemp";
import Skyshot from "../components/Skyshot";
import WeeklyOverview from "../components/WeeklyOverview";
import { useGlobalContext } from "../lib/context";

const Main = () => {
  const { interfaceHook } = useGlobalContext();
  return (
    <>
      {interfaceHook?.mode === "Calendar" ? <MainCalendar /> : <MainDetail />}
    </>
  );
};

const MainCalendar = () => {
  return (
    <Flex>
      <Box width="100%">
        <Skyshot />
      </Box>
    </Flex>
  );
};

const MainDetail = () => {
  return (
    <Flex wrap="wrap" direction="row" justify="space-between" pt="20px">
      {/* Row 1*/}
      <DailyTemp />
      <DailyPrecip />
      <DailySun />

      {/* Row 2 */}
      <WeeklyOverview />
      <Box width="66%">
        <Skyshot />
      </Box>
    </Flex>
  );
};

export default Main;
