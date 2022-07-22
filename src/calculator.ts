import Decimal from "decimal.js";
import { Frequency } from "./main";

export const calculateTermDeposit = (
  principle: number,
  interestRate: number,
  investmentTerm: number,
  frequency: Frequency
) => {
  if (frequency === Frequency.AtMaturity) {
    // This case is can be calculated using simple interest
    return new Decimal(principle)
      .times(
        new Decimal(1).plus(
          new Decimal(interestRate)
            .div(new Decimal(100))
            .times(new Decimal(investmentTerm))
        )
      )
      .toNumber();
  }

  let frequencyPerYear: number;
  switch (frequency) {
    case Frequency.Monthly:
      frequencyPerYear = 12;
      break;
    case Frequency.Quarterly:
      frequencyPerYear = 4;
      break;
    case Frequency.Annually:
      frequencyPerYear = 1;
      break;
    default:
      throw new Error("Unreachable code.");
  }

  return new Decimal(principle)
    .times(
      new Decimal(1)
        .plus(
          new Decimal(interestRate).div(
            new Decimal(100).times(new Decimal(frequencyPerYear))
          )
        )
        .toPower(
          new Decimal(frequencyPerYear).times(new Decimal(investmentTerm))
        )
    )
    .toNumber();
};
