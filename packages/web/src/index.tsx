import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./lib/theme";
import { GlobalContextProvider } from "./lib/context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider theme={theme}>
    <GlobalContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GlobalContextProvider>
  </ChakraProvider>
);
