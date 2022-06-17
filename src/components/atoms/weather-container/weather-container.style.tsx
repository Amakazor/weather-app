import { motion } from "framer-motion";
import { rgba } from "polished";
import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";
import { theme } from "../../../theme/theme";
import { WeatherContainerProps } from "./weather-container";

const Wrapper = styled(motion.div)<
  Pick<WeatherContainerProps, "areaName" | "variant">
>`
  position: relative;

  height: 100%;
  width: 100%;

  aspect-ratio: ${({ variant }) => (variant === "small" ? "4/3" : "2/1")};

  grid-area: ${({ areaName }) => areaName};

  display: flex;
  flex-direction: column;

  border: solid ${rgba(theme.colors.white, 0.2)};

  background: ${theme.colors.backgroundLight};
  color: ${theme.colors.white};

  ${(props) => responsive({ radius: 4, bw: 2, p: 6 })};
`;

export const Style = { Wrapper };
