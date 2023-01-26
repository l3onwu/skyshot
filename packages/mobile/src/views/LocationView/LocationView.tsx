import { Flex, ScrollView, Text, Button } from "native-base";
import { useGlobalContext } from "../../lib/Context";
import { createStackNavigator } from "@react-navigation/stack";
import LocationBox from "./LocationBox";
import LocationAddView from "./LocationAddView";

const LocationView = ({ navigation }) => {
  // State
  const Stack = createStackNavigator();

  // TSX
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="LocationMain"
        component={LocationMainView}
        options={{
          headerTitle: "Locations",
          headerRight: () => {
            return (
              <Button
                variant="unstyled"
                size="lg"
                colorScheme="white"
                onPress={() => {
                  navigation.navigate("AddLocation");
                }}
              >
                +
              </Button>
            );
          },
        }}
      />
      <Stack.Screen
        name="AddLocation"
        component={LocationAddView}
        options={{ headerTitle: "Add Location" }}
      />
    </Stack.Navigator>
  );
};

export default LocationView;

const LocationMainView = () => {
  const { geoHook } = useGlobalContext();
  return (
    <Flex paddingX="5" paddingTop="5" backgroundColor="black" flexGrow="1">
      <ScrollView>
        {geoHook?.locationList.map((locationObject, locationIndex) => {
          return (
            <LocationBox
              locationObject={locationObject}
              locationIndex={locationIndex}
            />
          );
        })}
      </ScrollView>
    </Flex>
  );
};
