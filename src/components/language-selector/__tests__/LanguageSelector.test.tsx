import { fireEvent, waitFor } from "@testing-library/react";
import render from "@/testing/render";
import Switch from "../switch";
import { Provider, useSelectedLanguage } from "../context";

describe("Switch", () => {
  function SUT() {
    const language = useSelectedLanguage();
    return (
      <>
        <Switch />
        <div data-testid="selected-language">
          {language}
        </div>
      </>
    );
  }

  it("should default to english", () => {
    const { getByTestId } = render(
      <Provider>
        <SUT />
      </Provider>,
    );

    expect(getByTestId("selected-language")).to.have.text("english");
  });

  it("should switch to spanish", async () => {
    const { getByTestId, getByRole } = render(
      <Provider>
        <SUT />
      </Provider>,
    );

    // userEvent.click doesn't work here as it doesn't trigger the onChange event
    //  normally we'd want to use userEvent.click
    fireEvent.click(getByRole("checkbox"));

    await waitFor(() => {
      expect(getByTestId("selected-language")).to.have.text("spanish");
    });
  });
});
