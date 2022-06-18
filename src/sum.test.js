import { sum
} from "./sum";

it("should add both parameters", function () {
  const result = sum(1, 2);
  expect(result).toBe(3);
});

describe("when a & b is strings", function () {
  const restult = sum(2,5);
  expect(restult).toBe(2+5)
})