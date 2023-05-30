import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("testing app", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });
});
