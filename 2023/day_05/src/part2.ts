import { Almanac } from './main';

export interface Range {
    start: number;
    length: number;
}

/**
 * Maps an entire range of numbers through a single mapping table.
 * The input range may be split into multiple output ranges depending on how it overlaps
 * with the defined mapping rules.
 * @param inputRange The range to be mapped, with a start and length.
 * @param mappingRules The set of rules for the current map (e.g., seed-to-soil).
 * @returns An array of one or more output ranges.
 */
export function mapRange(inputRange: Range, mappingRules: string[]): Range[] {
    const mappedRanges: Range[] = [];
    let unmappedPortions: Range[] = [inputRange];

    for (const rule of mappingRules) {
        const [destStart, srcStart, rangeLen] = rule.trim().split(/\s+/).map(Number);
        const srcEnd = srcStart + rangeLen;
        const offset = destStart - srcStart;

        const nextUnmapped: Range[] = [];

        for (const portion of unmappedPortions) {
            const portionStart = portion.start;
            const portionEnd = portion.start + portion.length;

            // Find the intersection between the current unmapped portion and the source rule
            const overlapStart = Math.max(portionStart, srcStart);
            const overlapEnd = Math.min(portionEnd, srcEnd);

            if (overlapStart < overlapEnd) { // There is a valid overlap
                // The overlapping part gets mapped
                mappedRanges.push({ start: overlapStart + offset, length: overlapEnd - overlapStart });

                // The part before the overlap remains unmapped for now
                if (portionStart < overlapStart) {
                    nextUnmapped.push({ start: portionStart, length: overlapStart - portionStart });
                }
                // The part after the overlap remains unmapped for now
                if (portionEnd > overlapEnd) {
                    nextUnmapped.push({ start: overlapEnd, length: portionEnd - overlapEnd });
                }
            } else {
                // No overlap, the entire portion remains unmapped
                nextUnmapped.push(portion);
            }
        }
        unmappedPortions = nextUnmapped;
    }

    // Any remaining unmapped portions map to themselves and are added to the final result.
    return [...mappedRanges, ...unmappedPortions];
}

/**
 * Processes an Almanac to find the lowest location number from seed ranges using range-based mapping.
 * This is an efficient approach that avoids brute-force checking of every seed.
 * @param almanac The parsed almanac data containing seeds and conversion maps.
 * @returns The lowest final location number.
 */
export function part2(almanac: Almanac): number {
    const seedData = almanac.seeds.trim().split(/\s+/).map(Number);

    // 1. Create the initial list of seed ranges
    let currentRanges: Range[] = [];
    for (let i = 0; i < seedData.length; i += 2) {
        currentRanges.push({ start: seedData[i], length: seedData[i + 1] });
    }

    // 2. Pass the ranges through each map in sequence
    for (const map of almanac.maps) {
        const nextRanges: Range[] = [];
        for (const range of currentRanges) {
            // A single input range can become multiple output ranges
            const mapped = mapRange(range, map);
            nextRanges.push(...mapped);
        }
        currentRanges = nextRanges;
    }

    // 3. Find the lowest starting location from all the final ranges
    let lowestLocation = Infinity;
    for (const range of currentRanges) {
        if (range.start < lowestLocation) {
            lowestLocation = range.start;
        }
    }

    console.log(`\nThe lowest location number found across all ranges is: ${lowestLocation}`);
    return lowestLocation;
}