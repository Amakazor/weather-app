import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";
import { TextWrapperProps } from "./text-wrapper";

const Wrapper = styled.span<
  Pick<TextWrapperProps, "color" | "weight" | "size">
>`
  color: ${({ color }) => color || "inherit"};

  ${({ weight, size }) => responsive({ weight, fs: size })}
`;

export const Style = { Wrapper };
