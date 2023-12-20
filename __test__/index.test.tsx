import "@testing-library/jest-dom";

import HomePage from "../pages/index";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("HomePage", () => {
  it("should render the page with policy data", () => {
    // Define sample policy data to use in the test
    const policyData = [
      { id: 1, policyHolderName: "John Doe", coverage: "Full" },
      { id: 2, policyHolderName: "Jane Smith", coverage: "Partial" },
    ];

    const store = mockStore({ policies: { policies: policyData } });

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    expect(screen.getByText("Insurance Policies")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it('should render the "Add New Policy" link', () => {
    const store = mockStore({ policies: { policies: [] } });

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    expect(screen.getByText("Add New Policy")).toBeInTheDocument();
  });
});
