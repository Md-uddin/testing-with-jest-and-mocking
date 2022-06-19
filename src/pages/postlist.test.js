import {
  render as RTL,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";
import PostList from "./PostList";
// import { useQuery } from "react-query";
import { useColorMode, useTheme } from "@chakra-ui/core";
import { render, renderWithrouter } from "../Utils/testUtils";
import * as reactQuery from "react-query";
import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer(
  rest.get("http://localhost:3002/posts", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, title: "Api dummy title" },
        { id: 2, title: "Api dummy title" },
      ])
    );
  })
);

/// Arrange Act Assertion
describe("postlist", () => {
  //ex: spying on console
  // let log = null;
  // beforeAll(() => {
  //   log = jest.spyOn(console, "log").mockImplementation((a) => {
  //     console.error(a + "yes");
  //   });
  // });
  let useQuery = null;
  beforeAll(() => {
    useQuery = jest.spyOn(reactQuery, "useQuery");
    // console.log(useQuery);//to check all the mock methods
    server.listen();
  });
  beforeEach(() => {
    useQuery.mockClear();
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it("when isLoading is true then loading text should be displayed", () => {
    //arrange
    useQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });
    //act
    const { debug } = renderWithrouter(
      <PostList isDrawerOpen={false} closeDrawer={jest.fn()} />
    );
    // debug();//to render in comp in console

    //assertion
    // const text = screen.queryByText("Loading...").innerText; //getting by text

    const text = screen.getByTestId("loading-text");
    expect(text).toHaveTextContent("Loading...");
  });
  it("when isLoading is false  and data is available then render data in a list", () => {
    useQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        data: [
          { id: 1, title: "dummy title" },
          { id: 2, title: "dummy title" },
        ],
      },
    });
    useColorMode.mockReturnValue({ colorMode: "light" });
    //Assertion
    renderWithrouter(<PostList isDrawerOpen={false} closeDrawer={jest.fn()} />);
    const data = screen.getAllByTestId("list-item").map((li) => li.textContent);
    console.log(data);

    expect(data).toMatchInlineSnapshot(`
      Array [
        "dummy title",
        "dummy title",
      ]
    `);
  });

  it("when api call ade to post endpoint", async () => {
    useQuery.mockRestore(); //unmocking to make an actual api call
    useColorMode.mockReturnValue({ colorMode: "light" });
    useTheme.mockReturnValue({});
    renderWithrouter(<PostList isDrawerOpen={false} closeDrawer={jest.fn()} />);
    await waitForElementToBeRemoved(() => screen.getByTestId("loading-text"));
    const data = screen.getAllByTestId("list-item").map((li) => li.textContent);
    expect(data).toMatchInlineSnapshot(`
      Array [
        "Api dummy title",
        "Api dummy title",
      ]
    `);
  });
});
