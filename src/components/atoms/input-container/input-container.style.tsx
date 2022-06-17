import { motion } from "framer-motion";
import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";

const Wrapper = styled(motion.label)`
  display: flex;
  flex-direction: column;
  ${responsive({ gap: 4 })}
`;

export const InputContainerStyle = { Wrapper };
