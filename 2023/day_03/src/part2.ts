interface NumberLocation {
    value: number;
    row: number;
    startCol: number;
    endCol: number; // The column index *after* the last digit
}

/**
 * Calculates the sum of all gear ratios in the engine schematic.
 * A gear is any '*' symbol that is adjacent to exactly two part numbers.
 * Its gear ratio is the result of multiplying those two numbers together.
 * @param lines An array of strings representing the grid.
 * @returns The sum of all gear ratios.
 */
export function part2(lines: string[]): number {
    const grid = lines;
    const numRows = grid.length;
    if (numRows === 0) return 0;
    const numCols = grid[0].length;

    // 1. Find all numbers and store their locations and values.
    const numbers: NumberLocation[] = [];
    for (let r = 0; r < numRows; r++) {
        const regex = /\d+/g;
        let match;
        while ((match = regex.exec(grid[r])) !== null) {
            numbers.push({
                value: parseInt(match[0], 10),
                row: r,
                startCol: match.index,
                endCol: match.index + match[0].length,
            });
        }
    }

    let totalGearRatioSum = 0;

    // 2. Find every '*' and check for adjacent numbers.
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            if (grid[r][c] === '*') {
                const adjacentNumbers: number[] = [];

                // 3. Check which numbers are adjacent to this '*'.
                for (const num of numbers) {
                    // A number is adjacent if the '*' is within its surrounding bounding box.
                    // The bounding box is from one row above to one row below,
                    // and from one column before the start to the end column.
                    const isRowAdjacent = r >= num.row - 1 && r <= num.row + 1;
                    const isColAdjacent = c >= num.startCol - 1 && c <= num.endCol;

                    if (isRowAdjacent && isColAdjacent) {
                        adjacentNumbers.push(num.value);
                    }
                }

                // 4. If it's a valid gear, calculate the ratio and add to the sum.
                if (adjacentNumbers.length === 2) {
                    totalGearRatioSum += adjacentNumbers[0] * adjacentNumbers[1];
                }
            }
        }
    }

    console.log(`The sum of all gear ratios is: ${totalGearRatioSum}`);
    return totalGearRatioSum;
}