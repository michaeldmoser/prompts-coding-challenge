import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@/testing/chai";
import { within } from "@testing-library/react";
import { userEvent } from "@storybook/testing-library";

import {
  Air,
  Community,
  Habitat,
  Health,
  Heat,
  Water,
} from "@/backend/categories";
import PromptCategories from "../promptcategories";

const meta: Meta<typeof PromptCategories> = {
  title: "Prompts/Components/PromptCategories",
  component: PromptCategories,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    categories: [
      Community,
      Health,
      Heat,
      Habitat,
      Water,
      Air,
    ],
    active: "All",
  },
  argTypes: {
    setCategory: {
      action: "setCategory",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(await canvas.findByText("All")).to.exist;
    expect(await canvas.findByText("Community")).to.exist;
    expect(await canvas.findByText("Health")).to.exist;
    expect(await canvas.findByText("Heat")).to.exist;
    expect(await canvas.findByText("Habitat")).to.exist;
    expect(await canvas.findByText("Water")).to.exist;
    expect(await canvas.findByText("Air")).to.exist;
  },
};

export const CommunityActive: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    active: "Community",
  },
};

export const HealthActive: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    active: "Health",
  },
};

export const SwitchCategories: Story = {
  ...Primary,

  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByText("Community"));

    expect(args.setCategory).to.have.been.called;
  },
};
