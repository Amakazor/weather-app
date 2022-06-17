import { createContext } from "react";

export const CurrentLocationContext = createContext<{
  setLocation: (value: ((prevState: number) => number) | number) => void;
  location: number;
}>({ location: 0, setLocation: (value) => {} });
