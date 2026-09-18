const {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  runCli,
} = require("../calculator");

describe("calculator operations", () => {
  test.each([
    ["addition", addition, 2, 3, 5],
    ["subtraction", subtraction, 10, 4, 6],
    ["multiplication", multiplication, 45, 2, 90],
    ["division", division, 20, 5, 4],
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
});

describe("calculator input handling", () => {
  test.each([
    ["2", "+", "3", 5],
    ["10", "-", "4", 6],
    ["45", "*", "2", 90],
    ["20", "/", "5", 4],
  ])("calculate evaluates %s %s %s", (firstValue, operator, secondValue, expected) => {
    expect(calculate(firstValue, operator, secondValue)).toBe(expected);
  });

  test("calculate rejects invalid numbers", () => {
    expect(() => calculate("one", "+", "2")).toThrow("Both values must be valid numbers.");
  });

  test("calculate rejects unsupported operations", () => {
    expect(() => calculate(2, "%", 3)).toThrow("Operation must be one of: +, -, *, /.");
  });

  test("runCli evaluates three command-line arguments", () => {
    expect(runCli(["20", "/", "5"])).toBe(4);
  });

  test("runCli rejects missing command-line arguments", () => {
    expect(() => runCli(["2", "+"])).toThrow(
      "Usage: node src/calculator.js <number> <operator> <number>",
    );
  });
});
