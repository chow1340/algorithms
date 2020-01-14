import React, { Component } from "react";
import singly from "./singly.png";
import "./LinkedList.css";
import Highlight from "react-highlight";

class LinkedListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
  print(div) {
    let current = this;
    console.log(current);
    const next = () => {
      document.getElementById(div).innerHTML += current.data + " ";
      current = current.next;
      if (current) {
        setTimeout(next, 1000);
      }
    };
    document.getElementById(div).innerHTML = "Data: ";

    next();
  }
}

class List {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  //print list
  print(div) {
    let current = this.head;
    const next = () => {
      console.log(current.data);
      console.log(this.size);
      document.getElementById(div).innerHTML += current.data + " ";
      current = current.next;
      if (current) {
        setTimeout(next, 1000);
      }
    };
    document.getElementById(div).innerHTML = "Data: ";

    next();
  }
  // Insert node at head
  insertHead(data) {
    this.head = new LinkedListNode(data, this.head);
    this.size++;
  }

  //Insert node at last node
  insertLast(data) {
    let node = new LinkedListNode(data);
    let current = this.head;
    // If head is empty or null, set node to head
    if (!this.head) {
      this.head = node;
    } else {
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  //Insert node at an index
  insertAt(data, index) {
    console.log(index);

    //If first index,
    if (index === "0") {
      this.insertHead(data);
      return;
    } else {
      const node = new LinkedListNode(data);
      let current, previous;

      current = this.head;
      let count = 0;

      //Makes room to put in the index node
      while (count < index) {
        previous = current; // Node before the index
        count++;
        current = current.next; // Node after the index
      }

      //Set the next node equal to current
      node.next = current;
      //Set the node at the index
      previous.next = node;
      this.size++;
    }
  }

  //Get index value
  getValue(index) {
    let current = this.head;
    let count = 0;
    const indexValue = parseInt(index);
    while (current) {
      if (count === indexValue) {
        console.log(current.data, "found");
        document.getElementById("value").innerHTML = "Value: " + current.data;
      }
      count++;
      current = current.next;
    }
    return null;
  }

  //Delete value
  deleteValue(indexString) {
    let current = this.head;
    let previous;
    let count = 0;

    const index = parseInt(indexString);

    //If head, change to next node value
    if (index === 0) {
      this.head = current.next;
    } else {
      while (count < index) {
        count++;
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
  }
  //Reverse a linked list
  reverseList(head) {
    let node = head,
      previous,
      tmp;

    while (node) {
      // console.log(node);
      //save the next node before we override the next node
      tmp = node.next;
      //Reverse the pointer
      node.next = previous;
      //Step forward in the list
      previous = node;
      node = tmp;
    }
    // console.log(previous);
    return previous;
  }
}
class LinkedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: "",
      listSize: 6
    };
    this.printLinkedListNode = this.printLinkedListNode.bind(this);
    this.listSizeIndex = this.listSizeIndex.bind(this);
  }

  printLinkedListNode(e, button, data, index) {
    e.preventDefault();
    let list = new List();

    list.insertHead(1);
    list.insertLast(2);
    list.insertLast(3);
    list.insertLast(4);
    list.insertLast(5);

    if (button === "print") {
      list.print("print");
    }

    if (button === "add") {
      const index = document.getElementById("addIndexInput").value;
      let data = document.getElementById("stringInput").value;
      list.insertAt(data, index);
      this.setState({ listSize: list.size });
      list.print("add");
    }
    if (button === "get") {
      let index = document.getElementById("getIndexInput").value;
      list.getValue(index);
    }
    if (button === "delete") {
      let index = document.getElementById("deleteIndexInput").value;
      list.deleteValue(index);
      list.print("delete");
    }

    if (button === "reverse") {
      // let reverseList = list.reverseList(list.head);
      // console.log(reverseList);

      let reverseList = new List();
      reverseList = list.reverseList(list.head);
      console.log(reverseList);
      reverseList.print("reverse");
    }
  }

  listSizeIndex(minus) {
    let listSizeIndex = [];

    for (let i = 0; i < this.state.listSize - minus; i++) {
      listSizeIndex[i] = i;
    }
    return listSizeIndex;
  }

  render() {
    return (
      <div className="content">
        <h3>Linked Lists</h3>
        <p>
          A linked list stores multiple values in a linear fashion. Each
          elements are linked using pointers
        </p>
        <br />
        <img src={singly} alt="singly"></img>
        <br />
        <br />
        <p>
          Above is an example of a singly linked list, where each node has a
          'next'. In the case of a doubly linked list, each node has a next and
          a previous linkage.
        </p>
        <br />
        {/* <h3>Exercise</h3>
        <p>
          As an exercise to practice linked lists - I wanted to try to reverse a
          linked list.
        </p> */}
        <h3>Writing a Linked List</h3>
        <h6>Creating the node class</h6>
        <div>
          <p>
            Each node in the linked list will have two values: the data it
            contains, the the linkage(next)
          </p>

          <Highlight language="javascript">
            {`class LinkedListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
    
}`}
          </Highlight>

          <p>
            {" "}
            The data is a property that contains the value of which the linked
            list will store. The next property begins as null.
            {``}
          </p>
          <h6>Adding nodes to the list</h6>
          <Highlight language="javascript">
            {`class List {
  constructor() {
    this.head = null;
    this.size = 0;
  }


  // Insert node at head
  insertHead(data) {
    this.head = new LinkedListNode(data, this.head);
  }

  //Insert node at last node
  insertLast(data) {
    let node = new LinkedListNode(data);
    let current = this.head;
    // If head is empty or null, set node to head
    if (!this.head) {
      this.head = node;
    } else {
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
  }
}`}
          </Highlight>
          <div>
            <ul>
              <li>
                insertHead() sets the value of the head of the linked list
              </li>
              <li>insertLast() adds a node to the end of the linked list.</li>
            </ul>
          </div>
        </div>
        <p>
          {" "}
          Try traversing through the list! (There is a time interval of 1 second
          between)
        </p>
        <button
          className="btn"
          onClick={e => this.printLinkedListNode(e, "print")}
        >
          Traverse through linked list
        </button>
        <div id="print">Data: </div>
        <br />
        <br />
        <h6>Adding to an index value</h6>
        <p>
          To add to the index value, the linked list must first "make space" to
          add a new node.
        </p>
        <Highlight lauguage="javascript">
          {`const node = new LinkedListNode(data);
    let current, previous;

    current = this.head;
    let count = 0;

    //Makes room to put in the index node
    while (count < index) {
      previous = current; // Node before the index
      count++;
      current = current.next; // Node after the index
    }`}
        </Highlight>
        <p>
          Next, the previous.next will be equal to the added node, and node.next
          will equal to the current (established in the while loop)
        </p>
        <Highlight language="javascript">
          {` //Set the next node equal to current
node.next = current;
//Set the node at the index
previous.next = node;`}
        </Highlight>

        <form onSubmit={e => this.printLinkedListNode(e, "add")}>
          <input type="text" id="stringInput" placeholder="Add a node!" />
          <select name="Index" id="addIndexInput">
            {/* Map the array index options */}
            {this.listSizeIndex(0).map(index => {
              return (
                <option key={index} value={index}>
                  {index}
                </option>
              );
            })}
          </select>
          <button className="btn">Add and traverse through list</button>
          <div id="add">Data: </div>
        </form>
        <br />
        <br />

        <h6>Get the value of the node</h6>
        <p>
          Similar to adding to the node, to get the value we loop through the
          linked list until the index value is found.
        </p>
        <Highlight>
          {`// Get at index
  getAt(index) {
    let current = this.head;
    let count = 0;

    while (current) {
      if (count == index) {
        console.log(current.data);
      }
      count++;
      current = current.next;
    }

    return null;
  }`}
        </Highlight>
        <form onSubmit={e => this.printLinkedListNode(e, "get")}>
          <select name="Index" id="getIndexInput">
            {/* Map the array index options */}
            {this.listSizeIndex(1).map(index => {
              return (
                <option key={index} value={index}>
                  {index}
                </option>
              );
            })}
          </select>
          <button className="btn">Get value</button>
          <div id="value">Value: </div>
        </form>
        <br />
        <br />

        <h6>Deleting A Node</h6>
        <p>
          {" "}
          To delete the node, we set the 'next' value of targeted node to the
          next node
        </p>
        <Highlight language="javascript">
          {`//If head, change to next node value
    if (index === 0) {
      this.head = current.next;
    } else {
      while (count < index) {
        count++;
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }`}
        </Highlight>
        <form onSubmit={e => this.printLinkedListNode(e, "delete")}>
          <select name="Index" id="deleteIndexInput">
            {/* Map the array index options */}
            {this.listSizeIndex(1).map(index => {
              return (
                <option key={index} value={index}>
                  {index}
                </option>
              );
            })}
          </select>
          <button className="btn">Traverse the changed list</button>
          <div id="delete">Data: </div>
        </form>
        <br />
        <br />

        <h3>Reverse a linked list</h3>
        <p>
          {" "}
          As a quick exercise, reverse a linked list! To accomplish this, the
          'next' pointer of each node is set to previous.
        </p>
        <Highlight language="javascript">
          {`reverseList(head) {
    let node = head,
      previous,
      tmp;

    while (node) {
      //save the next node before we override the next node
      tmp = node.next;
      //Reverse the pointer
      node.next = previous;
      //Step forward in the list
      previous = node;
      node = tmp;
    }
  }`}
        </Highlight>
        <form onSubmit={e => this.printLinkedListNode(e, "reverse")}>
          <button className="btn">Traverse the changed list</button>
          <div id="reverse">Data: </div>
        </form>
      </div>
    );
  }
}
export default LinkedList;
