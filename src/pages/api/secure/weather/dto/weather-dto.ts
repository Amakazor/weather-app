import { DateHelper } from "../../../../../lib/utils/date-helper/date-helper";
import { OpenWeatherResponse } from "../clients/open-weather/open-weather-response-schema";

export type WeatherData = {
  id: number;
  name: string;
  description: string;
};

export type WeatherDto = {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    date: string;
    sunrise: string;
    sunset: string;
    temperature: number;
    pressure: number;
    humidity: number;
    cloudiness: number;
    visibility: number;
    wind: {
      speed: number;
      degrees: number;
    };
    rain?: number;
    snow?: number;
    weather: WeatherData;
  };
  hourly: {
    date: string;
    temperature: number;
    pressure: number;
    humidity: number;
    cloudiness: number;
    visibility: number;
    wind: {
      speed: number;
      degrees: number;
    };
    rain?: number;
    snow?: number;
    weather: WeatherData;
  }[];
  daily: {
    date: string;
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    temperature: {
      averageDay: number;
      minimal: number;
      maximal: number;
      averageNight: number;
      evening: number;
      morning: number;
    };
    pressure: number;
    humidity: number;
    cloudiness: number;
    wind: {
      speed: number;
      degrees: number;
    };
    rain?: number;
    snow?: number;
    weather: WeatherData;
  }[];
  alerts: {
    sender: string;
    event: string;
    start: string;
    end: string;
    description: string;
  }[];
};

export const dtoFromResponse = (response: OpenWeatherResponse): WeatherDto => ({
  latitude: response.lat,
  longitude: response.lon,
  timezone: response.timezone,
  current: {
    date: DateHelper.localDate(
      response.current.dt,
      response.timezone_offset
    ).toISOString(),
    sunrise: DateHelper.localDate(
      response.current.sunrise,
      response.timezone_offset
    ).toISOString(),
    sunset: DateHelper.localDate(
      response.current.sunset,
      response.timezone_offset
    ).toISOString(),
    temperature: response.current.temp,
    pressure: response.current.pressure,
    humidity: response.current.humidity,
    cloudiness: response.current.clouds,
    visibility: response.current.visibility,
    wind: {
      speed: response.current.wind_speed,
      degrees: response.current.wind_deg,
    },
    weather: {
      id: response.current.weather[0].id,
      name: response.current.weather[0].main,
      description: response.current.weather[0].description,
    },
    rain: response.current.rain?.["1h"],
    snow: response.current.snow?.["1h"],
  },
  hourly: response.hourly.map((data) => ({
    date: DateHelper.localDate(data.dt, response.timezone_offset).toISOString(),
    temperature: data.temp,
    pressure: data.pressure,
    humidity: data.humidity,
    cloudiness: data.clouds,
    visibility: data.visibility,
    wind: {
      speed: data.wind_speed,
      degrees: data.wind_deg,
    },
    rain: data.rain?.["1h"],
    snow: data.snow?.["1h"],
    weather: {
      id: data.weather[0].id,
      name: data.weather[0].main,
      description: data.weather[0].description,
    },
  })),
  daily: response.daily.map((data) => ({
    date: DateHelper.localDate(data.dt, response.timezone_offset).toISOString(),
    sunrise: DateHelper.localDate(
      data.sunrise,
      response.timezone_offset
    ).toISOString(),
    sunset: DateHelper.localDate(
      data.sunset,
      response.timezone_offset
    ).toISOString(),
    moonrise: DateHelper.localDate(
      data.moonrise,
      response.timezone_offset
    ).toISOString(),
    moonset: DateHelper.localDate(
      data.moonset,
      response.timezone_offset
    ).toISOString(),
    temperature: {
      averageDay: data.temp.day,
      minimal: data.temp.min,
      maximal: data.temp.max,
      averageNight: data.temp.night,
      evening: data.temp.eve,
      morning: data.temp.morn,
    },
    pressure: data.pressure,
    humidity: data.humidity,
    cloudiness: data.clouds,
    wind: {
      speed: data.wind_speed,
      degrees: data.wind_deg,
    },
    rain: data.rain,
    snow: data.snow,
    weather: {
      id: data.weather[0].id,
      name: data.weather[0].main,
      description: data.weather[0].description,
    },
  })),
  alerts:
    response.alerts?.map((data) => ({
      sender: data.sender_name,
      event: data.event,
      start: DateHelper.localDate(
        data.start,
        response.timezone_offset
      ).toISOString(),
      end: DateHelper.localDate(
        data.end,
        response.timezone_offset
      ).toISOString(),
      description: data.description,
    })) ?? [],
});
