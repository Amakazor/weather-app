import { ReactElement } from "react";

import { theme } from "../../../theme/theme";
import { InputProps } from "../input/input";
import { TextWrapper } from "../text-wrapper";
import { InputContainerStyle as S } from "./input-container.style";

export type InputContainerProps = {
  children: ReactElement<InputProps>;
  label: string;
};

export const InputContainer = ({
  children,
  label,
  ...props
}: InputContainerProps) => (
  <S.Wrapper
    variants={{ visible: { opacity: 1 }, invisible: { opacity: 0.01 } }}
    {...props}
  >
    <TextWrapper color={theme.colors.white} size={6}>
      {label}
    </TextWrapper>
    {children}
  </S.Wrapper>
);
