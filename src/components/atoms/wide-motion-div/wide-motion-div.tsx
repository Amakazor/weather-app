import { MotionProps } from "framer-motion/types/motion/types";
import { ReactNode } from "react";

import { Style as S } from "./wide-motion-div.style";

export type WideMotionDivProps = {
  children: ReactNode;
} & MotionProps;

export const WideMotionDiv = ({ children, ...props }: WideMotionDivProps) => (
  <S.Wrapper {...props}>{children}</S.Wrapper>
);
