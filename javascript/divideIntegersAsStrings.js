"use strict";

// perform a/b, return quotient and remainder as ["${quotient}", "${remainder}"]
function divideStrings(a, b) {
   var quotient = "";
   var currentDividend = "";

   // handle a === 0
   if (a === "0") {
      return ["0", "0"];
   }

   // handle a === b
   if (a === b) {
      return ["1", "0"];
   }

   if (!ALargerOrEqualToB(a, b)) {
      return ["0", a];
   }

   for (var i = 0; i < a.length; i++) {
      if (currentDividend === "0") {
         currentDividend = a[i];
      } else {
         currentDividend += a[i];
      }
      
      var currentQuotient = 0;

      if (ALargerOrEqualToB(currentDividend, b)) {
         while (ALargerOrEqualToB(currentDividend, b)) {
            currentDividend = subtract(currentDividend, b);
            currentQuotient++;
         }
         
         quotient += currentQuotient;
      } else {
         quotient += "0";
      }
   }

   return [stripLeadingZeros(quotient), currentDividend];
   
   // true if a > b, otherwise false
   function ALargerOrEqualToB(a, b) {
      if (a.length > b.length) {
         return true;
      }

      if (a.length < b.length) {
         return false;
      }

      if (a.length === b.length) {
         for (var i = 0; i < a.length; i++) {
            if (a[i] > b[i]) {
               return true;
            }

            if (b[i] > a[i]) {
               return false;
            }
         }
      }

      // a === b
      return true;
   }
}

// returns a - b
function subtract(a, b) {
   if (a === b) {
      return "0";
   }

   var answer = "";
   var carry = false;
   var answerIsNegative = false;

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

   if (answerIsNegative) {
      answer = "-" + answer;
   }

   return stripLeadingZeros(answer);
}

function stripLeadingZeros(input) {
   for (var i = 0; i < input.length; i++) {
      if (input[i] !== "0") {
         return input.slice(i);
      }
   }
}