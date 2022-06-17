import styled from "styled-components";

import { theme } from "../../../theme/theme";

const Wrapper = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;

  background: ${theme.colors.background};
`;

export const MainStyle = { Wrapper };
