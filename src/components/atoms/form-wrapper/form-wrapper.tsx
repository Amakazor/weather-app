import { AllHTMLAttributes, ReactNode } from "react";

import { FormWrapperStyle as S } from "./form-wrapper.style";

type FormWrapperProps = Omit<
  AllHTMLAttributes<HTMLFormElement>,
  "as" | "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart"
> & {
  children: ReactNode;
};

export const FormWrapper = ({ children, ...props }: FormWrapperProps) => (
  <S.Form
    variants={{
      visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
    }}
    initial="invisible"
    animate="visible"
    {...props}
  >
    {children}
  </S.Form>
);
