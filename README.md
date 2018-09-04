CodeWars solutions (and code fragments)
=======================================

This is where I post my CodeWars kata solutions.  Supporting code (mainly just code fragments I wrote to quickly test program subroutines) can be found inside folders.  Kata solutions just live at the root level.

My CodeWars profile:  [https://www.codewars.com/users/chuynh18/completed](https://www.codewars.com/users/chuynh18/completed)

* [advancedmorse.js](https://www.codewars.com/kata/54b72c16cd7f5154e9000457) - 4 kyu
    * A lot of hacky conditionals in my solution.  If the test cases were more expansive, I would probably need to rethink my approach.
* [calc.js](https://www.codewars.com/kata/5235c913397cbf2508000048) - 3 kyu
    * So much parsing.  Maybe I should start digging into how compilers work.
* [dicerollsprobability-pascalstriangle.js](https://www.codewars.com/kata/55d18ceefdc5aba4290000e5) - 4 kyu
    * You'll find code fragments and a brute force solver in the "for dicerollsprobability" folder.  The brute force solver is correct (and shares most of its code with the actual solution); it's just far too slow.
* [division.js](https://www.codewars.com/kata/598dba93700c2c0f470000dc) - 3 kyu
    * This kata is basically asking you to implement arbitrary precision division.  I did this one with minimal research (basically, just went to Wikipedia to refresh myself on how long division by hand worked).  Then I basically implemented long division, which also required me to implement the arbitrary precision modulo operator, which required me to implement arbitrary precision subtraction.  Note that the modulo operator and subtraction helper functions I implemented probably won't stand on their own (for example, I know that I will never pass a negative argument to my subtraction helper function).
    * After solving this, I did research on arbitrary precision arithmetic, and found out that there are vastly superior algorithms for computers than long division.  I know my algorithm is slow as its main loop only yields one (or zero) digits of the quotient per iteration.  There are some easy optimizations I can do, but none of them would compare to just using a better algorithm to begin with!
    * Still, not bad for four or five months of coding!  Feels nice to be the eleventh person to submit a successful solution, even if my solution is by far the worst.  (At the time of this writing, five months ago, I had never written a line of code in my life.)
* [observedpin.js](https://www.codewars.com/kata/5263c6999e0f40dee200059d) - 4 kyu
    * I attempted this fairly early on and got stuck.  My failed brute force solution to the dice roll probability kata actually unblocked me on this kata.  However, I clearly need to study up on how I can use recursion to nest an arbitrary number of for loops (this was my first approach to incrementing the PINs I was generating.  While I ended up using a more elegant solution, I did learn more about my weaknesses and so I have an opportunity to improve).
* [removecomments.js](https://www.codewars.com/kata/51c8e37cee245da6b40000bd) - 4 kyu
    * In my opinion, my solution is incredibly ugly and only passed because the test cases for this kata aren't very comprehensive.
* [sumbignums.js](https://www.codewars.com/kata/5324945e2ece5e1f32000370) - 4 kyu
    * Kind of took advantage of there being [another kata that's almost exactly the same](https://www.codewars.com/kata/525f4206b73515bffb000b21).  I don't remember if the code in its current form can solve both.  It only took an incredibly minor revision, though (something about removing leading zeroes from the input numbers).