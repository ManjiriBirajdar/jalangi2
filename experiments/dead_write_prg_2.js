var a = 1, b = 2, c = 3;

function foo (l) {
	//dead write
	var some = 10;
	
	return l + 1;
}

b = foo (b);
console.log (a + b);

//dead write
a = foo (a);

//dead write
c = foo (c);