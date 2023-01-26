import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../../lib/Context";
import {
  InterfaceHookType,
  ViewObjectType,
} from "../../lib/useInterfaceSettings";
import { Flex, Text, Pressable, ScrollView } from "native-base";

const listOfWeatherViews = [
  "Temp",
  "Precip",
  "Rain",
  "Snow",
  "Temp/Precip Switcher",
  "minTemp",
  "maxTemp",
  "UV",
];

const WeatherViewNewView = () => {
  // State
  const { interfaceHook }: { interfaceHook: InterfaceHookType } =
    useGlobalContext();
  const navigation = useNavigation();

  // TSX
  return (
    <Flex paddingX="5" paddingTop="5" backgroundColor="black" flexGrow="1">
      <ScrollView>
        {/* TODO: Settings How many days? Which hours? */}

        {/* List bunch of views (rain, temp, snow...) */}
        {listOfWeatherViews.map((wv, index) => {
          return (
            <Pressable
              onPress={() => {
                let newViewObject: ViewObjectType = {
                  componentName: wv,
                  days: 7,
                  startHour: 0,
                  endHour: 23,
                };
                interfaceHook?.addViewToList(newViewObject);
                // @ts-ignore
                navigation.navigate("Edit Views");
              }}
              key={index + "newView"}
              height="10"
              bgColor="rgba(164, 164, 164, 0.2)"
              marginBottom="3"
              borderRadius="20"
              p="2"
            >
              <Text>{wv}</Text>
            </Pressable>
          );
        })}

        {/* TODO: Button to add view */}
        {/* Adds to a view in interfaceSettings, and saves to async storage */}
        {/* Goes back to views screen */}
      </ScrollView>
    </Flex>
  );
};

export default WeatherViewNewView;
