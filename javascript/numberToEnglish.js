"use strict";

function numberToEnglish(n) {
   // handle positive and negative Infinity
   if (n === Infinity) {
      return "infinity";
   } else if (n === -Infinity) {
      return "negative infinity";
   }

   handleNaN(n);
   var tokens = tokenize(n);
   return tokenToNumberInEnglish(tokens);

   // === HELPER FUNCTIONS BELOW ===

   // throws TypeError if n is NaN
   function handleNaN(n) {
      if (Number.isNaN(n)) {
         throw new TypeError("cannot parse NaN");
      }
   }

   // parses and tokenizes n into an object
   function tokenize(n) {
      var counter = 0;
      var triplet = "";
      var tokens = {
         digits: {}
      };
      var splitOnDecimal;

      // separate n into integer and fractional components
      if (n[0] === "-") {
         splitOnDecimal = n.slice(1).split(".");
         // create token to represent n being negative if n is negative
         tokens.negative = true;
      } else {
         splitOnDecimal = n.split(".");
      }

      // iterate over the integral component of n, creating one token per thousand (short-scale name)
      for (var i = splitOnDecimal[0].length - 1; i >= 0; i--) {
         triplet = splitOnDecimal[0][i] + triplet;

         if (triplet.length === 3) {
            tokens.digits[counter] = triplet;
            triplet = "";
            counter++;
         }

         if (triplet.length > 0) {
            tokens.digits[counter] = triplet;
         }
      }

      if (splitOnDecimal.length === 2) {
         tokens.decimals = splitOnDecimal[1];
      }

      return tokens;
   }

   // converts number between 0 to 999 to its English representation
   function parseTriplets(numString) {
      var num = Number(numString);
      var words = "";

      if (num >= 900) {
         words = "nine hundred";
      } else if (num >= 800) {
         words = "eight hundred";
      } else if (num >= 700) {
         words = "seven hundred";
      } else if (num >= 600) {
         words = "six hundred";
      } else if (num >= 500) {
         words = "five hundred";
      } else if (num >= 400) {
         words = "four hundred";
      } else if (num >= 300) {
         words = "three hundred";
      } else if (num >= 200) {
         words = "two hundred";
      } else if (num >= 100) {
         words = "one hundred";
      } else {
         var numStringWithoutLeadingZero = String(Number(numString));
         words = parseTwoDigit(numStringWithoutLeadingZero);
         return words;
      }

      if (num % 100 !== 0) {
         words += ` and ${parseTwoDigit(String(num % 100))}`;
      }

      return words;

      // converts number between 0 to 99 to its English representation
      function parseTwoDigit(numString) {
         var num = Number(numString);
   
         if (num < 20) {
            switch(numString) {
               case "0": return "zero";
               case "1": return "one";
               case "2": return "two";
               case "3": return "three";
               case "4": return "four";
               case "5": return "five";
               case "6": return "six";
               case "7": return "seven";
               case "8": return "eight";
               case "9": return "nine";
               case "10": return "ten";
               case "11": return "eleven";
               case "12": return "twelve";
               case "13": return "thirteen";
               case "14": return "fourteen";
               case "15": return "fifteen";
               case "16": return "sixteen";
               case "17": return "seventeen";
               case "18": return "eighteen";
               case "19": return "nineteen";
            }
         } else {
            var words = "";
   
            if (numString[0] === "2") {
               words = "twenty";
            } else if (numString[0] === "3") {
               words = "thirty";
            } else if (numString[0] === "4") {
               words = "forty";
            } else if (numString[0] === "5") {
               words = "fifty";
            } else if (numString[0] === "6") {
               words = "sixty";
            } else if (numString[0] === "7") {
               words = "seventy";
            } else if (numString[0] === "8") {
               words = "eighty";
            } else {
               words = "ninety";
            }
   
            if (numString[1] !== "0") {
               words += "-" + parseTwoDigit(numString[1]);
            }
   
            return words;
         }
      }
   }

   // takes in object representing tokenized number and returns the number in English
   function tokenToNumberInEnglish(token) {
      var magnitudeMap = {
         "1": "thousand",
         "2": "million",
         "3": "billion",
         "4": "trillion",
         "5": "quadrillion"
      };
      var tripletsInToken = Object.keys(token.digits).length - 1;
      var answer = "";

      // handle negative numbers
      if (token.negative) {
         answer += "negative ";
      }

      // handle non-decimals (the integer component)
      for (var i = tripletsInToken; i >= 0; i--) {
         // inserts "and" when the last triplet is less than 100 and there is more than one triplet of numbers
         if (tripletsInToken > 0 // there is more than one triplet of numbers
         && i === 0 // we are operating on the last triplet
         && Number(token.digits[i]) < 100 // the last triplet is less than 100
         && token.digits[i] !== "000") { // the last triplet is nonzero
            answer += "and ";
         }

         // if triplet is not "000", conver the number to its English equivalent and concatenate that to the answer
         if (token.digits[i] !== "000") {
            answer += parseTriplets(token.digits[i]);
         }
         
         // concatenate the appropriate order of magnitude in English
         if (i !== 0 && token.digits[i] !== "000") {
            answer += ` ${magnitudeMap[i]} `
         }
      }

      // handle decimals
      if (tokens.decimals) {
         answer += " point";

         for (var i = 0; i < tokens.decimals.length; i++) {
            answer += ` ${parseTriplets(tokens.decimals[i])}`;
         }
      }

      return answer.trim();
   }
}