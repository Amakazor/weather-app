import { rgba } from "polished";
import { Grid } from "react-loader-spinner";

import { theme } from "../../../theme/theme";
import { Center } from "../center";

export const Spinner = () => (
  <Center>
    <Grid visible color={rgba(theme.colors.white, 0.5)} />
  </Center>
);
