// https://www.codewars.com/kata/558fc85d8fd1938afb000014 - 7 kyu

"use strict";

function sumTwoSmallestNumbers(numbers) {  
    let smallest = numbers[0];
    let nextSmallest = numbers[1];

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < smallest) {
            nextSmallest = smallest;
            smallest = numbers[i];
        } else if (numbers[i] < nextSmallest && numbers[i] >= smallest) {
            nextSmallest = numbers[i];
        }
    }

    return smallest + nextSmallest;
};