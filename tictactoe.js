https://www.codewars.com/kata/525caa5c1bf619d28c000335 - 5 kyu

"use strict";

function isSolved(board) {

    for (let i = 0; i < board.length; i++) {
        // check rows
        if (board[i][0] === 1 && board[i][1] === 1 && board[i][2] === 1) {
            return 1;
        } else if (board[i][0] === 2 && board[i][1] === 2 && board[i][2] === 2) {
            return 2;
        }

        // check columns
        if (board[0][i] === 1 && board[1][i] === 1 && board[2][i] === 1) {
            return 1;
        } else if (board[0][i] === 2 && board[1][i] === 2 && board[2][i] === 2) {
            return 2;
        }
    }

    // check diagonal A
    if (board[0][0] === 1 && board[1][1] === 1 && board[2][2] === 1) {
        return 1;
    } else if (board[0][0] === 2 && board[1][1] === 2 && board[2][2] === 2) {
        return 2;
    }

    // check diagonal B
    if (board[0][2] === 1 && board[1][1] === 1 && board[2][0] === 1) {
        return 1;
    } else if (board[0][2] === 2 && board[1][1] === 2 && board[2][0] === 2) {
        return 2;
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 0) {
                return -1
            }
        }
    }

    return 0;
}

// console.log(isSolved([[2,2,2],[0,1,1],[1,0,0]]));