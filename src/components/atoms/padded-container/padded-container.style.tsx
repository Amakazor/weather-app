import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";

const Wrapper = styled.div`
  width: 100%;

  ${responsive({ p: 12 })}
`;

export const PaddedContainerStyle = { Wrapper };
