/**
 * deno run --allow-read ./day01.ts
 * deno run --allow-read --watch ./day01.ts
 */

const text = await Deno.readTextFile('./day01-input.txt')
const data = text.split('\n')

const elves = [0]
data.forEach((curr) => {
    if (curr === '') {
        elves.push(0)
    } else {
        elves[elves.length - 1] = elves[elves.length - 1] + Number(curr)
    }
})

let answerPart01: number

let mostIndex = 0
let prev = 0
let total = 0
function topElf() {
    elves.forEach((elf, index) => {
        if (elf > prev) {
            mostIndex = index
            prev = elf
        }
    })
    console.log({ mostIndex, prev })

    if (!answerPart01) answerPart01 = prev
}

for (let i = 0; i < 3; i++) {
    topElf()
    total += elves[mostIndex]
    elves.splice(mostIndex, 1)
    mostIndex = 0
    prev = 0
}
console.log({ total })

// Confirmed correct answer checks
console.assert(answerPart01 === 71934, 'Part01 correct answer')
console.assert(total === 211447, 'Part02 correct answer')
