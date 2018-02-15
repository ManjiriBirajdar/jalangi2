'use strict';
function LinkedList() {
    this.length = 0;
    this.head = null;
}
this.length = 0;
this.head = null;
LinkedList.prototype.size = function () {
    return this.length;
};
LinkedList.prototype.add = function (someData) {
    var current;
    var Node = {
        data: someData,
        next: null
    };
    if (this.head == null) {
        this.head = Node;
    } else {
        current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = Node;
    }
    this.length++;
};
var current;
var Node = {
    data: someData,
    next: null
};
this.head = Node;
current = this.head;
current = current.next;
current.next = Node;
this.length++;
LinkedList.prototype.remove = function (index) {
    if (index > -1 && index < this.length) {
        var current = this.head;
        var before;
        if (index == 0) {
            this.head = current.next;
        } else {
            for (var i = 0; i < index; i++) {
                before = current;
                current = current.next;
            }
            before.next = current.next;
        }
        this.length--;
        return current.data;
    } else {
        return null;
    }
};
var current = this.head;
var before;
this.head = current.next;
var i = 0;
before = current;
before.next = current.next;
this.length--;
LinkedList.prototype.toArray = function () {
    var array = [];
    var current = this.head;
    while (current) {
        array.push(current.data);
        current = current.next;
    }
    return array;
};
var array = [];
array.push(current.data);
LinkedList.prototype.toString = function () {
    return this.toArray().toString();
};
LinkedList.prototype.findIndexOf = function (data) {
    var index = 0;
    var current = this.head;
    while (current) {
        if (current.data == data) {
            return index;
        }
        current = current.next;
        index++;
    }
    LinkedList.prototype.removeAll = function () {
        var current = this.head;
        var before = current;
        while (current) {
            this.head = current.next;
            before.next = current.next;
            current = current.next;
            this.length--;
        }
    };
    LinkedList.prototype.getFirstElement = function () {
        return this.head.data;
    };
};
var index = 0;
LinkedList.prototype.removeAll = function () {
    var current = this.head;
    var before = current;
    while (current) {
        this.head = current.next;
        before.next = current.next;
        current = current.next;
        this.length--;
    }
};
var before = current;
LinkedList.prototype.getFirstElement = function () {
    return this.head.data;
};
module.exports = LinkedList;
