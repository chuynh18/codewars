"use strict";

const truncateTrailingZero = function(input) {
    let indexOfNonZero;

    for (let i = input.length-1; i >= 0; i--) {
        if (input[i] !== "0") {
            indexOfNonZero = i;
            break;
        }
    }

    return input.slice(0, indexOfNonZero + 1)
}

console.log(truncateTrailingZero("1.12390400100040000"));