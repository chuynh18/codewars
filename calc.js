// https://www.codewars.com/kata/5235c913397cbf2508000048 3 kyu

// this definitely pushed my limits, which is why the code below
// is a FEMA-certified disaster zone

// thanks for making it so the provided string has spaces between
// the operators and operands...  can just string.split(" ")

"use strict";

const Calculator = function() {
    this.evaluate = evaluate => {
        // console.log(evaluate);

        const isOperator = function(input) {
            if (input === "+" || input === "-") {
                return 1;
            } else if (input === "/" || input === "*") {
                return 2;
            } else {
                return 0;
            }
        }
    
        let array = evaluate.split(" ");
        // console.log(array);
    
        if (array.length === 1) {
            return array[0];
        }
    
        const calc = {
            num1: null,
            op: null,
            num2: null,
            num1FromCalculation: false,
            firstPass: [],
            secondPass: []
        }
    
        const multipassCalc = function(passNum) {
            calc.num1 = null;
            calc.op = null;
            calc.num2 = null;
            calc.num1FromCalculation = false;

            if (typeof passNum === "undefined") {
                passNum = 1;
            }
    
            // console.log(`Pass number ${passNum}`);
            
            for (let i = 0; i < array.length; i++) {
                if (i === array.length - 1 && calc.op === null) {
                    // console.log(`${i}:  1st branch; array[i] is "${array[i]}"`);
                    if (passNum === 2) {
                        calc.secondPass[calc.secondPass.length] = array[i];
                    } else {
                        calc.firstPass[calc.firstPass.length] = array[i];
                    }
                } else if (calc.num1 === null && isOperator(array[i]) === 0) {
                    // console.log(`${i}:  2nd branch; array[i] is "${array[i]}"`);
                    calc.num1 = array[i];
                    calc.num1FromCalculation = false;
                } else if (calc.num1 !== null && calc.op === null) {
                    // console.log(`${i}:  3rd branch; array[i] is "${array[i]}"`);
                    if (isOperator(array[i]) === 2) {
                        calc.op = array[i];
                    } else if (passNum === 1 && isOperator(array[i]) === 1) {
                        if (!calc.num1FromCalculation) {
                            calc.firstPass[calc.firstPass.length] = calc.num1;
                            calc.firstPass[calc.firstPass.length] = array[i];
                        } else {
                            calc.firstPass[calc.firstPass.length] = array[i];
                        }
        
                        calc.num1 = null;
                    } else if (passNum === 2 && isOperator(array[i]) === 1) {
                        calc.op = array[i];
                    }
                } else if (calc.op !== null && isOperator(array[i]) === 0) {
                    // console.log(`${i}:  4th branch; array[i] is "${array[i]}"`);
                    calc.num2 = array[i];
                }
        
                if (calc.num1 !== null && calc.op !== null && calc.num2 !== null) {
                    // console.log(`Calculating "${calc.num1} ${calc.op} ${calc.num2}"`)
                    if (calc.op === "*") {
                        const result = calc.num1 * calc.num2;
                        if (passNum === 2) {
                            if (calc.num1FromCalculation) {
                                calc.secondPass[calc.secondPass.length-1] = result;
                            } else if (!calc.num1FromCalculation) {
                                calc.secondPass[calc.secondPass.length] = result;
                            }
                        } else {
                            if (calc.num1FromCalculation) {
                                calc.firstPass[calc.firstPass.length-1] = result;
                            } else if (!calc.num1FromCalculation) {
                                calc.firstPass[calc.firstPass.length] = result;
                            }
                        }
                        calc.num1 = result;
                        calc.num1FromCalculation = true;
                    } else if (calc.op === "/") {
                        const result = calc.num1 / calc.num2;
                        if (passNum === 2) {
                            if (calc.num1FromCalculation) {
                                calc.secondPass[calc.secondPass.length-1] = result;
                            } else if (!calc.num1FromCalculation) {
                                calc.secondPass[calc.secondPass.length] = result;
                            }
                        } else {
                            if (calc.num1FromCalculation) {
                                calc.firstPass[calc.firstPass.length-1] = result;
                            } else if (!calc.num1FromCalculation) {
                                calc.firstPass[calc.firstPass.length] = result;
                            }
                        }
                        calc.num1 = result;
                        calc.num1FromCalculation = true;
                    } else if (calc.op === "+" && passNum === 2) {
                        const result = parseFloat(calc.num1) + parseFloat(calc.num2);
                        if (calc.num1FromCalculation) {
                            calc.secondPass[calc.secondPass.length-1] = result;
                        } else if (!calc.num1FromCalculation) {
                            calc.secondPass[calc.secondPass.length] = result;
                        }
                        calc.num1 = result;
                        calc.num1FromCalculation = true;
                    } else if (calc.op === "-" && passNum === 2) {
                        const result = calc.num1 - calc.num2;
                        if (calc.num1FromCalculation) {
                            calc.secondPass[calc.secondPass.length-1] = result;
                        } else if (!calc.num1FromCalculation) {
                            calc.secondPass[calc.secondPass.length] = result;
                        }
                        calc.num1 = result;
                        calc.num1FromCalculation = true;
                    }
        
                    calc.op = null;
                    calc.num2 = null;
                }
        
                // console.log(calc);
                // console.log();
            }
    
            if (passNum === 1) {
                // console.log(`end of first pass, setting array to calc.firstPass`);
                array = [...calc.firstPass];
                // console.log(`array: ${array}`);
            }
        }
    
        multipassCalc(1);
        multipassCalc(2);
    
        return calc.secondPass[calc.secondPass.length-1];
    }
};

const calculate = new Calculator();

// calculate.evaluate("2 + 3 * 4 / 3 - 6 / 3 * 3 + 8"); // 8
// calculate.evaluate("2 / 2 + 3 * 4 - 6"); // 7
// calculate.evaluate("2 + 3"); // 5
// calculate.evaluate("60 / 54 * 97 * 74 * 94 / 33 * 65 / 48 + 32 / 52 * 17 * 93 * 53 / 48 - 16 + 9 - 46 - 95 - 92 * 31 * 12 + 38 / 22 / 40 * 45 + 17 - 65 - 57 - 41 * 44 - 22 - 23 + 53 / 7 + 15 - 6 * 21 / 38 - 87 * 70 + 60 / 20 / 7 - 93 * 56 / 52 - 80 / 67 * 7 * 23") // -10848.20029388119
// calculate.evaluate("6 + 53 * 76"); // 4034