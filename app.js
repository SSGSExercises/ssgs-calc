const { exit } = require('process');
const readline = require('readline');

const Operation = {
  SUM: "sum",
  SUB: "sub",
  MUL: "mul",
  DIV: "div"
};

function getUserInput(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function sum(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function mul(num1, num2) {
  return num1 * num2;
}

function div(num1, num2) {
  if (num2 === 0) {
    console.log("Error: Division by zero is not allowed.");
    return "undefined";
  }

  return num1 / num2;
}

/**
 * Prompts the user to enter an arithmetic operation and validates the input.
 * Keeps asking until a valid operation is provided.
 * 
 * @param {function} inputStream - A function that returns a Promise resolving to user input
 * @returns {Promise<string>} A Promise that resolves to the valid operation selected by the user
 * @throws {Error} If inputStream is not a function or fails to get input
 */
async function askOperation(inputStream) {
  let operation = await inputStream("Please enter an arithmetic operation: sum, sub, mul or div: ");

  while (!Object.values(Operation).includes(operation)) {
    console.log("Invalid operation. Please retype your choice.");
    operation = await inputStream("Please enter an arithmetic operation: sum, sub, mul, or div: ");
  }

  return operation;
}

/**
 * Prompts the user for two numbers asynchronously using a provided callback function.
 * Keeps asking until valid inputs are provided.
 * 
 * @param {function} callback - Async function that handles user input prompts
 * @returns {Promise<{num1: number, num2: number}>} Object containing the two validated numbers
 * @throws {Error} If the callback fails to execute
 */
async function askTwoNumbers(inputStream) {
  let num1 = parseFloat(await inputStream("Please enter the first number: "));
  while (isNaN(num1)) {
    console.log("Invalid input. Please retype your choice.");
    num1 = parseFloat(await inputStream("Please enter the first number: "));
  }

  let num2 = parseFloat(await inputStream("Please enter the second number: "));
  while (isNaN(num2)) {
    console.log("Invalid input. Please retype your choice.");
    num2 = parseFloat(await inputStream("Please enter the second number: "));
  }

  return { num1, num2 };
}

/**
 * Performs arithmetic operations based on the specified operation type.
 * @param {Operation} operation - The arithmetic operation to perform (SUM, SUB, MUL, DIV)
 * @param {number} num1 - The first number operand
 * @param {number} num2 - The second number operand
 * @returns {number | null} The result of the arithmetic operation, or null if the operation is invalid
 * @throws {Error} If division by zero is attempted
 */
function calculateResult(operation, num1, num2) {
  let result;

  switch (operation) {
    case Operation.SUM:
      result = sum(num1, num2);
      break;
    case Operation.SUB:
      result = sub(num1, num2);
      break;
    case Operation.MUL:
      result = mul(num1, num2);
      break;
    case Operation.DIV:
      result = div(num1, num2);
      break;
    default:
      console.log("Invalid operation, terminating...");
      return null;
  }

  return result;
}

async function main() {
  console.log("[ssgs-calc] initialized.");

  const operation = await askOperation(getUserInput);
  const { num1, num2 } = await askTwoNumbers(getUserInput);
  const result = calculateResult(operation, num1, num2);

  if (result === null) {
    console.log("Calculation could not be performed due to an invalid operation.");
  } else {
    console.log(`The result of the ${operation} operation is: ${result}`);
  }

  exit();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  Operation,
  sum,
  sub,
  mul,
  div,
  getUserInput,
  askOperation,
  askTwoNumbers,
  calculateResult,
  main,
};