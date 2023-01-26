import { Flex, Button } from "native-base";
import { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useGlobalContext } from "../../lib/Context";
import { MOBILE_GOOGLE_APIKEY } from '@env'


const LocationAddView = ({ navigation }) => {
  const { geoHook } = useGlobalContext();
  const [tempLocation, setTempLocation] = useState({});

  return (
    <Flex bgColor="black" flexGrow="1" px="5" pt="5">
      {/* Location picker */}
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          setTempLocation({
            address: data.description,
            lat: details.geometry.location.lat,
            lng: details.geometry.location.lng,
          });
        }}
        query={{
          key: MOBILE_GOOGLE_APIKEY,
          language: "en",
        }}
        styles={{
          poweredContainer: {
            display: "none",
          },
        }}
      />

      <Button
        mb="10"
        colorScheme="rgba(164, 164, 164, 0.2)"
        onPress={async () => {
          await geoHook?.addLocationToList(tempLocation);
          navigation.navigate("LocationMain");
        }}
      >
        Save
      </Button>
    </Flex>
  );
};

export default LocationAddView;
