import { Property } from "csstype";
import { ReactNode } from "react";

import { SingleOrArray } from "../../../lib/utils/types/single-or-array";
import { theme } from "../../../theme/theme";
import { Style } from "./text-wrapper.style";

export type TextWrapperProps = {
  color?: string;
  size?: SingleOrArray<Property.FontSize | number>;
  weight?: typeof theme.fontWeights[number];
  children: ReactNode;
};

export const TextWrapper = ({ children, ...props }: TextWrapperProps) => (
  <Style.Wrapper {...props}>{children}</Style.Wrapper>
);
