var p = 1;
var q = 2;
var r = 3;

function foo (l) {
	return l + 1;
}

q = foo (q);
console.log (p + q);

//dead write
p = foo (p);

//dead write
r = foo (r);
