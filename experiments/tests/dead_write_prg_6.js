function Foo(){
    this.a = 10;
    this.b = 20;
}
Foo.prototype.add = function (){
    //dead write
	var c = 200;
    var sum = this.a + this.b;	
    return sum;
}
var obj = new Foo();
console.log(obj.add());

//dead write
var c = 10;
obj = new Foo();