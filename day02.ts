/**
 * deno run --allow-read ./day02.ts
 * deno run --allow-read --watch ./day02.ts
 */

const text = await Deno.readTextFile('./day02-input.txt')
const rounds = text.split('\n').map((roundString) => roundString.split(' '))

const computeRoundScore = ([them, us]) => {
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

const sum = (accumulator, current) => accumulator + current
const contestTotal = rounds.map(computeRoundScore).reduce(sum, 0)
console.log({ contestTotal })
