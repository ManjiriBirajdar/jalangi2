/**
* Author: Koushik Sen
* code is refered from jalangi2\tests\test28.js file
* Manjiri Birajdar introduced personal modifications to test28.js file
**/

//dead write
var another = 9;

function id(x){
    return x;
}

//dead write
var t = id(12);