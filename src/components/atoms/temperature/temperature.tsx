import { theme } from "../../../theme/theme";
import { Flex } from "../flex";
import { TextWrapper } from "../text-wrapper";
import { TemperatureStyle as S } from "./temperature.style";

export type TemperatureProps = {
  min: number;
  max: number;
  current: number;
};

export const Temperature = ({ min, max, current }: TemperatureProps) => (
  <Flex
    flexDirection="column"
    gap={4}
    alignItems="center"
    justifyContent="center"
  >
    <S.Bar>
      <S.Dot min={min} max={max} current={current} />
    </S.Bar>
    <TextWrapper color={theme.colors.white} weight={700}>
      {current}°C
    </TextWrapper>
  </Flex>
);
