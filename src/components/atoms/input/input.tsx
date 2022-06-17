import { AllHTMLAttributes, forwardRef } from "react";

import { InputStyle as S } from "./input.style";

export type InputProps = Omit<AllHTMLAttributes<HTMLInputElement>, "as">;

export const Input = forwardRef<HTMLInputElement>((props, ref) => (
  <S.StyledInput {...props} ref={ref} />
));
Input.displayName = "Input";
