import { calculateCalibrationSum } from '../src/part1';
import { readFileLines } from '../src/fileUtils';

// Mock the fileUtils module
jest.mock('../src/fileUtils', () => ({
    readFileLines: jest.fn(),
}));

// Typecast the mocked function to make TypeScript happy
const mockedReadFileLines = readFileLines as jest.Mock;

describe('Day 1, Part 1: Trebuchet?!', () => {

    afterEach(() => {
        // Clear mock history after each test
        jest.clearAllMocks();
    });

    it('should calculate the correct sum for the example input', () => {
        const mockLines = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];
        mockedReadFileLines.mockReturnValue(mockLines);
        
        // The path doesn't matter here since readFileLines is mocked
        expect(calculateCalibrationSum('dummy_path.txt')).toBe(142); 
    });

    it('should handle lines with only one digit', () => {
        const mockLines = ['a7b', 'cde2fgh', '9'];
        mockedReadFileLines.mockReturnValue(mockLines);
        
        // 77 + 22 + 99 = 198
        expect(calculateCalibrationSum('dummy_path.txt')).toBe(198);
    });

    it('should return 0 for lines with no digits', () => {
        const mockLines = ['abcde', 'fghij', 'klmno'];
        mockedReadFileLines.mockReturnValue(mockLines);
        
        expect(calculateCalibrationSum('dummy_path.txt')).toBe(0);
    });

    it('should handle a mix of valid lines and lines with no digits', () => {
        const mockLines = ['zoneight234', 'nodigits', '7j'];
        mockedReadFileLines.mockReturnValue(mockLines);

        // 24 (from "zoneight234") + 0 (from "nodigits") + 77 (from "7j") = 101
        // Note: part1 only looks for digits, not spelled-out numbers.
        expect(calculateCalibrationSum('dummy_path.txt')).toBe(101);
    });

    it('should return 0 if the input file is empty', () => {
        const mockLines: string[] = [];
        mockedReadFileLines.mockReturnValue(mockLines);
        
        expect(calculateCalibrationSum('dummy_path.txt')).toBe(0);
    });
});