import React, { Component } from "react";
import singly from "./singly.png";
import "./LinkedList.css";
import Highlight from "react-highlight";

class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: ""
    };
    this.head = null;
    this.size = 0;
    this.printLinkedListNode = this.printLinkedListNode.bind(this);
    // this.insertAtHead = this.insertAtHead.bind(this);
  }

  printLinkedListNode(button) {
    // Create the first linked node
    let head = new LinkedListNode(1);

    //Create the second linked node
    head.next = new LinkedListNode(2);

    //Create the third linked node
    head.next.next = new LinkedListNode(3);

    let current = head;
    const next = () => {
      console.log(current.data);
      this.setState({ currentData: current.data });
      current = current.next;
      if (current != null) {
        setTimeout(next, 1000);
      }
    };
    if (button === "print") {
      next();
    }

    if (button === "insertAtHead") {
      const insertHead = insertHeadValue => {
        this.head = new LinkedListNode(2, head);
        console.log(head);
        // console.log(this.head);
      };
      insertHead(2);
    }
  }

  //   insertAtHead(data) {
  //     this.head = new LinkedListNode(data, this.head);
  //     console.log(this.head);
  //   }
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

        <div>
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
          <Highlight language="javscript">
            {`//Create the first linked node
const head = new LinkedListNode(1);

//Create the second linked node
head.next = new LinkedListNode(2);

//Create the third linked node
head.next.next = new LinkedListNode(3);`}
          </Highlight>
        </div>
        <p>
          {" "}
          Try traversing through the list! (There is a time interval of 1 second
          between)
        </p>
        <button onClick={() => this.printLinkedListNode("print")}>
          Traverse through linked list
        </button>
        <div>Data: {this.state.currentData}</div>
        <br />
        <br />
        <h3>Adding to the head of a linked list</h3>
        <button
          onClick={() => this.printLinkedListNode("insertAtHead")}
        ></button>
      </div>
    );
  }
}
export default LinkedList;
