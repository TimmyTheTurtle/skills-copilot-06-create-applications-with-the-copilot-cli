#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new RangeError("Cannot divide by zero.");
  }

  return a / b;
}

const operations = {
  "+": addition,
  "-": subtraction,
  "*": multiplication,
  "/": division,
};

function calculate(firstValue, operator, secondValue) {
  const firstNumber = Number(firstValue);
  const secondNumber = Number(secondValue);

  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    throw new TypeError("Both values must be valid numbers.");
  }

  const operation = operations[operator];

  if (!operation) {
    throw new TypeError("Operation must be one of: +, -, *, /.");
  }

  return operation(firstNumber, secondNumber);
}

function runCli(args) {
  if (args.length !== 3) {
    throw new TypeError("Usage: node src/calculator.js <number> <operator> <number>");
  }

  const [firstValue, operator, secondValue] = args;
  return calculate(firstValue, operator, secondValue);
}

if (require.main === module) {
  try {
    console.log(runCli(process.argv.slice(2)));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  runCli,
};
