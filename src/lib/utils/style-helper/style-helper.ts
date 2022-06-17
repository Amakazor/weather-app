import { theme } from "../../../theme/theme";

export type PropertyData = (string | number)[] | string | number;
export type OptionalPropertyData = PropertyData | undefined;

export type Options = { lookup?: (string | number)[]; preprocess?: boolean };
export type PropertyDataWithOptions = { data: PropertyData; options: Options };
export type OptionalPropertyDataWithOptions = {
  data: PropertyData;
  options: Options;
};

export class StyleHelper {
  private constructor() {}

  private static aliasLookup: { [key: string]: string[] } = {
    ml: ["margin-left"],
    mr: ["margin-right"],
    mt: ["margin-top"],
    mb: ["margin-bottom"],
    m: ["margin-left", "margin-right", "margin-top", "margin-bottom"],
    margin: ["margin-left", "margin-right", "margin-top", "margin-bottom"],
    mx: ["margin-left", "margin-right"],
    my: ["margin-top", "margin-bottom"],
    pl: ["padding-left"],
    pr: ["padding-right"],
    pt: ["padding-top"],
    pb: ["padding-bottom"],
    p: ["padding-left", "padding-right", "padding-top", "padding-bottom"],
    padding: ["padding-left", "padding-right", "padding-top", "padding-bottom"],
    px: ["padding-left", "padding-right"],
    py: ["padding-top", "padding-bottom"],
    justifyContent: ["justify-content"],
    alignItems: ["align-items"],
    flexWrap: ["flex-wrap"],
    flexDirection: ["flex-direction"],
    radius: ["border-radius"],
    bw: ["border-width"],
    borderWidth: ["border-width"],
    h: ["height"],
    w: ["width"],
    fs: ["font-size"],
    weight: ["font-weight"],
  };

  private static preprocessLookup = (
    lookup: (string | number)[]
  ): (string | number)[] =>
    lookup.map((datum) => (typeof datum === "string" ? datum : `${datum}px`));

  private static preprocessedValueLookup = {
    space: StyleHelper.preprocessLookup(theme.space),
    radii: StyleHelper.preprocessLookup(theme.radii),
  };

  private static valueLookup: { [key: string]: (string | number)[] } = {
    "margin-left": StyleHelper.preprocessedValueLookup.space,
    "margin-right": StyleHelper.preprocessedValueLookup.space,
    "margin-top": StyleHelper.preprocessedValueLookup.space,
    "margin-bottom": StyleHelper.preprocessedValueLookup.space,
    "padding-left": StyleHelper.preprocessedValueLookup.space,
    "padding-right": StyleHelper.preprocessedValueLookup.space,
    "padding-top": StyleHelper.preprocessedValueLookup.space,
    "padding-bottom": StyleHelper.preprocessedValueLookup.space,
    gap: StyleHelper.preprocessedValueLookup.space,
    "border-width": StyleHelper.preprocessedValueLookup.space,
    "border-radius": StyleHelper.preprocessedValueLookup.radii,
    width: StyleHelper.preprocessedValueLookup.space,
    height: StyleHelper.preprocessedValueLookup.space,
    "font-size": theme.fontSizes,
    "font-weight": theme.fontWeights,
    top: StyleHelper.preprocessedValueLookup.space,
    bottom: StyleHelper.preprocessedValueLookup.space,
    left: StyleHelper.preprocessedValueLookup.space,
    right: StyleHelper.preprocessedValueLookup.space,
  };

  private static isWithOptions = (
    props: PropertyData | PropertyDataWithOptions
  ): props is PropertyDataWithOptions => {
    return (props as PropertyDataWithOptions).options !== undefined;
  };

  static cleanProperties = (
    props: Record<
      string,
      OptionalPropertyData | OptionalPropertyDataWithOptions
    >
  ): Record<string, PropertyData | PropertyDataWithOptions> =>
    Object.entries(props).reduce(
      (previousValue, currentValue) => ({
        ...previousValue,
        ...(currentValue[1] !== undefined
          ? { [currentValue[0]]: currentValue[1] }
          : {}),
      }),
      {}
    );

  static lookupValuesInTheme = (
    props: Record<string, PropertyData | PropertyDataWithOptions>
  ): Record<string, PropertyData> =>
    Object.entries(props).reduce(
      (previousValue, currentValue) => ({
        ...previousValue,
        ...(StyleHelper.isWithOptions(currentValue[1])
          ? {
              ...(currentValue[1].options.lookup !== undefined
                ? {
                    [currentValue[0]]: StyleHelper.applyLookupToProperties(
                      currentValue[1].data,
                      currentValue[1].options.preprocess
                        ? StyleHelper.preprocessLookup(
                            currentValue[1].options.lookup
                          )
                        : currentValue[1].options.lookup
                    ),
                  }
                : {
                    [currentValue[0]]: StyleHelper.applyLookupToProperties(
                      currentValue[1].data,
                      StyleHelper.findLookupForProperty(currentValue[0])
                    ),
                  }),
            }
          : {
              [currentValue[0]]: StyleHelper.applyLookupToProperties(
                currentValue[1],
                StyleHelper.findLookupForProperty(currentValue[0])
              ),
            }),
      }),
      {}
    );

  private static findLookupForProperty = (
    key: string
  ): (string | number)[] | undefined => StyleHelper.valueLookup[key];

  private static applyLookupToProperties = (
    propertyData: PropertyData,
    lookup: (string | number)[] | undefined
  ): PropertyData =>
    lookup
      ? Array.isArray(propertyData)
        ? propertyData.map((datum) =>
            StyleHelper.applyLookupToProperty(datum, lookup)
          )
        : StyleHelper.applyLookupToProperty(propertyData, lookup)
      : propertyData;

  private static applyLookupToProperty = (
    property: string | number,
    lookup: (string | number)[]
  ): string | number => {
    if (typeof property === "string") return property;

    const value = lookup[Math.abs(property)];
    if (value === undefined) return property;

    if (property < 0) {
      return typeof value === "string" ? `-${value}` : -value;
    }
    return value;
  };

  static applyPropertyAliases = (props: {
    [key: string]: PropertyData | PropertyDataWithOptions;
  }): { [key: string]: PropertyData | PropertyDataWithOptions } => {
    return Object.entries(props).reduce(
      (previousValue, currentValue) => ({
        ...previousValue,
        ...(StyleHelper.aliasLookup[currentValue[0]]
          ? StyleHelper.aliasLookup[currentValue[0]].reduce(
              (prev, cur) => ({ ...prev, [cur]: currentValue[1] }),
              {}
            )
          : { [currentValue[0]]: currentValue[1] }),
      }),
      {}
    );
  };
}
