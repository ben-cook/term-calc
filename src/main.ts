import { Command, InvalidArgumentError } from "commander";

import { calculateTermDeposit } from "./calculator";

export enum Frequency {
  Monthly = "monthly",
  Quarterly = "quarterly",
  Annually = "annually",
  AtMaturity = "maturity",
}

const parseFrequency = (value: any): Frequency => {
  if (!(Object.values(Frequency) as unknown as string[]).includes(value)) {
    throw new InvalidArgumentError(`${value} is not a valid frequency.`);
  }
  return value as unknown as Frequency;
};

const customParseFloat = (value: any): number => {
  const parsedValue = parseFloat(value);
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError("Not a number.");
  }
  return parsedValue;
};

const main = () => {
  const program = new Command();

  program
    .name("term-calc")
    .description("CLI to calculate the value of term deposits")
    .version("1.0.0")
    .argument("<principle>", "start deposit amount", customParseFloat)
    .argument("<interest>", "interest rate (annual)", customParseFloat)
    .argument("<investment term>", "length of investment", customParseFloat)
    .argument(
      "<frequency>",
      "how frequently interest is paid. \
  choices = monthly, quarterly, annually, maturity.",
      parseFrequency
    )
    .helpOption("-h, --help", "display this help message")
    .action((...args) => {
      const value = calculateTermDeposit(
        ...(args as [number, number, number, Frequency])
      );

      const formatter = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        // Use whole numbers because that's what the examples given do
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

      console.log(formatter.format(value));
    });

  if (process.argv.length < 4) {
    program.help({ error: true });
  }

  program.parse();
};

if ((process.env.NODE_ENV as unknown as string) !== "test") {
  main();
}
