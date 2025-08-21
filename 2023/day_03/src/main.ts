import * as fs from 'fs';
import * as path from 'path';
import { part1 } from './part1';
import { part2 } from './part2';

/**
 * Reads a file and returns its content as an array of trimmed lines.
 * It filters out any empty lines that result from the split.
 * @param filePath The path to the file.
 * @returns An array of strings, where each string is a trimmed line from the file.
 * @throws An error if the file cannot be read.
 */
export function readFileLines(filePath: string): string[] {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.split('\n').map(line => line.trim()).filter(Boolean);
}

/**
 * Main function to run the program.
 * It reads a file from the command line and processes it.
 */
function main() {
    // Get file name from command line arguments
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.error('Usage: ts-node main.ts <input_file_path>');
        process.exit(1);
    }

    const inputFilePath = path.resolve(args[0]);

    if (!fs.existsSync(inputFilePath)) {
        console.error(`Error: File not found at ${inputFilePath}`);
        process.exit(1);
    }

    try {
        const lines = readFileLines(inputFilePath);
        part1(lines);
        part2(lines);
    } catch (error) {
        console.error(`An error occurred: ${error}`);
        process.exit(1);
    }
}

// This check ensures that main() is only called when the script is executed directly
if (require.main === module) {
    main();
}