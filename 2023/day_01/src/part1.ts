import * as fs from 'fs';
import * as path from 'path';
import { readFileLines } from './fileUtils';

/**
 * Calculates the sum of calibration values from a file.
 * For each line, the calibration value is formed by concatenating the first and last digit.
 * @param filePath The path to the input file.
 * @returns The sum of all calibration values.
 */
export function calculateCalibrationSum(filePath: string): number {
    try {
        const lines = readFileLines(filePath);
        let totalSum = 0;

        for (const line of lines) {
            // Find all digits in the line
            const digits = line.match(/\d/g);

            if (digits) {
                const firstDigit = digits[0];
                const lastDigit = digits[digits.length - 1];
                
                // Concatenate first and last digit and parse as a number
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
        console.error('Usage: ts-node part1.ts <input_file_path>');
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

// This check ensures that main() is only called when the script is executed directly
if (require.main === module) {
    main();
}
