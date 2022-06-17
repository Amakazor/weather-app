import { isSameDay } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

import { useLocalizedStrings } from "../../../lib/hooks/use-localized-strings";
import { WeatherModel } from "../../../lib/models/weather-model";
import { theme } from "../../../theme/theme";
import { Center } from "../../atoms/center";
import { Flex } from "../../atoms/flex";
import { MaterialIcon } from "../../atoms/material-icon/material-icon";
import { OpenWeatherIcon } from "../../atoms/open-weather-icon/open-weather-icon";
import { TextWrapper } from "../../atoms/text-wrapper";
import { WeatherSectionSelector } from "../../atoms/weather-section-selector/weather-section-selector";
import { WideMotionDiv } from "../../atoms/wide-motion-div/wide-motion-div";
import { DailyInfo, DailyInfoProps } from "../daily-info/daily-info";
import { HourlyInfo } from "../hourly-info/hourly-info";
import { BigWeatherShowcaseStyle as S } from "./big-weather-showcase.style";
import { i18n } from "./i18n";

const childVariants = {
  inactive: { opacity: 0, scale: 0.9, x: -20 },
  active: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
  hover: { scale: 1.05 },
};

const parentVariants = {
  active: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};

const parentVariantsFast = {
  active: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export enum Section {
  current,
  Hourly,
  Daily,
  Events,
}

export type BigWeatherShowcaseProps = {
  model: WeatherModel;
};

export const BigWeatherShowcase = ({ model }: BigWeatherShowcaseProps) => {
  const [openSection, setOpenSection] = useState<Section | null>(null);
  const [openDay, setOpenDay] = useState<DailyInfoProps | null>(null);

  const { strings } = useLocalizedStrings(i18n);
  const locale = useRouter().locale ?? "en";

  const sectionsLookup: Record<
    Section,
    { element: ReactNode; icon: string; text: string }
  > = {
    [Section.current]: {
      element: <DailyInfo {...model.currentDailyInfo} />,
      icon: "today",
      text: strings.current,
    },
    [Section.Hourly]: {
      element: (
        <HourlyInfo
          info={model.hourly.map((hour) => ({
            ...hour,
            sunset: (
              model.daily.find((day) =>
                isSameDay(new Date(day.date), new Date(hour.date))
              ) ?? model.daily[0]
            ).sunset,
            sunrise: (
              model.daily.find((day) =>
                isSameDay(new Date(day.date), new Date(hour.date))
              ) ?? model.daily[0]
            ).sunrise,
          }))}
        />
      ),
      icon: "av_timer",
      text: strings.hourly,
    },
    [Section.Daily]: {
      element: (
        <>
          <S.DailyGrid
            variants={parentVariantsFast}
            initial="inactive"
            animate="active"
            exit="inactive"
          >
            {model.allDailyInfo.map((day) => (
              <S.DaySelector
                key={day.date.getTime()}
                layoutId={day.date.getTime().toString()}
                variants={childVariants}
                onClick={() => setOpenDay(day)}
              >
                <Center>
                  <TextWrapper color={theme.colors.white} size={8}>
                    {WeatherModel.formatDayOfMonth(locale, day.date)}
                  </TextWrapper>
                </Center>
              </S.DaySelector>
            ))}
          </S.DailyGrid>
          <AnimatePresence>
            {openDay !== null && (
              <S.FullscreenSection layoutId={openDay.date.getTime().toString()}>
                <Flex flexDirection="column" alignItems="flex-start">
                  <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    height="auto"
                  >
                    <Flex flexDirection="row" alignItems="center" gap={4}>
                      <MaterialIcon
                        name="today"
                        color={theme.colors.primary}
                        size={11}
                      />
                      <TextWrapper color={theme.colors.white} size={8}>
                        {WeatherModel.formatDayOfMonth(locale, openDay.date)}
                      </TextWrapper>
                    </Flex>
                    <S.SectionCloseButton onClick={() => setOpenDay(null)}>
                      <MaterialIcon name="close" size={11} />
                    </S.SectionCloseButton>
                  </Flex>
                  <DailyInfo {...openDay} />
                </Flex>
              </S.FullscreenSection>
            )}
          </AnimatePresence>
        </>
      ),
      icon: "calendar_month",
      text: strings.daily,
    },
    [Section.Events]: {
      element: model.alerts.length ? (
        //TODO: implement alerts
        <></>
      ) : (
        <Center>
          <TextWrapper size={8} color={theme.colors.white}>
            {strings.noAlerts}
          </TextWrapper>
        </Center>
      ),
      icon: "warning",
      text: strings.alerts,
    },
  };

  console.log(model.alerts);

  return (
    <AnimatePresence>
      <Center>
        <WideMotionDiv
          variants={parentVariants}
          initial="inactive"
          animate="active"
        >
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={6}
          >
            <motion.div variants={childVariants}>
              <TextWrapper color={theme.colors.white} size={12} weight={700}>
                {model.name}
              </TextWrapper>
            </motion.div>
            <motion.div variants={childVariants}>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                gap={7}
                height="auto"
              >
                <OpenWeatherIcon
                  color={theme.colors.primary}
                  size={12}
                  code={model.current.weather.id}
                  night={model.night}
                />
                <TextWrapper color={theme.colors.white} size={11}>
                  {Math.round(model.current.temperature)}°C
                </TextWrapper>
              </Flex>
            </motion.div>
            <motion.div variants={childVariants}>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                gap={5}
                height="auto"
              >
                <MaterialIcon
                  name="schedule"
                  color={theme.colors.primary}
                  size={9}
                />
                <TextWrapper color={theme.colors.white} size={8}>
                  {model.currentHour(useRouter().locale ?? "en")}
                </TextWrapper>
              </Flex>
            </motion.div>
            <S.Sections variants={childVariants}>
              {Object.entries(sectionsLookup).map((entry) => (
                <WeatherSectionSelector
                  key={entry[0]}
                  onClick={() => {
                    console.log(entry[0]);
                    setOpenSection(entry[0].toString() as unknown as Section);
                  }}
                  outerMotion={{
                    variants: childVariants,
                    layoutId: entry[0].toString(),
                  }}
                  innerMotion={{
                    variants: childVariants,
                    whileHover: "hover",
                    animate: "active",
                    initial: "inactive",
                  }}
                >
                  <MaterialIcon
                    name={entry[1].icon}
                    color={theme.colors.primary}
                    size={11}
                  />
                  <TextWrapper color={theme.colors.white} size={8}>
                    {entry[1].text}
                  </TextWrapper>
                </WeatherSectionSelector>
              ))}
            </S.Sections>
          </Flex>
        </WideMotionDiv>
      </Center>
      <AnimatePresence>
        {openSection !== null && (
          <S.FullscreenSection layoutId={openSection.toString()}>
            <Flex flexDirection="column" alignItems="flex-start">
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                height="auto"
              >
                <Flex flexDirection="row" alignItems="center" gap={4}>
                  <MaterialIcon
                    name={sectionsLookup[openSection].icon}
                    color={theme.colors.primary}
                    size={11}
                  />
                  <TextWrapper color={theme.colors.white} size={8}>
                    {sectionsLookup[openSection].text}
                  </TextWrapper>
                </Flex>
                <S.SectionCloseButton onClick={() => setOpenSection(null)}>
                  <MaterialIcon name="close" size={11} />
                </S.SectionCloseButton>
              </Flex>
              <Flex>{sectionsLookup[openSection].element}</Flex>
            </Flex>
          </S.FullscreenSection>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};
