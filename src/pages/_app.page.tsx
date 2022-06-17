import "weathericons/css/weather-icons.min.css";
import "weathericons/css/weather-icons-wind.css";

import type { AppProps } from "next/app";

import { CurrentLocationContext } from "../lib/context/current-location-context";
import { WeatherContext } from "../lib/context/weather.context";
import { useCurrentLocation } from "../lib/hooks/use-current-location";
import { useWeather } from "../lib/hooks/use-weather";
import { GlobalStyle } from "../theme/global-style";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const weatherData = useWeather();
  const currentLocationData = useCurrentLocation();
  return (
    <WeatherContext.Provider value={weatherData}>
      <CurrentLocationContext.Provider value={currentLocationData}>
        <GlobalStyle />
        <Component {...pageProps} />
      </CurrentLocationContext.Provider>
    </WeatherContext.Provider>
  );
};

export default MyApp;
