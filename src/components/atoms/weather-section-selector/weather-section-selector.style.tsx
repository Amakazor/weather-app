import { motion } from "framer-motion";
import { rgba } from "polished";
import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";
import { theme } from "../../../theme/theme";

const Wrapper = styled(motion.div)`
  border: solid ${theme.colors.primary};

  background: ${theme.colors.backgroundLight};
  color: ${theme.colors.white};

  cursor: pointer;

  ${(props) => responsive({ radius: 4, bw: 2, p: 8 })};

  transition: background 200ms ease-in-out;

  &:hover {
    background: ${rgba(theme.colors.white, 0.1)};
  }
`;

export const WeatherSectionSelectorStyle = { Wrapper };
