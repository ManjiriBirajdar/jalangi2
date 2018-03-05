var another = 9;

function id(x){
	var t = x * 2;
    return x;
}

var t = id(another);

//dead write
var sts = id(12);
console.log(t);

var ots = another * t;
console.log(ots);

//dead write
t = t * ots;