
/**
* Author: Koushik Sen
* code is refered from jalangi2\tests\test5.js file
* Manjiri Birajdar introduced personal modifications to test5.js file
**/

var x = 1, y = 2;
var z;

z = x + y;
console.log(y);

if (x < 2) 
{	
   //dead write
    y = 1;		
	console.log(z);
}

