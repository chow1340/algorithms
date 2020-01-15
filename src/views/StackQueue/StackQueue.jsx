import React, { Component } from "react";
import Highlight from "react-highlight";
import "./StackQueue.css";
import stack from "./stack.png";

class StackQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: [1, 2, 3, 4, 5],
      queue: [1, 2, 3, 4, 5]
    };
    this.addStack = this.addStack.bind(this);
    this.removeStack = this.removeStack.bind(this);
    this.enqueue = this.enqueue.bind(this);
    this.dequeue = this.dequeue.bind(this);
  }

  addStack(e) {
    e.preventDefault();
    let currentArray = this.state.stack;
    let pushValue = document.getElementById("pushValue").value;
    currentArray.push(pushValue);
    this.setState({
      stack: currentArray
    });
    console.log(this.state.stack);
  }

  removeStack(e) {
    e.preventDefault();
    let currentArray = this.state.stack;
    currentArray.pop();
    this.setState({
      stack: currentArray
    });
  }

  enqueue(e) {
    e.preventDefault();
    const value = document.getElementById("enqueueValue").value;
    this.state.queue.push(value);

    this.setState({
      queue: this.state.queue
    });
  }

  dequeue(e) {
    e.preventDefault();
    this.state.queue.shift();
    this.setState({
      queue: this.state.queue
    });
  }
  render() {
    return (
      <div className="content">
        <h1>Stack</h1>
        <img src={stack} id="stack"></img>
        <p>
          Stack and Queues are relatively simple - they follow a LIFO (last in
          first out) rule. This means elements can only be inserted and deleted
          from the top. They have the following operations:
        </p>
        <ul>
          <li>
            <b>Push</b>- Inserting a element to the top of the stack
          </li>
          <li>
            <b>Pop</b>- The deletion of an element from the top of the stack
          </li>
        </ul>
        <br />
        <h6>Writing a Stack in Javascript</h6>
        <p>
          Writing a stack in arrays using Javascript is rather simple. There are
          two simple functions: Push and Pop. In the example, I will start with
          an array of [1, 2, 3, 4, 5] with 5 being the top value. Try adding a
          value, or removing a value!
        </p>
        <br />
        <h6>Push</h6>
        <Highlight>{`stack.push() adds a value to the top`}</Highlight>
        <br />
        <h6>Pop</h6>
        <Highlight>{`stack.pop() removes a value from the top`}</Highlight>

        <div>Stack: {this.state.stack.toString()} </div>
        <form id="pushButton" onSubmit={e => this.addStack(e)}>
          <input type="text" placeholder="Value to Push" id="pushValue"></input>
          <button className="btn">Push</button>
        </form>
        <form id="popButton" onSubmit={e => this.removeStack(e)}>
          <button className="btn">Pop</button>
        </form>
        <br />
        <br />
        <h1>Queue</h1>
        <p> Where stack uses the LIFO method, Queue uses the FIFO method.</p>
        <h6>Elements of a Queue:</h6>
        <ul>
          <li>
            <b>Rear</b> - Where elements are inserted from the queue
          </li>
          <li>
            <b>Front</b> - Elements can only be deleted from the opposite end:
            the front
          </li>
          <li>
            <b>Enqueue</b> - The insertion of an element to the queue
          </li>
          <li>
            <b>Dequeue</b> - Deletion of an element
          </li>
        </ul>
        <h6>Enqueue</h6>
        <Highlight>{`queue.push() will add to the queue`}</Highlight>

        <br />
        <h6>Dequeue</h6>
        <Highlight>{`queue.shift() will dequeue`}</Highlight>

        <br />
        <div>Queue: {this.state.queue.toString()}</div>

        <form id="pushButton" onSubmit={e => this.enqueue(e)}>
          <input
            type="text"
            placeholder="Value to Queue"
            id="enqueueValue"
          ></input>
          <button className="btn">enqueue</button>
        </form>
        <form id="popButton" onSubmit={e => this.dequeue(e)}>
          <button className="btn">dequeue</button>
        </form>
      </div>
    );
  }
}
export default StackQueue;
