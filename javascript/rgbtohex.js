// https://www.codewars.com/kata/513e08acc600c94f01000001 - 5 kyu

"use strict";

function rgb(r, g, b){
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] > 255) {
            arguments[i] = 255;
        } else if (arguments[i] < 0) {
            arguments[i] = 0;   
        }
    }

    function convertHex(input) {
        const firstDigit = Math.floor(input/16);
        const secondDigit = input % 16;

        function output(num) {
            let array = ["A", "B", "C", "D", "E", "F"];

            if (num < 10) {
                return num;
            } else {
                return array[num-10];
            }
        }

        return `${output(firstDigit)}${output(secondDigit)}`;
    }

    return `${convertHex(arguments[0])}${convertHex(arguments[1])}${convertHex(arguments[2])}`;
}

// console.log(rgb(2335,255,255)); // testing an edge case