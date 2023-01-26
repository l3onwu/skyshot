import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WeatherView from "./WeatherView/WeatherView";
import LocationView from "./LocationView/LocationView";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Main = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <StatusBar style="inverted" />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "black" },
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      >
        <Tab.Screen
          name="Weather"
          component={WeatherView}
          options={{
            headerShown: false,
            tabBarLabel: "Weather",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="weather-sunny"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="map" color={color} size={size} />
            ),
          }}
          name="Locations"
          component={LocationView}
        />
        <Tab.Screen
          name="Settings"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Main;

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}
