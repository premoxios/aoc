import * as fs from 'fs';
import * as path from 'path';
import { part1 } from './part1';
import { part2 } from './part2';

/**
 * A structured representation of the input data.
 */
export interface Hand {
    cards: string;
    bid: number;
}

/**
 * Parses the input file content into an array of Hand objects.
 * @param fileContent The full content of the input file as a single string.
 * @returns An array of Hand objects.
 */
export function parseHands(fileContent: string): Hand[] {
    const lines = fileContent.trim().split('\n');
    const hands: Hand[] = [];

    for (const line of lines) {
        if (!line) continue;

        const [cards, bidStr] = line.split(/\s+/);
        if (cards && bidStr) {
            hands.push({
                cards: cards,
                bid: Number(bidStr)
            });
        }
    }

    return hands;
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
        const hands = parseHands(fileContent);
        part1(hands);
        part2(hands);

    } catch (error) {
        console.error(`An error occurred: ${error}`);
        process.exit(1);
    }
}

// This check ensures that main() is only called when the script is executed directly
if (require.main === module) {
    main();
}