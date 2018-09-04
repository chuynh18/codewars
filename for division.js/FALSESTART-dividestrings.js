"use strict";

function largeDiv(a, b) {
    if (b == 0) {
        throw new Error;
    } else {
        const result = (a / b).toPrecision(20);
        const numDecimals = result.toString().split(".");

        console.log(numDecimals);
    }
}

console.log(largeDiv("11", "71"));