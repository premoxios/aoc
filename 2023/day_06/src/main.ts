import * as fs from 'fs';
import * as path from 'path';
import { part1 } from './part1';
import { part2 } from './part2';

/**
 * A structured representation of the input data.
 */
export interface RaceResult {
    duration: number;
    record: number;
}

/**
 * @param fileContent The full content of the input file as a single string.
 * @returns An array of RaceResult objects.
 */
export function parseRaces(fileContent: string): RaceResult[] {
    const results: RaceResult[] = [];

    const lines = fileContent.split('\n');
     // Parse the numbers from each line, splitting by whitespace
    const durations = lines[0].split(':')[1].trim().split(/\s+/).map(Number);
    const records = lines[1].split(':')[1].trim().split(/\s+/).map(Number);
    for (let i = 0; i < durations.length; i++) {
        results.push({ duration: durations[i], record: records[i] });
    }

    return results;
}

export function parseRacePart2(fileContent: string): RaceResult {
    const lines = fileContent.split('\n');
    // Remove all whitespace characters, then convert to a number
    const duration = Number(lines[0].split(':')[1].replace(/\s/g, ''));
    const record = Number(lines[1].split(':')[1].replace(/\s/g, ''));
    return { duration, record };
}

    /**
 * Main function to run the program.
 * It reads a file from the command line and processes it.
 */
function main() {
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
        // Read the whole file at once for easier block parsing.
        const fileContent = fs.readFileSync(inputFilePath, 'utf-8');
        const races = parseRaces(fileContent);

        console.log('--- Race Data Parsed ---');
        console.log('Number of races:', races.length);
        console.log('---------------------------');

        part1(races);

        const racePart2 = parseRacePart2(fileContent);
        part2(racePart2);

    } catch (error) {
        console.error(`An error occurred: ${error}`);
        process.exit(1);
    }
}

// This check ensures that main() is only called when the script is executed directly
if (require.main === module) {
    main();
}