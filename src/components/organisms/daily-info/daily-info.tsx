import { capitalize } from "lodash";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import { useLocalizedStrings } from "../../../lib/hooks/use-localized-strings";
import { WeatherModel } from "../../../lib/models/weather-model";
import { WeatherData } from "../../../pages/api/secure/weather/dto/weather-dto";
import { theme } from "../../../theme/theme";
import { Flex } from "../../atoms/flex";
import { MaterialIcon } from "../../atoms/material-icon/material-icon";
import { OpenWeatherIcon } from "../../atoms/open-weather-icon/open-weather-icon";
import { TextWrapper } from "../../atoms/text-wrapper";
import { WeatherIcon } from "../../atoms/weather-icon/weather-icon";
import { DailyInfoStyle as S } from "./daily-info.style";
import { i18n } from "./i18n";

export type DailyInfoProps = {
  date: Date;
  timings: {
    sunrise: Date;
    sunset: Date;
    moonrise: Date;
    moonset: Date;
  };
  temperature: {
    averageDay: number;
    minimal: number;
    maximal: number;
    averageNight: number;
  };
  atmospheric: {
    pressure: number;
    humidity: number;
    cloudiness: number;
    wind: {
      speed: number;
      degrees: number;
    };
    rain?: number;
    snow?: number;
  };
  weather: WeatherData;
  currentTemperature?: number;
  night?: boolean;
};

const getHeading = (iconName: string, item: ReactNode) => (
  <Flex alignItems="center" gap={6} height="auto">
    <MaterialIcon name={iconName} size={9} color={theme.colors.primary} />
    <TextWrapper size={9}>{item}</TextWrapper>
  </Flex>
);

const getRow = (iconName: string, itemA: ReactNode, itemB: ReactNode) => (
  <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
    <Flex flexDirection="row" alignItems="center" gap={4}>
      <S.IconContainer>
        <WeatherIcon
          className={iconName}
          color={theme.colors.primary}
          size={7}
        />
      </S.IconContainer>
      <TextWrapper color={theme.colors.white} size={6}>
        {itemA}
      </TextWrapper>
    </Flex>
    <TextWrapper color={theme.colors.white} size={6}>
      {itemB}
    </TextWrapper>
  </Flex>
);

export const DailyInfo = ({
  atmospheric,
  currentTemperature,
  date,
  temperature,
  timings,
  weather,
  night,
}: DailyInfoProps) => {
  const locale = useRouter().locale ?? "en";
  const { strings } = useLocalizedStrings(i18n);

  return (
    <Flex flexDirection="column">
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={7}
        height="auto"
      >
        <OpenWeatherIcon
          color={theme.colors.primary}
          size={12}
          code={weather.id}
          night={night ?? false}
        />
        <TextWrapper color={theme.colors.white} size={11}>
          {currentTemperature !== undefined
            ? `${Math.round(currentTemperature)}°C`
            : capitalize(weather.description)}
        </TextWrapper>
      </Flex>
      <S.Wrapper>
        <Flex flexDirection="column" alignItems="flex-start" gap={1}>
          {getHeading("schedule", strings.timings)}
          {getRow(
            "wi-sunrise",
            strings.sunrise,
            WeatherModel.formatHour(locale, timings.sunrise)
          )}
          {getRow(
            "wi-sunset",
            strings.sunset,
            WeatherModel.formatHour(locale, timings.sunset)
          )}
          {getRow(
            "wi-moonrise",
            strings.moonrise,
            WeatherModel.formatHour(locale, timings.moonrise)
          )}
          {getRow(
            "wi-moonset",
            strings.moonset,
            WeatherModel.formatHour(locale, timings.moonset)
          )}
        </Flex>
        <Flex flexDirection="column" alignItems="flex-start" gap={1}>
          {getHeading("thermostat", strings.temperatures)}
          {getRow("wi-day-sunny", strings.averageDay, temperature.averageDay)}
          {getRow(
            "wi-night-clear",
            strings.averageNight,
            temperature.averageNight
          )}
          {getRow("wi-thermometer", strings.maximum, temperature.maximal)}
          {getRow(
            "wi-thermometer-exterior",
            strings.minimum,
            temperature.minimal
          )}
        </Flex>
        <Flex flexDirection="column" alignItems="flex-start" gap={1}>
          {getHeading("public", strings.atmospheric)}
          {getRow(
            "wi-barometer",
            strings.pressure,
            `${atmospheric.pressure}${"\xa0"}hPa`
          )}
          {getRow(
            "wi-humidity",
            strings.humidity,
            `${atmospheric.humidity}${"\xa0"}%`
          )}
          {getRow(
            "wi-cloud",
            strings.cloudiness,
            `${atmospheric.cloudiness}${"\xa0"}%`
          )}
        </Flex>
        <Flex flexDirection="column" alignItems="flex-start" gap={1}>
          {getHeading("ac_unit", strings.other)}
          {getRow(
            "wi-rain",
            strings.rainfall,
            `${atmospheric.rain ?? 0}${"\xa0"}mm`
          )}
          {getRow(
            "wi-snow",
            strings.snowfall,
            `${atmospheric.snow ?? 0}${"\xa0"}mm`
          )}
          {getRow(
            "wi-strong-wind",
            strings.windSpeed,
            `${atmospheric.wind.speed}${"\xa0"}m/s`
          )}
          {getRow(
            `wi-wind towards-${atmospheric.wind.degrees}-deg`,
            strings.windDirection,
            `${atmospheric.wind.degrees}°`
          )}
        </Flex>
      </S.Wrapper>
    </Flex>
  );
};
