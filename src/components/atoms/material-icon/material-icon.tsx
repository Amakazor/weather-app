import { Property } from "csstype";

import { SingleOrArray } from "../../../lib/utils/types/single-or-array";
import { theme } from "../../../theme/theme";
import { Style as S } from "./material-icon.style";

export type MaterialIconProps = {
  color?: string;
  size?: SingleOrArray<Property.FontSize | number>;
  weight?: typeof theme.fontWeights[number];
  name: string;
};

export const MaterialIcon = ({ name, ...props }: MaterialIconProps) => (
  <S.Wrapper {...props}>{name}</S.Wrapper>
);
