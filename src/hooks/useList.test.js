import React from "react";
import useList from "./useList";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "@testing-library/react/dist/pure";

describe("useList", () => {
  it("should return initailValues in a list", () => {
    let array = ["react", "redux"];
    const { result } = renderHook(() => useList({ initailValues: array }));
    // console.log(result.current);
    expect(result.current.list).toEqual(array);
  });
  it("should add items to a list", () => {
    let array = ["react", "redux"];
    const { result } = renderHook(() => useList({ initailValues: array }));
    // console.log(result.current);
    act(() => {
      result.current.add("next js");
    });
    expect(result.current.list).toEqual([...array, "next js"]);
  });
  it("should remove items from a list", () => {
    let array = ["react", "redux"];
    const { result } = renderHook(() => useList({ initailValues: array }));
    // console.log(result.current);
    act(() => {
      result.current.remove(1);
    });
    expect(result.current.list).toEqual(["react"]);
  });
});
