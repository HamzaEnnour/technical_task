import { render, screen, waitFor } from "@testing-library/react";
import { AppProvider, AppContext } from "../AppContext";
import "@testing-library/jest-dom/extend-expect";

describe("AppContext", () => {
  it("should toggle the navigation menu", async () => {
    render(
      <AppProvider>
        <AppContext.Consumer>
          {({ state, dispatch }) => (
            <div>
              <button
                data-testid="toggleButton"
                onClick={() => dispatch({ type: "TOGGLE_NAV_MENU" })}
              >
                Toggle Menu
              </button>
              <div data-testid="isNavMenuOpen">
                {state.isNavMenuOpen.toString()}
              </div>
            </div>
          )}
        </AppContext.Consumer>
      </AppProvider>
    );

    const toggleButton = screen.getByTestId("toggleButton");
    const navMenuState = screen.getByTestId("isNavMenuOpen");

    expect(navMenuState).toHaveTextContent("false");

    toggleButton.click();

    await waitFor(() => {
      expect(navMenuState).toHaveTextContent("true");
    });

    toggleButton.click();

    await waitFor(() => {
      expect(navMenuState).toHaveTextContent("false");
    });
  });
});
