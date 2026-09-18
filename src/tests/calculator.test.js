const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
  runCli,
} = require("../calculator");

describe("calculator operations", () => {
  test.each([
    ["addition", addition, 2, 3, 5],
    ["subtraction", subtraction, 10, 4, 6],
    ["multiplication", multiplication, 45, 2, 90],
    ["division", division, 20, 5, 4],
    ["modulo", modulo, 5, 2, 1],
    ["power", power, 2, 3, 8],
  ])("%s calculates the example from the calculator images", (name, operation, a, b, expected) => {
    expect(operation(a, b)).toBe(expected);
  });

  test("squareRoot calculates the example from the extended operations image", () => {
    expect(squareRoot(16)).toBe(4);
  });

  test("addition supports negative and decimal values", () => {
    expect(addition(-2.5, 7.75)).toBe(5.25);
  });

  test("subtraction supports negative results", () => {
    expect(subtraction(4, 10)).toBe(-6);
  });

  test("multiplication supports zero and negative values", () => {
    expect(multiplication(0, 12)).toBe(0);
    expect(multiplication(-3, 4)).toBe(-12);
  });

  test("division supports negative and decimal results", () => {
    expect(division(-12, 3)).toBe(-4);
    expect(division(1, 4)).toBe(0.25);
  });

  test("division rejects zero as the divisor", () => {
    expect(() => division(10, 0)).toThrow("Cannot divide by zero.");
  });

  test("modulo supports remainder calculations", () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test("modulo rejects zero as the divisor", () => {
    expect(() => modulo(10, 0)).toThrow("Cannot modulo by zero.");
  });

  test("power raises the base to the exponent", () => {
    expect(power(5, 3)).toBe(125);
  });

  test("squareRoot returns the square root of a value", () => {
    expect(squareRoot(81)).toBe(9);
  });

  test("squareRoot rejects negative values", () => {
    expect(() => squareRoot(-1)).toThrow("Cannot calculate square root of a negative number.");
  });
});

describe("calculator input handling", () => {
  test.each([
    ["2", "+", "3", 5],
    ["10", "-", "4", 6],
    ["45", "*", "2", 90],
    ["20", "/", "5", 4],
    ["5", "%", "2", 1],
    ["2", "^", "3", 8],
  ])("calculate evaluates %s %s %s", (firstValue, operator, secondValue, expected) => {
    expect(calculate(firstValue, operator, secondValue)).toBe(expected);
  });

  test("calculate evaluates square root", () => {
    expect(calculate("16", "sqrt")).toBe(4);
  });

  test("calculate rejects invalid numbers", () => {
    expect(() => calculate("one", "+", "2")).toThrow("Both values must be valid numbers.");
  });

  test("calculate rejects unsupported operations", () => {
    expect(() => calculate(2, "?", 3)).toThrow("Operation must be one of: +, -, *, /, %, ^, sqrt.");
  });

  test("calculate rejects extra values for square root", () => {
    expect(() => calculate(81, "sqrt", 2)).toThrow("Square root accepts one value.");
  });

  test("runCli evaluates three command-line arguments", () => {
    expect(runCli(["20", "/", "5"])).toBe(4);
  });

  test("runCli evaluates square root command-line arguments", () => {
    expect(runCli(["sqrt", "16"])).toBe(4);
  });

  test("runCli rejects missing command-line arguments", () => {
    expect(() => runCli(["2", "+"])).toThrow(
      "Usage: node src/calculator.js <number> <operator> <number> or node src/calculator.js sqrt <number>",
    );
  });
});
