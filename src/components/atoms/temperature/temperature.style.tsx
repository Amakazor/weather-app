import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";
import { theme } from "../../../theme/theme";
import { TemperatureProps } from "./temperature";

const calculateTop = (props: TemperatureProps) =>
  ((props.current - props.min) / (props.max - props.min)) * 100;

const Bar = styled.div`
  position: relative;
  background-color: ${theme.colors.white};

  ${responsive({ width: 3, height: 11, radius: 2 })}
`;

const Dot = styled.div<TemperatureProps>`
  position: absolute;
  bottom: ${(props) => calculateTop(props)}%;

  transform: translate(-50%, 50%);

  background-color: ${theme.colors.primary};
  border: ${theme.colors.white} solid;

  ${responsive({ radius: 7, width: 7, height: 7, left: 2, bw: 3 })}
`;

export const TemperatureStyle = { Bar, Dot };
