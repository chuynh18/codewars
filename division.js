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
// Output will be truncated, not rounded, to 20 decimal places

"use strict";

function largeDiv(a, b) {
    console.log();
    console.log(`Computing: '${a}/${b}'`);
    let output = "";
    let remainder;
    let resultShouldBeNegative;
    let numeratorIsLarger;
    let onDigit = 0;

    // checks for some simple cases where involved computation won't be necessary
    if ((parseFloat(a)/parseFloat(b)) % 1 === 0 && parseFloat(a) < 100000000) {
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
        
        console.log(`newA: '${newA}'`);

        let num = newA/b;
        // console.log(`num: '${num}'`);
        output += `${parseInt(num)}`;
        remainder = newA % b;
        console.log(`remainder: '${remainder}'`);
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
        remainder = (10*a) % b;
        // console.log(`remainder: '${remainder}'`)
    } else if (a === b) {
        // if a === b, just return 1 as a string
        return "1";
    }


    // console.log(`remainder: ${remainder}`);

    while (output.length < 1000) {

        // console.log(`output so far: '${output}'`);
        if (remainder < b && !numeratorIsLarger) {
            remainder *= 10;
            // console.log(`remainder < divisor; remainder * 10 = '${remainder}'`);
        } else if (remainder < b && numeratorIsLarger) {
            onDigit++;
            if (a[onDigit]) {
                remainder = parseInt(remainder + a[onDigit]);
            } else if (!a[onDigit]) {
                numeratorIsLarger = false;
                output += ".";
                if (remainder < b && !numeratorIsLarger) {
                    remainder *= 10;
                }
            }

            // console.log(`output so far: '${output}'`);
            // console.log(`remainder: '${remainder}'`);
        }

        let num = Math.floor(remainder/b);
        // console.log(`remainder: ${remainder}`);
        // console.log(`remainder: '${remainder}', divisor: '${b}', num: '${num}'`);
        output += num;
        remainder = remainder % b;
    }

    // add negative sign back in
    if (resultShouldBeNegative) {
        output = "-" + output;
    }

    // console.log(`computed to 50 characters excluding "-" char: "${output}"`);
    
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

console.log(largeDiv("5886774746463746757476376837846287120091288837821910924857876852102369847258741225", "563259871238569745258745"));