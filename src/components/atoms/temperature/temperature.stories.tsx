import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Temperature } from "./temperature";

export default {
  title: "Atoms/Temperature",
  component: Temperature,
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
} as ComponentMeta<typeof Temperature>;

const Template: ComponentStory<typeof Temperature> = (args) => (
  <Temperature {...args} />
);

export const Default = Template.bind({});
Default.args = {
  min: 10,
  max: 50,
  current: 30,
};
