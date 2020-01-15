import React, { Component } from "react";
import Highlight from "react-highlight";

class StackQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: [1, 2, 3, 4, 5]
    };
    this.addStack = this.addStack.bind(this);
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
  render() {
    return (
      <div className="content">
        <h1>Stack</h1>
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
        <form onSubmit={e => this.addStack(e)}>
          <input type="text" placeholder="Value to Push" id="pushValue"></input>
          <button className="btn">Push</button>
        </form>
        <form onSubmit={e => this.removeStack(e)}>
          <button className="btn">Pop</button>
        </form>
      </div>
    );
  }
}
export default StackQueue;
