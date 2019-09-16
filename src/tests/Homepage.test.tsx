import React, { useContext } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { HomePage } from "../components/pages/HomePage"


describe("Test post context", () => {
  /**
   * Nothing except progress bar should be shown
   */
  test("get posts while loading", () => {
    const { container } = render(<HomePage></HomePage>)
    const display = container.querySelector("#home") as Element
    expect(display.textContent).toBe("Hello World")
  });

});