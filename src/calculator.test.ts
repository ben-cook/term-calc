import { calculateTermDeposit } from "./calculator";
import { Frequency } from "./main";

test("example given is correct", () => {
  expect(calculateTermDeposit(10000, 1.1, 3, Frequency.AtMaturity)).toBeCloseTo(
    10330,
    0
  );
});

test("monthly is correct", () => {
  expect(calculateTermDeposit(2400, 2.9, 3, Frequency.Monthly)).toBeCloseTo(
    2618,
    0
  );
});

test("quarterly is correct", () => {
  expect(calculateTermDeposit(50000, 1.5, 2, Frequency.Quarterly)).toBeCloseTo(
    51520,
    0
  );
});

test("annual is correct", () => {
  expect(calculateTermDeposit(1000, 2.3, 2.5, Frequency.Annually)).toBeCloseTo(
    1058,
    0
  );
});
