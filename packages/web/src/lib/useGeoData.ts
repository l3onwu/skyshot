import { useState, useEffect } from "react";
import { getGeocode } from "use-places-autocomplete";
import { GeoType } from "./types";

export default function useGeoData() {
  const [geoObject, setGeoObject] = useState<GeoType>(
    JSON.parse(localStorage.getItem("geoObject")) || {}
  );
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  // Get geolocation from browser. Updates 'firstload' to tell navbar to reload
  const getBrowserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latLngLiteral = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      getGeocode({ location: latLngLiteral }).then((response) => {
        const newGeoObject: GeoType = {
          ...latLngLiteral,
          address: response[0]["formatted_address"],
        };
        localStorage.setItem("geoObject", JSON.stringify(newGeoObject));
        setGeoObject(newGeoObject);
        setFirstLoad(!firstLoad);
      });
    });
  };

  // On app load, check if location data is saved in localstorage
  // If not, ask for user's geo data and save to localStorage
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("geoObject"))) {
      getBrowserLocation();
    }
  }, []);

  return {
    firstLoad,
    geoObject,
    setGeoObject,
    getBrowserLocation,
  };
}
