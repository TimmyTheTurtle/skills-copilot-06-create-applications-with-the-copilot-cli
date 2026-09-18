#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), division (/), modulo (%), power (^), and square root (sqrt).
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

function modulo(a, b) {
  if (b === 0) {
    throw new RangeError("Cannot divide by zero.");
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new RangeError("Cannot calculate the square root of a negative number.");
  }

  return Math.sqrt(n);
}

const operations = {
  "+": addition,
  "-": subtraction,
  "*": multiplication,
  "/": division,
  "%": modulo,
  "^": power,
};

function calculate(firstValue, operator, secondValue) {
  const firstNumber = Number(firstValue);
  if (!Number.isFinite(firstNumber)) {
    throw new TypeError("Both values must be valid numbers.");
  }

  if (operator === "sqrt") {
    return squareRoot(firstNumber);
  }

  const secondNumber = Number(secondValue);

  if (!Number.isFinite(secondNumber)) {
    throw new TypeError("Both values must be valid numbers.");
  }

  const operation = operations[operator];

  if (!operation) {
    throw new TypeError("Operation must be one of: +, -, *, /, %, ^, sqrt.");
  }

  return operation(firstNumber, secondNumber);
}

function runCli(args) {
  if (args.length === 2 && args[0] === "sqrt") {
    const [, value] = args;
    return calculate(value, "sqrt");
  }

  if (args.length !== 3) {
    throw new TypeError(
      "Usage: node src/calculator.js <number> <operator> <number> or node src/calculator.js sqrt <number>",
    );
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
  modulo,
  power,
  squareRoot,
  calculate,
  runCli,
};
