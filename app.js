const { Operation, calculateResult } = require("./lib.js");
const readline = require("readline");

/**
 * Promisifies the readline.question function, allowing for asynchronous question prompting.
 * @param {readline.Interface} rl - The readline interface object.
 * @param {string} question - The question to ask the user.
 * @returns {Promise<string>} A promise that resolves with the user's answer to the question.
 */
const askQuestion = (rl, question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

/**
 * Asynchronously prompts the user to enter an arithmetic operation and validates the input.
 * It keeps asking until a valid operation ("sum", "sub", "mul", or "div") is entered.
 * @param {readline.Interface} rl - The readline interface object for interacting with the user.
 * @returns {Promise<string>} A promise that resolves with the valid arithmetic operation entered by the user.
 */
async function askOperation(rl) {
  let operation = await askQuestion(
    rl,
    "Please enter an arithmetic operation: sum, sub, mul or div: "
  );

  while (!Object.values(Operation).includes(operation)) {
    console.log("Invalid operation. Please retype your choice.");
    operation = await askQuestion(
      rl,
      "Please enter an arithmetic operation: sum, sub, mul, or div: "
    );
  }

  return operation;
}

/**
 * Asynchronously prompts the user to enter two numbers and validates that the inputs are valid numbers.
 * It keeps asking for each number until a valid number is entered.
 * @param {readline.Interface} rl - The readline interface object for interacting with the user.
 * @returns {Promise<{num1: number, num2: number}>} A promise that resolves with an object containing the two valid numbers entered by the user.
 */
async function askTwoNumbers(rl) {
  let num1 = parseFloat(
    await askQuestion(rl, "Please enter the first number: ")
  );
  while (isNaN(num1)) {
    console.log("Invalid input. Please retype your choice.");
    num1 = parseFloat(await askQuestion(rl, "Please enter the first number: "));
  }

  let num2 = parseFloat(
    await askQuestion(rl, "Please enter the second number: ")
  );
  while (isNaN(num2)) {
    console.log("Invalid input. Please retype your choice.");
    num2 = parseFloat(
      await askQuestion(rl, "Please enter the second number: ")
    );
  }

  return { num1, num2 };
}

const main = async () => {
  console.log("[ssgs-calc] initialized.");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const operation = await askOperation(rl);
  const { num1, num2 } = await askTwoNumbers(rl);
  const result = calculateResult(operation, num1, num2);

  if (result === null) {
    console.log(
      "Calculation could not be performed due to an invalid operation."
    );
  } else {
    console.log(`The result of the ${operation} operation is: ${result}`);
  }

  rl.close();
};

main();
