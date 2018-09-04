// https://www.codewars.com/kata/55aa075506463dac6600010d - 5 kyu

"use strict";

function listSquared(m, n) {
    const answer = [];

    for (let i = m; i <= n; i++) {
        const divisors = [];
        let sum = 0;

        for (let j = 1; j <= i; j++) {
            if (i % j === 0) {
                divisors[divisors.length] = j;
            }
        }

        for (let j = 0; j < divisors.length; j++) {
            sum += divisors[j] * divisors[j];
        }

        if (Math.sqrt(sum) % 1 === 0) {
            answer[answer.length] = [i, sum];
        }
    }

    return answer;
}