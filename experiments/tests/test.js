var LinkedList = require('./index');
var list1 = new LinkedList();
var list2 = new LinkedList();
var list3 = new LinkedList();
//var assert = require('assert');

list1.add('Hello');
list1.add('My');
list1.add('Name');
list1.add('Is');

list1.size();
list1.toArray();

//assert.equal(list1.size(),4);

list2.add({
  "name": "Liban",
  "age": 22
});
list2.add({
  "name": "John",
  "age": 25
});
list2.add({
  "name": "Bill",
  "age": 21
});

list2.size();
list2.toArray();
list2.toArray().length;

list1.remove(0);
list1.findIndexOf("Hello");
list1.toString();
list1.toArray().join(',');

list3.add('1');
list3.add('2');
list3.removeAll();

list3.add('1');
list3.add('2');
list3.add('3');

list3.getFirstElement();
list3.toString().split(',');
list3.getFirstElement();
list3.toString().substring(0,1);