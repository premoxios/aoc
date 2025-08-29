import { Almanac } from './main';

/**
 * Maps a single input value to an output value based on a set of mapping rules.
 * Each rule is a string containing three numbers: destination start, source start, and range length.
 *
 * @param inputValue The integer value to be mapped.
 * @param mappingRules An array of strings, where each string defines a mapping range.
 * @returns The mapped integer value. If no rule applies, the original value is returned.
 */
export function mapValue(inputValue: number, mappingRules: string[]): number {
    for (const rule of mappingRules) {
        // Parse the three numbers from the rule string.
        const parts = rule.trim().split(/\s+/).map(Number);
        if (parts.length !== 3) {
            continue; // Skip any malformed lines.
        }
        const [destinationStart, sourceStart, rangeLength] = parts;

        // Check if the input value falls within the source range for this rule.
        // The source range is [sourceStart, sourceStart + rangeLength).
        if (inputValue >= sourceStart && inputValue < sourceStart + rangeLength) {
            // If it's in the range, calculate the offset from the start of the source range.
            const offset = inputValue - sourceStart;
            // Apply that same offset to the destination start to get the mapped value.
            return destinationStart + offset;
        }
    }

    // If the loop completes without finding any matching rule, the value maps to itself.
    return inputValue;
}

/**
 * Processes an Almanac to find the lowest location number corresponding to any of the initial seeds.
 * It passes each seed through the full sequence of maps.
 * @param almanac The parsed almanac data containing seeds and conversion maps.
 * @returns The lowest final location number.
 */
export function part1(almanac: Almanac): number {
    let lowestLocation = Infinity;

    const seeds = almanac.seeds.trim().split(/\s+/).map(Number);

    for (const seed of seeds) {
        let currentValue = seed;

        // Pass the current value through each map in sequence.
        for (const map of almanac.maps) {
            currentValue = mapValue(currentValue, map);
        }

        // After all maps are processed, currentValue is the final location for this seed.
        console.log(`Seed ${seed} maps to final location ${currentValue}`);
        
        if (currentValue < lowestLocation) {
            lowestLocation = currentValue;
        }
    }

    console.log(`\nThe lowest location number is: ${lowestLocation}`);
    return lowestLocation;
}