import { Box, Container, Heading } from "@chakra-ui/react";
import { useGlobalContext } from "./lib/context";
import Navbar from "./components/Navbar";
import Skyshot from "./components/Skyshot";

// Main view
function App() {
  // State
  const { geoHook, weatherHook } = useGlobalContext();

  // TSX
  return (
    <Box height="100vh" width="100vw" bgColor="#171819">
      {/* Navbar */}
      <Navbar />

      {/* Page contents */}
      <Container maxW="container.xl" minH="calc(100vh - 100px)">
        {/* Fetching error, location set */}
        {weatherHook?.weatherError &&
          geoHook?.geoObject?.lat &&
          geoHook?.timezone && (
            <Heading fontFamily="Oswald" color="gray.500" fontWeight="regular">
              Trouble loading data. Try refreshing the page...
            </Heading>
          )}

        {/* Fetching error, no location set */}
        {weatherHook?.weatherError &&
          !geoHook?.geoObject?.lat &&
          !weatherHook?.parsedWeatherArray[0][0] && (
            <Heading fontFamily="Oswald" color="gray.500" fontWeight="regular">
              Enter a location to view the weather...
            </Heading>
          )}

        {/* Fetching error, no timezone set */}
        {weatherHook?.weatherError &&
          geoHook?.geoObject?.lat &&
          !geoHook?.timezone && (
            <Heading fontFamily="Oswald" color="gray.500" fontWeight="regular">
              Enter a timezone in settings to view the weather...
            </Heading>
          )}

        {/* Loading and success. Weather view*/}
        {!weatherHook?.weatherError && <Skyshot />}
      </Container>
    </Box>
  );
}

export default App;
