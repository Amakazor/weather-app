import { MediaQueryDataFormatter } from "../media-query-data-formatter/media-query-data-formatter";
import {
  OptionalPropertyData,
  OptionalPropertyDataWithOptions,
} from "../style-helper/style-helper";

export class VariantHelper {
  private constructor() {}

  static variant = <T extends string>(data: {
    property: T;
    values: Record<
      T,
      {
        [key: string]: OptionalPropertyData | OptionalPropertyDataWithOptions;
      }
    >;
    default?: {
      [key: string]: OptionalPropertyData | OptionalPropertyDataWithOptions;
    };
  }): string => {
    const selectedValue = data.values.hasOwnProperty(data.property)
      ? data.values[data.property]
      : undefined;

    return !selectedValue
      ? data.default
        ? MediaQueryDataFormatter.format(data.default)
        : ""
      : MediaQueryDataFormatter.format(selectedValue);
  };
}
