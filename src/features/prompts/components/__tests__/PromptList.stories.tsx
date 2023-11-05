import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@testing-library/react";
import { expect } from "@/testing/chai";

import {
  Air,
  Community,
  Habitat,
  Health,
  Heat,
  Water,
} from "@/backend/categories";

import PromptList from "../promptlist";
import { userEvent } from "@storybook/testing-library";

/**
 * Displays a list of passed in Prompts defaulting to english
 */
const meta: Meta<typeof PromptList> = {
  title: "Prompts/Components/PromptList",
  component: PromptList,
  tags: ["autodocs"],
  argTypes: {
    onActivate: { action: "onActivate" },
    onDeactivate: { action: "onDeactivate" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
/**
 * Displays a list of passed in Prompts defaulting to english
 */
export const Primary: Story = {
  args: {
    prompts: [
      {
        id: 1,
        emoji: "🖼",
        prompt: {
          english:
            "What are the most beautiful places in your community? What do you find beautiful about them?",
          spanish:
            "¿Cuáles son los lugares más bonitos de su comunidad? ¿Qué le parece bonito de ellos?",
        },
        origin: "static",
        categories: [Community],
      },
      {
        id: 2,
        emoji: "⬆️",
        prompt: {
          english:
            "What are the most important improvements you would make in your community?",
          spanish:
            "¿Cuáles son las mejoras más importantes que haría en su comunidad?",
        },
        origin: "static",
        categories: [Community, Health, Heat, Habitat, Water, Air],
      },
      {
        id: 3,
        emoji: "💯",
        prompt: {
          english:
            "What would you like to see more of in your neighborhood? Where would you like to see it?",
          spanish:
            "¿Qué le gustaría ver en mayor cantidad en su barrio? ¿Dónde le gustaría verlo?",
        },
        origin: "static",
        categories: [Air, Community, Habitat, Health, Heat, Water],
      },
    ],
  },
  play: async ({ canvasElement, args: { prompts, onActivate } }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole("button", {
        name: `Activate prompt "${prompts[0].prompt.english}"`,
      }),
    );
    expect(canvas.getByText(prompts[0].prompt.english)).to.exist;
    expect(canvas.getByText(prompts[1].prompt.english)).to.exist;
    expect(canvas.getByText(prompts[2].prompt.english)).to.exist;

    expect(onActivate).to.have.been.called;
  },
};

/**
 * Displays a list of passed in Prompts in spanish
 */
export const InSpanish: Story = {
  args: {
    ...Primary.args,
    language: "spanish",
  },
  play: ({ canvasElement, args: { prompts } }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText(prompts[0].prompt.spanish)).to.exist;
    expect(canvas.getByText(prompts[1].prompt.spanish)).to.exist;
    expect(canvas.getByText(prompts[2].prompt.spanish)).to.exist;
  },
};

/**
 * Displays a list of passed in Prompts in english
 */
export const InEngish: Story = {
  args: {
    ...Primary.args,
    language: "english",
  },
  play: ({ canvasElement, args: { prompts } }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText(prompts[0].prompt.english)).to.exist;
    expect(canvas.getByText(prompts[1].prompt.english)).to.exist;
    expect(canvas.getByText(prompts[2].prompt.english)).to.exist;
  },
};

/**
 * Displays an active prompt
 */
export const Active: Story = {
  args: {
    ...Primary.args,
    active: 1,
  },
  play: async ({ canvasElement, args: { prompts, onDeactivate } }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole("button", {
        name: /Deactivate prompt.*/,
      }),
    );

    expect(
      canvas.getByRole("button", {
        name: `Deactivate prompt "${prompts[0].prompt.english}"`,
      }),
    ).to.exist;

    expect(onDeactivate).to.have.been.called;
  },
};
