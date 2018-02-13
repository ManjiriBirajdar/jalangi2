/*jslint node: true */
'use strict';

/*
JavaScript implementation of a LinkedList
*/

/**
  * Constructor for LinkedList
  *@class LinkedList
  *@constructor
  **/
function LinkedList() {
    this.length = 0;
    this.head = null;
} ;

/**
  *Returns size of the LinkedList
  *@return {int} size of LinkedList
  *@method size
  **/

LinkedList.prototype.size = function () {

return this.length;
};

/**
  *Adds a Node to the end of the LinkedList
  * @param {whatever} data
  *@return void
  *@method add
  **/
LinkedList.prototype.add = function (someData){

  var current; //used as a place marker to go through the LinkedList

  var Node = {
    data:someData,
    next:null
  } // an Object in the LinkedList that contains some data and a reference to the
  //next Object

  //suppose there are no items in the list yet
  if(this.head==null) {

    //then we will set the head to this Node Object
    this.head = Node;
  }
  else{

    current = this.head;
    while(current.next) {
      current = current.next;
    }
    current.next = Node;

  }

  this.length++; //increase size of list
};

/**
  * Removes an item from a certain place in the LinkedList
  * @param {int} index
  * @return The item in "index" or null if there is nothing there
  *@method remove
**/
LinkedList.prototype.remove = function(index) {

  if(index>-1 && index<this.length) {

    var current = this.head;
    var before;

    //if we want to remove the first item
    if(index==0){
      this.head = current.next; //overwriting head with the next Node
    }

    else{
        for(var i=0;i<index;i++) {
          before = current;
          current = current.next;
        }
        before.next = current.next;
    }
    this.length--;

    return current.data;


  }
else{
  return null;
}

};
/**
* Converts LinkedList to an array
* @param none
*@return {array} array
*@method toArray
**/
LinkedList.prototype.toArray = function () {

  var array = [];
  var current = this.head;

  while(current){
    array.push(current.data);
    current = current.next;
  }
  return array;
};
/**
*Converts LinkedList to a string
*@param none
*@return {String} string
*@method toString
**/
LinkedList.prototype.toString = function (){

  return this.toArray().toString();
};
/**
  *Finds a specific element and returns its index
  *@param {anything} data
  *@return {int} index
  *@method find
**/
LinkedList.prototype.findIndexOf = function (data) {
    var index=0;
    var current= this.head;

  //go through linkedlist and check if each node = data then set index to thaat index
  while(current) {

    if(current.data==data){


      return index;

    }

  current =  current.next;
  index++;

  }
/**
  * Removes all elements from the list
  * @param none
  * @return {integer} 1 if removed. -1 if already empty
  *@method removeAll
**/
LinkedList.prototype.removeAll = function () {
// (1) start with head.
// (2) keep moving every element to the next one till tail then set tail to null

  var current = this.head;
  var before = current;


  while(current){

    this.head = current.next;

    before.next = current.next;

    current = current.next;

    this.length--;

  }



};

/**
  * Get first element of the List
  * @param none
  * @return {Element} first element
  * @method getFirstElement
**/
LinkedList.prototype.getFirstElement = function () {

  return this.head.data;

};


};

module.exports = LinkedList;
