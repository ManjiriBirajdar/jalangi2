var LinkedList = require('./index');
var list1 = new LinkedList();
var list2 = new LinkedList();
//var assert = require('assert');

  list1.add('Hello');
  list1.add('My');
  list1.add('Name');
  list1.add('Is');
  
  console.log(list1.size());
  console.log(list1.toArray());  
 // assert.equal(list1.size(),4);

 list2.add({
      "name": "Liban",
      "age":22
    });
    list2.add({
      "name": "John",
      "age":25
    });
    list2.add({
      "name": "Bill",
      "age":21
    });

	console.log(list2.size());
	console.log(list2.toArray());
	
	 list1.remove(3);
	 console.log("index of hello ; " +list1.findIndexOf("Hello"));
	 console.log(list1.toString());
	 console.log(list1.toArray().join(','));
	 