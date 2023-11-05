import type { Meta, StoryObj } from "@storybook/react";

import Dialog from "../";

const meta: Meta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Hello World",
  },
};
