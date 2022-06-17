import { motion } from "framer-motion";
import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  ${responsive({ gap: 5 })}
`;

export const FormWrapperStyle = { Form };
