import { MotionProps } from "framer-motion/types/motion/types";
import { ReactNode } from "react";

import { Style } from "./weather-container.style";

export type WeatherContainerProps = {
  children: ReactNode | ReactNode[];
  areaName: string;
  variant: "big" | "small";
} & MotionProps;

const variants = {
  invisible: { opacity: 0, y: -200 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};

export const WeatherContainer = ({
  areaName,
  children,
  ...props
}: WeatherContainerProps) => (
  <Style.Wrapper
    {...props}
    variants={variants}
    areaName={areaName}
    transition={{ duration: 0.5 }}
  >
    {children}
  </Style.Wrapper>
);
