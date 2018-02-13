var a = 10, c = 10, b = a * 2;
console.log("value of b is " +b);

//dead write
a = b / 2;

b = c * 2;

//dead write
c = b / 2;