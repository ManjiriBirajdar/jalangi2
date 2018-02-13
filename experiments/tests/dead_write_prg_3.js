var a = 1; 
var b = 2;

function foo (l) {	
	return l + 1;
}

b = foo (b);
console.log (a + b);

//dead write
a = foo (a);
