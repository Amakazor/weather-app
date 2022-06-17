import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { theme } from "../../../theme/theme";
import { TextWrapper } from "./text-wrapper";

export default {
  title: "Atoms/TextWrapper",
  component: TextWrapper,
  argTypes: {
    children: {
      control: "none",
    },
    size: {
      options: theme.fontSizes,
      control: "select",
    },
    weight: {
      control: { type: "range", min: 200, max: 700, step: 100 },
    },
  },
} as ComponentMeta<typeof TextWrapper>;

const Template: ComponentStory<typeof TextWrapper> = (args) => (
  <TextWrapper {...args} />
);

export const Default = Template.bind({});
Default.args = { children: <div>test text</div> };

export const BigText = Template.bind({});
BigText.args = { children: <div>test text</div>, size: 8 };

export const SmallText = Template.bind({});
SmallText.args = { children: <div>test text</div>, size: 2 };

export const ColoredText = Template.bind({});
ColoredText.args = {
  children: <div>test text</div>,
  color: theme.colors.primary,
};
