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

const parseNumberToEnglish = function() {
   var number = document.getElementById("numToEng").value;
   if (number === "") {
      document.getElementById("numToEngResult").textContent = "";
   } else {
      document.getElementById("numToEngResult").textContent = numberToEnglishWrapper(number);
   }
}

// makes page automatically parse numbers as they're typed in (also performs user input validation and correction)
document.getElementById("numToEng").addEventListener("keyup", function(event) {
   document.getElementById("numToEng").value = allowedChars(document.getElementById("numToEng").value, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","]);
   document.getElementById("numToEng").value = filterMultipleDecimals(document.getElementById("numToEng").value);

   var input = document.getElementById("numToEng").value;

   if (input.includes(".")) {
      input = input.split(".");
   } else if (input.includes(",")) {
      input = input.split(",");
   }

   if (typeof input === "string") {
      input = [input];
   }

   if (input[0].length > 3003) {
      document.getElementById("numToEngWarn").textContent = "Warning, the number you've typed in is too large.";
   } else {
      document.getElementById("numToEngWarn").textContent = "";
      parseNumberToEnglish();
   }
});

// allows numbers to be passed in directly from the URL
var numberFromURL;
if (window.location.href.includes("?num=")) {
   numberFromURL = window.location.href.split("?num=")[1];
   numberFromURL = allowedChars(numberFromURL, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","]);
   numberFromURL = filterMultipleDecimals(numberFromURL);
   document.getElementById("numToEng").value = numberFromURL;
   parseNumberToEnglish();
}

document.getElementById("numToEngResult").textContent = "";