import { Hand } from './main';

// Enum to represent hand types, ordered from strongest to weakest for easy comparison.
export enum HandType {
    FiveOfAKind = 7,
    FourOfAKind = 6,
    FullHouse = 5,
    ThreeOfAKind = 4,
    TwoPair = 3,
    OnePair = 2,
    HighCard = 1
}

// Map to define the strength of each card for tie-breaking. Higher value is stronger.
const cardStrength: { [key: string]: number } = {
    'A': 14, 'K': 13, 'Q': 12, 'J': 11, 'T': 10, '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
};

/**
 * Determines the type of a given hand based on its cards.
 * @param cards A 5-character string representing the cards in a hand.
 * @returns The HandType enum value for the hand.
 */
export function getHandType(cards: string): HandType {
    const counts = new Map<string, number>();
    for (const card of cards) {
        counts.set(card, (counts.get(card) || 0) + 1);
    }

    const values = Array.from(counts.values());

    if (values.includes(5)) return HandType.FiveOfAKind;
    if (values.includes(4)) return HandType.FourOfAKind;
    if (values.includes(3) && values.includes(2)) return HandType.FullHouse;
    if (values.includes(3)) return HandType.ThreeOfAKind;
    if (values.filter(v => v === 2).length === 2) return HandType.TwoPair;
    if (values.includes(2)) return HandType.OnePair;
    
    return HandType.HighCard;
}

/**
 * Compares two hands to determine their relative rank.
 * - First compares by hand type.
 * - If types are the same, compares cards one by one for tie-breaking.
 * @param a The first hand, augmented with its type.
 * @param b The second hand, augmented with its type.
 * @returns A negative number if a < b, positive if a > b, and 0 if they are equal.
 */
function compareHands(a: { cards: string, type: HandType }, b: { cards: string, type: HandType }): number {
    // Primary sort: by hand type
    if (a.type !== b.type) {
        return a.type - b.type;
    }

    // Secondary sort: by individual card strength
    for (let i = 0; i < a.cards.length; i++) {
        const strengthA = cardStrength[a.cards[i]];
        const strengthB = cardStrength[b.cards[i]];
        if (strengthA !== strengthB) {
            return strengthA - strengthB;
        }
    }

    return 0; // Hands are identical
}

/**
 * Calculates the total winnings from a set of hands.
 * It sorts the hands by strength, then multiplies each hand's bid by its rank.
 * @param fileContent The raw string content from the input file.
 * @returns The total winnings.
 */
export function part1(hands: Hand[]): number {

    // Augment each hand with its type for sorting
    const typedHands = hands.map(hand => ({
        ...hand,
        type: getHandType(hand.cards)
    }));

    // Sort the hands from weakest to strongest
    typedHands.sort(compareHands);

    // Calculate total winnings
    let totalWinnings = 0;
    for (let i = 0; i < typedHands.length; i++) {
        const rank = i + 1;
        totalWinnings += typedHands[i].bid * rank;
    }

    console.log(`Total winnings for Part 1: ${totalWinnings}`);
    return totalWinnings;
}