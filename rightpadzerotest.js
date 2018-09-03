"use strict";

const rightPadWithZero = function(input, numZeroes) {
    let zeroString = "";

    for (let i = 0; i < numZeroes; i++) {
        zeroString += "0";
    }

    return input + zeroString;
}

console.log(rightPadWithZero("5", 10));