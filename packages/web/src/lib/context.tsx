import { useContext, createContext } from "react";
import useInterfaceSettings from "./useInterfaceSettings";
// import useWeatherData from "./useWeatherData";
import useWeatherData from "common/lib/useWeatherData";
import useGeoData from "./useGeoData";

const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  // State
  const interfaceHook = useInterfaceSettings();
  const geoHook = useGeoData();
  const weatherHook = useWeatherData({
    geoObjectsArray: [geoHook?.geoObject],
    // timezone: geoHook?.timezone,
    startHour: interfaceHook?.startHour,
    endHour: interfaceHook?.endHour,
  });

  return (
    <GlobalContext.Provider value={{ geoHook, interfaceHook, weatherHook }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
