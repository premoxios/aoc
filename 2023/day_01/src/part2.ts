import * as fs from 'fs';
import * as path from 'path';
import { readFileLines } from './fileUtils';

const wordToDigit: { [key: string]: string } = {
    'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
    'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
};

/**
 * Converts a token (either a digit or a word) to its digit character.
 * @param token The string token to convert.
 * @returns The digit as a string.
 */
function convertToDigit(token: string): string {
    return wordToDigit[token] || token;
}

/**
 * Calculates the sum of calibration values from a file,
 * accounting for spelled-out numbers.
 * @param filePath The path to the input file.
 * @returns The sum of all calibration values.
 */
function calculateCalibrationSum(filePath: string): number {
    try {
        const lines = readFileLines(filePath);
        let totalSum = 0;

        // Regex to find digits or spelled-out numbers, using a positive lookahead
        // to handle overlapping matches (e.g., "oneight").
        const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

        for (const line of lines) {
            // Find all matches in the line
            const matches = Array.from(line.matchAll(regex), m => m[1]);

            if (matches.length > 0) {
                const firstToken = matches[0];
                const lastToken = matches[matches.length - 1];

                const firstDigit = convertToDigit(firstToken);
                const lastDigit = convertToDigit(lastToken);

                const calibrationValue = parseInt(firstDigit + lastDigit, 10);
                totalSum += calibrationValue;
            }
        }

        return totalSum;
    } catch (error) {
        console.error(`Error reading or processing file: ${error}`);
        return 0;
    }
}

function main() {
    // Get file name from command line arguments
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.error('Usage: ts-node part2.ts <input_file_path>');
        process.exit(1);
    }

    const inputFilePath = path.resolve(args[0]);

    if (!fs.existsSync(inputFilePath)) {
        console.error(`Error: File not found at ${inputFilePath}`);
        process.exit(1);
    }

    const result = calculateCalibrationSum(inputFilePath);
    console.log(`The sum of all of the calibration values is: ${result}`);
}

main();