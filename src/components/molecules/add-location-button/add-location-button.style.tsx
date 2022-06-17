import { rgba } from "polished";
import styled, { css } from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";
import { variant } from "../../../lib/utils/variant-helper";
import { theme } from "../../../theme/theme";
import { AddLocationButtonProps } from "./add-location-button";

const Wrapper = styled.button<Pick<AddLocationButtonProps, "size">>`
  height: 100%;
  width: 100%;

  border: 0;

  background: ${rgba(theme.colors.white, 0.2)};
  opacity: 0.5;

  cursor: pointer;
  transition: opacity 200ms ease-in-out;

  &:hover {
    opacity: 1;
  }

  ${responsive({ h: "100%", w: "100%", bw: 0, radius: 4 })}
`;

const InsideWrapper = styled.span<Pick<AddLocationButtonProps, "size">>`
  display: block;
`;

export const Style = { Wrapper, InsideWrapper };
