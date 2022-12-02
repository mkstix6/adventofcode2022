/**
 * deno run --allow-read ./day02.ts
 * deno run --allow-read --watch ./day02.ts
 */

type Round = [string, string]

const inputText = await Deno.readTextFile('./day02-input.txt')
const rounds: Round[] = inputText
    .split('\n')
    .map((inputLine) => inputLine.split(' '))

const computeRoundScore = ([them, us]: Round): number => {
    let score = 0
    // Points for shape choice
    if (us === 'X') score += 1 // Rock
    if (us === 'Y') score += 2 // Paper
    if (us === 'Z') score += 3 // Scissors
    // Points for round outcome
    if (
        (them === 'A' && us === 'X') ||
        (them === 'B' && us === 'Y') ||
        (them === 'C' && us === 'Z')
    )
        score += 3 // Draw
    if (
        (them === 'A' && us === 'Y') ||
        (them === 'B' && us === 'Z') ||
        (them === 'C' && us === 'X')
    )
        score += 6 // Win
    return score
}

const computeCorrectRoundScore = ([them, outcome]: Round): number => {
    let score = 0
    const rock = 1
    const paper = 2
    const scissors = 3
    // Points for shape choice
    switch (outcome) {
        // Lose
        case 'X':
            if (them === 'A') score += scissors
            if (them === 'B') score += rock
            if (them === 'C') score += paper
            break
        // Draw
        case 'Y':
            if (them === 'A') score += rock
            if (them === 'B') score += paper
            if (them === 'C') score += scissors
            break
        // Win
        case 'Z':
            if (them === 'A') score += paper
            if (them === 'B') score += scissors
            if (them === 'C') score += rock
            break

        default:
            throw new Error(`Bad round input ${them}:${outcome}`)
    }
    // Points for round outcome
    if (outcome === 'Y') score += 3 // Draw
    if (outcome === 'Z') score += 6 // Win
    return score
}

const sum = (accumulator: number, current: number): number =>
    accumulator + current
const contestTotal = rounds.map(computeRoundScore).reduce(sum, 0)
const contestCorrectTotal = rounds.map(computeCorrectRoundScore).reduce(sum, 0)
console.log({ contestTotal, contestCorrectTotal })

// Confirmed correct answer checks
console.assert(contestTotal === 13675, 'Part01 correct answer')
console.assert(contestCorrectTotal === 14184, 'Part02 correct answer')
