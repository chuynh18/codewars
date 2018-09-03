// This is so I can test my decimal-finding inner function.  Part of the code for
// https://www.codewars.com/kata/divide-numbers-as-strings 3 kyu

"use strict";

const handleDecimals = function(input) {
    let decimalFound = false;
    let decimalIndex;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === "." || input[i] === ",") {
            decimalFound = true;
            decimalIndex = i;
            break;
        }
    }

    if (!decimalFound) {
        return 0;
    } else {
        let numDigitsAfterDecimal = input.length - 1 - decimalIndex;

        if (numDigitsAfterDecimal === 0) {
            return -1 // denotes malformed input e.g. "1."
        } else {
            return numDigitsAfterDecimal;
        }
        
    }
}

console.log(handleDecimals("1"));