import { motion } from "framer-motion";
import { MotionProps } from "framer-motion/types/motion/types";
import { MouseEventHandler, ReactNode } from "react";

import { Flex } from "../flex";
import { WeatherSectionSelectorStyle as S } from "./weather-section-selector.style";

export type WeatherSectionSelectorProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
  outerMotion: MotionProps;
  innerMotion: MotionProps;
} & MotionProps;

export const WeatherSectionSelector = ({
  children,
  onClick,
  outerMotion,
  innerMotion,
  ...props
}: WeatherSectionSelectorProps) => {
  return (
    <S.Wrapper {...props} {...outerMotion} onClick={onClick}>
      <motion.div {...innerMotion}>
        <Flex flexDirection="column" alignItems="center" gap={6}>
          {children}
        </Flex>
      </motion.div>
    </S.Wrapper>
  );
};
