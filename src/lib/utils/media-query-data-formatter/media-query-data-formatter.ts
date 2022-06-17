import { toPairs } from "lodash";

import { theme } from "../../../theme/theme";
import {
  OptionalPropertyData,
  OptionalPropertyDataWithOptions,
  StyleHelper,
} from "../style-helper/style-helper";

export class MediaQueryDataFormatter {
  private constructor() {}

  static format = (
    props: Record<
      string,
      OptionalPropertyData | OptionalPropertyDataWithOptions
    >
  ): string => {
    const cleanedProps = StyleHelper.cleanProperties(props);

    const aliasedProps = StyleHelper.applyPropertyAliases(cleanedProps);

    const lookedUpProps = StyleHelper.lookupValuesInTheme(aliasedProps);

    const remappedProps = toPairs(lookedUpProps).reduce<
      [string, string | number][][]
    >((prev, cur) => {
      const data = Array.isArray(cur[1]) ? cur[1] : [cur[1]];

      data.forEach((value, index) => {
        prev[index] = prev[index] ?? [];
        prev[index].push([cur[0], value]);
      });

      return prev;
    }, []);

    const queries = remappedProps.map((props, index) =>
      theme.breakpoints[index] && props.length > 0
        ? `${theme.mediaQueries[index]} {${props
            .map((prop) => `${prop[0]}: ${prop[1]}`)
            .join("; ")};}`
        : ""
    );

    return queries.join(" ");
  };
}
