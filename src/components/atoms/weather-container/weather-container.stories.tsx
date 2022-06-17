import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { WeatherContainer } from "./weather-container";

export default {
  title: "Atoms/WeatherContainer",
  component: WeatherContainer,
  argTypes: {
    children: {
      control: "none",
    },
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
} as ComponentMeta<typeof WeatherContainer>;

const Template: ComponentStory<typeof WeatherContainer> = (args) => (
  <WeatherContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <div>test1</div>
      <div>test2</div>
      <div>test3</div>
    </>
  ),
};
