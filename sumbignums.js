// I admit to cheating a little bit.  I found 2 kata that were
// substantially the same, and used almost the same code to
// get credit for solving both.

// https://www.codewars.com/kata/5324945e2ece5e1f32000370 4 kyu
// https://www.codewars.com/kata/525f4206b73515bffb000b21 4 kyu

"use strict";

function add(num1, num2) {
    let carry = false;
    let answer = "";

    const leftPadWith0 = function(pad, compare) {
        let string = "";

        for (let i = 0; i < compare.length - pad.length; i++) {
            string += "0";
        }

        return string + pad;
    }

    if (num1.length > num2.length) {
        num2 = leftPadWith0(num2, num1);
    } else {
        num1 = leftPadWith0(num1, num2);
    }

    for (let i = num1.length-1; i >= 0; i--) {
        var addition = (parseInt(num1[i]) + parseInt(num2[i]));
        
        if (!carry) {
            if (addition > 9) {
                answer = addition.toString()[1] + answer;
                // console.log(`!carry, carry: ${answer}`);
                carry = true;
            } else {
                answer = addition + answer;
                // console.log(`!carry, !carry: ${answer}`);
            }
        } else if (carry) {
            var carriedAddition = addition + 1;
            if (addition > 8) {
                answer = carriedAddition.toString()[1] + answer;
                // console.log(`carry, carry: ${answer}`);
            } else {
                answer = carriedAddition + answer;
                // console.log(`carry, !carry: ${answer}`);
                carry = false;
            }
        }

        if (i === 0 && carry) {
            answer = "1" + answer;
        }
    }

    return answer;
}

console.log(add("5", "5"));