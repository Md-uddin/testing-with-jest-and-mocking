import React from "react";
import useFetch from "./useFetch";
import { renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import { rest } from "msw";

let URL = "https://jsonplaceholder.typicode.com/todos/";
const server = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          completed: false,
          id: 58,
          title: "est dicta totam qui explicabo doloribus qui dignissimos",
          userId: 3,
        },
        {
          completed: false,
          id: 58,
          title: "est dicta totam qui explicabo doloribus qui dignissimos",
          userId: 3,
        },
      ])
    );
  })
);
describe("useFetch", () => {
  ////starting server
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
  it("should fetch the data", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch({ URL }));
    await waitForNextUpdate();
    expect(result.current.data).toMatchInlineSnapshot(`
      Array [
        Object {
          "completed": false,
          "id": 58,
          "title": "est dicta totam qui explicabo doloribus qui dignissimos",
          "userId": 3,
        },
        Object {
          "completed": false,
          "id": 58,
          "title": "est dicta totam qui explicabo doloribus qui dignissimos",
          "userId": 3,
        },
      ]
    `);
  });
});
