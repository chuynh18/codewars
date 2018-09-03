// https://www.codewars.com/kata/55d18ceefdc5aba4290000e5 4 kyu

// this solution is correct but will not complete in time
// please see dicerollsprobability-pascalstriangle.js

"use strict";

function rollDice(rolls, sides, threshold) {
    const lowestPoss = rolls;
    const highestPoss = rolls*sides;
    const numPoss = Math.pow(sides, rolls);

    const bruteForce = {};
    const dice = {};

    let numerator = 0;

    for (let i = 1; i <= rolls; i++) {
        dice[i] = 1;
    }

    for (let i = lowestPoss; i <= highestPoss; i++) {
        bruteForce[i] = 0;
    }

    // console.log(dice);
    // console.log(bruteForce);

    for (let i = 1; i <= numPoss; i++) {
        // console.log(dice);

        if (i % 50000000 === 0) {
            console.log(`Processed ${i}/${numPoss}; ${(i/numPoss*100).toFixed(6)}%`);
        }

        let sum = 0;

        for (let j = 1; j <= rolls; j++) {
            sum += dice[j];
        }

        bruteForce[sum] += 1;

        dice[1]++; 

        for (let j = 1; j <= rolls; j++) {
            // console.log(j);
            if (dice[j] === sides + 1) {
                dice[j] = 1;
                if (j < rolls) {
                    dice[j+1]++;
                    // console.log(`incrementing dice # ${j+1}`);
                }
            }
        }
    }

    // console.log(numPoss);
    console.log(bruteForce);

    for (let i = threshold; i <= highestPoss; i++) {
        numerator += bruteForce[i]
    }

    console.log(`${numerator}/${numPoss}`);

    return numerator/numPoss;
}

console.log(rollDice(10, 20, 40));