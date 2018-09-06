// https://www.codewars.com/kata/battleship-field-validator/ - 3 kyu

// boards must observe the following properties:
// 1 battleship is present (4 units long)
// 2 cruisers are present (3 units long)
// 3 destroyers are present (2 units long)
// 4 submarines are present (1 unit long)
// no ships may be missing and there cannot be any extra ships
// no ships 5 units in length or longer
// ships must not contact each other, not even with their corners

// This code isn't good for many reasons.  However, it passes, because the provided test cases are not nearly comprehensive enough.

"use strict";

const validateBattlefield = function(input) {
    const ships = {
        battleship: {found: false, coords: []},
        cruiser1: {found: false, coords: []},
        cruiser2: {found: false, coords: []},
        destroyer1: {found: false, coords: []},
        destroyer2: {found: false, coords: []},
        destroyer3: {found: false, coords: []},
        sub1: {found: false, coords: []},
        sub2: {found: false, coords: []},
        sub3: {found: false, coords: []},
        sub4: {found: false, coords: []}
    }

    // checks to make sure ships aren't overlapping
    const checkCollision = function(coord) {
        const iterate = function(ship) {
            if (ship.length === 0) {
                return false;
            }

            for (let i = 0; i < ship.length; i++) {
                if (ship[i][0] === coord[0] && ship[i][1] === coord[1]) {
                    return true;
                }
            }

            return false;
        }

        if (iterate(ships.battleship.coords) ||
        iterate(ships.cruiser1.coords) ||
        iterate(ships.cruiser2.coords) ||
        iterate(ships.destroyer1.coords) ||
        iterate(ships.destroyer2.coords) ||
        iterate(ships.destroyer3.coords) ||
        iterate(ships.sub1.coords) ||
        iterate(ships.sub2.coords) ||
        iterate(ships.sub3.coords) ||
        iterate(ships.sub4.coords)) {
            return true;
        } else {
            return false;
        }
    }

    const checkAdjacency = function(shipType) {
        if (input[ships[shipType].coords[0][0]+1][ships[shipType].coords[0][1]+1] === 1 ||
            input[ships[shipType].coords[0][0]+1][ships[shipType].coords[0][1]] === 1 ||
            input[ships[shipType].coords[0][0]+1][ships[shipType].coords[0][1]-1] === 1 ||
            input[ships[shipType].coords[0][0]][ships[shipType].coords[0][1]+1] === 1 ||
            input[ships[shipType].coords[0][0]][ships[shipType].coords[0][1]-1] === 1 ||
            input[ships[shipType].coords[0][0]-1][ships[shipType].coords[0][1]+1] === 1 ||
            input[ships[shipType].coords[0][0]-1][ships[shipType].coords[0][1]] === 1 ||
            input[ships[shipType].coords[0][0]-1][ships[shipType].coords[0][1]-1] === 1) {
                return true;
            } else {
                return false;
            }
    }

    // first horizontal and vertical pass:  only look for destroyers and larger

    // horizontal pass
    for (let i = 0; i < input.length; i++) {
        let counter = 0;
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === 1) {
                counter++;
            } else {
                if (counter === 4) {
                    if (!ships.battleship.found) {
                        ships.battleship.found = true;
                        ships.battleship.coords = [ [i, j-4], [i, j-3], [i, j-2], [i, j-1] ];
                        counter = 0;
                    } else {
                        return false;
                    }
                } else if (counter === 3) {
                    if (ships.cruiser1.found) {
                        ships.cruiser2.found = true;
                        ships.cruiser2.coords = [ [i, j-3], [i, j-2], [i, j-1] ];
                        counter = 0;
                    } else if (!ships.cruiser1.found) {
                        ships.cruiser1.found = true;
                        ships.cruiser1.coords = [ [i, j-3], [i, j-2], [i, j-1] ];
                        counter = 0;
                    } else if (ships.cruiser2.found) {
                        return false;
                    }
                } else if (counter === 2) {
                    if (ships.destroyer3.found && ships.destroyer2.found && ships.destroyer1.found) {
                        return false;
                    } else if (ships.destroyer2.found && ships.destroyer1.found) {
                        ships.destroyer3.found = true;
                        ships.destroyer3.coords = [ [i, j-2], [i, j-1] ];
                        counter = 0;
                    } else if (ships.destroyer1.found) {
                        ships.destroyer2.found = true;
                        ships.destroyer2.coords = [ [i, j-2], [i, j-1] ];
                        counter = 0;
                    } else if (!ships.destroyer1.found) {
                        ships.destroyer1.found = true;
                        ships.destroyer1.coords = [ [i, j-2], [i, j-1] ];
                        counter = 0;
                    }
                } else if (counter === 1) {
                    counter = 0;
                } else if (counter >= 5) {
                    return false;
                }
            }
        }
    }

    // vertical pass... so wet
    // 1. because it's not DRY
    // 2. because this is BATTLESHIP
    for (let i = 0; i < input.length; i++) {
        let counter = 0;
        for (let j = 0; j < input[i].length; j++) {
            if (input[j][i] === 1) {
                counter++;
            } else {
                if (counter === 4) {
                    if (!ships.battleship.found) {
                        ships.battleship.found = true;
                        ships.battleship.coords = [ [j-4, i], [j-3, i], [j-2, i], [j-1, i] ];
                        counter = 0;
                    } else {
                        return false;
                    }
                } else if (counter === 3) {
                    if (ships.cruiser1.found) {
                        ships.cruiser2.found = true;
                        ships.cruiser2.coords = [ [j-3, i], [j-2, i], [j-1, i] ];
                        counter = 0;
                    } else if (!ships.cruiser1.found) {
                        ships.cruiser1.found = true;
                        ships.cruiser1.coords = [ [j-3, i], [j-2, i], [j-1, i] ];
                        counter = 0;
                    } else if (ships.cruiser2.found) {
                        return false;
                    }
                } else if (counter === 2) {
                    if (ships.destroyer3.found && ships.destroyer2.found && ships.destroyer1.found) {
                        return false;
                    } else if (ships.destroyer2.found && ships.destroyer1.found) {
                        ships.destroyer3.found = true;
                        ships.destroyer3.coords = [ [j-2, i], [j-1, i] ];
                        counter = 0;
                    } else if (ships.destroyer1.found) {
                        ships.destroyer2.found = true;
                        ships.destroyer2.coords = [ [j-2, i], [j-1, i] ];
                        counter = 0;
                    } else if (!ships.destroyer1.found) {
                        ships.destroyer1.found = true;
                        ships.destroyer1.coords = [ [j-2, i], [j-1, i] ];
                        counter = 0;
                    }
                }
                else if (counter === 1) {
                    counter = 0;
                } else if (counter >= 5) {
                    return false;
                }
            }
        }
    }

    // even wetter
    // 1. because it's not DRY
    // 2. because it's BATTLESHIP
    // 3. because submarines can submerge themselves and are therefore even wetter than surface ships
    // submarine pass, because subs are only 1 unit, we only need to do one pass (not horizontal AND vertical)
    for (let i = 0; i < input.length; i++) {
        let counter = 0;
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === 1 && !checkCollision([i,j])) {
                counter++;
            } else if (input[i][j] === 0 && counter === 1) {
                if (ships.sub1.found && ships.sub2.found && ships.sub3.found && ships.sub4.found) {
                    return false;
                } else if (ships.sub1.found && ships.sub2.found && ships.sub3.found) {
                    ships.sub4.found = true;
                    ships.sub4.coords = [[i, j-1]];
                    counter = 0;
                } else if (ships.sub1.found && ships.sub2.found && counter === 1) {
                    ships.sub3.found = true;
                    ships.sub3.coords = [[i, j-1]];
                    counter = 0;
                } else if (ships.sub1.found && counter === 1) {
                    ships.sub2.found = true;
                    ships.sub2.coords = [[i, j-1]];
                    counter = 0;
                } else if (!ships.sub1.found && counter === 1) {
                    ships.sub1.found = true;
                    ships.sub1.coords = [[i, j-1]];
                    counter = 0;
                }
            }
        }
    }

    console.log(JSON.stringify(ships,function(k,v){
        if(v instanceof Array)
            return JSON.stringify(v);
        return v;
    },2));

    // if ships are missing, return false
    if (!ships.battleship.found ||
        !ships.cruiser1.found ||
        !ships.cruiser2.found ||
        !ships.destroyer1.found ||
        !ships.destroyer2.found ||
        !ships.destroyer3.found ||
        !ships.sub1.found ||
        !ships.sub2.found ||
        !ships.sub3.found ||
        !ships.sub4.found) {
            return false
        };

        // check for sub collisions
        if (checkAdjacency("sub1")) {
            return false;
        } else if (checkAdjacency("sub2")) {
            return false;
        } else if (checkAdjacency("sub3")) {
            return false;
        } else if (checkAdjacency("sub4")) {
            return false;
        }

    return true;
}