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

function largeDiv(a, b) {
    // console.log();
    console.log(`Computing: '${a}/${b}'`);
    let output = "";
    let remainder;
    let resultShouldBeNegative;
    let numeratorIsLarger;
    let onDigit = 0;

    // helper functions to perform modulo operation
    // restrictions:
    // inputs must not be padded.
    // inputs must be natural numbers (non-negative!) as strings

    // the division function will (hopefully) only feed arguments that
    // observe the restrictions laid out above.  I HOPE

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

    // subtract arbitrarily large natural numbers (NO NEGATIVES)
    // necessary for implementing modulo operator
    // returns a - b as string.  typeof a === "string",  typeof b === "string"
    const subtract = function(a, b) {
        let output = "";
        let aLargerOrEqual;
        let outputIsNegative = false;

        const leftPadZero = function(input, numPad) {
            // console.log(`left padding '${input}' with ${numPad} zeroes`);
            let output = input;
        
            for (let i = 0; i < numPad; i++) {
                output = "0" + output;
            }
        
            // console.log(`output is now: '${output}'`);
        
            return output;
        }

        if (a.length > b.length) {
            // console.log("a.length > b.length");
            aLargerOrEqual = true;
            b = leftPadZero(b, a.length-b.length);
        } else if (b.length > a.length) {
            // console.log("a.length < b.length");
            aLargerOrEqual = false;
            a = leftPadZero(a, b.length-a.length);
        } else if (a.length === b.length) {
            // console.log("a.length === b.length");
            if (a === b) {
                // console.log("a === b");
                aLargerOrEqual = true;
            } else {
                for (let i = 0; i < a.length; i++) {
                    if (parseInt(a[i]) > parseInt(b[i])) {
                        aLargerOrEqual = true;
                        break;
                    } else if (parseInt(a[i]) < parseInt(b[i])) {
                        aLargerOrEqual = false;
                        break;
                    }
                }
            }
        }

        if (!aLargerOrEqual) {
            [a, b] = [b, a];
            outputIsNegative = true;
        }

        // console.log(`subtracting ${a} from ${b}`);

        let carried = false;

        for (let i = a.length - 1; i >= 0; i--) {
            if (typeof b[i] === "undefined") {
                // console.log("path 1");
                if (carried) {
                    output = a[i] + output;
                } else if (!carried) {
                    output = (parseInt(a[i]) - 1) + output;
                }

                carried = false;
            } else if (parseInt(a[i]) > parseInt(b[i])) {
                // console.log("path 2");
                if (carried) {
                    output = (parseInt(a[i]) - 1 - parseInt(b[i])) + output;
                } else if (!carried) {
                    output = (parseInt(a[i]) - parseInt(b[i])) + output;
                }

                carried = false;
            } else if (parseInt(a[i]) === parseInt(b[i])) {
                // console.log("path 3");
                if (carried) {
                    output = "9" + output;
                    carried = true;
                } else if (!carried) {
                    output = "0" + output;
                    carried = false;
                }
            } else if (parseInt(a[i]) < parseInt(b[i])) {
                // console.log("path 4");
                if (carried) {
                    output = (parseInt(a[i]) + 9 - parseInt(b[i])) + output;
                } else if (!carried) {
                    output = (parseInt(a[i]) + 10 - parseInt(b[i])) + output;
                }

                carried = true;
            }

            // console.log(`i: '${i}', output so far: '${output}'`);
        }

        // strip leading zeroes
        let nonZeroFound = false;
        let newOutput = "";
        for (let i = 0; i < output.length; i++) {
            if (!nonZeroFound && output[i] !== "0") {
                nonZeroFound = true;
                newOutput += output[i];
            } else if (nonZeroFound) {
                newOutput += output[i];
            }
        }

        output = newOutput;

        if (outputIsNegative) {
            output = "-" + output;
        }

        if (output === "" || output === "-") {
            return "0";
        }

        return output;
    }

    // modulo operator.  if b > a, returns a as a string.
    // else, returns the remainder (also as a string)
    // typeof a === "string",  typeof b === "string" 
    const modulo = function(a, b) {
        let allZeroes = true;
        let indexOfFirstNonZero;
        let fixedA = "";
        // console.log(`modulo function value of a: '${a}'`);

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
            for (let i = indexOfFirstNonZero; i < a.length; i++) {
                fixedA += a[i];
            }

            a = fixedA;
        }

        if (b === "0") {
            // console.log("modulo function got passed b === 0");
            return NaN;
        }

        if (typeof a !== "string" || typeof b !== "string") {
            // console.log("check yourself before you wreck yourself.  a or b not string");
        }

        // console.log(`a: ${a}, b: ${b}`);

        const rightPadZero = function(input, numZero) {
            let output = input;
            
            for (let i = 0; i < numZero; i++) {
                output += "0";
            }
        
            return output;
        }

        const divideby10 = function(input) {
            let output = "";

            for (let i = 0; i < input.length - 1; i++) {
                output += input[i];
            }

            return output;
        }

        // console.log(`compare(a, b): ${compare(a, b)}`);

        if (compare(a, b) === 0) {
            // console.log("a and b are equal");
            return "0";
        } else if (compare(a, b) === 2) {
            // console.log('b greater than a');
            return a;
        } else if (compare(a, b) === 1) {
            let modulo = a;
            let paddedB = rightPadZero(b, a.length-b.length);

            // console.log(a, paddedB);

            while (compare(modulo, b) === 1) {
                // console.log(`modulo: '${modulo}', b: '${b}'`)
                if (compare(modulo, paddedB) === 2) {
                    paddedB = divideby10(paddedB);
                    // console.log(`paddedB reduced to '${paddedB}'`);
                } else if (compare(modulo, paddedB) === 1) {
                    modulo = subtract(modulo, paddedB);
                    // console.log(`performing subtraction, modulo is now '${modulo}' and paddedB is '${paddedB}'`);
                } else if (compare(modulo, paddedB) === 0) {
                    return "0";
                }
            }

            return modulo;
        }
    }

    // checks for some simple cases where involved computation won't be necessary
    if ((parseFloat(a)/parseFloat(b)) % 1 === 0 && parseFloat(a) < 999999999999999 && parseFloat(b) < 999999999999999) {
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
            // console.log(`Result of ${a}/${b} is not negative.`);
        } else {
            resultShouldBeNegative = true;
            // console.log(`Result of ${a}/${b} is negative.`);
        }
    }

    checkResultWillBeNegative(a, b);

    // strip negatives from dividend and divisor so the code below will work properly
    // if appropriate, we will restore the "-" to the output, toward the end of the code
    const removeNegativeSign = function(input) {
        let positive = "";

        if (input[0] === "-") {
            for (let i = 1; i < input.length; i++) {
                positive += input[i];
            }
        } else {
            return input;
        }

        return positive;
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
            for (let i = 2; i < input.length; i++) {
                output += input[i];
            }
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
        let zeroString = "";

        for (let i = 0; i < numZeroes; i++) {
            zeroString += "0";
        }

        return input + zeroString;
    }

    const removeLeftPaddedZeroes = function(input) {
        let indexOfFirstNonZero;
        let output = "";

        for (let i = 0; i < input.length; i++) {
            if (input[i] !== "0") {
                indexOfFirstNonZero = i;
                break;
            }
        }

        if (indexOfFirstNonZero === 0) {
            return input;
        } else if (indexOfFirstNonZero > 0) {
            for (let i = indexOfFirstNonZero; i < input.length; i++) {
                output += input[i];
            }
        }

        return output;
    }

    let aDecimals = handleDecimals(a);
    let bDecimals = handleDecimals(b);

    // console.log(`aDecimals: '${aDecimals}', bDecimals: '${bDecimals}'`);

    if (aDecimals === 0 && bDecimals === 0) {
        // console.log("No decimals found.  Moving on...");
    } else if (aDecimals === bDecimals) {
        a = deleteDecimal(a);
        b = deleteDecimal(b);
    } else if (aDecimals > bDecimals) {
        a = deleteDecimal(a);
        b = rightPadWithZero(deleteDecimal(b), aDecimals-bDecimals);
        // console.log(`a-b is '${a-b}'`);
    } else if (bDecimals > aDecimals) {
        a = rightPadWithZero(deleteDecimal(a), bDecimals-aDecimals);
        b = deleteDecimal(b);
        // console.log(`b-a is '${b-a}'`);
    }

    a = removeLeftPaddedZeroes(a);
    b = removeLeftPaddedZeroes(b);

    // console.log(`a as int: '${a}', b as int: '${b}'`);

    // otherwise, perform division like a human would
    if (parseInt(a) > parseInt(b)) {
        numeratorIsLarger = true;
        // console.log(`a > b:  ${a} > ${b}`);
        let newA = a[0];

        while (parseInt(newA) < parseInt(b)) {
            newA += a[onDigit+1];
            onDigit++;
        }
        
        // console.log(`newA: '${newA}'`);

        let num = newA/b;
        // console.log(`num: '${num}'`);
        output += `${parseInt(num)}`;

        remainder = modulo(newA, b);

        // console.log(`remainder: '${remainder}'`);
        // console.log(`onDigit: '${onDigit}'`);
        // console.log(`output so far: '${output}'`);

        if (!a[onDigit+1]) {
            numeratorIsLarger = false;
            output += ".";
        }
    } else if (parseInt(a) < parseInt(b)) {
        numeratorIsLarger = false;
        // console.log(`a < b:  ${a} < ${b}`);
        output += `0.${Math.floor(10*a/b)}`;

        remainder = modulo((a+"0"), b);

        // console.log(`remainder: '${remainder}'`)
    } else if (a === b) {
        // if a === b, just return 1 as a string
        return "1";
    }

    // console.log(`remainder: ${remainder}`);
    let somethingHappened = false;

    while (output.length < 500) {

        // console.log(`output so far: '${output}'`);
        if (compare(remainder.toString(), b.toString()) === 2 && !numeratorIsLarger) {
            // console.log(`remainder before tacking on the digit: ${remainder}`);
            remainder = remainder + "0";
            // console.log(`remainder < divisor; remainder * 10 = '${remainder}'`);
        } else if (compare(remainder.toString(), b.toString()) === 2 && numeratorIsLarger) {
            onDigit++;
            if (a[onDigit]) {
                // console.log(`onDigit: '${onDigit}', a[onDigit]: '${a[onDigit]}'`);
                // console.log(`remainder before tacking on the digit: ${remainder}`);
                remainder = remainder.toString() + a[onDigit];
            } else if (!a[onDigit]) {
                numeratorIsLarger = false;
                output += ".";
                if (compare(remainder.toString(), b.toString()) === 2 && !numeratorIsLarger) {
                    remainder = remainder + "0";
                }
            }

            // console.log(`output so far: '${output}'`);
            // console.log(`remainder: '${remainder}'`);
        } else {
            // console.log("something else is happening");
            // console.log(`compare: '${compare(remainder.toString(), b.toString())}'`);
            remainder = 0;
            somethingHappened = true;
        }

        let num = Math.floor(remainder/b);
        // console.log(`remainder: ${remainder}`);
        // console.log(`remainder: '${remainder}', divisor (b): '${b}', num: '${num}'`);
        if (!somethingHappened) {
            output += num;
        } else if (somethingHappened) {
            somethingHappened = false;
        }
        
        remainder = modulo(remainder, b);
        // console.log(`remainder after modulo: '${remainder}'`);
        // console.log();
    }

    // add negative sign back in
    if (resultShouldBeNegative) {
        output = "-" + output;
    }

    // console.log(`output: "${output}"`);
    
    // truncate the output to 20 decimals
    if (handleDecimals(output) !== 0) {
        // console.log(handleDecimals(output) !== 0);
        let decimalDigitCounter = 0;
        let decimalFound = false;
        let newOutput = "";

        for (let i = 0; i < output.length; i++) {
            newOutput += output[i];
            
            if (decimalFound) {
                decimalDigitCounter++;
            }

            if (output[i] === "." || output[i] === ",") {
                decimalFound = true;
            }

            if (decimalDigitCounter === 20) {
                output = newOutput;
                break;
            }
        }
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
        let edgeCaseFix = "";

        for (let i = 0; i < output.length; i++) {
            if (output[i] === "." || output[i] === ",") {
                return edgeCaseFix;
            }

            edgeCaseFix += output[i];
        }
    }

    return output;
}

// console.log(largeDiv("5886774746463746757476376837846287120091288837821910924857876852102369847258741225", "563259871238569745258745"));
// console.log(largeDiv("1000000000000000000000000000000000000000000000000000000000000000000000000000000000", "100000000000000000000000"));
// console.log(largeDiv("63", "6"));
// console.log(largeDiv("0.01", "0.003"));
// console.log(largeDiv("10", "3"));
// console.log(largeDiv("9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999998", "2"));
// console.log(largeDiv("0.00005601738843121489", "0.014833469638891051249761810510689427222312310102108282245106653363"));