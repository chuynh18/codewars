"use strict";

const theLift = function(queues, capacity) {
    const floors = queues.length;
    const output = [0]; // floors the lift stopped at
    let lastStop; // variable used to hold the last floor we stopped at so we can continue our iteration at the same floor

    const liftIteration = function(input) {
        const lift = [];
        let lastFloor;
        // going up
        for (let i = input; i < floors; i++) {
            let stopped = false;

            // unload first before loading
            for (let j = 0; j < lift.length; j++) {
                if (lift[j] === i) {
                    queues[i][queues[i].length] = lift[j];
                    lift.splice(j, 1);
                    j--;
                    stopped = true;
                }
            }

            // load
            for (let j = 0; j < queues[i].length; j++) {
                if (queues[i][j] > i) {
                    if (lift.length < capacity) {
                        lift[lift.length] = queues[i][j];
                        queues[i].splice(j, 1);
                        j--;
                    }
                    stopped = true;
                }
            }

            // if there are no more passengers above, the elevator should reverse course and go down
            let morePassengersAbove = false;
            for (let j = i+1; j < floors; j++) {
                if (queues[j].length > 0) {
                    morePassengersAbove = true;
                    break;
                }
            }

            // record that we made a stop (don't record if the last stop was the same floor)
            if (stopped && output[output.length - 1] !== i) {
                output[output.length] = i;
            }

            // stop the for loop if there are no more passengers above and the elevator is empty
            if (!morePassengersAbove && lift.length === 0) {
                lastFloor = i;
                break;
            }
        }

        // going down
        for (let i = lastFloor; i >= 0; i--) {
            let stopped = false;

            // unload first before loading
            for (let j = 0; j < lift.length; j++) {
                if (lift[j] === i) {
                    queues[i][queues[i].length] = lift[j];
                    lift.splice(j, 1);
                    j--;
                    stopped = true;
                }
            }

            // load
            for (let j = 0; j < queues[i].length; j++) {
                if (queues[i][j] < i) {
                    if (lift.length < capacity) {
                        lift[lift.length] = queues[i][j];
                        queues[i].splice(j, 1);
                        j--;
                    }
                    stopped = true;
                }
            }

            // if there are no more passengers below, the elevator should reverse course and go up
            let morePassengersBelow = false;
            for (let j = i-1; j >= 0; j--) {
                if (queues[j].length > 0) {
                    morePassengersBelow = true;
                    break;
                }
            }

            // record that we made a stop (don't record if the last stop was the same floor)
            if (stopped && output[output.length - 1] !== i) {
                output[output.length] = i;
            }

            // stop the for loop if there are no more passengers below and the elevator is empty
            if (!morePassengersBelow && lift.length === 0) {
                lastStop = i;
            }
        }
    }

    // returns false if more passengers are still waiting to go to their destination, otherwise return true
    const checkCompletion = function() {
        for (let i = 0; i < floors; i++) {
            for (let j = 0; j < queues[i].length; j++) {
                if (queues[i][j] !== i) {
                    return false;
                }
            }
        }

        return true;
    }

    liftIteration(0); // elevator starts on the ground floor

    // elevator keeps moving as long as there are passengers
    while (!checkCompletion()) {
        liftIteration(lastStop);
    }

    // if necessary, return to the ground floor
    if (output[output.length-1] !== 0) {
        output[output.length] = 0;
    }

    // if our output array begins [0, 0...], change it to [0...]
    if (output[0] === output[1]) {
        output.shift();
    }
    
    return output;
}