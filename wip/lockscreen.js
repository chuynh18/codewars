"use strict";

const countPatternsFrom = function(firstPoint, length) {
    const validMoves = {
        "A": ["B", "D", "E", "F", "H"],
        "B": ["A", "C", "D", "E", "F", "G", "I"],
        "C": ["B", "D", "E", "F", "H"],
        "D": ["A", "B", "C", "E", "G", "H", "I"],
        "E": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
        "F": ["A", "B", "C", "E", "G", "H", "I"],
        "G": ["B", "D", "E", "F", "H"],
        "H": ["A", "C", "D", "E", "F", "G", "I"],
        "I": ["B", "D", "E", "F", "H"]
    };

    
}