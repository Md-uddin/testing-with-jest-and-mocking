import { render, screen } from "@testing-library/react";
import React from "react";
import PostList from "./PostList";
import { useQuery } from "react-query";

jest.mock("react-query");

/// Arrange Act Assertion
describe("postlist", () => {
  it("when isLoading is true then loading text should be displayed", () => {
    //arrange
    useQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });
    //act
    const { debug } = render(
      <PostList isDrawerOpen={false} closeDrawer={jest.fn()} />
    );
    // debug();//to render in comp in console

    //assertion
    // const text = screen.queryByText("Loading...").innerText; //getting by text

    const text = screen.queryByTestId("loading-text");
    expect(text).toHaveTextContent("Loading...");
  });
});
