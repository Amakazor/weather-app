import { Property } from "csstype";

import { SingleOrArray } from "../../../lib/utils/types/single-or-array";
import { theme } from "../../../theme/theme";
import { Style } from "./weather-icon.style";

export type WeatherIconProps = {
  color?: string;
  size?: SingleOrArray<Property.FontSize | number>;
  weight?: typeof theme.fontWeights[number];
  className: string;
};

export const WeatherIcon = ({ className, ...props }: WeatherIconProps) => (
  <Style.Wrapper {...props} className={`wi ${className}`} />
);
