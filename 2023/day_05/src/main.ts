import * as fs from 'fs';
import * as path from 'path';
import { part1 } from './part1';
import { part2 } from './part2';

/**
 * A structured representation of the input data.
 */
export interface Almanac {
    seeds: string;
    maps: string[][]; // An array of maps, where each map is an array of rule strings
}

/**
 * Parses the entire input file content into a structured Almanac object.
 * @param fileContent The full content of the input file as a single string.
 * @returns An Almanac object containing the initial seeds and the list of conversion maps.
 */
export function parseAlmanac(fileContent: string): Almanac {
    // Split the file content by double newlines to separate the blocks.
    const blocks = fileContent.trim().split('\n\n');

    // The first block is always the seeds.
    const seedsLine = blocks.shift() || '';
    const seeds = seedsLine.substring(seedsLine.indexOf(':') + 2);

    const maps: string[][] = [];
    for (const block of blocks) {
        // For each subsequent block, split it into lines and discard the first line (the map header).
        const mapLines = block.split('\n').slice(1);
        maps.push(mapLines);
    }

    return { seeds, maps };
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
        const almanac = parseAlmanac(fileContent);

        console.log('--- Almanac Data Parsed ---');
        console.log('Seeds:', almanac.seeds);
        console.log('Number of maps:', almanac.maps.length);
        console.log('---------------------------');

        part1(almanac);
        part2(almanac);

    } catch (error) {
        console.error(`An error occurred: ${error}`);
        process.exit(1);
    }
}

// This check ensures that main() is only called when the script is executed directly
if (require.main === module) {
    main();
}