/**
 * Checks if a character is a symbol (not a digit and not a period).
 * @param char The character to check.
 * @returns True if the character is a symbol, otherwise false.
 */
function isSymbol(char: string | undefined): boolean {
    if (char === undefined) {
        return false;
    }
    // A symbol is anything that is not a number and not a '.'
    return isNaN(parseInt(char)) && char !== '.';
}

/**
 * Finds all numbers in a grid that are adjacent to a symbol and returns their sum.
 * Adjacency includes horizontal, vertical, and diagonal positions.
 * @param lines An array of strings representing the grid.
 * @returns The sum of all "part numbers".
 */
export function part1(lines: string[]): number {
    let totalSum = 0;
    const grid = lines;
    const numRows = grid.length;
    if (numRows === 0) return 0;
    const numCols = grid[0].length;

    // Iterate over each row of the grid
    for (let r = 0; r < numRows; r++) {
        const line = grid[r];
        // Use a regular expression to find all numbers in the current line
        const regex = /\d+/g;
        let match;

        while ((match = regex.exec(line)) !== null) {
            const numberStr = match[0];
            const startIndex = match.index;
            const endIndex = startIndex + numberStr.length; // One position after the last digit

            let isAdjacentToSymbol = false;

            // Define the bounding box to check for symbols
            // Row above, current row, row below
            for (let checkRow = r - 1; checkRow <= r + 1; checkRow++) {
                // Column before, during, and after the number
                for (let checkCol = startIndex - 1; checkCol <= endIndex; checkCol++) {
                    // Ensure the check is within the grid boundaries
                    if (checkRow >= 0 && checkRow < numRows && checkCol >= 0 && checkCol < numCols) {
                        if (isSymbol(grid[checkRow][checkCol])) {
                            isAdjacentToSymbol = true;
                            break; // Found a symbol, no need to check further for this number
                        }
                    }
                }
                if (isAdjacentToSymbol) {
                    break;
                }
            }

            if (isAdjacentToSymbol) {
                totalSum += parseInt(numberStr, 10);
            }
        }
    }

    console.log(`The sum of all part numbers is: ${totalSum}`);
    return totalSum;
}