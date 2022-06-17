import { useLocalizedStrings } from "../../../lib/hooks/use-localized-strings";
import { TextWrapper } from "../text-wrapper";
import { LocationCardStyle as S } from "./lcoation-card.style";
import { i18n } from "./location-card.i18n";

export type LocationCardProps = {
  onClick: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void;
  latitude: number;
  longitude: number;
  name: string;
};

const variants = {
  hidden: { opacity: 0.01, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

const transition = { duration: 0.2 };

export const LocationCard = ({
  onClick,
  latitude,
  longitude,
  name,
  ...props
}: LocationCardProps) => {
  const { strings } = useLocalizedStrings(i18n);

  return (
    <S.Card
      type="button"
      {...props}
      onClick={() => onClick({ latitude, longitude })}
      variants={variants}
      transition={transition}
    >
      <TextWrapper weight={600}>{strings.name}</TextWrapper>
      <TextWrapper>{name}</TextWrapper>
      <TextWrapper size={4} weight={600}>
        {strings.latitude}
      </TextWrapper>
      <TextWrapper size={4}>{latitude}</TextWrapper>
      <TextWrapper size={4} weight={600}>
        {strings.longitude}
      </TextWrapper>
      <TextWrapper size={4}>{longitude}</TextWrapper>
    </S.Card>
  );
};
