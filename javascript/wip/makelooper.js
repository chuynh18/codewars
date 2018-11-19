// https://www.codewars.com/kata/lazy-repeater - 5 kyu

// really straightforward kata, as long as you understand closures

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