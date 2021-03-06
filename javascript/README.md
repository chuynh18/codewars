CodeWars solutions (and code fragments)
=======================================

This is where I post my CodeWars kata solutions.  Supporting code (mainly just code fragments I wrote to quickly test program subroutines) can be found inside folders.  Kata solutions just live at the root level.

My CodeWars profile:  [https://www.codewars.com/users/chuynh18/completed](https://www.codewars.com/users/chuynh18/completed)

* [advancedmorse.js](https://www.codewars.com/kata/54b72c16cd7f5154e9000457) - 4 kyu
    * A lot of hacky conditionals in my solution.  If the test cases were more expansive, I would probably need to rethink my approach.
* [battleship.js](https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7/) - 3 kyu
    * My solution consists of poor code due to lots of repetition.  It also isn't even complete, but the test cases for this kata are rather barebones...
* [browsercalc.js](https://www.codewars.com/kata/581bc0629ad9ff9873000316) - 4 kyu
    * I did this one just because I wanted to get to 3 kyu in rank.  It's a variation of a problem I've already done before.
    * Also, my code for this could and should be a whole lot DRYer, but I just wanted to get it out of the way.
* [calc.js](https://www.codewars.com/kata/5235c913397cbf2508000048) - 3 kyu
    * So much parsing.  Maybe I should start digging into how compilers work.
    * also see `calc2.js`
* [commondenominators.js](https://www.codewars.com/kata/54d7660d2daf68c619000d95) - 5 kyu
    * A g964 special, so the question isn't written as clearly as it could have been, in my humble opinion.
    * My solution is hacky.  I don't know if it will work for all possible inputs.  It worked when I submitted it, though!  I'll take it.
* [connect4.js](https://www.codewars.com/kata/56882731514ec3ec3d000009) - 4 kyu
    * A very wordy solution to a Connect 4 solver.  I admit to not reading the problem statement before coding, and so a lot of revisions were required to get to a working solution.  This wasted work would not have been required had I took some time to digest the problem.  This is a great reminder to slow down, digest the problem, deeply understand what is and isn't being asked... only then should code be written.
    * I took this on because I already have written Connect 4; you can find it here: [https://chuynh18.github.io/fourinarow/](https://chuynh18.github.io/fourinarow/)
* [decomposesquares.js](https://www.codewars.com/kata/54eb33e5bc1a25440d000891) - 4 kyu
    * My very first foray to 4 kyu.  The author of this kata is very prolific, but I suspect English is not his or her primary language.  It made parsing what was being asked of me a little difficult.
    * That being said, there's an interesting constraint placed on this problem that required recursion (or at least, my solution uses recursion to solve for the constraint).  After submitting a working solution, I had enough of recursion for the evening.
* [dicerollsprobability-pascalstriangle.js](https://www.codewars.com/kata/55d18ceefdc5aba4290000e5) - 4 kyu
    * You'll find code fragments and a brute force solver in the "for dicerollsprobability" folder.  The brute force solver is correct (and shares most of its code with the actual solution); it's just far too slow.
* [directionreduction.js](https://www.codewars.com/kata/550f22f4d758534c1100025a) - 5 kyu
    * This was an interesting kata, because once I had a working solution, it felt so much simpler than all my false starts.
* [division.js](https://www.codewars.com/kata/598dba93700c2c0f470000dc) - 3 kyu
    * This kata is basically asking you to implement arbitrary precision division.  I did this one with minimal research (basically, just went to Wikipedia to refresh myself on how long division by hand worked).  Then I basically implemented long division, which also required me to implement the arbitrary precision modulo operator, which required me to implement arbitrary precision subtraction.  Note that the modulo operator and subtraction helper functions I implemented probably won't stand on their own (for example, I know that I will never pass a negative argument to my subtraction helper function).
    * After solving this, I did research on arbitrary precision arithmetic, and found out that there are vastly superior algorithms for computers than long division.  I know my algorithm is slow as its main loop only yields one (or zero) digits of the quotient per iteration.  There are some easy optimizations I can do, but none of them would compare to just using a better algorithm to begin with!
    * Still, not bad for four or five months of coding!  Feels nice to be the eleventh person to submit a successful solution, even if my solution is by far the worst.  (At the time of this writing, five months ago, I had never written a line of code in my life.)
    * Please see `FALSESTART-dividestrings.js` in the `for division.js` folder for my hilariously misguided very first attempt.  Caused me to do a lot of research on why this approach would never work.  I learned more than I ever cared to about IEEE 754 floating point numbers.
* [integersrecreationone.js](https://www.codewars.com/kata/55aa075506463dac6600010d) - 5 kyu
    * By the same author as decompose squares, so it took me a little bit of time to parse the challenge.  Once I did, the code was straightforward, though I do use a brute force approach.  Haven't thought about whether there's a more elegant way (if there is, it likely requires more number theory than I know).
* [lastdigit.js](https://www.codewars.com/kata/5518a860a73e708c0a000027) - 3 kyu
    * I saw the pattern and wrote some trashy code that passed the answer.  It's horrible and convoluted and I should be ashamed.
    * I'm sure there's some very interesting number theory behind why numbers behave this way.  I just don't know any of it.
* [mathexpressions.js](https://www.codewars.com/kata/evaluate-mathematical-expression) - **2 kyu**
    * The bulk of the mathematical expression evaluation code is a slightly modified version of `calc.js`.  I just wrote some extra logic to handle parenthesis (whether nested or not).
    * My solution is obscenely wordier than everybody else's, but they use regex and I don't.
    * The use of a declarative language means you're relying on logic that someone else wrote!
        * Okay, real talk.  It's because I need to learn regex.
* [mostfrequentweekdays.js](https://www.codewars.com/kata/56eb16655250549e4b0013f4) - 6 kyu
    * I never thought about how some people could tell you on the spot what the first day of any given year was.  I should have realized that 365 mod 7 is 1.
* [multiplesof3or5.js](https://www.codewars.com/kata/514b92a657cdc65150000006) - 6 kyu
    * Somebody has a FizzBuzz variation they really like.
* [observedpin.js](https://www.codewars.com/kata/5263c6999e0f40dee200059d) - 4 kyu
    * I attempted this fairly early on and got stuck.  My failed brute force solution to the dice roll probability kata actually unblocked me on this kata.  However, I clearly need to study up on how I can use recursion to nest an arbitrary number of for loops (this was my first approach to incrementing the PINs I was generating.  While I ended up using a more elegant solution, I did learn more about my weaknesses and so I have an opportunity to improve).
* [parseIntReloaded.js](https://www.codewars.com/kata/parseint-reloaded/) - 4 kyu
    * Some people have extremely succinct answers.
* [removecomments.js](https://www.codewars.com/kata/51c8e37cee245da6b40000bd) - 4 kyu
    * In my opinion, my solution is incredibly ugly and only passed because the test cases for this kata aren't very comprehensive.
* [rgbtohex.js](https://www.codewars.com/kata/513e08acc600c94f01000001) - 5 kyu
    * My solution solves for the problem presented and nothing more.
* [rot13.js](https://www.codewars.com/kata/530e15517bc88ac656000716) - 5 kyu
    * Not the most elegant solution.  I see a lot of other people solved this pretty creatively and/or using regex.  Still, I used the `String.fromCharCode()` method.  How many times do you get to use that method‽  How many times do you get to use the interrobang‽
* [simpler-interactive-interpreter.js](https://www.codewars.com/kata/simpler-interactive-interpreter/) - **2 kyu**
    * builds upon [evaluate mathematical expression](https://www.codewars.com/kata/evaluate-mathematical-expression), which in turn builds upon [calculator](https://www.codewars.com/kata/calculator).
* [spiral.js](https://www.codewars.com/kata/534e01fbbb17187c7e0000c6) - 3 kyu
    * My solution is generally correct.  It fails for spirals of size 5.  I hardcoded the correct answer just to get it out of the way.  Shame on me.
* [sumbignums.js](https://www.codewars.com/kata/5324945e2ece5e1f32000370) - 4 kyu
    * Kind of took advantage of there being [another kata that's almost exactly the same](https://www.codewars.com/kata/525f4206b73515bffb000b21).  I don't remember if the code in its current form can solve both.  It only took an incredibly minor revision, though (something about removing leading zeroes from the input numbers).
* [sumsmallestints.js](https://www.codewars.com/kata/558fc85d8fd1938afb000014) - 7 kyu
    * This was my third kata and I was still warming up and finding the appropriate degree of difficulty.
* [thelift.js](https://www.codewars.com/kata/58905bfa1decb981da00009e) - 3 kyu
    * I don't know why this one threw me off so much.  I made extensive use of running my script locally in Node and attaching to the Chrome debugger.  I'll have to think more about how I coded this along with my thought processes as I coded this.
    * Part of the reason I made so many mistakes is because I once again did not read the instructions carefully.  I initially ignored this rule: `When called, the Lift will stop at a floor even if it is full, although unless somebody gets off nobody else can get on!`
* [tictactoe.js](https://www.codewars.com/kata/525caa5c1bf619d28c000335) - 5 kyu
    * A tic-tac-toe solver.  Did this because it was low-hanging fruit, because I made [https://chuynh18.github.io/tictactoe/](https://chuynh18.github.io/tictactoe/).  Enjoy.
    * The code is NOT DRY at all (statement is true for my solution for the kata and true for the working tic-tac-toe game).
* [twiceasold.js](https://www.codewars.com/kata/5b853229cfde412a470000d0) - 8 kyu
    * My first kata, solved on a whim because a friend sent it to me.
    * Purely a math problem.  I solved this in the GIMP by doing elementary algebra.  You have three variables that turn into one variable (because the age of the father and son are the inputs).  This means you have one equation and one variable.
    * I am extremely disappointed in this kata; it demands a positive answer.  I believe this makes the answer incorrect from a mathematical perspective.  The sign is important; it denotes whether the father either *was* or *will be* twice the age of the son.