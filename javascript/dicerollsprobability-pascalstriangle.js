// https://www.codewars.com/kata/55d18ceefdc5aba4290000e5 4 kyu

// this solution is essentially the same as the brute force one.
// The probability table is calculated using a variation of
// Pascal's triangle instead of using brute force, so this is
// several orders of magnitude faster

// Pascal's triangle info http://curiouscheetah.com/BlogMath/pascals-triangle-and-dice-rolls/

"use strict";

function rollDice(rolls, sides, threshold) {
    const lut = [ [1], [] ];// this will hold our modified Pascal's triangle

    // generate first applicable row (of modified Pascal's triangle)
    for (let i = 0; i < sides; i++) {
        lut[1][i] = 1;
    }

    // generate subsequent rows
    for (let i = 2; i <= rolls; i++) {
        lut[i] = [];
        for (let j = 0; j < (i*(sides-1) + 1); j++) {
            let term1 = 0; // these are instantiated as equal to 0 because they need to be 0 if they don't exist in the triangle
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

            lut[i][j] = term1 + term2 - term3; // read http://curiouscheetah.com/BlogMath/pascals-triangle-and-dice-rolls/ and this will make sense
        }
    }

    let numerator = 0;

    // tally up the number of ways to roll the desired amount or higher
    for (let i = threshold; i <= rolls*sides; i++) {
        numerator += lut[rolls][i-rolls];
    }

    return numerator/Math.pow(sides, rolls);
}