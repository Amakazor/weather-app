import { motion } from "framer-motion";
import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";
import { FlexProps } from "./flex";

const Wrapper = styled(motion.div)<Omit<FlexProps, "children">>`
  display: flex;

  ${({
    justifyContent,
    alignItems,
    flexWrap,
    gap,
    flexDirection,
    width,
    height,
  }) =>
    responsive({
      justifyContent,
      alignItems,
      flexWrap,
      gap,
      flexDirection,
      width,
      height,
    })}
`;

export const Style = { Wrapper };
