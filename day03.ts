/**
 * deno run --allow-read ./day03.ts
 * deno run --allow-read --watch ./day03.ts
 */

const inputText = await Deno.readTextFile('./day03-input.txt')

const backpacks: string[] = inputText.split('\n')

const pockets: [string, string][] = backpacks.map(
    (pack: string): [string, string] => [
        pack.slice(0, pack.length / 2),
        pack.slice(pack.length / 2),
    ]
)

function dualCharacter([first, second]: [string, string]): string {
    let sameLetter: string = ''
    ;[...first].forEach((letter: string): void => {
        if (second.includes(letter)) {
            sameLetter = letter
        }
    })
    return sameLetter
}

function getCharacterPoints(character: string): number {
    let points = parseInt(character, 36) - 9
    if (character === character.toUpperCase()) points += 26
    return points
}

const sum = (a: number, b: number): number => a + b

const total = pockets.map(dualCharacter).map(getCharacterPoints).reduce(sum, 0)

console.log({ total })

// Confirmed correct answer checks
console.assert(total === 7785, 'Part01 correct answer')
