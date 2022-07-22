import { Command, InvalidArgumentError } from "commander";

import { calculateTermDeposit } from "./calculator";

const program = new Command();

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

function customParseInt(value: any): number {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError("Not a number.");
  }
  return parsedValue;
}

program
  .name("term-calc")
  .description("CLI to calculate the value of term deposits")
  .version("1.0.0")
  .argument("<principle>", "start deposit amount", customParseInt)
  .argument("<interest>", "interest rate (annual)", customParseInt)
  .argument("<investment term>", "length of investment", customParseInt)
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
