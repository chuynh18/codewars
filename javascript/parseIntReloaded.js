// https://www.codewars.com/kata/parseint-reloaded - 4 kyu

"use strict";

const parseInt = function(input) {
   // remove "and" for consistency
   input = input.toLowerCase().replace(" and ", " ");

   // lex it
   const tokens = input.split(" ");

   // parse tokens for key words (million, thousand, and hundred)
   const parse = {};

   for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === "million") {
         parse.million = {
            index: i
         };
      } else if (tokens[i] === "thousand") {
         parse.thousand = {
            index: i
         };
      } else if (tokens[i] === "hundred" && parse.hundred1) {
         parse.hundred2 = {
            index: i
         };
      } else if (tokens[i] === "hundred") {
         parse.hundred1 = {
            index: i
         };
      }
   }

   // handle 0 through 99
   if (tokens.length === 1) {
      return upTo99(tokens[0]);
   } else { // handle 100 and up
      // we know that the largest number is one million, so let's not bother writing any complicated logic
      var tenThousands;
      var thousands;
      var remainder = 0;
      if (parse.hundred1) {
         tenThousands = upTo99(tokens[parse.hundred1.index - 1]) * 100000;
      }
      if (parse.thousand) {
         thousands = upTo99(tokens[parse.thousand.index - 1]) * 1000;
      }
      if (parse.million) {
         return 1000000;
      } else if (parse.hundred1 && parse.hundred2) { // handle hundred thousand hundred
         var hundreds = upTo99(tokens[parse.hundred2.index - 1]) * 100;
         if (parse.hundred1.index + 1 === parse.thousand.index) {
            if (tokens[parse.hundred2.index + 1]) {
               remainder = upTo99(tokens[parse.hundred2.index + 1]);
            }

            return tenThousands + hundreds + remainder;
         }

         if (tokens[parse.hundred2.index + 1]) {
            if (tokens[parse.hundred2.index + 1] === "and") {
               remainder = upTo99(tokens[parse.hundred2.index + 2]);
            } else {
               remainder = upTo99(tokens[parse.hundred2.index + 1]);
            }
         }

         return tenThousands + thousands + hundreds + remainder;
      } else if (parse.thousand && parse.hundred1) {
         if (parse.thousand.index > parse.hundred1.index) { // handle hundred thousands
            if (parse.thousand.index - 1 === parse.hundred1.index) {
               if (tokens[parse.thousand.index + 1]) {
                  remainder = upTo99(tokens[parse.thousand.index + 1]);
               }

               return tenThousands+remainder;
            }

            if (tokens[parse.hundred2]) {
               remainder = upTo99(tokens[parse.hundred2.index + 1]);
            }

            return tenThousands + thousands + remainder;
         } else if (parse.thousand.index < parse.hundred1.index) { // handle thousand(s) hundred(s)
            var hundreds = upTo99(tokens[parse.hundred1.index - 1]) * 100;

            if (tokens[parse.hundred1.index + 1]) {
               remainder = upTo99(tokens[parse.hundred1.index + 1]);
            }

            return thousands+hundreds+remainder;
         }
      } else if (parse.thousand) {
         if (tokens[parse.thousand.index + 1]) {
            remainder = upTo99(tokens[parse.thousand.index + 1]);
         }

         return thousands+remainder;
      } else if (parse.hundred1) {
         var hundreds = upTo99(tokens[parse.hundred1.index - 1]) * 100;

         if (tokens[parse.hundred1.index + 1]) {
            remainder = upTo99(tokens[parse.hundred1.index + 1]);
         }

         return hundreds+remainder;
      }
   }
}

// handles numbers 0 through 99
const upTo99 = function(input) {
   const parseWord = function(word) {
      switch(word) {
         case "zero": return 0;
         case "one": return 1;
         case "two": return 2;
         case "three": return 3;
         case "four": return 4;
         case "five": return 5;
         case "six": return 6;
         case "seven": return 7;
         case "eight": return 8;
         case "nine": return 9;
         case "ten": return 10;
         case "eleven": return 11;
         case "twelve": return 12;
         case "thirteen": return 13;
         case "fourteen": return 14;
         case "fifteen": return 15;
         case "sixteen": return 16;
         case "seventeen": return 17;
         case "eighteen": return 18;
         case "nineteen": return 19;
         case "twenty": return 20;
         case "thirty": return 30;
         case "forty": return 40;
         case "fifty": return 50;
         case "sixty": return 60;
         case "seventy": return 70;
         case "eighty": return 80;
         case "ninety": return 90;
      }
   }

   const tokens = input.split("-");
   let val1 = parseWord(tokens[0]);
   let val2 = 0;

   if (tokens[1]) {
      val2 = parseWord(tokens[1]);
   }
   
   return val1 + val2;
}