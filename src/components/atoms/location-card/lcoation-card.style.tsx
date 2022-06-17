import { motion } from "framer-motion";
import { rgba } from "polished";
import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";
import { theme } from "../../../theme/theme";

const Card = styled(motion.button)`
  border: 2px solid ${theme.colors.white};

  outline-offset: 2px;

  ${responsive({
    fs: 6,
    p: 6,
    radius: 4,
    gap: `${theme.space[3]}px ${theme.space[8]}px`,
  })};

  &:focus-visible,
  &:active {
    outline: 2px solid ${theme.colors.white};
  }

  background: ${rgba(theme.colors.white, 0.1)};
  color: ${theme.colors.white};

  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: 1fr 4fr;

  text-align: left;

  cursor: pointer;
`;

export const LocationCardStyle = { Card };
