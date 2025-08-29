import { mapValue } from '../src/part1';
import { mapRange, Range } from '../src/part2';


// Helper to sort ranges for consistent test comparisons
const sortRanges = (ranges: Range[]) => ranges.sort((a, b) => a.start - b.start);

describe('Day 5: mapValue', () => {
    // These rules are based on the example from a similar puzzle.
    // Rule 1: maps source range [98, 99] to destination range [50, 51]
    // Rule 2: maps source range [50, 97] to destination range [52, 99]
    const sampleRules = [
        '50 98 2',
        '52 50 48'
    ];

    it('should correctly map a value that falls within a defined range', () => {
        // 79 is in the source range [50, 97].
        // The offset is 79 - 50 = 29.
        // The mapped value should be 52 + 29 = 81.
        expect(mapValue(79, sampleRules)).toBe(81);
    });

    it('should return the same value if it does not fall into any mapping range', () => {
        // 14 is not in any source range.
        expect(mapValue(14, sampleRules)).toBe(14);
    });

    it('should correctly map a value at the exact start of a source range', () => {
        // 98 is the start of the first rule's source range.
        expect(mapValue(98, sampleRules)).toBe(50);
    });

    it('should correctly map a value at the exact end of a source range', () => {
        // 97 is the last number in the second rule's source range (50 + 48 - 1).
        expect(mapValue(97, sampleRules)).toBe(99);
    });

    it('should return the same value for numbers just outside a range', () => {
        // 49 is one less than the start of the second rule's range.
        expect(mapValue(49, sampleRules)).toBe(49);
        // 100 is one more than the end of the first rule's range.
        expect(mapValue(100, sampleRules)).toBe(100);
    });

    it('should return the input value if the list of rules is empty', () => {
        expect(mapValue(123, [])).toBe(123);
    });

    it('should ignore malformed rule strings and process valid ones correctly', () => {
        const rulesWithMalformedData = [
            '50 98 2',
            'this is not a valid rule',
            '52 50 48'
        ];
        // The function should behave as if the malformed rule doesn't exist.
        expect(mapValue(79, rulesWithMalformedData)).toBe(81);
    });
});

describe('Day 5: mapRange', () => {
    const sampleRules = [
        '52 50 48', // src [50, 98), dest [52, 100)
        '50 98 2'   // src [98, 100), dest [50, 52)
    ];

    it('should map a range fully contained within a single rule', () => {
        const inputRange: Range = { start: 79, length: 14 }; // Range [79, 93)
        const expected: Range[] = [{ start: 81, length: 14 }]; // Maps to [81, 95)
        const result = mapRange(inputRange, sampleRules);
        expect(sortRanges(result)).toEqual(sortRanges(expected));
    });

    it('should return the same range if it does not overlap with any rule', () => {
        const inputRange: Range = { start: 10, length: 15 };
        const expected: Range[] = [{ start: 10, length: 15 }];
        const result = mapRange(inputRange, sampleRules);
        expect(sortRanges(result)).toEqual(sortRanges(expected));
    });

    it('should split a range that starts before a rule and ends within it', () => {
        const inputRange: Range = { start: 45, length: 10 }; // Range [45, 55)
        const expected: Range[] = [
            { start: 45, length: 5 },  // Unmapped part [45, 50)
            { start: 52, length: 5 }   // Mapped part [50, 55) -> [52, 57)
        ];
        const result = mapRange(inputRange, sampleRules);
        expect(sortRanges(result)).toEqual(sortRanges(expected));
    });

    it('should split a range that starts within a rule and ends after it', () => {
        const inputRange: Range = { start: 90, length: 15 }; // Range [90, 105)
        const expected: Range[] = [
            { start: 50, length: 2 },   // Mapped part [98, 100) -> [50, 52)
            { start: 92, length: 8 },   // Mapped part [90, 98) -> [92, 100)
            { start: 100, length: 5 }  // Unmapped part [100, 105)
        ];
        const result = mapRange(inputRange, sampleRules);
        expect(sortRanges(result)).toEqual(sortRanges(expected));
    });

    it('should split a range that completely envelops a rule', () => {
        const inputRange: Range = { start: 40, length: 70 }; // Range [40, 110)
        const expected: Range[] = [
            { start: 40, length: 10 }, // Unmapped part [40, 50)
            { start: 50, length: 2 },  // Mapped part [98, 100) -> [50, 52)
            { start: 52, length: 48 }, // Mapped part [50, 98) -> [52, 100)
            { start: 100, length: 10 } // Unmapped part [100, 110)
        ];
        const result = mapRange(inputRange, sampleRules);
        expect(sortRanges(result)).toEqual(sortRanges(expected));
    });

    it('should handle an input range that exactly matches a rule', () => {
        const inputRange: Range = { start: 98, length: 2 };
        const expected: Range[] = [{ start: 50, length: 2 }];
        const result = mapRange(inputRange, sampleRules);
        expect(sortRanges(result)).toEqual(sortRanges(expected));
    });

    it('should return the same range if the rules list is empty', () => {
        const inputRange: Range = { start: 100, length: 50 };
        const expected: Range[] = [{ start: 100, length: 50 }];
        const result = mapRange(inputRange, []);
        expect(sortRanges(result)).toEqual(sortRanges(expected));
    });
});
