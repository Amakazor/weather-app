import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";
import { MaterialIconProps } from "./material-icon";

const Wrapper = styled.span<
  Pick<MaterialIconProps, "color" | "weight" | "size">
>`
  color: ${({ color }) => color || "inherit"};

  ${({ weight, size }) => responsive({ weight, fs: size })}

  font-family: 'Material Icons';
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
`;

export const Style = { Wrapper };
