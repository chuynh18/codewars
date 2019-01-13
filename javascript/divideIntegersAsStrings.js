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

   // returns a - b; a >= b
   function subtract(a, b) {

   }
}