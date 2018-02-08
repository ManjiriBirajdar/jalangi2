var a = 1;
var b = 2;
var c = 3;
var d = 4;

function foo (l) {
	return l + 1;
}

b = foo (b);
console.log (a + b);
//dead write
a = foo (a);
//dead write
c = foo (c);
