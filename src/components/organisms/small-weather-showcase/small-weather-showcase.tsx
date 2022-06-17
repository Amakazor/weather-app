import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useContext } from "react";

import { CurrentLocationContext } from "../../../lib/context/current-location-context";
import { WeatherContext } from "../../../lib/context/weather.context";
import { WeatherModel } from "../../../lib/models/weather-model";
import { theme } from "../../../theme/theme";
import { Center } from "../../atoms/center";
import { Flex } from "../../atoms/flex";
import { MaterialIcon } from "../../atoms/material-icon/material-icon";
import { OpenWeatherIcon } from "../../atoms/open-weather-icon/open-weather-icon";
import { TextWrapper } from "../../atoms/text-wrapper";
import { WeatherIcon } from "../../atoms/weather-icon/weather-icon";
import { WideMotionDiv } from "../../atoms/wide-motion-div/wide-motion-div";
import { SmallWeatherShowcaseStyle as S } from "./small-weather-showcase.style";

export type SmallWeatherShowcaseProps = {
  model: WeatherModel;
  slot: 0 | 1 | 2;
};

const childVariants = {
  inactive: { opacity: 0, scale: 0.9, x: -20 },
  active: { opacity: 1, scale: 1, x: 0 },
};

const parentVariants = {
  active: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};

export const SmallWeatherShowcase = ({
  model,
  slot,
  ...props
}: SmallWeatherShowcaseProps) => {
  const { location, setLocation } = useContext(CurrentLocationContext);
  const { addLocation, data, error, isLoading, locations, removeLocation } =
    useContext(WeatherContext);

  return (
    <S.Wrapper variants={parentVariants} initial="inactive" animate="active">
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        <motion.div variants={childVariants}>
          <TextWrapper color={theme.colors.white} size={8} weight={700}>
            {model.name}
          </TextWrapper>
        </motion.div>
        <motion.div variants={childVariants}>
          <Flex
            flexDirection="row"
            alignItems="baseline"
            justifyContent="center"
            gap={5}
            height="auto"
          >
            <OpenWeatherIcon
              color={theme.colors.primary}
              size={10}
              code={model.current.weather.id}
              night={model.night}
            />
            <TextWrapper color={theme.colors.white} size={8}>
              {Math.round(model.current.temperature)}°C
            </TextWrapper>
          </Flex>
        </motion.div>
        <motion.div variants={childVariants}>
          <Flex
            flexDirection="row"
            alignItems="baseline"
            justifyContent="center"
            gap={5}
            height="auto"
          >
            <MaterialIcon
              name="schedule"
              color={theme.colors.primary}
              size={6}
            />
            <TextWrapper color={theme.colors.white} size={6}>
              {model.currentHour(useRouter().locale ?? "en")}
            </TextWrapper>
          </Flex>
        </motion.div>
        <WideMotionDiv variants={childVariants}>
          <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap={4}
            height="auto"
          >
            <Flex
              flexDirection="row"
              alignItems="baseline"
              gap={4}
              width="auto"
            >
              <WeatherIcon
                color={theme.colors.primary}
                size={6}
                className="wi-cloud"
              />
              <TextWrapper color={theme.colors.white} size={5}>
                {model.current.cloudiness}%
              </TextWrapper>
            </Flex>
            <Flex
              flexDirection="row"
              alignItems="baseline"
              gap={4}
              width="auto"
            >
              <WeatherIcon
                color={theme.colors.primary}
                size={6}
                className="wi-strong-wind"
              />
              <TextWrapper color={theme.colors.white} size={5}>
                {model.current.wind.speed}m/s
              </TextWrapper>
            </Flex>
            <Flex
              flexDirection="row"
              alignItems="baseline"
              gap={4}
              width="auto"
            >
              <WeatherIcon
                color={theme.colors.primary}
                size={6}
                className="wi-humidity"
              />
              <TextWrapper color={theme.colors.white} size={5}>
                {model.current.humidity}%
              </TextWrapper>
            </Flex>
          </Flex>
        </WideMotionDiv>
      </Flex>
      <S.ButtonWrapper>
        <S.LocationButton onClick={() => setLocation(slot)}>
          <Center>
            <MaterialIcon
              name="check_box"
              color={theme.colors.primary}
              size={12}
            />
          </Center>
        </S.LocationButton>
        <S.LocationButton onClick={() => removeLocation(slot)}>
          <Center>
            <MaterialIcon
              name="delete"
              color={theme.colors.primary}
              size={12}
            />
          </Center>
        </S.LocationButton>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};
