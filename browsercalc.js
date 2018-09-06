// https://www.codewars.com/kata/581bc0629ad9ff9873000316/ - 4 kyu

// DRYness is overrated...  or is it?

"use strict";

const calc = function(input) {
    const validChars = ".0123456789+-*$";
    for (let i = 0; i < input.length; i++) {
        let invalidChar = true;
        for (let j = 0; j < validChars.length; j++) {
            if (input[i] === validChars[j]) {
                invalidChar = false;
            }
        }
        if (invalidChar) {
            return "400: Bad request";
        }
    }

    const split = function(input) {
        const output = [];
        let lastMatch = 0;

        for (let i = 0; i < input.length; i++) {
            if (input[i] === "$" || input[i] === "*" || input[i] === "-" || input[i] === "+") {
                output[output.length] = Number(input.slice(lastMatch, i));
                output[output.length] = input[i];
                lastMatch = i+1;
            }
        }

        output[output.length] = Number(input.slice(lastMatch, input.length));
        return output;
    }

    const inputArray = split(input);

    // console.log(inputArray);

    const compute = function(arr, operator) {
        console.log(arr);
        const output = [];
        const mem = {
            num1: null,
            op: null,
            num2: null,
            computed: false
        };

        for (let i = 0; i < arr.length; i++) {
            // console.log(`working on index: '${arr[i]}', operation ${operator}`);
            // console.log(mem);
            // console.log(output);
            if (operator === "$") {
                if (i === arr.length - 1 && mem.num1 === null) {
                    console.log(i);
                    output[output.length] = arr[i];
                } else if (mem.num1 === null) {
                    // console.log("path 1\n");
                    mem.num1 = arr[i];
                    mem.computed = false;
                } else if (mem.num1 !== null && mem.op === null && arr[i] === "$") {
                    // console.log("path 2\n");
                    mem.op = "/";
                } else if (mem.num1 !== null && mem.op === null && (arr[i] === "*" || arr[i] === "-" || arr[i] == "+")) {
                    // console.log("path 3\n");
                    if (mem.computed) {
                        output[output.length] = arr[i];
                    } else {
                        output[output.length] = arr[i-1];
                        output[output.length] = arr[i];
                    }
                    mem.num1 = null;
                } else if (mem.num1 !== null && mem.op === "/") {
                    // console.log("path 4\n");
                    mem.num2 = arr[i];
                    const answer = mem.num1/mem.num2;
                    mem.num1 = answer;
                    mem.op = null;
                    mem.num2 = null;
                    if (!mem.computed) {
                        output[output.length] = answer;
                    } else {
                        output[output.length - 1] = answer;
                    }
                    mem.computed = true;
                }
            } else if (operator === "*") {
                if (i === arr.length - 1 && mem.num1 === null) {
                    output[output.length] = arr[i];
                } else if (mem.num1 === null) {
                    // console.log("path 1\n");
                    mem.num1 = arr[i];
                    mem.computed = false;
                } else if (mem.num1 !== null && mem.op === null && arr[i] === "*") {
                    // console.log("path 2\n");
                    mem.op = "*";
                } else if (mem.num1 !== null && mem.op === null && (arr[i] === "-" || arr[i] == "+")) {
                    // console.log("path 3\n");
                    if (mem.computed) {
                        output[output.length] = arr[i];
                    } else {
                        output[output.length] = arr[i-1];
                        output[output.length] = arr[i];
                    }
                    mem.num1 = null;
                } else if (mem.num1 !== null && mem.op === "*") {
                    // console.log("path 4\n");
                    mem.num2 = arr[i];
                    const answer = mem.num1*mem.num2;
                    mem.num1 = answer;
                    mem.op = null;
                    mem.num2 = null;
                    if (!mem.computed) {
                        output[output.length] = answer;
                    } else {
                        output[output.length - 1] = answer;
                    }
                    mem.computed = true;
                }
            } else if (operator === "-") {
                if (i === arr.length - 1 && mem.num1 === null) {
                    output[output.length] = arr[i];
                } else if (mem.num1 === null) {
                    // console.log("path 1\n");
                    mem.num1 = arr[i];
                    mem.computed = false;
                } else if (mem.num1 !== null && mem.op === null && arr[i] === "-") {
                    // console.log("path 2\n");
                    mem.op = "-";
                } else if (mem.num1 !== null && mem.op === null && (arr[i] == "+")) {
                    // console.log("path 3\n");
                    if (mem.computed) {
                        output[output.length] = arr[i];
                    } else {
                        output[output.length] = arr[i-1];
                        output[output.length] = arr[i];
                    }
                    mem.num1 = null;
                } else if (mem.num1 !== null && mem.op === "-") {
                    // console.log("path 4\n");
                    mem.num2 = arr[i];
                    const answer = mem.num1-mem.num2;
                    mem.num1 = answer;
                    mem.op = null;
                    mem.num2 = null;
                    if (!mem.computed) {
                        output[output.length] = answer;
                    } else {
                        output[output.length - 1] = answer;
                    }
                    mem.computed = true;
                }
            } else if (operator === "+") {
                if (i === arr.length - 1 && mem.num1 === null) {
                    output[output.length] = arr[i];
                } else if (mem.num1 === null) {
                    // console.log("path 1\n");
                    mem.num1 = arr[i];
                    mem.computed = false;
                } else if (mem.num1 !== null && mem.op === null && arr[i] === "+") {
                    // console.log("path 2\n");
                    mem.op = "+";
                } else if (mem.num1 !== null && mem.op === "+") {
                    // console.log("path 3\n");
                    mem.num2 = arr[i];
                    const answer = mem.num1+mem.num2;
                    mem.num1 = answer;
                    mem.op = null;
                    mem.num2 = null;
                    if (!mem.computed) {
                        output[output.length] = answer;
                    } else {
                        output[output.length - 1] = answer;
                    }
                    mem.computed = true;
                }
            }
        }

        return output;
    }

    let finalAnswer = compute(inputArray, "$");
    finalAnswer = compute(finalAnswer, "*");
    finalAnswer = compute(finalAnswer, "-");
    finalAnswer = compute(finalAnswer, "+");
    // console.log(finalAnswer);

    return finalAnswer[0];
}