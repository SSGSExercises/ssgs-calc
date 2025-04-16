const { exit } = require('process');
const readline = require('readline');

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

async function main() {
  console.log("ssgs-calc started !");

  // ask the user to select the arithmetic operation:
  let operation = await getUserInput("Please enter an arithmetic operation: sum, sub, mul or div\n");
  while (operation !== "sum" && operation !== "sub" && operation !== "mul" && operation !== "div") {
    console.log("Invalid operation. Please retype your choice.");
    operation = await getUserInput("Please enter an arithmetic operation: sum, sub, mul, or div\n");
  }
  console.log(`You selected the ${operation} operation.`);

  // ask the user to input two numbers:
  let num1 = parseFloat(await getUserInput("Please enter the first number:\n"));
  while (isNaN(num1)) {
    console.log("Invalid input. Please retype your choice.");
    num1 = parseFloat(await getUserInput("Please enter the first number:\n"));
  }
  console.log(`You entered ${num1}`);
  let num2 = parseFloat(await getUserInput("Please enter the second number:\n"));
  while (isNaN(num2)) {
    console.log("Invalid input. Please retype your choice.");
    num2 = parseFloat(await getUserInput("Please enter the second number:\n"));
  }
  console.log(`You entered ${num2}`);

  // perform the operation and display the result:
  let result;
  if (operation === "sum") {
    result = sum(num1, num2);
  } else if (operation === "sub") {
    result = sub(num1, num2);
  } else if (operation === "mul") {
    result = mul(num1, num2);
  } else if (operation === "div") {
    result = div(num1, num2);
  }
  console.log(`The result of the ${operation} operation is: ${result}`);
  exit();
}

main().catch(console.error);

