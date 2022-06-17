import { motion } from "framer-motion";
import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";

const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: 8fr 2fr;
  grid-template-rows: 1fr 1fr 1fr;

  grid-template-areas: "big0 small0" "big0 small1" "big0 small2";

  max-width: 1400px;
  width: 100%;

  ${responsive({ gap: "3rem 3rem" })}
`;

export const HomeLayoutStyle = { Wrapper };
