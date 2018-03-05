function foo (l) {

	//dead write
	var c = c + 1;	
	return l + 1;
}
var a = 1; 
var b = 2;
var c = 0;

a = foo (b);
console.log(a + b);

//dead write
c = b * 2;
