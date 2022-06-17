import { WeatherIcon, WeatherIconProps } from "../weather-icon/weather-icon";

export type OpenWeatherIconProps = Omit<WeatherIconProps, "className"> & {
  code: number;
  night: boolean;
};

export const OpenWeatherIcon = ({
  code,
  night,
  ...props
}: OpenWeatherIconProps) => (
  <WeatherIcon
    {...props}
    className={`wi-owm-${night ? "night" : "day"}-${code} `}
  />
);
