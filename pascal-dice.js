// this was used so I could rapidly iterate on my Pascal's
// triangle code.

// it will not solve the kata linked below; it's just a part of
// the full solution

// kata that kicked this experimentation off:
// https://www.codewars.com/kata/55d18ceefdc5aba4290000e5 4 kyu

const lut = [
    [1],
    []
];

const sides = 10;
const rolls = 4;

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

console.log(lut);