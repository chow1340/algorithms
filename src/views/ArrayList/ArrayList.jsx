import React, { Component } from "react";
import "./ArrayList.css";

class ArrayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: ["1", "2", "3", "a", "b", "c"],
      arrayIndex: []
    };
    this.displayArray = this.displayArray.bind(this);
    this.arrayIndex = this.arrayIndex.bind(this);
    this.removeFromArray = this.removeFromArray.bind(this);
  }

  displayArray() {
    const stringArray = this.state.array.toString();
    // REGEX to fix string display
    const displayArray = "[" + stringArray.replace(/,/g, ", ") + "]";
    return displayArray;
  }

  //   get the index values for array
  arrayIndex() {
    const arrayIndex = [];
    for (let i = 0; i < this.state.array.length; i++) {
      arrayIndex[i] = i;
    }
    console.log(arrayIndex);
    return arrayIndex;
  }
  //On submit --- add to array
  addToArray(e) {
    e.preventDefault();
    const addIndex = document.getElementById("indexInput").value;
    const addString = document.getElementById("stringInput").value;
    const array = this.state.array;
    array.splice(addIndex, 0, addString);
    this.setState({
      array: array
    });
  }

  removeFromArray(e) {
    e.preventDefault(e);
    const addIndex = document.getElementById("indexRemove").value;
    const array = this.state.array;
    array.splice(addIndex, 1);
    this.setState({
      array: array
    });
  }

  render() {
    return (
      <div className="content">
        <h3>Dynamic Arrays/Array List</h3>
        <h6>About Dynamic Arrays:</h6>
        <p>
          An array that can automatically resize. Dynamic arrays expands as you
          add more elements.
        </p>

        <h6>Pros:</h6>
        <ul>
          <li>Fast Lookups - Retrieves elements at O(1) time</li>
          <li>Variable Size - Can add as many items as you want</li>
          <li>
            Cache-friendly - Dynamic arrays places items right next to each
            other in memory, making efficient uses of caches
          </li>
        </ul>

        <h6>Cons:</h6>
        <ul>
          <li>
            Slow worst-case appends - Adding an element to the end of a dynamic
            usually takes O(1) time. However, the array does not have any space,
            it needs to expand, which takes O(n) time.
          </li>
          <li>
            Costly inserts and deletes - Adding or removing elements in the
            middle of the array means that other elements must "scoot" over,
            which takes O(n) time
          </li>
        </ul>
        <br />
        <br />

        <h3>Visualization:</h3>
        <p>
          Basic Javascript arrays are actually dynamic! Their sizes are
          variable. Here is an a simple array:
        </p>
        <br />
        {this.displayArray()}
        <br />
        <p>
          Add a value to the string at a certain index, or remove a value from a
          certain index.
        </p>
        <form onSubmit={e => this.addToArray(e)}>
          <input type="text" id="stringInput" />
          <select name="Index" id="indexInput">
            {/* Map the array index options */}
            {this.arrayIndex().map(index => {
              return (
                <option key={index} value={index}>
                  {index}
                </option>
              );
            })}
            <option>{this.arrayIndex().length}</option>
          </select>
          <button className="btn">Add to array</button>
        </form>

        {/* Remove from index value */}
        <form onSubmit={e => this.removeFromArray(e)}>
          <select name="Index" id="indexRemove">
            {/* Map the array index options */}
            {this.arrayIndex().map(index => {
              return (
                <option key={index} value={index}>
                  {index}
                </option>
              );
            })}
            <option>{this.arrayIndex().length}</option>
          </select>
          <button className="btn btn-danger">Remove from array</button>
        </form>
      </div>
    );
  }
}

export default ArrayList;
