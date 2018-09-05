// https://www.codewars.com/kata/evaluate-mathematical-expression - 2 kyu

// NO REGEX, BABY!!!!!!!!!!!!!!!!!!!!!!!

"use strict";

const calc = function(input) {
    // ==== remove all spaces ====
    let noSpace = "";
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== " ") {
            noSpace += input[i];
        }
    }

    // ==== simplify negative numbers as appropriate ====
    // converts "--", "+-", "-+" as appropriate
    // also converts "/+" and "*+" which may result after one pass of simplify()
    const simplify = function(input) {
        let output = "";
        for (let i = 0; i < input.length; i++) {
            if (input[i] === "-" && input[i+1] === "-") {
                // "--" to "+"
                output += "+";
                i++;
            } else if (input[i] === "+" && input[i+1] === "-") {
                // "+-" to "-"
                output += "-";
                i++;
            } else if (input[i] === "-" && input[i+1] === "+") {
                // "-+" to "-", but I don't think this will ever happen?
                output += "-";
                i++;
            } else if (input[i] === "/" && input[i+1] === "+") {
                output += "/";
                i++;
            } else if (input[i] === "*" && input[i+1] === "+") {
                output += "*";
                i++;
            } else {
                output += input[i];
            }
        }

        return output;
    }

    let simplified = simplify(noSpace);

    // ==== find and parse all parenthesis ====
    let parenthesisDepth = 0;
    let maxDepthFound = 0;
    const parenthesisIndices = [];

    const findParenthesis = function() {
        parenthesisIndices.length = 0;

        for (let i = 0; i < simplified.length; i++) {
            if (simplified[i] === "(") {
                parenthesisIndices[parenthesisIndices.length] = {"depth": parenthesisDepth, "start": i};
                parenthesisDepth++;
                if (maxDepthFound < parenthesisDepth) {
                    maxDepthFound = parenthesisDepth;
                }
            } else if (simplified[i] === ")") {
                parenthesisDepth--;
    
                for (let j = parenthesisIndices.length - 1; j >= 0; j--) {
                    if (parenthesisIndices[j].depth === parenthesisDepth) {
                        parenthesisIndices[j].end = i;
                        break;
                    }
                }
            }
        }
    
        maxDepthFound--;
    }
    
    findParenthesis();

    // ==== evaluate ====
    
    // "split" expression into operands and operators.  The argument "input" should be characters contained within "(" and ")".
    // typeof input === "string"
    const split = function(input) {
        const output = [];
        let lastMatchedIndex = 0;

        for (let i = 0; i < input.length; i++) {
            if (input[i] === "+" || input[i] === "-" && !(input[i-1] === "*" || input[i-1] === "/") || input[i] === "*" || input[i] === "/") {
                output[output.length] = Number(input.slice(lastMatchedIndex, i));
                output[output.length] = input[i];
                lastMatchedIndex = i + 1;
            }
        }

        output[output.length] = Number(input.slice(lastMatchedIndex));

        return output;
    }

    // ==== expression evaluator function repurposed from a previous kata ====
    // this actually performs the math
    // its input is an array of operands and operators
    const calculator = function(array) {
        const calc = {
            num1: null,
            op: null,
            num2: null,
            num1FromCalculation: false,
            firstPass: [],
            secondPass: []
        }
    
        const isOperator = function(input) {
            if (input === "+" || input === "-") {
                return 1;
            } else if (input === "/" || input === "*") {
                return 2;
            } else {
                return 0;
            }
        }
    
        const multipassCalc = function(passNum) {
            calc.num1 = null;
            calc.op = null;
            calc.num2 = null;
            calc.num1FromCalculation = false;
    
            if (typeof passNum === "undefined") {
                passNum = 1;
            }
                
            for (let i = 0; i < array.length; i++) {
                if (i === array.length - 1 && calc.op === null) {
                    if (passNum === 2) {
                        calc.secondPass[calc.secondPass.length] = array[i];
                    } else {
                        calc.firstPass[calc.firstPass.length] = array[i];
                    }
                } else if (calc.num1 === null && isOperator(array[i]) === 0) {
                    calc.num1 = array[i];
                    calc.num1FromCalculation = false;
                } else if (calc.num1 !== null && calc.op === null) {
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
                    calc.num2 = array[i];
                }
        
                if (calc.num1 !== null && calc.op !== null && calc.num2 !== null) {
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
            }
    
            if (passNum === 1) {
                array = [...calc.firstPass];
            }
        }
    
        multipassCalc(1);
        multipassCalc(2);
    
        return calc.secondPass[calc.secondPass.length-1];
    };

    // ==== iteratively evaluate our input expression until we have the answer ====
    let currentWorkingDepth = maxDepthFound;

    while (parenthesisIndices.length > 0) {
        // iterate through parenthesis indices and pull out the furthest nested mathematical expressions first
        // max depth found lives in:  maxDepthFound
        // list of mathematical expressions enclosed in parenthesis lives in:  parenthesisIndices

        let depthDepleted = true;

        for (let i = 0; i < parenthesisIndices.length; i++) {
            if (parenthesisIndices[i].depth === currentWorkingDepth) {
                depthDepleted = false;

                let expressionAnswer = calculator(split(simplified.slice(parenthesisIndices[i].start+1, parenthesisIndices[i].end)));

                simplified = simplified.replace(simplified.slice(parenthesisIndices[i].start, parenthesisIndices[i].end+1), expressionAnswer);

                simplified = simplify(simplified);

                // 2nd pass is necessary because...
                // simplify('3/-(-3)') === '3/+3'
                // simplify('3/+3') === '3/3'
                simplified = simplify(simplified);

                findParenthesis();

                break;
            }
        }

        if (depthDepleted) {
            currentWorkingDepth--;
        }

    }

    // after the while loop, we're left with a mathematical expression without any parenthesis
    // so we return the result of one last calculation, which is our answer
    return calculator(split(simplified));
}