/**
* Author: Koushik Sen
* code is refered from jalangi2\tests\test28.js file
* Manjiri Birajdar introduced personal modifications to test28.js file
**/

var another = 9;

function id(x){
    return x;
}

var t = id(another);

//dead write
var sts = id(12);
console.log(t);

var ots = another * t;
console.log(ots);

//dead write
t = t * ots;