import React from "react";
import useFetch from "./useFetch";
import { renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import { rest } from "msw";

let TODO_URL = "https://jsonplaceholder.typicode.com/todos/";
let POST_URL = "https://jsonplaceholder.typicode.com/posts";
const server = setupServer(
  rest.get(TODO_URL, (req, res, ctx) => {
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
  }),

  rest.get(POST_URL, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          body: `et iusto sed quo iure
        voluptatem occaecati omnis eligendi aut ad
        voluptatem doloribus vel accusantium quis pariatur
        molestiae porro eius odio et labore et velit aut`,
          id: 3,
          title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
          userId: 1,
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
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch({ URL: TODO_URL })
    );
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

  it("should fetch the data when TODO_URL changes", async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      ({ URL }) => useFetch({ URL }),
      {
        //////what should be the initialProps
        initialProps: {
          URL: TODO_URL,
        },
      }
    );
    await waitForNextUpdate();
    rerender({
      URL: POST_URL,
    });
    await waitForNextUpdate();
    expect(result.current.data).toMatchInlineSnapshot(`
      Array [
        Object {
          "body": "et iusto sed quo iure
              voluptatem occaecati omnis eligendi aut ad
              voluptatem doloribus vel accusantium quis pariatur
              molestiae porro eius odio et labore et velit aut",
          "id": 3,
          "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
          "userId": 1,
        },
      ]
    `);
  });
});
