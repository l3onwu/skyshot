# Skyshot
This is the repository for Skyshot, a web app to visualize the weather in a unique calendar view. It can be found at https://skyshot.vercel.app

<kbd>
  <img width="1352" alt="skyshot" src="https://github.com/l3onwu/skyshot/assets/85681107/4060e61d-7b07-4cdb-9087-a952c1ae726c">

</kbd>

## Architecture
The repo is structured as a monorepo in order to minimize dependency installations, and reuse react web components for a future react-native mobile version. Code for the different apps exist in their respective folders, and shared component code is placed in /packages/common.

The web app frontend is built in **Typescript** with **React** and the create-react-app framework.

Deployment is handled by **Vercel.**

The app relies on the OpenMeteo API for weather data - https://open-meteo.com

## Development
You will need Node, `npm` and `yarn` installed, to run the code and manage packages in the monorepo. After cloning the repo, use `yarn install` from the root directory to install the required node modules across all packages.

When adding dependencies in future, follow yarn's guidelines for monorepos. Dependencies required for multiple packages should be made universally available, while those required for single packages should specify their workspaces during installation.

### Local env
You will need to sign up for an API key from Google Cloud, and activate the services - Geocoding API, Maps JavaScript API, Places API and Time Zone API. Ensure to set the application restriction to 'None', and API restrictions to the above mentioned API's, within the Google Cloud console.

You will also need to get an API key from OpenMeteo. This will allow you to make API calls to get weather data.

Once you get the keys, create a `.env` file in the project root directory.

```
REACT_APP_GOOGLE_WEB_APIKEY = ""
REACT_APP_OPENMETEO_KEY = ""
```

## Web app deep-dive
Navigate to the web app directory. Run `npm start` in development to view the app locally. As long as node modules are installed, and `.env` is set up, the app will run.

### Styles
The app uses **Chakra-UI** as a style framework with style props, an implementation of CSS-in-JS. While the app is intended to be responsive, the current design benefits from a larger display.

### State 
State is handled with React's inbuilt `useState`, along with custom hooks which are given scope with React's context API. The philosophy behind this is to simplify the app's design, reflecting the ethos of 'rapid production' and avoid using an external library like Redux. 

The core state management is implemented in the hooks `useGeoData`, `useInterfaceSettings`, and `/common/useWeatherData`. These hooks retrieve geolocation data from Google, weather data from openMeteo, and store UI state. Note that useWeatherData is a common hook that may also be used for the mobile app in the future.

Prop drilling is avoided through the context API, and nesting the app in a context component allows access to the hooks from any component in the app.

```
const { geoHook, weatherHook } = useGlobalContext();
```

The state is then used to generate the app's custom weather components. The display and management of these components represents the app's core functionality. 


### Components
The goal of the app is to provide intuitive and innovative ways of visualizing weather data. This takes the form of custom components, which parse and display data retrieved from the OpenMeteo API. Helper functions are used to transform weather data into the required structures for each component.

#### Skyshot calendar
The core visualization of skyshot is the 'Skyshot' calendar component which takes up its own page. This retrieves hourly weather data for the next 7 days, and assigns each hour's weather to a 'Skybox' component. The user can choose to track either precipitation or temperature, and view the hourly weather data in a calendar format. A custom parser function is used to convert the raw weather data into a 2D array for the calendar view.


## Shared components

Coming soon...
