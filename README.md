# TEST_LAB_SSGS
test
# Calculator app

Submission by the team *'Gang of Four + 1'* for the SSGS course.  

## From the instructions for Lab Assignment 6:

### Prerequirements

- Node version 18.x must be install


### Requirements

- The interaction with the user takes place through the command line.  
- Upon launch, the program displays a welcome message and a list of the supported operations.  
- The user can select the desired operation from the available options (sum, sub, mul or div).  
- Based on the selected operation, the program asks for the necessary parameters to perform the operation (always two numbers).
- Once the user has entered valid parameters, the program returns the result of the operation and ends execution with a farewell message.

### Extra functionalities

- Improve the program's behavior in case of an invalid parameter (for example, display an error message and allow the user to try again instead of terminating the execution).

### How to install

- Clone the repositories
````bash
git clone https://github.com/SSGSExercises/ssgs-calc.git
````
- Enter in the cloned directory
````bash
cd ${your_installation_dir}/ssgs-calc
````
- Install dependecies
````bash
npm install
````

### How to use

- Run with

````bash
npm run dev
````
- #### Testing:

The application includes unit tests written using the [Jest](https://jestjs.io/) testing framework. These tests cover the core arithmetic functions (`sum`, `sub`, `mul`, `div`) and the main `calculateResult` function located in [`lib.js`](). The coverage of the test is included in the output, with an actual coverage of 100%.

The tests verify:
- Correct calculations for all supported operations with various inputs (positive, negative, zero, decimals).
- Proper handling of edge cases, specifically division by zero.
- Correct behavior when an invalid operation is provided to `calculateResult`.

To run the tests locally, execute the following command in your terminal:

````bash
npm test
````

## Github Actions:

A GitHub Actions workflow is configured in [`.github/workflows/test.yml`](). This workflow automates the testing process and shows the output of the coverage. Runs only on push and on pull request to the `main` branch

Key features:
- **Trigger:** The workflow runs automatically on every `push` event to the repository.
- **Environment:** It sets up a clean Ubuntu environment with Node.js version 18.x.
- **Steps:**
    1. Checks out the repository code.
    2. Sets up the specified Node.js version.
    3. Installs project dependencies using `npm ci`.
    4. Executes the Jest test suite using `npm test`.
    5. Uploads an artifact containing the code coverage report.

This Continuous Integration (CI) setup ensures that all tests pass automatically whenever new code is pushed to the repository.