"use strict";

function decompose(n) {
    const nSquared = n*n;
    let nRemaining = nSquared;
    let answer = [];
    let indexOf1;
    let nullAnswer = false;
    let subtract = 0;

    // checks to see if the array contains dupes, requires sorted input
    const dupeCheck = function(input) {
        for (let i = 1; i < input.length; i++) {
            if (input[i-1] === input[i]) {
                return true;
            }
        }

        return false;
    }

    // backtracks.  I call this function when dupeCheck returns true.
    // It backtracks by subtracting 1 at first; if that fails, it
    // backtracks even more by chopping off an additional index of the
    // output array.
    const revert = function() {
        if (indexOf1 < 0 || typeof indexOf1 === "undefined") {
            nullAnswer = true;
            return null;
        }

        subtract++;

        answer.length = indexOf1;
        nRemaining = nSquared;

        for (let i = 0; i < answer.length; i++) {
            nRemaining -= answer[i]*answer[i];
        }

        let numToDecompose = Math.floor(Math.sqrt(nRemaining)) - subtract;

        if (numToDecompose === 0) {
            indexOf1--;
            subtract = 1;
            numToDecompose = Math.floor(Math.sqrt(nRemaining)) - subtract;
        }

        decomposeIteration(numToDecompose);
    }

    // does the bulk of the work.  Gets called recursively to generate the answer (in reverse order)
    const decomposeIteration = function(input) {
        if (input*input <= nRemaining && input > 0) {
            answer[answer.length] = input;
            nRemaining = nRemaining - input*input;
            decomposeIteration(Math.floor(Math.sqrt(nRemaining)));
        } else if (input > 0) {
            decomposeIteration(n-1);
        } else if (nRemaining === 1) {
            nRemaining--;
            answer[answer.length] = 1;
        } else if (input === 0) {
            if (dupeCheck(answer.sort(function(a,b){return b-a;}))) {
                if (typeof indexOf1 === "undefined") {
                    for (let i = 0; i < answer.length; i++) {
                        if (answer[i] !== 1) {
                            indexOf1 = i;
                        }
                    }
                }
                revert();
            }
        }
    }

    decomposeIteration(n-1);

    if (nullAnswer) {
        return null;
    } else if (nRemaining === 0) {
        return answer.sort(function(a,b){return a-b;});
    } else {
        return null;
    }
}