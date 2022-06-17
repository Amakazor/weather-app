import { ComponentMeta, ComponentStory } from "@storybook/react";
import { rgba } from "polished";
import React from "react";
import styled from "styled-components";

import { theme } from "../../../theme/theme";
import { Center } from "../center";
import { TextWrapper } from "../text-wrapper";
import { Tooltip } from "./tooltip";

const Container = styled.div`
  height: 300px;
  width: 400px;
  padding: 100px 150px;
`;

const Inside = styled.div`
  height: 100%;
  width: 100%;

  background: ${rgba(theme.colors.white, 0.2)};
`;

export default {
  title: "Atoms/Tooltip",
  component: Tooltip,
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Container>
    <Center>
      <Tooltip.Container>
        <Tooltip {...args}>
          <TextWrapper size={6}>Tooltip text</TextWrapper>
        </Tooltip>
        <Inside>
          <Center>
            <TextWrapper color={theme.colors.white}>Hover here!</TextWrapper>
          </Center>
        </Inside>
      </Tooltip.Container>
    </Center>
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  direction: "left",
  color: "dark",
};
