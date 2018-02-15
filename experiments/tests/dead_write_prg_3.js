function foo (l) {	
   //dead write
	var c = 20;
	
	return l + 1;
}

var a = 1; 
var b = 2;
var c = 0;

b = foo (b);
console.log (a + b);

//dead write
a = foo (a);
