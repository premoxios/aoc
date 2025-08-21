/**
 * Calculates the total number of scratch cards after accounting for winning copies.
 * Each match on a card wins one copy of the subsequent cards.
 * @param lines An array of strings, where each string represents a scratch card.
 * @returns The total number of scratch cards.
 */
export function part2(lines: string[]): number {
    // Initialize a map to store the count of each card. We start with 1 of each.
    const cardCounts = new Map<number, number>();
    for (let i = 1; i <= lines.length; i++) {
        cardCounts.set(i, 1);
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;

        const cardNumber = i + 1;
        const currentCardCount = cardCounts.get(cardNumber) || 0;

        // --- Find the number of matches for the current card ---
        const numberLists = line.substring(line.indexOf(':') + 2);
        const [winnersStr, candidatesStr] = numberLists.split(' | ');

        const winningNumbers = new Set(winnersStr.trim().split(/\s+/).map(Number));
        const candidateNumbers = candidatesStr.trim().split(/\s+/).map(Number);

        let matchCount = 0;
        for (const num of candidateNumbers) {
            if (winningNumbers.has(num)) {
                matchCount++;
            }
        }

        // --- Award copies of subsequent cards ---
        if (matchCount > 0) {
            for (let j = 1; j <= matchCount; j++) {
                const nextCardNumber = cardNumber + j;
                // Ensure we don't try to add copies of cards that don't exist
                if (cardCounts.has(nextCardNumber)) {
                    const existingCopies = cardCounts.get(nextCardNumber) || 0;
                    // Add one copy for each instance of the current card
                    cardCounts.set(nextCardNumber, existingCopies + currentCardCount);
                }
            }
        }
    }

    // Sum up all the values in the map to get the total number of cards
    let totalCards = 0;
    for (const count of cardCounts.values()) {
        totalCards += count;
    }

    console.log(`The total number of scratch cards is: ${totalCards}`);
    return totalCards;
}