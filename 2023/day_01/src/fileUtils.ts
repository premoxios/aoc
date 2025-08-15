import * as fs from 'fs';

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
