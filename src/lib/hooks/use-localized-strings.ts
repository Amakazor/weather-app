import LocalizedStrings, { GlobalStrings } from "localized-strings";
import { useEffect, useState } from "react";

type strings = { [key: string]: { [key: string]: string } };

export const useLocalizedStrings = <T>(inputStrings: GlobalStrings<T>) => {
  const [strings, setStrings] = useState<GlobalStrings<T>>(inputStrings);

  useEffect(() => {
    setStrings(inputStrings);
  }, [inputStrings]);

  const localizedStrings = new LocalizedStrings(strings);

  return { strings: localizedStrings };
};
