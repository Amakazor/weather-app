import { motion } from "framer-motion";
import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";
import { theme } from "../../../theme/theme";

const Wrapper = styled(motion.div)`
  display: grid;

  grid-auto-flow: column;

  ${responsive({
    "grid-template-columns": ["repeat(48, 1fr)"],
    "grid-template-rows": ["repeat(10, auto)"],
    gap: [`0 ${theme.space[6]}px`],
  })};

  overflow-x: scroll;
`;

export const HourlyInfoStyle = { Wrapper };
