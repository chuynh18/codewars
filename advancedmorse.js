// https://www.codewars.com/kata/54b72c16cd7f5154e9000457 4 kyu

var decodeBits = function(bits){
    console.log(bits);

    // trim the message
    let messageHasStarted = false;
    const indices = [];

    for (let i = 0; i < bits.length; i++) {
        if (!messageHasStarted && bits[i] == 1) {
            // console.log("found start");
            messageHasStarted = true;
            indices[indices.length] = i;
        } else if (messageHasStarted && bits[i] == 1) {
            indices[1] = i+1;
            // console.log(`new end found:  ${i+1}`);
        }
    }

    console.log(indices);

    const trimmed = bits.slice(indices[0], indices[1]);

    console.log(trimmed);
    
    // figure out the "speed" of the message by counting the longest sequence of 1s
    let longestSequence = 0;
    let currentSequence = 0;
    let longest0 = 0;
    let current0 = 0;

    for (let i = 0; i < trimmed.length; i++) {
        if (trimmed[i] == 1) {
            currentSequence++;
            if (currentSequence > longestSequence) {
                longestSequence = currentSequence;
            }
        } else {
            currentSequence = 0;
        }

        if (trimmed[i] == 0) {
            current0++;
            if (current0 > longest0) {
                longest0 = current0;
            }
        } else {
            current0 = 0;
        }
    }

    console.log("longestSequence: ", longestSequence);

    let deduped = "";

    if (longestSequence > 3 && longestSequence % 3 === 0) {
        for (let i = 0; i < trimmed.length; i += longestSequence/3) {
            deduped += trimmed[i];
        }
    } else if (longestSequence === longest0 || longest0 === 0) {
        for (let i = 0; i < trimmed.length; i += longestSequence) {
            deduped += trimmed[i];
        }
    } else {
        deduped = trimmed;
    }
    
    console.log(deduped);

    console.log(deduped
    .replace(/1110/g, "-")
    .replace(/10/g, ".")
    .replace(/000000/g, "   ")
    .replace(/00/g, " ")
    .replace("111", "-")
    .replace("1", "."));

    return (deduped
    .replace(/1110/g, "-")
    .replace(/10/g, ".")
    .replace(/000000/g, "   ")
    .replace(/00/g, " ")
    .replace("111", "-")
    .replace("1", "."));
}

// from https://www.codewars.com/kata/54b724efac3d5402db00065e 6 kyu
decodeMorse = function(morseCode){
    const wordsArray = morseCode.trim().split("   ");
    const words = {};
    let output = "";

    for (let i = 0; i < wordsArray.length; i++) {
        words[i] = wordsArray[i].split(" ");
    }

    for (let i = 0; i < wordsArray.length; i++) {
        for (let j = 0; j < words[i].length; j++) {
            output += MORSE_CODE[`${words[i][j]}`];
        }

        output += " ";
    }

    return output.trim();
}

decodeBits('1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011');