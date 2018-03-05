function foo (l) {
	return l + 1;
 }
var a = 1, b = 2;
b = foo (b);
console .log (a + b);

//dead write
a = foo (a);