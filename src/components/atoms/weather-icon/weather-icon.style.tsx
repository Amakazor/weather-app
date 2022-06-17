import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";
import { WeatherIconProps } from "./weather-icon";

const Wrapper = styled.span<
  Pick<WeatherIconProps, "color" | "weight" | "size">
>`
  color: ${({ color }) => color || "inherit"};

  ${({ weight, size }) => responsive({ weight, fs: size })}
`;

export const Style = { Wrapper };
