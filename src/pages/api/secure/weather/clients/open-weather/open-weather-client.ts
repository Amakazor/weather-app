import axios from "axios";

import { AccessError } from "../../../../../../lib/api/access-error";
import { GetParameters } from "../../handlers/get-parameters-schema";

export class OpenWeatherClient {
  private static readonly baseUrl = "https://api.openweathermap.org/data/3.0/";
  private static readonly endpointUrl = `${OpenWeatherClient.baseUrl}onecall`;

  private static readonly constantParameters = {
    exclude: "minutely",
    units: "metric",
  };

  static get = async (parameters: GetParameters) => {
    if (process.env.OPEN_WEATHER_API_KEY) {
      const allParameters = {
        ...OpenWeatherClient.constantParameters,
        lat: parameters.latitude,
        lon: parameters.longitude,
        appid: process.env.OPEN_WEATHER_API_KEY || "",
      };

      return await axios.get(OpenWeatherClient.endpointUrl, {
        params: allParameters,
      });
    }
    throw new AccessError(
      "Open weather access token is missing from the environment"
    );
  };
}
