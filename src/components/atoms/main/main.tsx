import { ReactNode } from "react";

import { MainStyle as S } from "./main.style";

export type MainProps = {
  children: ReactNode;
};

export const Main = ({ children, ...props }: MainProps) => (
  <S.Wrapper {...props}>{children}</S.Wrapper>
);
