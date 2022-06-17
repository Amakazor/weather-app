import { random } from "lodash";

import { useLocalizationSearch } from "../../../lib/hooks/use-localization-search";
import { useLocalizedStrings } from "../../../lib/hooks/use-localized-strings";
import { theme } from "../../../theme/theme";
import { LocationCard } from "../../atoms/location-card/location-card";
import { TextWrapper } from "../../atoms/text-wrapper";
import { i18n } from "./location-card-list.i18n";
import { LocationCardListStyle as S } from "./location-card-list.style";

export type LocationCardListProps = {
  query: string;
  onLocationSelect: ({
    longitude,
    latitude,
  }: {
    longitude: number;
    latitude: number;
  }) => void;
};

const variants = {
  show: { transition: { staggerChildren: 0.1 } },
};

export const LocationCardList = ({
  query,
  onLocationSelect,
  ...props
}: LocationCardListProps) => {
  const { data } = useLocalizationSearch(query);
  const { strings } = useLocalizedStrings(i18n);

  return (
    <S.OuterWrapper {...props} key={random(true)}>
      <TextWrapper color={theme.colors.white} size={6}>
        {data?.length ?? 0 ? strings.heading : strings.empty}
      </TextWrapper>
      <S.Wrapper
        key={random(true)}
        variants={variants}
        initial={"hidden"}
        animate={"show"}
      >
        {data?.map((location) => (
          <LocationCard
            onClick={onLocationSelect}
            key={`${location.name}${location.latitude}${location.longitude}`}
            latitude={location.latitude}
            longitude={location.longitude}
            name={location.name}
          />
        ))}
      </S.Wrapper>
    </S.OuterWrapper>
  );
};
