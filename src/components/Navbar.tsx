import {
  Container,
  Box,
  Flex,
  Stack,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { BsCloudRain, BsThermometerHalf } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import PlacesAutocomplete from "./PlacesAutocomplete";
import CurrentWeather from "./CurrentWeather";
import SettingsModal from "./SettingsModal";
import { useGlobalContext } from "../lib/context";

export default function Navbar() {
  // Helpers
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { interfaceHook } = useGlobalContext();

  // TSX
  return (
    <Box borderBottomWidth="1px" borderColor="gray.700" mb="20px" height="60px">
      <Container maxW="container.xl" height="100%">
        {/* Left side */}
        <Flex
          align="center"
          height="100%"
          justify="space-between"
          overflow="scroll"
        >
          <Stack direction="row" align="center" spacing="23px">
            {/* Hero */}
            <Heading color="white" fontFamily="Oswald" fontSize="30px">
              SKYSHOT
            </Heading>
            {/* Current */}
            <CurrentWeather />
            {/* Settings */}
            <IconButton
              icon={<AiOutlineSetting />}
              aria-label="Settings"
              size="md"
              bgColor="transparent"
              color="gray.500"
              variant="unstyled"
              _hover={{
                color: "white",
              }}
              onClick={onOpen}
            />
            <SettingsModal isOpen={isOpen} onClose={onClose} />
          </Stack>

          {/* Right side */}
          <Flex direction="row" align="center">
            <Stack
              direction="row"
              align="center"
              spacing="-10px"
              mr={["1px", "1px", "10px"]}
            >
              {/* Rain */}
              <IconButton
                aria-label="Rainfall"
                icon={<BsCloudRain />}
                size="md"
                variant="link"
                color={interfaceHook?.mode === "Rain" ? "white" : "gray.600"}
                _hover={{
                  color: "white",
                }}
                onClick={() => {
                  interfaceHook?.setMode("Rain");
                }}
              />
              {/* Temperature */}
              <IconButton
                aria-label="Temperature"
                icon={<BsThermometerHalf />}
                size="md"
                variant="link"
                color={interfaceHook?.mode === "Temp" ? "white" : "gray.600"}
                _hover={{
                  color: "white",
                }}
                onClick={() => {
                  interfaceHook?.setMode("Temp");
                }}
              />
            </Stack>
            {/* Place */}
            <Box position="static">
              <PlacesAutocomplete />
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
