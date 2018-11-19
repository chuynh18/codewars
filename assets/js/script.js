"use strict";

const allowedChars = function(input, allowedChars) {
   let output = "";

   for (let i = 0; i < input.length; i++) {
      if (allowedChars.indexOf(input[i]) !== -1) {
         output += input[i];
      }
   }

   return output;
}

const filterMultipleDecimals = function(input) {
   let output = "";
   let decimalPresent = false;

   for (let i = 0; i < input.length; i++) {
      if (input[i] === "." || input[i] === ",") {
         if (!decimalPresent) {
            decimalPresent = true;
            output += input[i];
         }
      } else {
         output += input[i];
      }
   }

   return output;
}

document.getElementById("dividend").addEventListener("keyup", function(event) {
   document.getElementById("dividend").value = allowedChars(document.getElementById("dividend").value, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","]);
   document.getElementById("dividend").value = filterMultipleDecimals(document.getElementById("dividend").value);
   document.getElementById("quotient").textContent = ""

   if (event.key === "Enter") {
      clickDivide();
   }
});

document.getElementById("divisor").addEventListener("keyup", function(event) {
   document.getElementById("divisor").value = allowedChars(document.getElementById("divisor").value, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","]);
   document.getElementById("divisor").value = filterMultipleDecimals(document.getElementById("divisor").value);
   document.getElementById("quotient").textContent = ""

   if (event.key === "Enter") {
      clickDivide();
   }
});

const clickDivide = function() {
   const dividend = document.getElementById("dividend").value;
   const divisor = document.getElementById("divisor").value;

   dividend.replace(",", ".");
   divisor.replace(",", ".");

   if (divisor === "" || dividend === "") {
      for (let i = 0; i < 5; i++) {
         setTimeout(function() {document.getElementById("quotient").textContent = ""}, i*200);
         setTimeout(function() {document.getElementById("quotient").textContent = "Finish typing in your inputs!"}, i*200 + 100);
      }
   } else {
      document.getElementById("quotient").textContent = largeDiv(dividend, divisor);
   }
}

const evalExpression = function() {
   const expression = document.getElementById("expression").value;
   document.getElementById("expressionResult").textContent = calc(expression);
}

const countParenthesis = function(input) {
   let numOpen = 0;
   let numClose = 0;

   for (let i = 0; i < input.length; i++) {
      if (input[i] === "(") {
         numOpen++;
      } else if (input[i] === ")") {
         numClose++;
      }
   }

   if (numOpen !== numClose) {
      return "Warning:  You do not have an equal number of open and close parenthesis in your expression.";
   } else {
      return "";
   }
}

document.getElementById("expression").addEventListener("keyup", function(event) {
   document.getElementById("expression").value = allowedChars(document.getElementById("expression").value, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "(", ")", " "]);
   document.getElementById("mismatch").textContent = countParenthesis(document.getElementById("expression").value);

   if (event.key === "Enter") {
      evalExpression();
   }
});   