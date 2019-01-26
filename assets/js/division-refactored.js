// https://www.codewars.com/kata/divide-numbers-as-strings 3 kyu

// This kata asks you to perform division to a degree of precision exceeding that
// of what floating point arithmetic is capable, therefore I think solving this
// kata is a matter of "computerizing" the division algorithms humans use:
    // https://en.wikipedia.org/wiki/Short_division
    // https://en.wikipedia.org/wiki/Long_division
    // https://en.wikipedia.org/wiki/Division_algorithm


// Program assumptions:
// Input can be integer, negative, zero, or decimal in string format.
// Input won't have leading or trailing zeroes.
// Output will be truncated, not rounded, to 20 decimal places (or fewer if 20's unnecessary)

"use strict";

function largeDiv(a, b, decimalPlaces) {
    let output = "";
    let remainder;
    let resultShouldBeNegative;
    let numeratorIsLarger;
    let onDigit = 0;

    // helper functions to perform modulo operation
    // restrictions:
    // inputs must not be padded.
    // inputs must be natural numbers (non-negative!) as strings

    // returns 0 if a === b, 1 if a > b, 2 if a < b
    // typeof a === "string",  typeof b === "string"
    const compare = function(a, b) {
        if (a.length > b.length) {
            return 1;
        } else if (b.length > a.length) {
            return 2;
        } else if (a.length === b.length) {
            if (a === b) {
                return 0;
            } else {
                for (let i = 0; i < a.length; i++) {
                    if (parseInt(a[i]) > parseInt(b[i])) {
                        return 1;
                    } else if (parseInt(a[i]) < parseInt(b[i])) {
                        return 2;
                    }
                }
            }
        }
    }

    // subtract arbitrarily large natural numbers
    // necessary for implementing modulo operator
    // returns a - b as string.  typeof a === "string",  typeof b === "string"
    function subtract(a, b) {
        var answer = "";
        var carry = false;
        var answerIsNegative = false;
        var indexOfNonZero = 0;
     
        while (a.length > b.length) {
           b = "0" + b;
        }
     
        while (b.length > a.length) {
           a = "0" + b;
        }
     
        for (var i = 0; i < a.length; i++) {
           if (Number(a[i]) > Number(b[i])) {
              break;
           } else if (Number(a[i]) < Number(b[i])) {
              answerIsNegative = true;
              [a, b] = [b, a];
           }
        }
     
        for (var i = a.length - 1; i >= 0; i--) {
           var aDigit = Number(a[i]);
           var bDigit = Number(b[i]);
     
           if (carry) {
              aDigit--;
              carry = false;
           }
     
           if (aDigit >= bDigit) {
              answer = (aDigit - bDigit) + answer;
           } else {
              answer = (aDigit + 10 - bDigit) + answer;
              carry = true;
           }
        }
     
        for (var i = 0; i < answer.length; i++) {
           if (answer[i] !== "0") {
              indexOfNonZero = i;
              break;
           }
        }
     
        answer = answer.slice(indexOfNonZero);
     
        if (answerIsNegative) {
           answer = "-" + answer;
        }
     
        return answer;
     }

    // modulo operator.  if b > a, returns a as a string.
    // else, returns the remainder (also as a string)
    // typeof a === "string",  typeof b === "string" 
    const modulo = function(a, b) {
        let allZeroes = true;
        let indexOfFirstNonZero;

        for (let i = 0; i < a.length; i++) {
            if (a[i] !== "0") {
                allZeroes = false;
                indexOfFirstNonZero = i;
                break;
            }
        }

        if (allZeroes) {
            return "0";
        }

        if (indexOfFirstNonZero > 0) {
            a = a.slice(indexOfFirstNonZero);
        }

        if (b === "0") {
            return NaN;
        }

        const rightPadZero = function(input, numZero) {
            return input + "0".repeat(numZero);
        }

        const divideby10 = function(input) {
            return input.slice(0, input.length - 1);
        }

        if (compare(a, b) === 0) {
            return "0";
        } else if (compare(a, b) === 2) {
            return a;
        } else if (compare(a, b) === 1) {
            let modulo = a;
            let paddedB = rightPadZero(b, a.length-b.length);

            while (compare(modulo, b) === 1) {
                if (compare(modulo, paddedB) === 2) {
                    paddedB = divideby10(paddedB);
                } else if (compare(modulo, paddedB) === 1) {
                    modulo = subtract(modulo, paddedB);
                } else if (compare(modulo, paddedB) === 0) {
                    return "0";
                }
            }

            return modulo;
        }
    }

    // checks for some simple cases where involved computation won't be necessary
    if ((parseFloat(a)/parseFloat(b)) % 1 === 0 && parseFloat(a) < Number.MAX_SAFE_INTEGER && parseFloat(b) < Number.MAX_SAFE_INTEGER) {
        return `${a/b}`; // if a/b is an integer, just use computer arithmetic
    } else if (parseFloat(b) === 0) {
        throw new Error('Illegal operation:  Divide by zero.');  // no dividing by zero!
    } else if (parseFloat(a) === 0) {
        return "0"; // if dividend is zero (and divisor is not zero), the answer is zero
    }

    // check to see if our output will be negative
    const checkResultWillBeNegative = function(num1, num2) {
        const num1IsNegative = (parseInt(num1) < 0);
        const num2IsNegative = (parseInt(num2) < 0);

        if ((num1IsNegative && num2IsNegative) || (!num1IsNegative && !num2IsNegative)) {
            resultShouldBeNegative = false;
        } else {
            resultShouldBeNegative = true;
        }
    }

    checkResultWillBeNegative(a, b);

    // strip negatives from dividend and divisor so the code below will work properly
    // if appropriate, we will restore the "-" to the output, toward the end of the code
    const removeNegativeSign = function(input) {
        if (input[0] !== "-") {
            return input;
        }

        return input.slice(1);
    }

    a = removeNegativeSign(a);
    b = removeNegativeSign(b);

    // check dividend and divisor for decimal and "multiply" by the correct order of magnitude
    // this takes a fixed-point number as a string and returns the number of digits after the decimal
    const handleDecimals = function(input) {
        let decimalFound = false;
        let decimalIndex;
    
        for (let i = 0; i < input.length; i++) {
            if (input[i] === "." || input[i] === ",") {
                decimalFound = true;
                decimalIndex = i;
                break;
            }
        }
    
        if (!decimalFound) {
            return 0;
        } else {
            let numDigitsAfterDecimal = input.length - 1 - decimalIndex;
    
            if (numDigitsAfterDecimal === 0) {
                return -1 // denotes malformed input e.g. "1."
            } else {
                return numDigitsAfterDecimal;
            }
        }
    }

    const deleteDecimal = function(input) {
        let output = "";

        if (parseFloat(input) < 1) {
            output = input.slice(2);
        } else {
            for (let i = 0; i < input.length; i++) {
                if (!(input[i] === "." || input[i] === ",")) {
                    output += input[i];
                }
            }
        }

        return output;
    }

    const rightPadWithZero = function(input, numZeroes) {
        let zeroString = "0".repeat(numZeroes);
        return input + zeroString;
    }

    const removeLeftPaddedZeroes = function(input) {
        let indexOfFirstNonZero;

        for (let i = 0; i < input.length; i++) {
            if (input[i] !== "0") {
                indexOfFirstNonZero = i;
                break;
            }
        }

        return input.slice(indexOfFirstNonZero);
    }

    let aDecimals = handleDecimals(a);
    let bDecimals = handleDecimals(b);

    if (aDecimals === bDecimals) {
        a = deleteDecimal(a);
        b = deleteDecimal(b);
    } else if (aDecimals > bDecimals) {
        a = deleteDecimal(a);
        b = rightPadWithZero(deleteDecimal(b), aDecimals-bDecimals);
    } else if (bDecimals > aDecimals) {
        a = rightPadWithZero(deleteDecimal(a), bDecimals-aDecimals);
        b = deleteDecimal(b);
    }

    a = removeLeftPaddedZeroes(a);
    b = removeLeftPaddedZeroes(b);

    // otherwise, perform division like a human would
    if (parseInt(a) > parseInt(b)) {
        numeratorIsLarger = true;
        let newA = a[0];

        while (parseInt(newA) < parseInt(b)) {
            newA += a[onDigit+1];
            onDigit++;
        }
        
        let num = newA/b;
        output += `${parseInt(num)}`;
        remainder = modulo(newA, b);

        if (!a[onDigit+1]) {
            numeratorIsLarger = false;
            output += ".";
        }
    } else if (parseInt(a) < parseInt(b)) {
        numeratorIsLarger = false;
        output += `0.${Math.floor(10*a/b)}`;

        remainder = modulo((a+"0"), b);

    } else if (a === b) {
        // if a === b, just return 1 as a string
        return "1";
    }

    let somethingHappened = false;

    while (output.length < 666) {
        if (compare(remainder.toString(), b.toString()) === 2 && !numeratorIsLarger) {
            remainder = remainder + "0";
        } else if (compare(remainder.toString(), b.toString()) === 2 && numeratorIsLarger) {
            onDigit++;
            if (a[onDigit]) {
                remainder = remainder.toString() + a[onDigit];
            } else if (!a[onDigit]) {
                numeratorIsLarger = false;
                output += ".";
                if (compare(remainder.toString(), b.toString()) === 2 && !numeratorIsLarger) {
                    remainder = remainder + "0";
                }
            }
        } else {
            remainder = 0;
            somethingHappened = true;
        }

        let num = Math.floor(remainder/b);
        if (!somethingHappened) {
            output += num;
        } else if (somethingHappened) {
            somethingHappened = false;
        }
        
        remainder = modulo(remainder, b);
    }

    // add negative sign back in
    if (resultShouldBeNegative) {
        output = "-" + output;
    }

    var numDecimals = handleDecimals(output);
    
    // truncate the output to decimalPlaces decimals
    if (numDecimals !== 0) {
        output = output.slice(0, output.length - numDecimals + decimalPlaces);
    }

    // further truncate output if there are unnecessary zeroes
    const truncateTrailingZero = function(input) {
        let indexOfNonZero;
    
        for (let i = input.length-1; i >= 0; i--) {
            if (input[i] !== "0") {
                indexOfNonZero = i;
                break;
            }
        }
    
        return input.slice(0, indexOfNonZero + 1)
    }

    if (output[output.length - 1] === "0") {
        output = truncateTrailingZero(output);
    }

    if (handleDecimals(output) === -1) {
        return output.slice(0, output.length - 1);
    }

    return output;
}