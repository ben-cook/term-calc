# Take Home Code Challenge

We are a company that creates banking software. We’d like you to build a very simple term deposit calculator that takes as inputs:

- Start deposit amount (e.g. $10,000)
- Interest rate (e.g. 1.10%)
- Investment term (e.g. 3 years)
- Interest paid (Monthly, Quarterly, Annually, At Maturity)

And produces as output:

- Final balance (e.g. $10,330 on the above inputs, interest paid At Maturity)

You can assume that all proceeds are reinvested into the term deposit for its duration.

# Nonfunctional Requirements

- Simplicity - can we understand your code and how you’ve structured it?
- Maintainability - could we change requirements and easily extend the application, and would we know if we broke existing functionality?
- Feedback - how have you handled errors and let the user know?
- Usability - can we work out how to install and run it?
- Style - how proficient are you at the technologies you’ve chosen?

# Running the app

I decided to create a Node.js app in Typescript for this challenge. To run it, you'll need Node installed.

You can build the app with `npm run build`, which will produce a javascript file in the `build` directory, which can be run with `node build/main.js <arguments>`.  
For convenience, you can also use `npm -s start -- <arguments>`.

Running the application will display help information, which can also be viewed with the `-h` or `--help` flags.
