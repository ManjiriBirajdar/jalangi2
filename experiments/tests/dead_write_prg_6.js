function Foo(){
    this.a = 20;
    this.b = 30;
}

Foo.prototype.add = function (){
    var c ;
    c = 200;
    var sum = this.a + this.b;
    return sum;
}

var obj = new Foo();
console.log(obj.add());