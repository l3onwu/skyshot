import { useGlobalContext } from "../../lib/Context";
import { useNavigation } from "@react-navigation/native";
import { Flex, Text, Pressable, ScrollView, Box, Button } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  InterfaceHookType,
  ViewObjectType,
} from "../../lib/useInterfaceSettings";

const WeatherViewList = () => {
  const navigation = useNavigation();
  const { interfaceHook }: { interfaceHook: InterfaceHookType } =
    useGlobalContext();

  return (
    <Flex paddingX="5" paddingTop="5" backgroundColor="black" flexGrow="1">
      <ScrollView>
        <Pressable
          mb="5"
          onPress={() => {
            // @ts-ignore
            navigation.navigate("New View");
          }}
        >
          <Box
            borderColor="warmGray.500"
            borderWidth={2}
            height="45"
            borderRadius="20"
            padding="2"
          >
            <Text textAlign="center" color="warmGray.400" fontWeight="800">
              New view
            </Text>
          </Box>
        </Pressable>
        {interfaceHook?.viewsList.map((vo, key) => {
          return <WeatherViewBox viewObject={vo} key={key + "viewBox"} />;
        })}
      </ScrollView>
    </Flex>
  );
};

const WeatherViewBox = ({ viewObject }: { viewObject: ViewObjectType }) => {
  // TSX
  return (
    <>
      <Pressable
        borderWidth="2"
        bgColor="rgba(164, 164, 164, 0.2)"
        borderRadius="10"
        mb="3"
        padding="3"
        // TODO: Drag to reorder views list
      >
        {/* Header */}
        <Flex direction="row" justify="space-between">
          <Box>
            {/* Location name */}
            <Text fontWeight="700">{viewObject?.componentName}</Text>
          </Box>

          {/* Delete button */}
          <Button
            width="10"
            height="8"
            size="xs"
            colorScheme="rgba(164, 164, 164, 0)"
            // onPress={() => {
            //   geoHook?.deleteLocationFromList(locationIndex);
            // }}
          >
            <MaterialCommunityIcons name="delete" color={"gray"} size={"sm"} />
          </Button>
        </Flex>
      </Pressable>
    </>
  );
};

export default WeatherViewList;
