import render from "@/testing/render";
import { factory } from "@/testing/factory";
import { Prompts } from "..";
import { Air, Community } from "@/backend/categories";
import { waitFor } from "@testing-library/react";
import { Provider } from "@/components/language-selector";

describe("Prompts", () => {
  it("should list all Prompts", async () => {
    // NOTE: Hack to get around the fact that the mswjs/data doesn't
    // sufficiently type the nested structures, without this typescript will
    // complain that the prompt.english property does not exist on the Prompt.
    const prompts = factory.prompts.createMany(10) as unknown as PromptType[];

    const { findAllByRole, getByRole, userEvent } = render(
      <Prompts />,
    );

    await userEvent.click(getByRole("button", { name: "Prompts" }));

    expectAllEnglishPrompts(prompts, await findAllByRole("listitem"));
  });
});

describe("Prompt category filtering", () => {
  interface Context {
    communityPrompts: PromptType[];
    airPrompts: PromptType[];
    render: ReturnType<typeof render>;
  }

  beforeEach<Context>(async (context) => {
    context.communityPrompts = factory.prompts.createMany(10, {
      categories: [Community],
    }) as unknown as PromptType[];

    context.airPrompts = factory.prompts.createMany(3, {
      categories: [Air],
    }) as unknown as PromptType[];

    context.render = render(
      <Prompts />,
    );

    const { getByRole, userEvent } = context.render;

    await userEvent.click(
      getByRole("button", { name: "Prompts" }),
    );
  });

  it<Context>(
    "should list prompts in the Air category",
    async (
      {
        airPrompts,
        render: { userEvent, findAllByRole, getByRole },
      },
    ) => {
      await userEvent.click(getByRole("tab", { name: "Air" }));
      const displayedPrompts = await findAllByRole("listitem");
      expectAllEnglishPrompts(airPrompts, displayedPrompts);
    },
  );

  it<Context>(
    "should list prompts in the Community category",
    async (
      {
        communityPrompts,
        render: { userEvent, findAllByRole, getByRole },
      },
    ) => {
      await userEvent.click(getByRole("tab", { name: "Community" }));

      const displayedPrompts = await findAllByRole("listitem");
      expectAllEnglishPrompts(communityPrompts, displayedPrompts);
    },
  );
});

describe("Prompt activation", () => {
  beforeEach(() => {
    factory.prompts.createMany(10);
  });

  it(
    "should activate a prompt",
    async () => {
      const { getByRole, findAllByRole, userEvent, findByRole } = render(
        <Prompts />,
      );

      await userEvent.click(getByRole("button", { name: "Prompts" }));
      const addPrompts = await findAllByRole("button", {
        name: /Activate prompt.*/,
      });
      await userEvent.click(
        addPrompts[0],
      );

      expect(await findByRole("button", { name: /Deactivate prompt.*/ })).to
        .exist;
    },
  );

  it(
    "should deactivate a prompt",
    async () => {
      const { getByRole, findAllByRole, userEvent, queryByRole } = render(
        <Prompts />,
      );

      await userEvent.click(getByRole("button", { name: "Prompts" }));
      const addPrompts = await findAllByRole("button", {
        name: /Activate prompt.*/,
      });

      // click the first add prompt button
      await userEvent.click(
        addPrompts[0],
      );

      // click again to daactivate
      await userEvent.click(
        addPrompts[0],
      );

      await waitFor(() =>
        expect(queryByRole("button", { name: /Deactivate prompt.*/ })).not.to
          .exist
      );
    },
  );

  it("should only one active prompt at a time", async () => {
    const { getByRole, findAllByRole, userEvent, getAllByRole } = render(
      <Prompts />,
    );

    await userEvent.click(getByRole("button", { name: "Prompts" }));
    const addPrompts = await findAllByRole("button", {
      name: /Activate prompt.*/,
    });

    // click the first add prompt button
    await userEvent.click(
      addPrompts[0],
    );

    // click the second add prompt button
    await userEvent.click(
      addPrompts[1],
    );

    expect(addPrompts[0]).to.have.attr("title").match(/Activate prompt.*/);
    expect(addPrompts[1]).to.have.attr("title").match(/Deactivate prompt.*/);
    expect(getAllByRole("button", { name: /Deactivate prompt.*/ })).to.have
      .length(
        1,
      );
  });
});

describe("Prompt language switching", () => {
  const testCases: [PromptLanguages, typeof expectAllEnglishPrompts][] = [
    ["english" as PromptLanguages, expectAllEnglishPrompts],
    [
      "spanish" as PromptLanguages,
      expectAllSpanishPrompts,
    ],
  ];
  it.each(testCases)(
    "should display prompts in %s",
    async (language, assertExpectation) => {
      const prompts = factory.prompts.createMany(10) as unknown as PromptType[];

      const { getByRole, findAllByRole, userEvent } = render(
        <Provider language={language}>
          <Prompts />
        </Provider>,
      );

      await userEvent.click(getByRole("button", { name: "Prompts" }));

      assertExpectation(prompts, await findAllByRole("listitem"));
    },
  );
});

function expectAllPrompts(expected: string[], actual: HTMLElement[]) {
  const actualPrompts = actual.map((prompt) => prompt.textContent);

  expect(actualPrompts).to.have.members(expected);
}

function expectAllEnglishPrompts(
  expected: PromptType[],
  actual: HTMLElement[],
) {
  expectAllPrompts(expected.map((prompt) => prompt.prompt.english), actual);
}

function expectAllSpanishPrompts(
  expected: PromptType[],
  actual: HTMLElement[],
) {
  expectAllPrompts(expected.map((prompt) => prompt.prompt.spanish), actual);
}
