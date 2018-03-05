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

