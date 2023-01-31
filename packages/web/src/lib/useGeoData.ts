import { useState, useEffect } from "react";
import { getGeocode } from "use-places-autocomplete";
import { GeoType } from "common/lib/types";
import axios from "axios";

export default function useGeoData() {
  const [geoObject, setGeoObject] = useState<GeoType>(
    JSON.parse(localStorage.getItem("geoObject")) || {}
  );
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  // Get geolocation from browser. Updates 'firstload' to tell navbar to reload
  const getBrowserLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latLngLiteral = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      getGeocode({ location: latLngLiteral }).then(async (response) => {
        // After getting browser lat/lng, call Google Timezones API for location timezone data
        let axiosRequestConfig = {
          method: "get",
          url: `https://maps.googleapis.com/maps/api/timezone/json?location=${
            latLngLiteral.lat
          },${latLngLiteral.lng}&timestamp=${new Date().getTime() / 1000}&key=${
            process.env.REACT_APP_GOOGLE_WEB_APIKEY
          }`,
          headers: {},
        };

        let timezoneResp = null;
        try {
          const resp = await axios(axiosRequestConfig);
          timezoneResp = resp.data;
        } catch (error) {
          console.error("Problem adding location");
        }

        const newGeoObject: GeoType = {
          ...latLngLiteral,
          address: response[0]["formatted_address"],
          timezoneID: timezoneResp?.timeZoneId,
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
