const { Operation, sum, sub, mul, div, calculateResult } = require("./lib.js");

// Mock console.error.
console.error = jest.fn();

describe("Arithmetic Operations", () => {
  test("sum adds two numbers correctly", () => {
    expect(sum(5, 3)).toBe(8);
    expect(sum(-1, 1)).toBe(0);
    expect(sum(0, 0)).toBe(0);
    expect(sum(2.5, 3.5)).toBe(6);
  });

  test("sub subtracts second number from first number", () => {
    expect(sub(5, 3)).toBe(2);
    expect(sub(-1, 1)).toBe(-2);
    expect(sub(0, 0)).toBe(0);
    expect(sub(5.5, 2.5)).toBe(3);
  });

  test("mul multiplies two numbers correctly", () => {
    expect(mul(5, 3)).toBe(15);
    expect(mul(-1, 1)).toBe(-1);
    expect(mul(0, 5)).toBe(0);
    expect(mul(2.5, 2)).toBe(5);
  });

  test("div divides first number by second number", () => {
    expect(div(6, 3)).toBe(2);
    expect(div(-6, 3)).toBe(-2);
    expect(div(0, 5)).toBe(0);
    expect(div(5.5, 2)).toBe(2.75);
  });

  test('div returns "undefined"', () => {
    expect(div(5, 0)).toBe(undefined);
    expect(div(0, 0)).toBe(undefined);
  });
});

describe("calculateResult Function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("calculateResult handles all valid operations", () => {
    expect(calculateResult(Operation.SUM, 5, 3)).toBe(8);
    expect(calculateResult(Operation.SUB, 5, 3)).toBe(2);
    expect(calculateResult(Operation.MUL, 5, 3)).toBe(15);
    expect(calculateResult(Operation.DIV, 6, 3)).toBe(2);
  });

  test("calculateResult handles division by zero", () => {
    expect(calculateResult(Operation.DIV, 5, 0)).toBe(undefined);
    expect(console.error).toHaveBeenCalledWith(
      "Error: Division by zero is not allowed."
    );
  });

  test("calculateResult returns null for invalid operation", () => {
    expect(calculateResult("invalid", 5, 3)).toBe(null);
    expect(console.error).toHaveBeenCalledWith(
      "Invalid operation, terminating..."
    );
  });

  test("calculateResult handles negative numbers", () => {
    expect(calculateResult(Operation.SUM, -5, -3)).toBe(-8);
    expect(calculateResult(Operation.SUB, -5, -3)).toBe(-2);
    expect(calculateResult(Operation.MUL, -5, -3)).toBe(15);
    expect(calculateResult(Operation.DIV, -6, -3)).toBe(2);
  });
});
