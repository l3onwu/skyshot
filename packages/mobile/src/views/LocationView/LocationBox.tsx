import { Flex, Text, Button, Box, Pressable } from "native-base";
import { useGlobalContext } from "../../lib/Context";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { utcToZonedTime, format } from "date-fns-tz";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const LocationBox = ({ locationObject, locationIndex }) => {
  // State
  const { geoHook, weatherHook } = useGlobalContext();
  const navigation = useNavigation();

  const zoned = utcToZonedTime(
    new Date(),
    geoHook?.locationList[locationIndex]?.timezoneID
  );
  const localTime = format(zoned, "h:mm a cccc dd MMM");

  // TSX
  return (
    <>
      <Pressable
        borderWidth="2"
        backgroundColor="rgba(164, 164, 164, 0.2)"
        borderRadius="10"
        mb="3"
        key={locationObject.address + "" + { locationIndex }}
        padding="3"
        onPress={async () => {
          navigation.navigate("Weather");
          try {
            await geoHook?.addLocationIndex(locationIndex);
          } catch (err) {
            Alert.alert(err);
          }
        }}
      >
        {/* Header */}
        <Flex direction="row" justify="space-between">
          <Box>
            {/* Location name */}
            <Text fontWeight="700">{locationObject.address}</Text>

            {/* Time */}
            <Text fontSize={18} color="gray.400">
              {localTime}
            </Text>
            {/* Delete button */}
          </Box>
          <Button
            width="10"
            height="8"
            size="xs"
            colorScheme="rgba(164, 164, 164, 0)"
            onPress={() => {
              geoHook?.deleteLocationFromList(locationIndex);
            }}
          >
            <MaterialCommunityIcons name="delete" color={"gray"} size={"sm"} />
          </Button>
        </Flex>

        {/* Temperature/conditions */}
        <Text fontSize={36}>
          {weatherHook?.allParsedWeather[locationIndex]?.current?.temperature}{" "}
          °C
        </Text>
      </Pressable>
    </>
  );
};

export default LocationBox;
