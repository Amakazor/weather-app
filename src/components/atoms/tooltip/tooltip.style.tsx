import styled, { css } from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";
import { variant } from "../../../lib/utils/variant-helper";
import { theme } from "../../../theme/theme";
import { TooltipProps } from "./tooltip";

const baseStyle = css<Pick<TooltipProps, "color">>`
  position: absolute;

  background: ${({ color }) =>
    color === "dark" ? theme.colors.darkGrey : theme.colors.white};

  color: ${({ color }) =>
    color === "dark" ? theme.colors.white : theme.colors.darkGrey};

  border: ${({ color }) =>
      color === "dark" ? theme.colors.white : theme.colors.darkGrey}
    solid;

  ${responsive({ bw: 2 })}
`;

const Tooltip = styled.div<Pick<TooltipProps, "color" | "direction" | "inset">>`
  ${baseStyle};

  transition: opacity 200ms ease-in-out;

  ${responsive({ py: 3, px: 6, radius: 3, width: "max-content" })}

  ${({ direction, inset }) =>
    variant({
      property: direction,
      values: {
        left: {
          right: `calc(100% - 50% * ${inset})`,
          top: "50%",
          transform: "translateX(-10px) translateY(-50%)",
        },
        right: {
          left: `calc(100% - 50% * ${inset})`,
          top: "50%",
          transform: "translateX(10px) translateY(-50%)",
        },
        top: {
          bottom: `calc(100% - 50% * ${inset})`,
          left: "50%",
          transform: "translateY(-10px) translateX(-50%)",
        },
        bottom: {
          top: `calc(100% - 50% * ${inset})`,
          left: "50%",
          transform: "translateY(10px) translateX(-50%)",
        },
      },
    })};
`;

const TooltipBeak = styled.div<Pick<TooltipProps, "color" | "direction">>`
  ${baseStyle};
  border-right: transparent;
  border-bottom: transparent;

  clip-path: polygon(0 0, 0% 100%, 100% 0);

  ${responsive({ width: 6, height: 6 })}

  ${({ direction }) =>
    variant({
      property: direction,
      values: {
        left: {
          right: 0,
          top: "50%",
          transform:
            "translateX(47%) translateY(-50%) rotateZ(calc(45deg + 90deg * 1))",
        },
        right: {
          left: 0,
          top: "50%",
          transform:
            "translateX(-47%) translateY(-50%) rotateZ(calc(45deg + 90deg * 3))",
        },
        top: {
          bottom: 0,
          left: "50%",
          transform:
            "translateY(47%) translateX(-50%) rotateZ(calc(45deg + 90deg * 2))",
        },
        bottom: {
          top: 0,
          left: "50%",
          transform:
            "translateY(-47%) translateX(-50%) rotateZ(calc(45deg + 90deg * 0))",
        },
      },
    })};
`;

const TooltipContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  &:hover > ${Tooltip} {
    opacity: 1;
  }

  &:not(:hover) > ${Tooltip} {
    opacity: 0;
  }
`;

export const Style = { Tooltip, TooltipBeak, TooltipContainer };
