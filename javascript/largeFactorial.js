"use strict";

function factorialAsString(a) {
   var answer = String(a);

   while (a > 1) {
      a--;
      answer = multiplyAsString(answer, String(a));
   }

   return answer;
}

function multiplyAsString(a, b) { // positive numbers only!
   a = castNumToString(a);
   b = castNumToString(b);
   var answer;
   var answerPortions = [];
   var counter = 0;
   
   for (var i = b.length - 1; i >= 0; i--) {
      var answerPortion = "";
      var carry = 0;

      for (var j = 0; j < counter; j++) {
         answerPortion += "0";
      }

      counter++;

      if (b[i] === "0") {
         answerPortions[answerPortions.length] = "0";
         continue;
      }

      for (var j = a.length - 1; j >= 0; j--) {
         var operationResult = String((Number(a[j]) * Number(b[i])) + carry);
      
         if (operationResult.length === 1) {
            carry = 0;
            answerPortion = operationResult + answerPortion;
         } else {
            carry = Number(operationResult[0]);
            answerPortion = operationResult[1] + answerPortion;
         }
      }

      if (carry > 0) {
         answerPortion = String(carry) + answerPortion;
      }

      answerPortions[answerPortions.length] = answerPortion;
   }

   answer = answerPortions[0];

   if (answerPortions.length > 1) {
      for (var i = 1; i < answerPortions.length; i++) {
         answer = addAsString(answer, answerPortions[i]);
      }
   }

   return answer;
}

function addAsString(a, b) { // positive numbers only!
   a = castNumToString(a);
   b = castNumToString(b);
   var answer = "";
   var carry = false;

   while (a.length > b.length) {
      b = "0" + b;
   }

   while (b.length > a.length) {
      a = "0" + a;
   }

   for (var i = a.length - 1; i >= 0; i--) {
      var nextDigit = Number(a[i]) + Number(b[i]);

      if (carry) {
         nextDigit++;
         carry = false;
      }

      if (nextDigit > 9) {
         carry = true;
         nextDigit -= 10;
      }

      answer = nextDigit + answer;
   }

   if (carry) {
      answer = "1" + answer;
   }

   return answer;
}

function castNumToString(a) {
   if (typeof a === "number") {
      var answer = String(a);

      console.log(`${a} was passed as a number; casting to string.`);

      if (a >= Number.MAX_SAFE_INTEGER) {
         console.log("Warning:  The answer you get will almost certainly be imprecise (read:  incorrect).  Please re-invoke the add function with strings as arguments.");
      }

      return answer;
   }

   return a;
}