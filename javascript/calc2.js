// https://www.codewars.com/kata/calculator - 3 kyu

// rewrote 2 months after the version found in calc.js for the hell of it
// it's a little more succinct.
// % is supported because this is intended to be a subroutine for https://www.codewars.com/kata/simpler-interactive-interpreter/ - 2 kyu

"use strict";

const Calculator = function() {
   this.evaluate = string => {
   
   // convert input string to properly-formatted array
    var input = string.split(" ");
    
    for (var i = 0; i < input.length; i++) {
      var converted = +input[i];
      
      if (!isNaN(converted)) {
        input[i] = converted;
      }
    }
   
    // calculator state
    var calculated = false;
    var operand1;
    var operand2;
    var operator;
 
    // transformed input - after computing multiplication, division, and modulus operator (only addition/subtraction operators left over)
    var afterFirstPass = [];
 
    // result to return
    var result;
 
    // inner function for resetting calculator state after performing one arithmetic operation
    function resetStorage(input, calculatorState) {
       operand1 = input;
       operand2 = undefined;
       operator = undefined;
       calculated = calculatorState;
    }
 
    // ===== begin *, /, % =====
    for (var i = 0; i < input.length; i++) {
       // parse expression
      if (operand1 === undefined && typeof input[i] === "number") {
         operand1 = input[i];
      } else if (operand1 !== undefined && !operator && (input[i] === "*" || input[i] === "/" || input[i] === "%")) {
         operator = input[i];
      } else if (operand1 !== undefined && !operator && (input[i] === "+" || input[i] === "-")) {
         operand1 = undefined;
         if (calculated) {
            calculated = false;
         } else {
            afterFirstPass[afterFirstPass.length] = input[i-1];
         }
         afterFirstPass[afterFirstPass.length] = input[i];
      } else if (operand1 !== undefined && operator && operand2 === undefined && typeof input[i] === "number") {
         operand2 = input[i];
      }
 
       // if ready to compute, then handle computation and mutate state of calculator
       if (operand1 !== undefined && operator && operand2 !== undefined) {
          if (operator === "*") {
             if (typeof afterFirstPass[afterFirstPass.length - 1] === "number") {
                afterFirstPass[afterFirstPass.length - 1] = operand1 * operand2;
             } else {
                afterFirstPass[afterFirstPass.length] = operand1 * operand2;
             }
          } else if (operator === "/") {
             if (typeof afterFirstPass[afterFirstPass.length - 1] === "number") {
                afterFirstPass[afterFirstPass.length - 1] = operand1 / operand2;
             } else {
                afterFirstPass[afterFirstPass.length] = operand1 / operand2;
             }
          } else if (operator === "%") {
             if (typeof afterFirstPass[afterFirstPass.length - 1] === "number") {
                afterFirstPass[afterFirstPass.length - 1] = operand1 % operand2;
             } else {
                afterFirstPass[afterFirstPass.length] = operand1 % operand2;
             }
          }
 
          resetStorage(afterFirstPass[afterFirstPass.length - 1], true);
       } else if (i === input.length - 1) {
          afterFirstPass[afterFirstPass.length] = input[i];
       }
 
    }
 
    resetStorage(undefined, false);
 
    // ===== end *, /, % =====
 
    // ===== begin +, - =====
    result = afterFirstPass[0];
    operand1 = afterFirstPass[0];
 
    for (var i = 0; i < afterFirstPass.length; i++) {
       // parse expression
       if (operand1 === undefined && typeof afterFirstPass[i] === "number") {
          operand1 = afterFirstPass[i];
       } else if (operand1 !== undefined && !operator && (afterFirstPass[i] === "+" || afterFirstPass[i] === "-")) {
          operator = afterFirstPass[i];
       } else if (operand1 !== undefined && operator && operand2 === undefined && typeof afterFirstPass[i] === "number") {
          operand2 = afterFirstPass[i];
       }
  
       if (operand1 !== undefined && operator && operand2 !== undefined) {
          if (operator === "+") {
             result += operand2
          } else if (operator === "-") {
             result -= operand2;
          }
 
          operand1 = result;
          operator = undefined;
          operand2 = undefined;
       }
 
    }
 
    return result;
   }
 };