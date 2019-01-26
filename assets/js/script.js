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

const clickDivide = function() {
   const dividend = document.getElementById("dividend").value;
   const divisor = document.getElementById("divisor").value;
   const precision = +document.getElementById("decimals").value;

   dividend.replace(",", ".");
   divisor.replace(",", ".");

   if (divisor === "" || dividend === "") {
      for (let i = 0; i < 5; i++) {
         setTimeout(function() {document.getElementById("quotient").innerHTML = "<br>"}, i*200);
         setTimeout(function() {document.getElementById("quotient").textContent = "Finish typing in your inputs!"}, i*200 + 100);
      }
   } else {
      document.getElementById("quotient").textContent = largeDiv(dividend, divisor, precision);
   }
}

const evalExpression = function() {
   const expression = document.getElementById("expression").value;
   if (countParenthesis(document.getElementById("expression").value) === "") {
      document.getElementById("expressionResult").textContent = calc(expression);
   }
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

   if (numOpen > numClose) {
      return `You have ${numOpen-numClose} extra open parenthesis (`;
   } else if (numOpen < numClose) {
      return `You have ${numClose-numOpen} extra close parenthesis )`;
   } else {
      return "";
   }
}

const parseNumberToEnglish = function() {
   var number = document.getElementById("numToEng").value;
   document.getElementById("numToEngResult").textContent = numberToEnglishWrapper(number);;
}

document.getElementById("dividend").addEventListener("keyup", function(event) {
   document.getElementById("dividend").value = allowedChars(document.getElementById("dividend").value, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","]);
   document.getElementById("dividend").value = filterMultipleDecimals(document.getElementById("dividend").value);
   document.getElementById("quotient").innerHTML = "<br>"

   if (event.key === "Enter") {
      clickDivide();
   }
});

document.getElementById("divisor").addEventListener("keyup", function(event) {
   document.getElementById("divisor").value = allowedChars(document.getElementById("divisor").value, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","]);
   document.getElementById("divisor").value = filterMultipleDecimals(document.getElementById("divisor").value);
   document.getElementById("quotient").innerHTML = "<br>"

   if (event.key === "Enter") {
      clickDivide();
   }
});

document.getElementById("decimals").addEventListener("keyup", function() {
   const decimalsValue = document.getElementById("decimals").value;

   if (decimalsValue < 1) {
      document.getElementById("decimals").value = 1;
   } else if (decimalsValue > 100) {
      document.getElementById("decimals").value = 100;
   }
})

document.getElementById("expression").addEventListener("keyup", function(event) {
   document.getElementById("expression").value = allowedChars(document.getElementById("expression").value, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "(", ")", " "]);
   document.getElementById("mismatch").textContent = countParenthesis(document.getElementById("expression").value);
   document.getElementById("expressionResult").innerHTML = "<br>";

   if (event.key === "Enter") {
      evalExpression();
   }
});

document.getElementById("numToEng").addEventListener("keyup", function(event) {
   document.getElementById("numToEng").value = allowedChars(document.getElementById("numToEng").value, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","]);
   document.getElementById("numToEng").value = filterMultipleDecimals(document.getElementById("numToEng").value);
});