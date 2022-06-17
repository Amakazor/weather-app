import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import { useContext } from "react";

import { Center } from "../components/atoms/center";
import { Main } from "../components/atoms/main/main";
import { PaddedContainer } from "../components/atoms/padded-container/padded-container";
import { HomeLayout } from "../components/layouts/home-layout/home-layout";
import { Weather, WeatherProps } from "../components/organisms/weather/weather";
import { CurrentLocationContext } from "../lib/context/current-location-context";

const Home: NextPage = () => {
  const { location, setLocation } = useContext(CurrentLocationContext);
  console.log(location);
  return (
    <Main>
      <PaddedContainer>
        <Center>
          <HomeLayout>
            <AnimatePresence>
              <Weather slot={location as WeatherProps["slot"]} variant="big" />
            </AnimatePresence>
            <Weather slot={0} variant="small" />
            <Weather slot={1} variant="small" />
            <Weather slot={2} variant="small" />
          </HomeLayout>
        </Center>
      </PaddedContainer>
    </Main>
  );
};

export default Home;
