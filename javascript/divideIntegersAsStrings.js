"use strict";

function divideStrings(a, b) {
   console.log(`a: ${a}, b: ${b}`);

   var quotient = "";

   // handle a === 0
   if (a === "0") {
      return ["0", "0"];
   }

   // handle a === b
   if (a === b) {
      return ["1", "0"];
   }

   var isALargerThanB = aLargerThanB();

   if (!isALargerThanB) {
      return ["0", a];
   }
   
   // true if a > b, otherwise false
   function aLargerThanB() {
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
      return false;
   }
}

// returns a - b
function subtract(a, b) {
   if (typeof a === "number") {
      a = String(a);
   }

   if (typeof b === "number") {
      b = String(b);
   }

   var answer = "";
   var carry = false;
   var answerIsNegative = false;
   var indexOfNonZero = 0;

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

   for (var i = 0; i < answer.length; i++) {
      if (answer[i] !== "0") {
         indexOfNonZero = i;
         break;
      }
   }

   answer = answer.slice(indexOfNonZero);

   if (answerIsNegative) {
      answer = "-" + answer;
   }

   return answer;
}

console.log(subtract("11111", "11233"));