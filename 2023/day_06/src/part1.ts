import { RaceResult } from './main';

/**
 * For each race, this function calculates the number of ways you can charge the boat
 * to beat the record distance. It then multiplies these counts together for a final result.
 *
 * @param races An array of RaceResult objects, each with a duration and record distance.
 * @returns The product of the number of winning options for all races.
 */
export function part1(races: RaceResult[]): number {
    let totalWaysProduct = 1;

    // Iterate over each race defined in the input
    for (const race of races) {
        let winningWaysCount = 0;

        
        // Test every possible integer charge time from 0 to the race duration
        for (let chargeTime = 0; chargeTime <= race.duration; chargeTime++) {
            // The speed of the boat is equal to the time spent charging.
            const speed = chargeTime;
            // The remaining time is the total duration minus the charge time.
            const travelTime = race.duration - chargeTime;
            // The distance is speed * time.
            const distance = speed * travelTime;

            // If the calculated distance beats the record, it's a winning option.
            if (distance > race.record) {
                winningWaysCount++;
            }
        }

        // Multiply the total product by the number of ways found for this race.
        // If a race has 0 ways to win, the product becomes 0 if we don't check.
        // The puzzle usually implies we only multiply the counts of ways to win.
        if (winningWaysCount > 0) {
            totalWaysProduct *= winningWaysCount;
        }
    }

    console.log(`The product of the number of ways to win is: ${totalWaysProduct}`);
    return totalWaysProduct;
}