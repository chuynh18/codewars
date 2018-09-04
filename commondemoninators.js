"use strict";

function convertFrac(arr) {

    if (arr.length === 0) {
        return "";
    }

    let denominator = arr[0][1];
    let answer = [];
    let answerAsString = "";

    const checkDivisibility = function(number, input) {
        for (let i = 0; i < input.length; i++) {
            if (input[i][0] % number !== 0) { // check numerators
                return false;
            }
            if (input[i][1] % number !== 0) { // check denominators
                return false;
            }
        }
        return true;
    }

    const divide = function(number) {
        if (checkDivisibility(number, answer)) {
            for (let i = 0; i < arr.length; i++) {
                answer[i][0] /= number;
                answer[i][1] /= number;
            }
        }

        if (checkDivisibility(10, answer)) {
            divide(10);
        } else if (checkDivisibility(5, answer)) {
            divide(5);
        } else if (checkDivisibility(3, answer)) {
            divide(3);
        } else if (checkDivisibility(2, answer)) {
            divide(2);
        }
    }

    for (let i = 1; i < arr.length; i++) {
        denominator *= arr[i][1];
    }

    for (let i = 0; i < arr.length; i++) {
        answer[answer.length] = [arr[i][0] * denominator / arr[i][1], denominator];
    }

    divide(10, answer);

    for (let i = 0; i < answer.length; i++) {
        answerAsString += `(${answer[i][0]},${answer[i][1]})`;
    }

    return answerAsString;
}