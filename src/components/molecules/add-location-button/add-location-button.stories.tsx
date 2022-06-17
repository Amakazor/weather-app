import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { AddLocationButton } from "./add-location-button";

export default {
  title: "Molecules/AddLocationButton",
  component: AddLocationButton,
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
} as ComponentMeta<typeof AddLocationButton>;

const Template: ComponentStory<typeof AddLocationButton> = (args) => (
  <AddLocationButton {...args} />
);

export const Default = Template.bind({});
Default.args = { size: "big" };
