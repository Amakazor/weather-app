import styled from "styled-components";

import { responsive } from "../../../lib/utils/media-query-data-formatter";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);

  grid-auto-flow: column;

  ${responsive({ gap: 7, p: 7 })}

  & > * > *:not(:first-child) {
    ${responsive({ px: 10 })}
  }
`;

const IconContainer = styled.div`
  ${responsive({ width: 9 })}
`;

export const DailyInfoStyle = { Wrapper, IconContainer };
