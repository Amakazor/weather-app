import { motion } from "framer-motion";
import { rgba } from "polished";
import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";
import { theme } from "../../../theme/theme";

const Sections = styled(motion.div)`
  display: grid;

  width: 100%;

  ${responsive({
    "grid-template-columns": ["1fr", "1fr", "repeat(2, 1fr)", "repeat(4, 1fr)"],
    "grid-template-rows": [
      "repeat(4, 1fr)",
      "repeat(4, 1fr)",
      "repeat(2, 1fr)",
      "1fr",
    ],
    gap: 8,
    p: 8,
  })}
`;

const FullscreenSection = styled(motion.div)`
  position: absolute;
  top: -2px;
  left: -2px;
  bottom: -2px;
  right: -2px;

  border: solid ${theme.colors.primary};

  background: ${theme.colors.backgroundLight};
  color: ${theme.colors.white};

  ${responsive({ radius: 4, bw: 2, p: 8 })};
`;

const SectionCloseButton = styled(motion.button)`
  cursor: pointer;
  background: ${rgba(theme.colors.white, 0.1)};
  border: none;
  color: ${theme.colors.white};

  ${responsive({ radius: 4, p: 4 })};

  transition: all 200ms ease-in-out;

  &:hover {
    background: ${rgba(theme.colors.white, 0.2)};
    color: ${theme.colors.primary};
  }
`;

const DailyGrid = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;

  ${responsive({
    "grid-template-rows": ["repeat(2, 1fr)"],
    "grid-template-columns": ["repeat(4, 1fr)"],
    gap: 10,
    p: 8,
    py: 13,
  })}
`;

const DaySelector = styled(motion.div)`
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

export const BigWeatherShowcaseStyle = {
  Sections,
  FullscreenSection,
  SectionCloseButton,
  DailyGrid,
  DaySelector,
};
