const breakpoints = [1, 480, 768, 1024, 1200];

const fontWeights = [200, 300, 400, 500, 600, 700];

const fontSizes = [
  "0.25rem",
  "0.33rem",
  "0.5rem",
  "0.66rem",
  "0.75rem",
  "1rem",
  "1.25rem",
  "1.5rem",
  "1.75rem",
  "2rem",
  "2.5rem",
  "3rem",
  "4rem",
  "5rem",
];

const space = [0, 1, 2, 4, 8, 12, 16, 20, 24, 32, 48, 64, 96, 128, 256];

const radii = [0, 1, 2, 4, 8, 16, 32, "50%"];

const colors = {
  background: "#15072f",
  backgroundLight: "#23203f",
  primary: "#E04D01",
  secondary: "#FF7700",
  white: "#FFFFFF",
  darkGrey: "#333333",
};

const mediaQueries = breakpoints.map(
  (breakpoint) => `@media screen and (min-width: ${breakpoint}px)`
);

export const theme = {
  breakpoints,
  space,
  fontSizes,
  fontWeights,
  mediaQueries,
  radii,
  colors,
};
