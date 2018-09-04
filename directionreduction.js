// https://www.codewars.com/kata/550f22f4d758534c1100025a - 5 kyu

"use strict";

function dirReduc(arr){
    const answer = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "NORTH" && answer[answer.length-1] === "SOUTH" || arr[i] === "SOUTH" && answer[answer.length-1] === "NORTH" || arr[i] === "WEST" && answer[answer.length-1] === "EAST" || arr[i] === "EAST" && answer[answer.length-1] === "WEST") {
            if (answer.length > 0) {
                answer.length--;
            }
        } else {
            answer[answer.length] = arr[i];
        }
    }

    return answer;
}