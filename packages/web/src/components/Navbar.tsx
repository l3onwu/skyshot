import {
  Container,
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  IconButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { AiOutlineSetting } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import PlacesAutocomplete from "./PlacesAutocomplete";
import CurrentWeather from "./CurrentWeather";
import SettingsModal from "./SettingsModal";
import { useGlobalContext } from "../lib/context";
import { SkyshotNavbar } from "./Skyshot";

export default function Navbar() {
  // Helpers
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { interfaceHook, geoHook } = useGlobalContext();

  // TSX
  return (
    <Box
      borderBottomWidth="1px"
      borderColor="gray.700"
      mb="20px"
      height="60px"
      width="100%"
      position="fixed"
      bgColor="#171819"
      zIndex={999}
    >
      <Container maxW="container.xl" height="100%">
        <Flex align="center" height="100%" justify="space-between">
          {/* Left side */}
          <Stack direction="row" align="center" spacing={["5px", "15px"]}>
            {/* Hero */}
            <Heading
              color="white"
              fontFamily="Oswald"
              fontSize={["18px", "30px"]}
              pr={["0px", "10px"]}
            >
              SKYSHOT
            </Heading>

            {/* Modes */}
            <Box display={["none", "none", "none", "flex"]}>
              <Button
                size="xs"
                colorScheme={
                  interfaceHook?.mode === "Calendar" ? "gray" : "white"
                }
                onClick={() => {
                  interfaceHook?.setMode("Calendar");
                  window.scrollTo(0, 0);
                }}
              >
                Calendar
              </Button>
              <Button
                size="xs"
                colorScheme={
                  interfaceHook?.mode === "Calendar" ? "white" : "gray"
                }
                onClick={() => {
                  interfaceHook?.setMode("Detail");
                  window.scrollTo(0, 0);
                }}
              >
                Detail
              </Button>
            </Box>

            {/* Current */}
            <CurrentWeather />

            {/* Timezone */}
            <Stack spacing="0px" display={["none", "none", "none", "flex"]}>
              <Text fontSize="11px" color="gray.300">
                Your time: {new Date().toLocaleTimeString()}
              </Text>
              {/* <Text fontSize="9px" color="gray.600">
                Timezone: {timezones[geoHook?.timezone]?.display}
              </Text> */}
            </Stack>
          </Stack>

          {/* Right side */}
          <Flex direction="row" align="center">
            {/* Calendar navbar */}
            {interfaceHook?.mode === "Calendar" && (
              <SkyshotNavbar
                mode={interfaceHook?.calendarMode}
                setMode={interfaceHook?.setCalendarMode}
                numberMode={interfaceHook?.numberMode}
                setNumberMode={interfaceHook?.setNumberMode}
              />
            )}

            {/* Settings */}
            <IconButton
              icon={<AiOutlineSetting />}
              aria-label="Settings"
              size="md"
              mr="10px"
              bgColor="transparent"
              color="gray.500"
              variant="ghost"
              _hover={{
                color: "white",
              }}
              _focus={{
                backgroundColor: "transparent",
              }}
              onClick={onOpen}
            />
            <SettingsModal isOpen={isOpen} onClose={onClose} />

            {/* Place */}
            <Stack
              direction="row"
              position="static"
              display={["none", "none", "flex"]}
            >
              <PlacesAutocomplete />
              <IconButton
                aria-label="Get location"
                icon={<BiCurrentLocation />}
                size="md"
                variant="link"
                color="gray.600"
                _hover={{
                  color: "white",
                }}
                onClick={() => {
                  geoHook.getBrowserLocation();
                }}
              />
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
