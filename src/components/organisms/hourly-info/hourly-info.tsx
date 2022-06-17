import { useRouter } from "next/router";
import { Fragment } from "react";

import { WeatherModel } from "../../../lib/models/weather-model";
import { WeatherDto } from "../../../pages/api/secure/weather/dto/weather-dto";
import { theme } from "../../../theme/theme";
import { Center } from "../../atoms/center";
import { Flex } from "../../atoms/flex";
import { OpenWeatherIcon } from "../../atoms/open-weather-icon/open-weather-icon";
import { Temperature } from "../../atoms/temperature/temperature";
import { TextWrapper } from "../../atoms/text-wrapper";
import { WeatherIcon } from "../../atoms/weather-icon/weather-icon";
import { HourlyInfoStyle as S } from "./hourly-info.style";

export type HourlyInfoProps = {
  info: (WeatherDto["hourly"][number] & { sunset: string; sunrise: string })[];
};

export const HourlyInfo = ({ info }: HourlyInfoProps) => {
  const locale = useRouter().locale ?? "en";
  const minTemperature =
    Math.floor(
      info.reduce(
        (previousValue, currentValue) =>
          currentValue.temperature < previousValue
            ? currentValue.temperature
            : previousValue,
        info[0].temperature
      ) / 10
    ) *
      10 -
    10;

  const maxTemperature =
    Math.ceil(
      info.reduce(
        (previousValue, currentValue) =>
          currentValue.temperature > previousValue
            ? currentValue.temperature
            : previousValue,
        info[0].temperature
      ) / 10
    ) *
      10 +
    10;

  return (
    <S.Wrapper>
      {info.map((hour) => (
        <Fragment key={hour.date.toString()}>
          <Center>
            <TextWrapper size={6}>
              {WeatherModel.formatHour(locale, new Date(hour.date))}
            </TextWrapper>
          </Center>
          <Center>
            <OpenWeatherIcon
              code={hour.weather.id}
              color={theme.colors.primary}
              size={7}
              night={WeatherModel.isNight(
                new Date(hour.date),
                new Date(hour.sunset),
                new Date(hour.sunrise)
              )}
            />
          </Center>
          <Temperature
            min={minTemperature}
            max={maxTemperature}
            current={Math.round(hour.temperature)}
          />
          <Flex alignItems="center" gap={4}>
            <WeatherIcon
              className="wi-barometer"
              color={theme.colors.primary}
            />
            <TextWrapper>{`${hour.pressure}${"\xa0"}hPa`}</TextWrapper>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <WeatherIcon className="wi-humidity" color={theme.colors.primary} />
            <TextWrapper>{`${hour.humidity}${"\xa0"}%`}</TextWrapper>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <WeatherIcon className="wi-cloudy" color={theme.colors.primary} />
            <TextWrapper>{`${hour.cloudiness}${"\xa0"}%`}</TextWrapper>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <WeatherIcon
              className="wi-strong-wind"
              color={theme.colors.primary}
            />
            <TextWrapper>{`${hour.wind.speed}${"\xa0"}m/s`}</TextWrapper>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <WeatherIcon
              className={`wi-wind towards-${hour.wind.degrees}-deg`}
              color={theme.colors.primary}
            />
            <TextWrapper>{`${hour.wind.degrees}°`}</TextWrapper>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <WeatherIcon className="wi-rain" color={theme.colors.primary} />
            <TextWrapper>{`${hour.rain ?? 0}${"\xa0"}mm`}</TextWrapper>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <WeatherIcon className="wi-snow" color={theme.colors.primary} />
            <TextWrapper>{`${hour.snow ?? 0}${"\xa0"}mm`}</TextWrapper>
          </Flex>
        </Fragment>
      ))}
    </S.Wrapper>
  );
};
