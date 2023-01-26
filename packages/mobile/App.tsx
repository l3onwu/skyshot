import "react-native-gesture-handler";
import { NativeBaseProvider, extendTheme } from "native-base";
import { GlobalContextProvider } from "./src/lib/Context";
import Main from "./src/views/Main";

export default function App() {
  // State
  const theme = extendTheme({
    components: {
      Text: {
        baseStyle: {
          color: "white",
        },
      },
    },
  });

  // TSX
  return (
    <GlobalContextProvider>
      <NativeBaseProvider theme={theme}>
        <Main />
      </NativeBaseProvider>
    </GlobalContextProvider>
  );
}
