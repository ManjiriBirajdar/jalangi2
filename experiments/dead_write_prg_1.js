var a = 10;
var c = 10;
var b = a * 2;
console.log("value of b is " +b);

//dead write
a = b / 2;

b = c * 2;

//dead write
c = b / 2;