import { Box } from "@chakra-ui/react";

const Standard33 = (props) => {
  return (
    <Box
      width="32%"
      height="150px"
      // bgColor="gray.800"
      // border="1px solid gray"
      // p="20px"
      borderRadius="10px"
      mb="30px"
    >
      {props.children}
    </Box>
  );
};

export default Standard33;
