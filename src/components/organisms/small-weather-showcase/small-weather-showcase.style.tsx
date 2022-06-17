import { motion } from "framer-motion";
import { rgba } from "polished";
import styled from "styled-components";

import { theme } from "../../../theme/theme";

const Wrapper = styled(motion.div)``;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const LocationButton = styled.button`
  width: 100%;
  height: 100%;

  opacity: 0;
  background: ${rgba(theme.colors.white, 0.5)};
  border: none;

  transition: opacity 300ms ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

export const SmallWeatherShowcaseStyle = {
  Wrapper,
  ButtonWrapper,
  LocationButton,
};
