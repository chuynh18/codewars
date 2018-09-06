"use strict";

const rankWord = function(input) {
    const words = input.split("").sort();
    let wordsDedupe = [];
    console.log(words);

    const createDedupe = function(array) {
        const output = [];

        for (let i = 0; i < array.length; i++) {
            if (output.indexOf(array[i]) === -1) {
                output[output.length] = array[i];
            }
        }

        return output;
    }

    const factorial = function(input) {
        if (input === 0) {
            return 1;
        }

        let answer = 1;
        for (let i = 2; i <= input; i++) {
            answer *= i;
        }

        return answer;
    }

    let answer = 0;

    for (let i = 0; i < input.length; i++) {
        wordsDedupe = createDedupe(words);
        const indexOfLetter = words.indexOf(input[i]);
        answer += indexOfLetter*factorial(words.length-1);
        words.splice(indexOfLetter, 1);
        console.log(`answer so far:  ${answer}, words array: ${words}`);
    }

    return answer+1;
}

// console.log(rankWord("question"));
console.log(rankWord("bookkeeper"));
// console.log(rankWord("abab"));
// console.log(rankWord("baaa"));