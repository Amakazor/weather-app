import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { LocationAddingForm } from "./location-adding-form";

export default {
  title: "Molecules/LocationAddingForm",
  component: LocationAddingForm,
  argTypes: {
    children: {
      control: "none",
    },
  },
} as ComponentMeta<typeof LocationAddingForm>;

const Template: ComponentStory<typeof LocationAddingForm> = (args) => (
  <LocationAddingForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onChange: (value) => console.log(value),
};
