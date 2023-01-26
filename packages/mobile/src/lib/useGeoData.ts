import { useState, useEffect } from "react";
import { GeoType } from "common/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import { MOBILE_GOOGLE_APIKEY } from "@env";

export interface geoHookType {
  locationList: GeoType[];
  setLocationList: Function;
  locationIndex: number;
  setLocationIndex: Function;
  addLocationToList: Function;
  deleteLocationFromList: Function;
  addLocationIndex: Function;
}

export default function useGeoData(): geoHookType {
  const [locationList, setLocationList] = useState<GeoType[]>([]);
  const [locationIndex, setLocationIndex] = useState(0);

  // On load, get locations from asyncStorage. useEffect allows for async retrieval
  useEffect(() => {
    const getInitialLocationList = async () => {
      // await AsyncStorage.clear();
      const asyncLocationList = await AsyncStorage.getItem("locationList");
      const list =
        asyncLocationList !== null ? JSON.parse(asyncLocationList) : [];
      setLocationList(list);
    };
    getInitialLocationList();
  }, []);

  // On load, get locationIndex from asyncStorage. useEffect allows for async retrieval
  useEffect(() => {
    const getInitialLocationIndex = async () => {
      // await AsyncStorage.clear();
      const asyncLocationIndex = await AsyncStorage.getItem("locationIndex");
      const index =
        asyncLocationIndex !== null ? JSON.parse(asyncLocationIndex) : 0;
      setLocationIndex(index);
    };
    getInitialLocationIndex();
  }, []);

  // Functions
  const addLocationToList = async (newLocation) => {
    // Call Google Timezones API for location timezone data, using latlng + current time
    let axiosRequestConfig = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/timezone/json?location=${
        newLocation.lat
      },${newLocation.lng}&timestamp=${
        new Date().getTime() / 1000
      }&key=${MOBILE_GOOGLE_APIKEY}`,
      headers: {},
    };
    let timezoneResp = null;
    try {
      const resp = await axios(axiosRequestConfig);
      timezoneResp = resp.data;
    } catch (error) {
      Alert.alert("Problem adding location");
    }

    // Append timezone to newLocation. Then append newLocation to current locationList
    const newLocationList = [
      ...locationList,
      {
        ...newLocation,
        timezoneName: timezoneResp?.timeZoneName,
        timezoneID: timezoneResp?.timeZoneId,
      },
    ];
    setLocationList(newLocationList);

    // Save to asyncStorage
    await AsyncStorage.setItem("locationList", JSON.stringify(newLocationList));
  };

  const deleteLocationFromList = async (locationIndex) => {
    const newLocationList = [];
    // Delete by removing index
    for (let i = 0; i < locationList.length; i++) {
      if (locationIndex !== i) {
        newLocationList.push(locationList[i]);
      }
    }
    setLocationList(newLocationList);
    // Save updated locationList to asyncStorage
    await AsyncStorage.setItem("locationList", JSON.stringify(newLocationList));
  };

  const addLocationIndex = async (locationIndex) => {
    setLocationIndex(locationIndex);
    // Save to asyncStorage
    await AsyncStorage.setItem("locationIndex", JSON.stringify(locationIndex));
  };

  return {
    locationList,
    setLocationList,
    locationIndex,
    setLocationIndex,
    addLocationToList,
    deleteLocationFromList,
    addLocationIndex,
  };
}
