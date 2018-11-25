// https://www.codewars.com/kata/simpler-interactive-interpreter/ - 2 kyu

// builds upon https://www.codewars.com/kata/evaluate-mathematical-expression - 2 kyu (see mathexpressions.js)
// which itself builds on https://www.codewars.com/kata/calculator - 3 kyu (see calc.js or calc2.js)

"use strict";

function Interpreter() {
   this.vars = {};
   this.functions = {};
}

// thanks for this freebie - parses input string into JavaScript array
Interpreter.prototype.tokenize = function(program) {
   if (program === "")
      return [];

   var regex = /\s*([-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g;
   return program.split(regex).filter(function(s) {
      return !s.match(/^\s*$/);
   });
};

Interpreter.prototype.retrieve = function(input) {
   if (this.vars[input]) {
      return this.vars[input];
   } else {
      throw new Error(`Invalid identifier. No variable with name '${input}' was found.`);
   }
}

Interpreter.prototype.input = function(expr) {
   var tokens = this.tokenize(expr);

   if (tokens.length === 0) {
      return "";
   }

   // convert all numbers in tokens array to numbers
   for (var i = 0; i < tokens.length; i++) {
      var converted = +tokens[i]

      // if it makes sense to convert the token to a number, replace the token with the converted token
      if (!isNaN(converted)) {
         tokens[i] = converted;
      }
   }

   // handle assignments
   if (tokens[1] === "=") {
      // if assignment value is not an expression, save the value
      if (tokens.length === 3) {
         this.vars[tokens[0]] = tokens[2];
         return tokens[2];
      } else { // it is an assignment of an expression; evaluate expression first then assign value
         var expressionToCompute = tokens.slice(2);

         // if expression has variable, look up variable's value and inline it
         for (var i = 0; i < expressionToCompute.length; i++) {
            if (typeof expressionToCompute[i] === "string" &&
               !(expressionToCompute[i] === "+" ||
               expressionToCompute[i] === "-" ||
               expressionToCompute[i] === "*" ||
               expressionToCompute[i] === "/" ||
               expressionToCompute[i] === "%")) {
                  expressionToCompute[i] = this.retrieve(expressionToCompute[i]);
            }
         }

         this.vars[tokens[0]] = this.recursiveParenthesis(expressionToCompute);
         return this.vars[tokens[0]];
         
      }
   } else { // if there's no assignment operator, it's some kind of computation and/or value retrieval
      // if tokens.length === 1...
      if (tokens.length === 1) {
         if (typeof tokens[0] === "number") { // if it's just a number, return it
            return tokens[0];
         } else { // it's a variable, retrieve it
            return this.retrieve(tokens[0]);
         }
      } else { // length is > 1, then it's a computation or retrieval + computation
         if (typeof tokens[0] === "number" || tokens[0] === "(") { // it's a computation
            return this.recursiveParenthesis(tokens);
         } else {
            if (this.vars[tokens[0]]) {
               tokens[0] = this.vars[tokens[0]];
               return this.recursiveParenthesis(tokens);
            }
         }
      }
   }
};

// recursively calls handleParenthesis() to evaluate an expression containing any amount of nested parentheses
Interpreter.prototype.recursiveParenthesis = function(input) {
   var containsParenthesis = true;

   while (containsParenthesis) {
      containsParenthesis = false;
      input = this.handleParenthesis(input);

      for (var i = 0; i < input.length; i++) {
         if (input[i] === "(") {
            containsParenthesis = true;
         }
      }
   }

   return this.evalExpression(input);
}

// finds the deepest layer of parentheses and evaluates the expression in between them
Interpreter.prototype.handleParenthesis = function(input) {
   var parentheses = [];
   var depth = 0;
   var maxDepth = 0;
   var simplified = [];

   // scan expression and note parentheses and depths
   for (var i = 0; i < input.length; i++) {
      if (input[i] === "(") {
         parentheses[parentheses.length] = {
            depth,
            start: i
         };

         if (depth > maxDepth) {
            maxDepth = depth;
         }

         depth++;
      } else if (input[i] === ")") {
         depth--;
      }
   }

   // if there are no parentheses present in the input expression, return the input
   if (parentheses.length === 0) {
      return input;
   }

   // find most nested parenthesis, evaluate expression contained within, replace expression with result of evaluation
   for (var i = 0; i < parentheses.length; i++) {
      if (parentheses[i].depth === maxDepth) {
         for (var j = parentheses[i].start + 1; j < input.length; j++) {
            if (input[j] === ")") {
               parentheses[i].end = j;

               for (var k = 0; k < parentheses[i].start; k++) {
                  simplified[simplified.length] = input[k];
               }

               simplified[simplified.length] = this.evalExpression(input.slice(parentheses[i].start + 1, j));

               for (var k = j + 1; k < input.length; k++) {
                  simplified[simplified.length] = input[k];
               }
               break;
            }
         }
         break;
      }
   }

   return simplified; // return simplified input expression (it now has one fewer set of parenthesis)
}

Interpreter.prototype.evalExpression = function(input) {
   // calculator state
   var operand1FromCalculation = false;
   var operand1;
   var operand2;
   var operator;

   // input after computing multiplication, division, and modulus operator (only addition/subtraction left over)
   var afterFirstPass = [];

   // result to return
   var result;

   // inner function for resetting calculator state after performing one arithmetic operation
   function resetStorage(input, operand1FromCalculationState) {
      operand1 = input;
      operand2 = undefined;
      operator = undefined;
      operand1FromCalculation = operand1FromCalculationState;
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
         if (operand1FromCalculation) {
            operand1FromCalculation = false;
         } else {
            afterFirstPass[afterFirstPass.length] = input[i-1];
         }
         afterFirstPass[afterFirstPass.length] = input[i];
      } else if (operand1 !== undefined && operator && operand2 === undefined && typeof input[i] === "number") {
         operand2 = input[i];
      }

      // if ready to compute, then handle computation, mutating calculator state as appropriate
      if (operand1 !== undefined && operator && operand2 !== undefined) {
         if (typeof afterFirstPass[afterFirstPass.length - 1] === "number") {
            if (operator === "*") {
               afterFirstPass[afterFirstPass.length - 1] = operand1 * operand2;
            } else if (operator === "/") {
               afterFirstPass[afterFirstPass.length - 1] = operand1 / operand2;
            } else if (operator === "%") {
               afterFirstPass[afterFirstPass.length - 1] = operand1 % operand2;
            }
         } else {
            if (operator === "*") {
               afterFirstPass[afterFirstPass.length] = operand1 * operand2;
            } else if (operator === "/") {
               afterFirstPass[afterFirstPass.length] = operand1 / operand2;
            } else if (operator === "%") {
               afterFirstPass[afterFirstPass.length] = operand1 % operand2;
            }
         }

         resetStorage(afterFirstPass[afterFirstPass.length - 1], true); // appropriately mutate calculator state
      } else if (i === input.length - 1) { // don't chop off the last token if the last operation is + or -
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

      if (operand1 !== undefined && operator && operand2 !== undefined) { // check readiness for computation
         if (operator === "+") { // addition
            result += operand2
         } else if (operator === "-") { // subtraction
            result -= operand2;
         }

         resetStorage(result, undefined); // appropriately mutate calculator state
      }

   }

   return result;
}