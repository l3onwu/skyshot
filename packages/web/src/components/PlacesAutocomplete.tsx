import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Box, Text, Stack, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { useGlobalContext } from "../lib/context";
import axios from "axios";
import { GeoType } from "common/lib/types";

export default function PlacesAutocomplete() {
  // Helpers
  const { geoHook } = useGlobalContext();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    defaultValue: geoHook?.geoObject?.address || "",
    requestOptions: {},
    debounce: 500,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then(async (results) => {
        const { lat, lng } = getLatLng(results[0]);
        // After getting lat/lng, call Google Timezones API for location timezone data
        let axiosRequestConfig = {
          method: "get",
          url: `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${
            new Date().getTime() / 1000
          }&key=${process.env.REACT_APP_GOOGLE_WEB_APIKEY}`,
          headers: {},
        };
        let timezoneResp = null;
        try {
          const resp = await axios(axiosRequestConfig);
          timezoneResp = resp.data;
        } catch (error) {
          console.error("Problem adding location");
        }

        // Serialize and save coords + city + timezone to localStorage
        const newGeoObject: GeoType = {
          address: description,
          lat: lat,
          lng: lng,
          timezoneID: timezoneResp?.timeZoneId,
        };
        localStorage.setItem("geoObject", JSON.stringify(newGeoObject));

        // Update local state
        geoHook?.setGeoObject(newGeoObject);
      });
    };

  // Suggestions component
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <Text
          key={place_id}
          onClick={handleSelect(suggestion)}
          color="black"
          p="10px"
          fontSize="12px"
          _hover={{ cursor: "pointer", bgColor: "black", color: "white" }}
        >
          {main_text}, {secondary_text}
        </Text>
      );
    });

  useEffect(() => {
    setValue(geoHook?.geoObject["address"], false);
    clearSuggestions();
  }, [geoHook?.firstLoad]);

  // TSX
  return (
    <Box position="relative" ref={ref}>
      <Input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        variant="unstyled"
        placeholder="Enter location"
        color="gray.500"
        fontSize={["11px", "11px", "13px"]}
        pl="10px"
        width={["100%", "100px", "220px"]}
        borderWidth="1px"
        borderColor="gray.700"
        px="8px"
        py="5px"
        _hover={{ color: "white", borderColor: "white" }}
        _focus={{ color: "white" }}
      />
      {status === "OK" && (
        <Stack direction="column" position="absolute" bgColor="white">
          {renderSuggestions()}
        </Stack>
      )}
    </Box>
  );
}
