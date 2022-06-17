import { ReactNode } from "react";

import { HomeLayoutStyle as S } from "./home-layout.style";

export type HomeLayoutProps = {
  children: ReactNode;
};

const variants = { visible: { transition: { staggerChildren: 0.05 } } };

export const HomeLayout = ({ children, ...props }: HomeLayoutProps) => (
  <S.Wrapper
    variants={variants}
    initial="invisible"
    animate="visible"
    {...props}
  >
    {children}
  </S.Wrapper>
);
