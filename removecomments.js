// https://www.codewars.com/kata/51c8e37cee245da6b40000bd 4 kyu

// thank goodness the test cases only used 1 character to mark
// the beginning of comments.  It would have been annoying to
// have to handle two characters (e.g. //)...  or worse,
// multiline comments (e.g. /* */)

"use strict";

function solution(input, markers) {
    console.log(input);
    console.log(markers);

    let indices = [[true, 0]];
    let output = "";

    for (let i = 0; i < input.length; i++) {
        // console.log(`${i}: input is ${input[i]}`)
        for (let j = 0; j < markers.length; j++) {
            if (input[i] === markers[j] && indices[indices.length - 1][0]) {
                let k = i;

                while (input[k-1] === " ") {
                    k--;
                }

                indices[indices.length] = [false, k];
            }
        }

        if (input[i] === "\n" && !indices[indices.length - 1][0]) {
            indices[indices.length] = [true, i];
        }
    }

    indices[indices.length] = [null, input.length];

    console.log(indices);

    for (let i = 0; i < indices.length; i += 2) {
        if (indices[i][0] && !indices[i+1][0]) {
            output += input.slice(indices[i][1], indices[i+1][1]);
        }
    }

    return output;
};

// "apples, plums % and bananas\npears\noranges !applesauce"
// "apples, plums\npears\noranges"

// console.log(solution("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]))
