// https://www.codewars.com/kata/range-extraction/ - 4 kyu

"use strict";

function solution(list){
   const newList = [];

   for (let i = 0; i < list.length; i++) {
      let count = 0;
      for (let j = i; j < list.length; j++) {
         if (j < list.length - 1 && list[j] + 1 === list[j+1]) {
            count++;
         } else {
            if (!count) { // heheh falsy
               newList[newList.length] = String(list[i]);
            } else if (count === 1) {
               newList[newList.length] = String(list[i]);
               newList[newList.length] = String(list[i+1]);
               i++;
            } else {
               newList[newList.length] = `${list[i]}-${list[i+count]}`;
               i += count;
            }
            break;
         }
      }
   }

   return newList.join(",");
}