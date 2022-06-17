import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Center } from "./center";

export default {
  title: "Atoms/Center",
  component: Center,
  argTypes: {
    children: {
      control: "none",
    },
  },
} as ComponentMeta<typeof Center>;

const Template: ComponentStory<typeof Center> = (args) => <Center {...args} />;

export const SingleChild = Template.bind({});
SingleChild.args = { children: <div>test</div> };

export const MultipleChildren = Template.bind({});
MultipleChildren.args = {
  children: (
    <>
      <div>test1</div>
      <div>test2</div>
      <div>test3</div>
    </>
  ),
};
