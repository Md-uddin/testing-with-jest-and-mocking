import React from "react";
import { render, renderWithrouter } from "../Utils/testUtils";
import {
  render as RTL,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import PostEdit from "./PostEdit";
import { createMemoryHistory } from "history";

import { Router, Switch, Route } from "react-router-dom";

describe("PostEdit", () => {
  it("should render the post page when provided form data", () => {
    const { debug } = renderWithrouter(<PostEdit />);
  });
});
