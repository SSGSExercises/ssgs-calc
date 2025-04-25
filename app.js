const { exit } = require('process');
const readline = require('readline');

const Operation = {
  SUM: "sum",
  SUB: "sub",
  MUL: "mul",
  DIV: "div"
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getUserInput(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function div(num1, num2) {
  if (num2 === 0) {
    console.log("Error: Division by zero is not allowed.");
    return "undefined";
  }

  return num1 / num2;
}

function mul(num1, num2) {
  return num1 * num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function sum(num1, num2) {
  return num1 + num2;
}

async function askOperation() {
  let operation = await getUserInput("Please enter an arithmetic operation: sum, sub, mul or div: ");

  while (operation !== Operation.SUM && operation !== Operation.SUB && operation !== Operation.MUL && operation !== Operation.DIV) {
    console.log("Invalid operation. Please retype your choice.");
    operation = await getUserInput("Please enter an arithmetic operation: sum, sub, mul, or div: ");
  }

  return operation;
}

async function askTwoNumbers() {
  let num1 = parseFloat(await getUserInput("Please enter the first number: "));
  while (isNaN(num1)) {
    console.log("Invalid input. Please retype your choice.");
    num1 = parseFloat(await getUserInput("Please enter the first number: "));
  }

  let num2 = parseFloat(await getUserInput("Please enter the second number: "));
  while (isNaN(num2)) {
    console.log("Invalid input. Please retype your choice.");
    num2 = parseFloat(await getUserInput("Please enter the second number: "));
  }

  return { num1, num2 };
}

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

  let operation = await askOperation();
  let { num1, num2 } = await askTwoNumbers();

  let result = calculateResult(operation, num1, num2);
  if (result === null) {
    console.log("Calculation could not be performed due to an invalid operation.");
  } else {
    console.log(`The result of the ${operation} operation is: ${result}`);
  }

  exit();
}

main().catch(console.error);

module.exports = {
  getUserInput,
  askOperation,
  askTwoNumbers,
  calculateResult,
  main
};