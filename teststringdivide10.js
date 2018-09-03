"use strict";

const divideby10 = function(input) {
    let output = "";

    for (let i = 0; i < input.length - 1; i++) {
        output += input[i];
        console.log(output);
    }

    return output;
}

console.log(divideby10("2000"));