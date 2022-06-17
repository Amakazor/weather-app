import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Flex } from "./flex";

export default {
  title: "Atoms/Flex",
  component: Flex,
  argTypes: {
    children: {
      control: "none",
    },
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

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
