import { Property } from "csstype";
import { MotionProps } from "framer-motion/types/motion/types";
import { ReactNode } from "react";

import { SingleOrArray } from "../../../lib/utils/types/single-or-array";
import { Style } from "./flex.style";

export type FlexProps = {
  children: ReactNode;
  justifyContent?: SingleOrArray<Property.JustifyContent>;
  alignItems?: SingleOrArray<Property.AlignItems>;
  flexWrap?: SingleOrArray<Property.FlexWrap>;
  gap?: SingleOrArray<Property.Gap | number>;
  flexDirection?: SingleOrArray<Property.FlexDirection>;
  width?: SingleOrArray<Property.Width>;
  height?: SingleOrArray<Property.Height>;
} & MotionProps;

export const Flex = ({
  children,
  width = "100%",
  height = "100%",
  ...props
}: FlexProps) => {
  const styleProps = { width, height };
  return (
    <Style.Wrapper {...props} {...styleProps}>
      {children}
    </Style.Wrapper>
  );
};
