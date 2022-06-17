import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { LocationCard } from "./location-card";

export default {
  title: "Atoms/LocationCard",
  component: LocationCard,
  argTypes: {
    children: {
      control: "none",
    },
  },
} as ComponentMeta<typeof LocationCard>;

const Template: ComponentStory<typeof LocationCard> = (args) => (
  <LocationCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onClick: (value) => console.log(value),
  latitude: 17.12,
  longitude: 12.32231,
  name: "Test name that is kinda long. Yeah. It is long",
};
