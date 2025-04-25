const readline = require('readline');
const { exit } = require('process');

// Mock modules before importing app
jest.mock('readline');
jest.mock('process', () => ({
    ...jest.requireActual('process'),
    exit: jest.fn()
}));

// Mock console.log
console.log = jest.fn();

// Import app after mocking
const app = require('./app');
const {
    Operation,
    sum,
    sub,
    mul,
    div,
    getUserInput,
    askOperation,
    askTwoNumbers,
    calculateResult,
    main
} = app;

describe('Arithmetic Operations', () => {
    test('sum adds two numbers correctly', () => {
        expect(sum(5, 3)).toBe(8);
        expect(sum(-1, 1)).toBe(0);
        expect(sum(0, 0)).toBe(0);
        expect(sum(2.5, 3.5)).toBe(6);
    });

    test('sub subtracts second number from first number', () => {
        expect(sub(5, 3)).toBe(2);
        expect(sub(-1, 1)).toBe(-2);
        expect(sub(0, 0)).toBe(0);
        expect(sub(5.5, 2.5)).toBe(3);
    });

    test('mul multiplies two numbers correctly', () => {
        expect(mul(5, 3)).toBe(15);
        expect(mul(-1, 1)).toBe(-1);
        expect(mul(0, 5)).toBe(0);
        expect(mul(2.5, 2)).toBe(5);
    });

    test('div divides first number by second number', () => {
        expect(div(6, 3)).toBe(2);
        expect(div(-6, 3)).toBe(-2);
        expect(div(0, 5)).toBe(0);
        expect(div(5.5, 2)).toBe(2.75);
    });

    test('div returns "undefined" and logs error when dividing by zero', () => {
        expect(div(5, 0)).toBe("undefined");
        expect(console.log).toHaveBeenCalledWith("Error: Division by zero is not allowed.");
    });
});

describe('getUserInput Function', () => {
    let mockQuestion;
    let mockClose;

    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();

        // Setup mock implementation
        mockQuestion = jest.fn((question, callback) => {
            callback('test input');
        });

        mockClose = jest.fn();

        readline.createInterface.mockReturnValue({
            question: mockQuestion,
            close: mockClose
        });
    });

    test('getUserInput returns user input correctly', async () => {
        const input = await getUserInput('Test question?');
        expect(input).toBe('test input');

        expect(readline.createInterface).toHaveBeenCalledTimes(1);
        expect(mockQuestion).toHaveBeenCalledWith('Test question?', expect.any(Function));
        expect(mockClose).toHaveBeenCalledTimes(1);
    });
});

describe('askOperation Function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('askOperation returns a valid operation', async () => {
        const mockGetUserInput = jest.fn().mockResolvedValue(Operation.SUM);
        const result = await askOperation(mockGetUserInput);
        expect(result).toBe(Operation.SUM);
        expect(mockGetUserInput).toHaveBeenCalledTimes(1);
    });

    test('askOperation handles invalid input and retries', async () => {
        const mockGetUserInput = jest.fn()
            .mockResolvedValueOnce('invalid')
            .mockResolvedValueOnce(Operation.MUL);
        const result = await askOperation(mockGetUserInput);
        expect(result).toBe(Operation.MUL);
        expect(mockGetUserInput).toHaveBeenCalledTimes(2);
        expect(console.log).toHaveBeenCalledWith("Invalid operation. Please retype your choice.");
    });

    test('askOperation accepts all valid operations', async () => {
        const operations = Object.values(Operation);
        for (const op of operations) {
            const mockGetUserInput = jest.fn().mockResolvedValue(op);
            const result = await askOperation(mockGetUserInput);
            expect(result).toBe(op);
        }
    });

    test('askOperation throws error when inputStream is not a function', async () => {
        await expect(askOperation(null)).rejects.toThrow();
    });
});

describe('askTwoNumbers Function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('askTwoNumbers returns valid numbers', async () => {
        const mockGetUserInput = jest.fn()
            .mockResolvedValueOnce('5')
            .mockResolvedValueOnce('3');

        const result = await askTwoNumbers(mockGetUserInput);
        expect(result).toEqual({ num1: 5, num2: 3 });
        expect(mockGetUserInput).toHaveBeenCalledTimes(2);
    });

    test('askTwoNumbers handles invalid first number', async () => {
        const mockGetUserInput = jest.fn()
            .mockResolvedValueOnce('invalid')
            .mockResolvedValueOnce('5')
            .mockResolvedValueOnce('3');

        const result = await askTwoNumbers(mockGetUserInput);
        expect(result).toEqual({ num1: 5, num2: 3 });
        expect(mockGetUserInput).toHaveBeenCalledTimes(3);
        expect(console.log).toHaveBeenCalledWith("Invalid input. Please retype your choice.");
    });

    test('askTwoNumbers handles invalid second number', async () => {
        const mockGetUserInput = jest.fn()
            .mockResolvedValueOnce('5')
            .mockResolvedValueOnce('invalid')
            .mockResolvedValueOnce('3');

        const result = await askTwoNumbers(mockGetUserInput);
        expect(result).toEqual({ num1: 5, num2: 3 });
        expect(mockGetUserInput).toHaveBeenCalledTimes(3);
        expect(console.log).toHaveBeenCalledWith("Invalid input. Please retype your choice.");
    });

    test('askTwoNumbers accepts decimal numbers', async () => {
        const mockGetUserInput = jest.fn()
            .mockResolvedValueOnce('5.5')
            .mockResolvedValueOnce('3.3');

        const result = await askTwoNumbers(mockGetUserInput);
        expect(result).toEqual({ num1: 5.5, num2: 3.3 });
    });

    test('askTwoNumbers throws error when inputStream is not a function', async () => {
        await expect(askTwoNumbers(null)).rejects.toThrow();
    });
});

describe('calculateResult Function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('calculateResult handles all valid operations', () => {
        expect(calculateResult(Operation.SUM, 5, 3)).toBe(8);
        expect(calculateResult(Operation.SUB, 5, 3)).toBe(2);
        expect(calculateResult(Operation.MUL, 5, 3)).toBe(15);
        expect(calculateResult(Operation.DIV, 6, 3)).toBe(2);
    });

    test('calculateResult handles division by zero', () => {
        expect(calculateResult(Operation.DIV, 5, 0)).toBe("undefined");
        expect(console.log).toHaveBeenCalledWith("Error: Division by zero is not allowed.");
    });

    test('calculateResult returns null for invalid operation', () => {
        expect(calculateResult('invalid', 5, 3)).toBe(null);
        expect(console.log).toHaveBeenCalledWith("Invalid operation, terminating...");
    });

    test('calculateResult handles negative numbers', () => {
        expect(calculateResult(Operation.SUM, -5, -3)).toBe(-8);
        expect(calculateResult(Operation.SUB, -5, -3)).toBe(-2);
        expect(calculateResult(Operation.MUL, -5, -3)).toBe(15);
        expect(calculateResult(Operation.DIV, -6, -3)).toBe(2);
    });
});