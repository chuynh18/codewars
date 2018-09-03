"use strict";

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

// subtract arbitrarily large integers.
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
    if (b === "0") {
        console.log("modulo function got passed b === 0");
        return NaN;
    }

    if (typeof a !== "string" || typeof b !== "string") {
        console.log("check yourself before you wreck yourself.  a or b not string");
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
            console.log(`modulo: '${modulo}', b: '${b}'`)
            if (compare(modulo, paddedB) === 2) {
                paddedB = divideby10(paddedB);
                console.log(`paddedB reduced to '${paddedB}'`);
            } else if (compare(modulo, paddedB) === 1) {
                modulo = subtract(modulo, paddedB);
                console.log(`performing subtraction, modulo is now '${modulo}' and paddedB is '${paddedB}'`);
            } else if (compare(modulo, paddedB) === 0) {
                return "0";
            }
        }

        return modulo;
    }
}

console.log(modulo("03","6"));