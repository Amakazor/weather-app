import { ReactNode } from "react";

import { PaddedContainerStyle as S } from "./padded-container.style";

export type PaddedContainerProps = {
  children: ReactNode;
};

export const PaddedContainer = ({
  children,
  ...props
}: PaddedContainerProps) => <S.Wrapper {...props}>{children}</S.Wrapper>;
