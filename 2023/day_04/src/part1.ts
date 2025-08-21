/**
 * Calculates the total points from a series of scratch cards.
 * Points are awarded based on the number of matching numbers between a "winners" list and a "candidates" list.
 * 1 point for the first match, then doubled for each subsequent match.
 * @param lines An array of strings, where each string represents a scratch card.
 * @returns The total point value of all cards.
 */
export function part1(lines: string[]): number {
    let totalPoints = 0;

    for (const line of lines) {
        if (!line) continue;

        // Isolate the two lists of numbers by splitting at ':' and then '|'
        const numberLists = line.substring(line.indexOf(':') + 2);
        const [winnersStr, candidatesStr] = numberLists.split(' | ');

        // Create a Set of winning numbers for efficient lookup.
        // The regex \s+ handles one or more spaces between numbers.
        const winningNumbers = new Set(winnersStr.trim().split(/\s+/).map(Number));
        const candidateNumbers = candidatesStr.trim().split(/\s+/).map(Number);

        let matchCount = 0;
        // Count how many candidate numbers are in the winning set
        for (const num of candidateNumbers) {
            if (winningNumbers.has(num)) {
                matchCount++;
            }
        }

        // Calculate points for the current card and add to the total
        if (matchCount > 0) {
            // 1 match = 2^0 = 1 point
            // 2 matches = 2^1 = 2 points
            // 3 matches = 2^2 = 4 points, etc.
            totalPoints += Math.pow(2, matchCount - 1);
        }
    }

    console.log(`The total point value of all cards is: ${totalPoints}`);
    return totalPoints;
}