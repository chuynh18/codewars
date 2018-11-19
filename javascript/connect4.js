// https://www.codewars.com/kata/56882731514ec3ec3d000009 - 4 kyu

"use strict";

function whoIsWinner(piecesPositionList){
    console.log(piecesPositionList);
    const board = [
        [0,0,0,0,0,0], // column 0
        [0,0,0,0,0,0], // column 1
        [0,0,0,0,0,0], // column 2
        [0,0,0,0,0,0], // column 3
        [0,0,0,0,0,0], // column 4
        [0,0,0,0,0,0], // column 5
        [0,0,0,0,0,0]  // column 6
    ];

    const modifyBoard = function(input, player) {
        const modifyColumn = function(index, player) {
            for (let i = 0; i < board[index].length; i++) {
                if (board[index][i] === 0) {
                    board[index][i] = player;
                    break;
                }
            }
        }
        if (input[0] === "A") {
            modifyColumn(0, player);
        } else if (input[0] === "B") {
            modifyColumn(1, player);
        } else if (input[0] === "C") {
            modifyColumn(2, player);
        } else if (input[0] === "D") {
            modifyColumn(3, player);
        } else if (input[0] === "E") {
            modifyColumn(4, player);
        } else if (input[0] === "F") {
            modifyColumn(5, player);
        } else if (input[0] === "G") {
            modifyColumn(6, player);
        }
    }

    const checkWinner = function() {
        // check columns
        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= board[0].length; j++) {
                if (board[i][j] === 1 && board[i+1][j] === 1 && board[i+2][j] === 1 && board[i+3][j] === 1) {
                    return 1;
                } else if (board[i][j] === 2 && board[i+1][j] === 2 && board[i+2][j] === 2 && board[i+3][j] === 2) {
                    return 2;
                }
            }
        }

        // check rows
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j <= 2; j++) {
                if (board[i][j] === 1 && board[i][j+1] === 1 && board[i][j+2] === 1 && board[i][j+3] === 1) {
                    return 1;
                } else if (board[i][j] === 2 && board[i][j+1] === 2 && board[i][j+2] === 2 && board[i][j+3] === 2) {
                    return 2;
                }
            }
        }

        // check diagonal 1
        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 2; j++) {
                if (board[i][j] === 1 && board[i+1][j+1] === 1 && board[i+2][j+2] === 1 && board[i+3][j+3] === 1) {
                    return 1;
                } else if (board[i][j] === 2 && board[i+1][j+1] === 2 && board[i+2][j+2] === 2 && board[i+3][j+3] === 2) {
                    return 2;
                }
            }
        }

        // check diagonal 2
        for (let i = 0; i <= 3; i++) {
            for (let j = 3; j <= 5; j++) {
                if (board[i][j] === 1 && board[i+1][j-1] === 1 && board[i+2][j-2] === 1 && board[i+3][j-3] === 1) {
                    return 1;
                } else if (board[i][j] === 2 && board[i+1][j-1] === 2 && board[i+2][j-2] === 2 && board[i+3][j-3] === 2) {
                    return 2;
                }
            }
        }
    }

    for (let i = 0; i < piecesPositionList.length; i++) {
        if (i % 2 === 0) {
            modifyBoard(piecesPositionList[i], 1);
            console.log(board);
            if (checkWinner()) {
                if (piecesPositionList[0][2] === "R") {
                    return "Red";
                } else {
                    return "Yellow";
                }
            }
        } else {
            modifyBoard(piecesPositionList[i], 2);
            console.log(board);
            if (checkWinner()) {
                if (piecesPositionList[0][2] === "R") {
                    return "Yellow";
                } else {
                    return "Red";
                }
            }
        }
    }

    return "Draw";
}

// console.log(whoIsWinner([ 'C_Red',
// 'D_Yellow',
// 'D_Red',
// 'G_Yellow',
// 'B_Red',
// 'D_Yellow',
// 'D_Red',
// 'C_Yellow',
// 'G_Red',
// 'A_Yellow',
// 'B_Red',
// 'A_Yellow',
// 'E_Red',
// 'E_Yellow',
// 'A_Red',
// 'C_Yellow',
// 'B_Red',
// 'G_Yellow',
// 'F_Red',
// 'B_Yellow',
// 'E_Red',
// 'B_Yellow',
// 'D_Red',
// 'C_Yellow',
// 'B_Red' ]));