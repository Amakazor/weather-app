import { motion } from "framer-motion";
import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${responsive({ gap: 4, pt: 8 })};
  overflow: hidden;
`;

const Wrapper = styled(motion.div)`
  display: grid;
  max-height: 100%;

  overflow-y: scroll;

  grid-auto-rows: 1fr;

  ${responsive({
    "grid-template-columns": ["1fr", "1fr", "repeat(2, 1fr)"],
    gap: [7],
    p: 5,
  })};
`;

export const LocationCardListStyle = { Wrapper, OuterWrapper };
