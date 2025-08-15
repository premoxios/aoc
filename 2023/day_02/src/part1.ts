/**
 * Processes game data to determine which games are possible given a maximum number of cubes for each color.
 * A game is possible if, in every draw, the number of cubes of each color does not exceed the maximum allowed.
 * It then sums the IDs of all possible games.
 * @param lines An array of strings, where each string is a line of game data from the input file.
 */
export function checkGames(lines: string[]): void {
    const MAX_RED = 12;
    const MAX_GREEN = 13;
    const MAX_BLUE = 14;

    let sumOfPossibleGameIds = 0;

    lines.forEach(line => {
        if (!line) return;

        const gameIdMatch = line.match(/Game (\d+):/);
        if (!gameIdMatch) return;

        const gameId = parseInt(gameIdMatch[1], 10);
        const gameData = line.substring(line.indexOf(':') + 2);
        const draws = gameData.split(';');

        let isGamePossible = true;

        for (const draw of draws) {
            const colorCounts = draw.split(',');

            for (const countStr of colorCounts) {
                // e.g., " 3 blue" -> ["3", "blue"]
                const [count, color] = countStr.trim().split(' ');
                const num = parseInt(count, 10);

                if (
                    (color === 'red' && num > MAX_RED) ||
                    (color === 'green' && num > MAX_GREEN) ||
                    (color === 'blue' && num > MAX_BLUE)
                ) {
                    isGamePossible = false;
                    break; // This draw is invalid, so the whole game is.
                }
            }

            if (!isGamePossible) {
                break; // No need to check other draws for this game.
            }
        }

        if (isGamePossible) {
            sumOfPossibleGameIds += gameId;
        }
    });

    console.log(`The sum of the IDs of possible games is: ${sumOfPossibleGameIds}`);
}
