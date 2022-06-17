import React, { MouseEventHandler } from "react";

import { useLocalizedStrings } from "../../../lib/hooks/use-localized-strings";
import { theme } from "../../../theme/theme";
import { Center } from "../../atoms/center";
import { TextWrapper } from "../../atoms/text-wrapper";
import { Tooltip } from "../../atoms/tooltip";
import { i18n } from "./add-location-button.i18n";
import { Style } from "./add-location-button.style";

export type AddLocationButtonProps = {
  size: "small" | "big";
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const AddLocationButton = ({
  size,
  onClick,
  ...props
}: AddLocationButtonProps) => {
  const { strings } = useLocalizedStrings(i18n);

  return (
    <Style.Wrapper {...props} size={size} onClick={onClick}>
      <Center>
        <Tooltip.Container>
          <Tooltip
            direction={size === "big" ? "bottom" : "left"}
            color={"dark"}
            inset={size === "big" ? 0.4 : 0.2}
          >
            <TextWrapper size={6}>{strings.tooltip}</TextWrapper>
          </Tooltip>
          <Center>
            <Style.InsideWrapper size={size}>
              <TextWrapper
                size={size === "big" ? [13] : [10]}
                weight={700}
                color={theme.colors.white}
              >
                +
              </TextWrapper>
            </Style.InsideWrapper>
          </Center>
        </Tooltip.Container>
      </Center>
    </Style.Wrapper>
  );
};
