import { DailyInfoProps } from "../../components/organisms/daily-info/daily-info";
import { WeatherDto } from "../../pages/api/secure/weather/dto/weather-dto";

export class WeatherModel {
  get name(): string {
    return this._name;
  }

  get current() {
    return this._dto.current;
  }

  get hourly() {
    return this._dto.hourly;
  }

  get daily() {
    return this._dto.daily;
  }

  get alerts() {
    return this._dto.alerts;
  }

  get latitude() {
    return this._dto.latitude;
  }

  get longitude() {
    return this._dto.longitude;
  }

  get timezone() {
    return this._dto.timezone;
  }

  currentHour = (locale: string) => {
    return new Date(this._dto.current.date).toLocaleString(locale, {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  };

  static formatHour = (locale: string, date: Date) => {
    return date.toLocaleString(locale, {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  };

  static formatDayOfMonth = (locale: string, date: Date) => {
    return date.toLocaleString(locale, {
      day: "2-digit",
      month: "long",
    });
  };

  get night() {
    return (
      new Date(this.current.date).getTime() >
        new Date(this.current.sunset).getTime() ||
      new Date(this.current.date).getTime() <
        new Date(this.current.sunrise).getTime()
    );
  }

  static isNight = (date: Date, sunset: Date, sunrise: Date) => {
    return (
      date.getTime() > sunset.getTime() || date.getTime() < sunrise.getTime()
    );
  };

  get currentDailyInfo(): DailyInfoProps {
    return {
      date: new Date(this.current.date),
      atmospheric: {
        cloudiness: this.current.cloudiness,
        humidity: this.current.humidity,
        pressure: this.current.pressure,
        wind: this.current.wind,
      },
      temperature: this.daily[0].temperature,
      timings: {
        moonrise: new Date(this.daily[0].moonrise),
        moonset: new Date(this.daily[0].moonset),
        sunrise: new Date(this.daily[0].sunrise),
        sunset: new Date(this.daily[0].sunset),
      },
      weather: this.current.weather,
      currentTemperature: this.current.temperature,
      night: this.night,
    };
  }

  get allDailyInfo(): DailyInfoProps[] {
    return this.daily.map((info) => ({
      date: new Date(info.date),
      atmospheric: info,
      temperature: info.temperature,
      timings: {
        moonrise: new Date(info.moonrise),
        moonset: new Date(info.moonset),
        sunrise: new Date(info.sunrise),
        sunset: new Date(info.sunset),
      },
      weather: info.weather,
    }));
  }

  private constructor(
    private readonly _dto: WeatherDto,
    private readonly _name: string
  ) {}

  static fromDto = (dto: WeatherDto, name: string) =>
    new WeatherModel(dto, name);
}
