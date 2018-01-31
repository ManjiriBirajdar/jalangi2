var a = 1, b = 2, c = 3, d = 4;

function foo (l) {
	return l + 1;
}

b = foo (b);
console.log (a + b);

//dead write
a = foo (a);

//dead write
c = foo (c);
