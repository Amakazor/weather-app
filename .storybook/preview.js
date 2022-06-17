import { GlobalStyle } from "../src/theme/global-style";
import { withServer } from "storybook-mirage/dist/withServer";
import { createServer } from "miragejs";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "light",
    values: [
      { name: "light", value: "#FFFFFF" },
      { name: "dark", value: "#251D3A" },
    ],
  },
};

const makeServer = () =>
  createServer({
    routes() {
      this.namespace = "api";
      this.get("/open/location", () => {
        return [
          {
            name: "poznań poznań poznań poznań poznań poznań ",
            latitude: 50,
            longitude: 51,
            licence: "licence",
          },
          {
            name: "poznań poznań poznań poznań poznań poznań ",
            latitude: 50,
            longitude: 51,
            licence: "licence",
          },
          {
            name: "poznań poznań poznań poznań poznań poznań ",
            latitude: 50,
            longitude: 51,
            licence: "licence",
          },
          {
            name: "poznań poznań poznań poznań poznań poznań ",
            latitude: 50,
            longitude: 51,
            licence: "licence",
          },
          {
            name: "poznań poznań poznań poznań poznań poznań ",
            latitude: 50,
            longitude: 51,
            licence: "licence",
          },
          {
            name: "poznań poznań poznań poznań poznań poznań ",
            latitude: 50,
            longitude: 51,
            licence: "licence",
          },
        ];
      });
    },
  });

export const decorators = [
  withServer(makeServer),
  (Story) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
];
