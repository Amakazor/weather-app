import { ReactNode } from "react";

import { Style } from "./tooltip.style";

export type TooltipProps = {
  direction: "left" | "right" | "top" | "bottom";
  color: "light" | "dark";
  inset?: number;
  children: ReactNode;
};

export type TooltipContainerProps = {
  children: ReactNode;
};

export const Tooltip = ({ children, inset = 0, ...props }: TooltipProps) => (
  <Style.Tooltip {...props} inset={inset}>
    <Style.TooltipBeak {...props} />
    {children}
  </Style.Tooltip>
);

const TooltipContainer = ({ children, ...props }: TooltipContainerProps) => (
  <Style.TooltipContainer {...props}>{children}</Style.TooltipContainer>
);

Tooltip.Container = TooltipContainer;
