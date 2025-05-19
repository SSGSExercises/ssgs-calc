const Operation = {
    SUM: "sum",
    SUB: "sub",
    MUL: "mul",
    DIV: "div",
};

/**
 * Performs the addition of two numbers.
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @returns {number} The sum of num1 and num2.
 */
function sum(num1, num2) {
    return num1 + num2;
}

/**
 * Performs the subtraction of the second number from the first.
 * @param {number} num1 - The first number (minuend).
 * @param {number} num2 - The second number (subtrahend).
 * @returns {number} The difference between num1 and num2.
 */
function sub(num1, num2) {
    return num1 - num2;
}

/**
 * Performs the multiplication of two numbers.
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @returns {number} The product of num1 and num2.
 */
function mul(num1, num2) {
    return num1 * num2;
}

/**
 * Performs the division of the first number by the second.
 * Handles the case where the divisor is zero.
 * @param {number} num1 - The numerator (dividend).
 * @param {number} num2 - The denominator (divisor).
 * @returns {number|undefined} The quotient of num1 divided by num2,
 * or undefined if division by zero is attempted.
 */
function div(num1, num2) {
    if (num2 === 0) {
        console.error("Error: Division by zero is not allowed.");
        return undefined;
    }

    return num1 / num2;
}

/**
 * Performs a calculation based on the provided operation and two numbers.
 * Uses a switch statement to determine which arithmetic function to call.
 * @param {string} operation - A string representing the operation to perform
 * (should match one of the values in the Operation object).
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @returns {number|undefined|null} The result of the calculation,
 * undefined if division by zero,
 * or null if an invalid operation is provided.
 */
function calculateResult(operation, num1, num2) {
    switch (operation) {
        case Operation.SUM:
            return sum(num1, num2);
        case Operation.SUB:
            return sub(num1, num2);
        case Operation.MUL:
            return mul(num1, num2);
        case Operation.DIV:
            return div(num1, num2);
        default:
            console.error("Invalid operation, terminating...");
            return null;
    }
}

module.exports = {
    Operation,
    sum,
    sub,
    mul,
    div,
    calculateResult,
};