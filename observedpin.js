"use strict";

function getPINs(observed) {
    const outputGenerator = []; // we use this array to build the PIN candidates
    const tracker = {} // tracks the current index of each button
    let output = []; // array of candidate PINs that will be returned

    const adjacent = { // holds each button's actual value and adjacent button values
        "1": [1, 2, 4],
        "2": [1, 2, 3, 5],
        "3": [2, 3, 6],
        "4": [1, 4, 5, 7],
        "5": [2, 4, 5, 6, 8],
        "6": [3, 5, 6, 9],
        "7": [4, 7, 8],
        "8": [0, 5, 7, 8, 9],
        "9": [6, 8, 9],
        "0": [0, 8]   
    }

    for (let i = 0; i < observed.length; i++) { // build outputGenerator array so we can build candidate PINs
        outputGenerator[outputGenerator.length] = adjacent[observed[i]];
        tracker[i] = 0;
    }
    
    while (tracker[0] < outputGenerator[0].length) { // causes while loop to stop when all possible combinations have been generated
        let pin = "";

        // generate each digit of the PIN
        for (let i = 0; i < outputGenerator.length; i++) {
            pin += outputGenerator[i][tracker[i]];
        }

        output[output.length] = pin; // put completed PIN candidate in output array
        tracker[outputGenerator.length - 1]++; // advance last digit of PIN

        // if a given digit in the PIN exceeds its index, reset it to 0 index
        // and increment the index of the digit to the left
        for (let i = outputGenerator.length - 1; i > 0; i--) {
            if (tracker[i] === outputGenerator[i].length) {
                tracker[i] = 0;
                tracker[i-1]++;
            }
        }
    }

    return output; // and we're done!
}