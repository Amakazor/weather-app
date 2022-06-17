import { rgba } from "polished";
import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";
import { theme } from "../../../theme/theme";

const StyledInput = styled.input`
  border: 2px solid ${theme.colors.white};
  width: min(50ch, 100%);

  outline-offset: 2px;

  ${responsive({ fs: 6, p: 5, radius: 4 })};

  &:focus-visible {
    outline: 2px solid ${theme.colors.white};
  }

  background: ${rgba(theme.colors.white, 0.1)};
  color: ${theme.colors.white};
`;

export const InputStyle = { StyledInput };
