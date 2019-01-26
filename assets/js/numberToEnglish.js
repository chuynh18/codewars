"use strict";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                     *
 *      This program takes in a number and converts it to English      *
 *    Run it by typing "node numberToEnglish.js <number goes here>"    *
 *  For example, "node numberToEnglish.js 350111204677079341.38547088" *
 *                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function numberToEnglishWrapper(input) {
   var allowedChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
   var containsComma = false;

   if (input.includes(",")) {
      input = input.replace(",", ".");
      containsComma = true;
   }

   for (var i = 0; i < input.length; i++) {
      if (!allowedChars.includes(input[i])) {
         throw new Error(`Input contains invalid character ${input[i]} at position ${i}`);
      }
   }

   input = stripLeadingZeroes(input);

   var answer = numberToEnglish(input);

   if (containsComma) {
      answer = answer.replace("point", "comma");
   }

   return answer;

   function stripLeadingZeroes(n) {
      for (var i = 0; i < n.length; i++) {
         if (n[i] !== "0") {
            return n.slice(i);
         }
      }
   }
}

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
            switch (numString) {
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
      // magnitudeNames holds the short scale names and gets built out through 10 to the 3000 or so
      var magnitudeNames = ["thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion"];
      var prefixes = ["un", "duo", "tre", "quattuor", "quin", "sex", "septen", "octo", "novem"];
      var largeNumNames = [
         "decillion",
         "vigintillion",
         "trigintillion",
         "quadragintillion",
         "quinquagintillion",
         "sexagintillion",
         "septuagintillion",
         "octogintillion",
         "nonagintillion",
      ];
      var veryLargePrefixes = [
         "deci",
         "viginti",
         "triginta",
         "quadraginta",
         "quinquaginta",
         "sexaginta",
         "septuaginta",
         "octoginta",
         "nonaginta"
      ];
      var veryLargeNumNames = [
         "centillion",
         "ducentillion",
         "trecentillion",
         "quadringentillion",
         "quingentillion",
         "sescentillion",
         "septingentillion",
         "octingentillion",
         "nongentillion"
      ];

      for (var i = 0; i < largeNumNames.length; i++) {
         magnitudeNames[magnitudeNames.length] = largeNumNames[i];

         for (var j = 0; j < prefixes.length; j++) {
            magnitudeNames[magnitudeNames.length] = prefixes[j] + largeNumNames[i];
         }
      }

      for (var i = 0; i < veryLargeNumNames.length; i++) {
         magnitudeNames[magnitudeNames.length] = veryLargeNumNames[i];

         for (var j = 0; j < prefixes.length; j++) {
            magnitudeNames[magnitudeNames.length] = prefixes[j] + veryLargeNumNames[i];
         }

         for (var j = 0; j < veryLargePrefixes.length; j++) {
            magnitudeNames[magnitudeNames.length] = veryLargePrefixes[j] + veryLargeNumNames[i];

            for (var k = 0; k < prefixes.length; k++) {
               magnitudeNames[magnitudeNames.length] = prefixes[k] + veryLargePrefixes[j] + veryLargeNumNames[i];
            }
         }
      }

      var tripletsInToken = Object.keys(token.digits).length - 1;
      var answer = "";

      // handle negative numbers
      if (token.negative) {
         answer += "negative ";
      }

      // handle non-decimals (the integer component)
      for (var i = tripletsInToken; i >= 0; i--) {
         // skip triplets that are just "000"
         if (token.digits[i] === "000") {
            continue;
         }

         // inserts "and" when the last triplet is less than 100 and there is more than one triplet of numbers
         if (tripletsInToken > 0 // there is more than one triplet of numbers
            && i === 0 // we are operating on the last triplet
            && Number(token.digits[i]) < 100) { // the last triplet is less than 100
            answer += "and ";
         }

         // conver the number to its English equivalent and concatenate that to the answer
         answer += parseTriplets(token.digits[i]);

         if (i !== 0) {
            // concatenate the appropriate order of magnitude in English
            answer += ` ${magnitudeNames[i - 1]} `
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