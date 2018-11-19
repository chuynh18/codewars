"use strict"

const makeLooper = function(input) {
   let counter = -1;

   return function() {
      counter++;

      if (counter === input.length) {
         counter = 0;
      }

      return input[counter];
   }
}