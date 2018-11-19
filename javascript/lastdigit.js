// https://www.codewars.com/kata/last-digit-of-a-huge-number - 3 kyu

// this worked but the code's an absolute mess.  I simply noticed a pattern.  I don't know the number theory behind it.
// I suspect this behavior is an artifact of writing numbers in base 10.

"use strict";

const lastDigit = function(input) {
    console.log(input);

    // simplify input if we find a 1
    let stopIndex;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === 1) {
            stopIndex = i;
            break;
        }
    }

    const simplifiedArray = [];
    for (let i = 0; i < stopIndex; i++) {
        simplifiedArray[simplifiedArray.length] = input[i];
    }

    if (stopIndex !== undefined) {
        console.log(`stopIndex exists: trying ${simplifiedArray}`);
        return lastDigit(simplifiedArray);
    }

    // simplify if we find a 0, 0 but we must start from the end
    for (let i = input.length-1; i > 0; i--) {
        if (input[i] === 0 && input[i-1] === 0) {
            stopIndex = i-1;
            break;
        }
    }

    for (let i = 0; i < stopIndex; i++) {
        simplifiedArray[simplifiedArray.length] = input[i];
    }

    if (stopIndex !== undefined) {
        console.log(`stopIndex exists: trying ${simplifiedArray}`);
        return lastDigit(simplifiedArray);
    }

    // lastly, simplify if we find a 0, but we must start from the end
    for (let i = input.length-1; i > 0; i--) {
        if (input[i] === 0) {
            stopIndex = i-1;
            break;
        }
    }

    for (let i = 0; i < stopIndex; i++) {
        simplifiedArray[simplifiedArray.length] = input[i];
    }

    simplifiedArray[simplifiedArray.length] = 1;

    if (stopIndex !== undefined) {
        console.log(`stopIndex exists: trying ${simplifiedArray}`);
        return lastDigit(simplifiedArray);
    }

    const patterns = {
        "0": [0],
        "1": [1],
        "2": [6, 2, 4, 8],
        "3": [1, 3, 9, 7],
        "4": [6, 4],
        "5": [5],
        "6": [6],
        "7": [1, 7, 9, 3],
        "8": [6, 8, 4, 2],
        "9": [1, 9],
    }

    if (input.length === 0) {
        return 1;
    } else if (input.length === 1) {
        let answer = String(input[0]);
        return Number(answer[answer.length-1]);
    } else if (input.length === 2) {
        if (input[1] === 0) {
            return 1;
        }
        const num1 = input[0] % 10;
        const num2 = input[1] % patterns[num1].length;
        return patterns[num1][num2];
    } else if (input.length === 3) {
        if (input[2] === 0) {
            let answer = String(input[0]);
            return Number(answer[answer.length-1]);
        } else if (input[1] === 0) {
            return 1;
        }
    } 

    const mod1 = input[0] % 10;

    if (mod1 === 0 || mod1 === 1 || mod1 === 5 || mod1 === 6) {
        return mod1;
    } else if (mod1 === 4 || mod1 === 9) {
        const input1mod2 = input[1] % 2;
        if (input1mod2 === 1) {
            return patterns[mod1][1];
        } else {
            return patterns[mod1][0];
        }
    } else {
        const input1mod4 = input[1] % 4;

        if (input1mod4 === 1) {
            return patterns[mod1][1];
        }

        if (input.length > 3) {
            if (mod1 === 2 || mod1 === 8) {
                if (input[1] === 2 && input[2] >= 2) {
                    return patterns[mod1][0];
                } else if (input[1] === 2) {
                    return patterns[mod1][2];
                } 
            } else if (mod1 === 3 || mod1 === 7) {
                if (input1mod4 === 0) {
                    return patterns[mod1][0];
                } else if (input1mod4 === 1) {
                    return patterns[mod1][1];
                } else if (input1mod4 === 2) {
                    if (input[2] >= 2) {
                        return patterns[mod1][0];
                    } else {
                        return patterns[mod1][2];
                    }
                } else if (input1mod4 === 3) {
                    const possibilities = [patterns[mod1][1], patterns[mod1][3]];
                    console.log(possibilities);
                    // fix goes here...

                    // return possibilities[1];

                } else {
                    let array = input.map(x => x%4);
                    console.log(array);
    
                    let answer;
                    answer = Math.pow(array[array.length-2], array[array.length-1]) % 4;
                    console.log(`answer: ${answer}`);
    
                    for (let i = array.length-2; i > 1; i--) {
                        console.log(`answer: ${answer}, array[i]: '${array[i]}', array[i+1]: ${array[i+1]}`);
                        answer = Math.pow(array[i], answer) % 4;
                    }
                    console.log(`answer: ${answer}`);
                
                    return patterns[mod1][answer];
                }
                
            }

        }

        if (input[3] === 0 && input.length === 3) {
            return patterns[mod1][1];
        } else if (input[2] === 0 && input.length === 3) {
            return patterns[mod1][0];
        } else if (input1mod4 === 0) {
            return patterns[mod1][0];
        } else if (input1mod4 === 2 && input[2] >= 2) {
            return patterns[mod1][0];
        } else if (input1mod4 === 2 && input[2] === 1) {
            return patterns[mod1][2];
        } else if (input1mod4 === 3 && input[2] % 2 === 0) {
            return patterns[mod1][1];
        } else if (input1mod4 === 3 && input[2] % 2 === 1) {
            return patterns[mod1][3];
        } else if (input1mod4 === 3) {
            return patterns[mod1][3];
        }
    }
}

// console.log(lastDigit([2,2,101,2])); // 6
// console.log(lastDigit([ 849117, 886742, 262865, 270661 ])); // 1
// console.log(lastDigit([ 2, 2, 101, 2 ])); // 6
// console.log(lastDigit([ 471678, 403799, 968047 ])); // 2
console.log(lastDigit([ 2147483647, 2147483647, 2147483647, 2147483647 ])); // 3
// console.log(lastDigit([2,2,2,0])); // 4
// console.log(lastDigit([0,0])); // 1
// console.log(lastDigit([1,2])); // 1
// console.log(lastDigit([4,2])); // 6
// console.log(lastDigit([9,7])); // 9
// console.log(lastDigit([0,0,0])); // 0
// console.log(lastDigit([3,4,2])); // 1
// console.log(lastDigit([4,3,6])); // 4
// console.log(lastDigit([7,6,21])); // 1
// console.log(lastDigit([12,30,21])); // 6
// console.log(lastDigit([937640,767456,981242])); // 0
// console.log(lastDigit([123232,694022,140249])); // 6
// console.log(lastDigit([499942,898102,846073])); // 6
