import { Frequency } from "./main";

export const calculateTermDeposit = (
  principle: number,
  interestRate: number,
  investmentTerm: number,
  frequency: Frequency
) => {
  if (frequency === Frequency.AtMaturity) {
    // This case is can be calculated using simple interest
    return principle * (1 + (interestRate / 100) * investmentTerm);
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

  return (
    principle *
    Math.pow(
      1 + interestRate / (100 * frequencyPerYear),
      frequencyPerYear * investmentTerm
    )
  );
};
