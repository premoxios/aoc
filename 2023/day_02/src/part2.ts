/**
 * For each game, finds the minimum set of cubes required for the game to be possible.
 * The "power" of this set is calculated by multiplying the number of red, green, and blue cubes together.
 * This function then calculates the sum of the power of all games.
 * @param lines An array of strings, where each string is a line of game data from the input file.
 */
export function calculatePowerSum(lines: string[]): void {
    let totalPowerSum = 0;

    lines.forEach(line => {
        if (!line) return;

        // We don't need the Game ID, just the data after the colon.
        const gameData = line.substring(line.indexOf(':') + 2);
        const draws = gameData.split(';');

        let maxRed = 0;
        let maxGreen = 0;
        let maxBlue = 0;

        for (const draw of draws) {
            const colorCounts = draw.split(',');

            for (const countStr of colorCounts) {
                const [count, color] = countStr.trim().split(' ');
                const num = parseInt(count, 10);

                // Find the maximum number of cubes shown for each color in this game.
                switch (color) {
                    case 'red':
                        maxRed = Math.max(maxRed, num);
                        break;
                    case 'green':
                        maxGreen = Math.max(maxGreen, num);
                        break;
                    case 'blue':
                        maxBlue = Math.max(maxBlue, num);
                        break;
                }
            }
        }

        // The "power" of the game is the product of the maximums.
        const gamePower = maxRed * maxGreen * maxBlue;
        totalPowerSum += gamePower;
    });

    console.log(`The sum of the power of all games is: ${totalPowerSum}`);
}