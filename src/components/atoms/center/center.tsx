import { ReactNode } from "react";

import { Flex } from "../flex";

interface CenterProps {
  children: ReactNode;
}

export const Center = ({ children }: CenterProps) => (
  <Flex alignItems="center" justifyContent="center">
    {children}
  </Flex>
);
