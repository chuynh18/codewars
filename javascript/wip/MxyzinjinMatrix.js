"use strict";

function check(pw) {
    return !(Array.isArray(pw) || pw.length>passwd.length) && [...passwd].every((c,i)=>c===pw[i]);
}

console.log(check("test"));


tests:

Test.describe('Internal test', function() {
    Test.it('Maybe you should break this simple password first before attempting the challenge...', function() {
      Test.assertEquals(crack(makeLogin('mxyzinjin5102')), 'mxyzinjin5102');
    });
})