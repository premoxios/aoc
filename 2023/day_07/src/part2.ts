import { Hand, parseHands } from './main';
import { HandType, getHandType as getHandTypePart1 } from './part1'; // Re-use the original classifier

// For Part 2, J is the weakest card for tie-breaking.
const cardStrengthPart2: { [key: string]: number } = {
    'A': 14, 'K': 13, 'Q': 12, 'T': 10, '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2, 'J': 1
};

// All possible card values the Joker can represent.
const possibleJokerValues = 'AKQT98765432'.split('');

/**
 * Determines the best possible hand type when 'J's are treated as wildcards.
 * @param cards A 5-character string representing the cards in a hand.
 * @returns The best possible HandType.
 */
function getHandTypeWithJokers(cards: string): HandType {
    const jokerCount = (cards.match(/J/g) || []).length;

    if (jokerCount === 0) {
        // If no jokers, use the original classification logic.
        return getHandTypePart1(cards);
    }

    // If there is exactly one 'J', find the best possible hand.
    let bestType = HandType.HighCard;
    for (const jokerValue of possibleJokerValues) {
        const potentialHand = cards.replaceAll('J', jokerValue);
        const currentType = getHandTypePart1(potentialHand);
        if (currentType > bestType) {
            bestType = currentType;
        }
    }

    if (jokerCount > 1) {
        // As requested, log and exit if more than one J is found.
        console.error(`Error: Hand "${cards}" contains more than one Joker. HandType=${bestType}`);
    } else {
        // console.error(`Warning: Hand "${cards}" contains a Joker. HandType=${bestType}`);
    }

    return bestType;
}

/**
 * Compares two hands for Part 2, accounting for the new Joker strength.
 */
function compareHandsPart2(a: { cards: string, type: HandType }, b: { cards:string, type: HandType }): number {
    if (a.type !== b.type) {
        return a.type - b.type;
    }

    for (let i = 0; i < a.cards.length; i++) {
        const strengthA = cardStrengthPart2[a.cards[i]];
        const strengthB = cardStrengthPart2[b.cards[i]];
        if (strengthA !== strengthB) {
            return strengthA - strengthB;
        }
    }
    return 0;
}

/**
 * Calculates total winnings for Part 2, using Joker rules.
 */
export function part2(hands: Hand[]): number {
    const typedHands = hands.map(hand => ({
        ...hand,
        type: getHandTypeWithJokers(hand.cards)
    }));

    typedHands.sort(compareHandsPart2);
    // console.log("Sorted hands for Part 2 (with Jokers):");
    // typedHands.forEach(hand => {
    //     console.log(`  ${hand.cards} (HandType=${hand.type})`);
    // });

    let totalWinnings = 0;
    for (let i = 0; i < typedHands.length; i++) {
        const rank = i + 1;
        totalWinnings += typedHands[i].bid * rank;
    }

    console.log(`Total winnings for Part 2: ${totalWinnings}`);
    return totalWinnings;
}
