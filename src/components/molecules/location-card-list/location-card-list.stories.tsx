// noinspection SpellCheckingInspection

import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { LocationCardList } from "./location-card-list";

export default {
  title: "Molecules/LocationCardList",
  component: LocationCardList,
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
} as ComponentMeta<typeof LocationCardList>;

const Template: ComponentStory<typeof LocationCardList> = (args) => (
  <LocationCardList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  query: "poznań",
};
