import { Flex, Box, Text } from "@chakra-ui/react";
import Skyshot from "../components/Skyshot";

const Main = () => {
  return (
    <Flex wrap="wrap" direction="row" justify="space-between">
      <Placeholder text="Current/Min/Max" />
      <Placeholder text="Precip" />
      <Placeholder text="Sunrise/Sunset" />
      <Box
        width="32%"
        mb="50px"
        p="10px"
        borderRadius="10px"
        bgColor="gray.800"
      ></Box>
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
