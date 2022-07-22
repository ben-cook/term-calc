import { calculateTermDeposit } from "./calculator";
import { Frequency } from "./main";

beforeAll(() => {
  process.argv.push("0", "0", "0", "monthly");
});
test("example given is correct", () => {
  expect(calculateTermDeposit(10000, 1.1, 3, Frequency.AtMaturity)).toBeCloseTo(
    10330
  );
});
