import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Switch,
  Box,
  Stack,
  Select,
  Link,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { allHours } from "common/lib/helpers";
import { useGlobalContext } from "../lib/context";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { BiCurrentLocation } from "react-icons/bi";

export default function SettingsModal({ isOpen, onClose }) {
  // State
  const { interfaceHook, geoHook } = useGlobalContext();

  // TSX
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="#0C0D0D" borderColor="gray.800" borderWidth="1px">
        <ModalHeader>
          <Text fontFamily="Oswald">Settings</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Meta */}
          <Stack mb="25px">
            <Text fontSize="14px" color="gray">
              Use Skyshot to view the upcoming weather as a snapshot. Toggle
              between rain and temperature views.
            </Text>
            <Link
              color="gray"
              fontSize="12px"
              href="https://github.com/l3onwu/"
              isExternal
            >
              <Stack direction="row" align="center">
                <AiFillGithub color="gray" />
                <Text color="gray">Developed by Leon Wu</Text>
              </Stack>
            </Link>
          </Stack>
          {/* Location select, display on small devices */}
          <Box position="static" display={["block", "block", "none"]} mb="20px">
            <Text fontSize="14px" mb="7px">
              Location:
            </Text>
            <Flex direction="row">
              <Box width="100%">
                <PlacesAutocomplete />
              </Box>
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
            </Flex>
          </Box>

          {/* C/F */}
          <Box mb="20px">
            <Text fontSize="14px">Celsius | Fahrenheit</Text>
            <Switch
              colorScheme="blue"
              isChecked={interfaceHook?.tempUnit === "F" ? true : false}
              onChange={() => {
                if (interfaceHook?.tempUnit === "F") {
                  localStorage.setItem("tempUnit", "C");
                  interfaceHook?.setTempUnit("C");
                } else {
                  localStorage.setItem("tempUnit", "F");
                  interfaceHook?.setTempUnit("F");
                }
              }}
            />
          </Box>
          {/* 12/24 */}
          <Box mb="20px">
            <Text fontSize="14px">12 | 24 hour</Text>
            <Switch
              colorScheme="blue"
              isChecked={interfaceHook?.timeUnit === "24" ? true : false}
              onChange={() => {
                if (interfaceHook?.timeUnit === "24") {
                  localStorage.setItem("timeUnit", "12");
                  interfaceHook?.setTimeUnit("12");
                } else {
                  localStorage.setItem("timeUnit", "24");
                  interfaceHook?.setTimeUnit("24");
                }
              }}
            />
          </Box>
          {/* Show number values on calendar */}
          <Box mb="20px">
            <Text fontSize="14px">Show temperature on calendar</Text>
            <Switch
              colorScheme="blue"
              isChecked={interfaceHook?.numberMode ? true : false}
              onChange={() => {
                localStorage.setItem(
                  "numberMode",
                  (!interfaceHook?.numberMode).toString()
                );
                interfaceHook?.setNumberMode(!interfaceHook?.numberMode);
              }}
            />
          </Box>
          <Stack direction="row">
            {/* StartHour */}
            {/* <Stack
              direction="column"
              spacing="-5px"
              display={["none", "none", "block"]}
            >
              <Text fontSize="9px" color="gray">
                FROM
              </Text>
              <Select
                width="70px"
                value={interfaceHook?.startHour}
                size="sm"
                color="white"
                variant="unstyled"
                onChange={(e) => {
                  e.preventDefault();
                  localStorage.setItem("startHour", e.target.value);
                  interfaceHook?.setStartHour(e.target.value);
                }}
              >
                {allHours.map((num) => {
                  return <option key={num}>{num}:00</option>;
                })}
              </Select>
            </Stack> */}

            {/* EndHour */}
            {/* <Stack
              direction="column"
              spacing="-5px"
              display={["none", "none", "block"]}
            >
              <Text fontSize="9px" color="gray">
                TO
              </Text>
              <Select
                value={interfaceHook?.endHour}
                size="sm"
                color="white"
                variant="unstyled"
                onChange={(e) => {
                  e.preventDefault();
                  localStorage.setItem("endHour", e.target.value);
                  interfaceHook?.setEndHour(e.target.value);
                }}
              >
                {allHours
                  .filter((hr) => {
                    return (
                      hr > parseInt(interfaceHook?.startHour.split(":")[0])
                    );
                  })
                  .map((num) => {
                    return <option key={num}>{num}:00</option>;
                  })}
              </Select>
            </Stack> */}
          </Stack>
        </ModalBody>

        <ModalFooter pb="25px">
          <Button colorScheme="pink" mr={3} onClick={onClose} size="xs">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
