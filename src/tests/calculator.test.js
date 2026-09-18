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
    ["modulo", modulo, 20, 6, 2],
    ["power", power, 3, 4, 81],
  ])("%s calculates the example from the calculator image", (name, operation, a, b, expected) => {
    expect(operation(a, b)).toBe(expected);
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

  test("modulo rejects zero as the divisor", () => {
    expect(() => modulo(10, 0)).toThrow("Cannot divide by zero.");
  });

  test("square root supports zero and positive values", () => {
    expect(squareRoot(0)).toBe(0);
    expect(squareRoot(81)).toBe(9);
  });

  test("square root rejects negative values", () => {
    expect(() => squareRoot(-1)).toThrow("Cannot calculate the square root of a negative number.");
  });
});

describe("calculator input handling", () => {
  test.each([
    ["2", "+", "3", 5],
    ["10", "-", "4", 6],
    ["45", "*", "2", 90],
    ["20", "/", "5", 4],
    ["20", "%", "6", 2],
    ["3", "^", "4", 81],
  ])("calculate evaluates %s %s %s", (firstValue, operator, secondValue, expected) => {
    expect(calculate(firstValue, operator, secondValue)).toBe(expected);
  });

  test("calculate evaluates square root with a unary operator", () => {
    expect(calculate("81", "sqrt")).toBe(9);
  });

  test("calculate rejects invalid numbers", () => {
    expect(() => calculate("one", "+", "2")).toThrow("Both values must be valid numbers.");
  });

  test("calculate rejects unsupported operations", () => {
    expect(() => calculate(2, "unknown", 3)).toThrow("Operation must be one of: +, -, *, /, %, ^, sqrt.");
  });

  test("runCli evaluates three command-line arguments", () => {
    expect(runCli(["20", "/", "5"])).toBe(4);
  });

  test("runCli evaluates square root with two command-line arguments", () => {
    expect(runCli(["sqrt", "81"])).toBe(9);
  });

  test("runCli rejects missing command-line arguments", () => {
    expect(() => runCli(["2", "+"])).toThrow(
      "Usage: node src/calculator.js <number> <operator> <number> or node src/calculator.js sqrt <number>",
    );
  });
});
