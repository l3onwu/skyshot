import { createContext, useContext } from "react";
import useWeatherData, { weatherHookType } from "common/lib/useWeatherData";
import useGeoData, { geoHookType } from "./useGeoData";
import useInterfaceSettings, {
  InterfaceHookType,
} from "./useInterfaceSettings";

export interface GlobalContextType {
  weatherHook: weatherHookType;
  geoHook: geoHookType;
  interfaceHook: InterfaceHookType;
}
export const GlobalContext = createContext(null);

export const GlobalContextProvider = (props) => {
  const geoHook = useGeoData();
  const interfaceHook = useInterfaceSettings();

  const weatherHook = useWeatherData({
    geoObjectsArray: geoHook?.locationList,
    startHour: "0:00",
    endHour: "23:00",
  });

  // TSX
  return (
    <GlobalContext.Provider
      value={{
        geoHook,
        weatherHook,
        interfaceHook,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
