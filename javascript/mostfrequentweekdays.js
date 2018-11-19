// https://www.codewars.com/kata/56eb16655250549e4b0013f4 - 6 kyu

"use strict";

// January 1, 1 AD was a Monday; we'll calculate everything relative to 1 AD

function mostFrequentDays(year) {
    // returns days in a given year
    const daysInYear = function(input) {
        if (input % 400 === 0) { // years divisible by 400 are leap years
            return 366;
        } else if (input % 100 === 0) { // years divisible by 100 (but not 400) are not leap years
            return 365;
        } else if (input % 4 === 0) { // years divisible by 4 are leap years (exceptions handled above)
            return 366;
        } else { // all other years
            return 365;
        }
    }

    // array used to hold the names of the days of the week
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // holds number of days between Jan 1, 1 AD and beginning of input year
    let days = 0;

    // # of days in our target year
    const daysInTargetYear = daysInYear(year);

    // calculates # of days between Jan 1, 1 AD and beginning of target year, stores that in days variable
    for (var i = 1; i < year; i++) {
        days += daysInYear(i);
    }

    // holds start day of target year
    const startingDay = days % 7;

    // return the answer (leap of logic is because 365 % 7 === 1, 366 % 7 === 2)
    // get it?  "leap"
    if (daysInTargetYear === 366) {
        if (startingDay === 6) {
            return [dayNames[0], dayNames[6]];
        } else {
            return [dayNames[startingDay], dayNames[startingDay + 1]];
        }
    } else {
        return [dayNames[startingDay]];
    }
}