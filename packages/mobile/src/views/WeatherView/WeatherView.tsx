import { Flex, Text, Spinner, Button } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Skyshot from "../../components/Skyshot";
import { useGlobalContext } from "../../lib/Context";
import WeatherViewList from "./WeatherViewList";
import WeatherViewNewView from "./WeatherViewNewView";

const WeatherView = ({ navigation }) => {
  const Stack = createStackNavigator();
  const { geoHook } = useGlobalContext();

  // TSX
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="WeatherMain"
        component={WeatherMainView}
        options={{
          title:
            geoHook?.locationList[geoHook?.locationIndex]?.address || "...",
          headerTintColor: "gray",
          headerRight: () => {
            return (
              <Button
                variant="unstyled"
                size="lg"
                colorScheme="white"
                onPress={() => {
                  navigation.navigate("Edit Views");
                }}
              >
                <MaterialCommunityIcons
                  name="dots-vertical"
                  color={"gray"}
                  size={"md"}
                />
              </Button>
            );
          },
        }}
      />
      <Stack.Screen
        name="Edit Views"
        component={WeatherViewList}
        options={{
          headerTitle: "Views",
        }}
      />
      <Stack.Screen
        name="New View"
        component={WeatherViewNewView}
        options={{
          headerTitle: "New View",
        }}
      />
    </Stack.Navigator>
  );
};

const WeatherMainView = () => {
  // State
  const { weatherHook, geoHook } = useGlobalContext();

  // TSX
  return (
    <Flex
      direction="row"
      paddingX="5"
      paddingTop="5"
      backgroundColor="black"
      flexGrow="1"
    >
      <Flex direction="column" flexGrow="1">
        {/* Loading: Weather is api loading and parsing */}
        {(weatherHook?.weatherLoading || weatherHook?.weatherParsing) && (
          <Spinner />
        )}

        {/* Error: Weather encountered error on api load */}
        {weatherHook?.weatherError && (
          <Text>Problem loading weather from location...</Text>
        )}

        {/* Error: No location added */}
        {!geoHook?.locationList[0] && (
          <Text>Add location to see skyshot views...</Text>
        )}

        {/* Location exists and no loading/errors */}
        {geoHook?.locationList[0] &&
          !weatherHook?.weatherLoading &&
          !weatherHook?.weatherError &&
          !weatherHook?.weatherParsing && (
            <>
              <Skyshot />
            </>
          )}
      </Flex>
    </Flex>
  );
};

export default WeatherView;
