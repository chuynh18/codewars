// https://www.codewars.com/kata/last-digit-of-a-huge-number - 3 kyu

"use strict";

const power = function() {
    let args = "Arguments: '";
    for (let i = 0; i < arguments.length-1; i++) {
        args += `${arguments[i]}, `;
    }
    args += `${arguments[arguments.length-1]}'`;
    console.log(args);

    const patterns = {
        "0": [0],
        "1": [1],
        "2": [6, 2, 4, 8],
        "3": [1, 3, 9, 7],
        "4": [6, 4],
        "5": [5],
        "6": [6],
        "7": [1, 7, 9, 3],
        "8": [6, 8, 4, 2],
        "9": [1, 9],
    }

    if (arguments.length === 0) {
        // console.log("zero arguments");
        return 1;
    } else if (arguments.length === 1) {
        // console.log("one argument");
        return arguments[0];
    } else if (arguments.length === 2) {
        // console.log("two arguments");
        if (arguments[0] === 0 && arguments[1] === 0) {
            return 1;
        }
        const num1 = arguments[0] % 10;
        const num2 = arguments[1] % patterns[num1].length;
        return patterns[num1][num2];
    }

    const powerThenModulo = function(input1, input2, input3) {
        if (input1 === 0 && input2 === 0) {
            // console.log("0^0 === 1");
            return 1;
        }

        console.log(`input1: '${input1}', input2: '${input2}'`);

        if (input1 > 9) {
            input1 = input1 % 10;
        }

        console.log(patterns[input1].length);

        if (input2 > 9) {
            if (patterns[input1].length === 1) {
                
            }
            input2 = input2 % patterns[input1].length;
        }

        console.log(`input1: '${input1}', input2: '${input2}'`);

        let mod = patterns[input3 % 10].length;
        // console.log(input1, input2, mod, Math.pow(input1, input2) % mod);
        return Math.pow(input1, input2) % mod;
    }

    let answer = powerThenModulo(arguments[arguments.length-2], arguments[arguments.length-1], arguments[arguments.length-3]);

    console.log(`answer: '${answer}'`);

    for (let i = arguments.length-3; i >= 1; i--) {
        answer = powerThenModulo(arguments[i], answer, arguments[i-1]);
    }

    console.log(`answer: '${answer}'`);

    answer = Number(String(Math.pow(arguments[0], answer))[0]);

    return answer;

}

console.log(power(12,30,21));