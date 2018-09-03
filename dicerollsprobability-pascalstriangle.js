// https://www.codewars.com/kata/55d18ceefdc5aba4290000e5 4 kyu

// this solution is essentially the same as the brute force one.
// The probability table is calculated using a variation of
// Pascal's triangle instead of using brute force, so this is
// several orders of magnitude faster

// Pascal's triangle info http://curiouscheetah.com/BlogMath/pascals-triangle-and-dice-rolls/

"use strict";

function rollDice(rolls, sides, threshold) {
    const lowestPoss = rolls;
    const highestPoss = rolls*sides;
    const numPoss = Math.pow(sides, rolls);

    const pascalProbabilities = {};
    const lut = [
        [1],
        []
    ];

    // generate first applicable row
    for (let i = 0; i < sides; i++) {
        lut[1][i] = 1;
    }

    // generate subsequent rows
    for (let i = 2; i <= rolls; i++) {
        lut[i] = [];
        for (let j = 0; j < (i*(sides-1) + 1); j++) {
            let term1 = 0;
            let term2 = 0;
            let term3 = 0;

            if (lut[i-1][j]) {
                term1 = lut[i-1][j];
            }

            if (lut[i][j-1]) {
                term2 = lut[i][j-1];
            }

            if (lut[i-1][j-sides]) {
                term3 = lut[i-1][j-sides];
            }

            lut[i][j] = term1 + term2 - term3;
        }
    }

    let numerator = 0;

    for (let i = lowestPoss; i <= highestPoss; i++) {
        pascalProbabilities[i] = lut[rolls][i-lowestPoss];
    }

    // console.log(pascalProbabilities);

    for (let i = threshold; i <= highestPoss; i++) {
        numerator += pascalProbabilities[i]
    }

    console.log(`${numerator}/${numPoss}`);

    return numerator/numPoss;
}

console.log(rollDice(10, 20, 40));