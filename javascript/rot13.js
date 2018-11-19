// https://www.codewars.com/kata/530e15517bc88ac656000716 - 5 kyu

"use strict";

function rot13(message){
    let string = "";

    for (let i = 0; i < message.length; i++) {
        const charCode = message.charCodeAt(i);
        const charCode13 = charCode + 13;

        if (charCode >= 65 && charCode <=90) { // capital A-Z
            if (charCode13 > 90 && charCode13 <= 113) {
                string += String.fromCharCode(charCode13-26);
            } else if (charCode13 <= 90) {
                string += String.fromCharCode(charCode13);
            }
        } else if (charCode >= 97 && charCode <= 122) { // lowercase a-z
            if (charCode13 > 122 && charCode13 <= 135) {
                string += String.fromCharCode(charCode13-26);
            } else if (charCode13 <= 122) {
                string += String.fromCharCode(charCode13);
            }
        } else {
            string += message[i];
        }
    }
    
    return string;
}