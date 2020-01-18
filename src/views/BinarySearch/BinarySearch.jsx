import React, { Component } from "react";
import Highlight from "react-highlight";

class BinarySearch extends Component {
  constructor() {
    super();
    this.state = {
      array: [1, 3, 5, 16, 52, 63]
    };
  }

  recursiveFunction(arr, x, start, end) {
    console.log(arr, x, start, end);
    if (start > end) {
      //---false = x does not exist, entire list has been exhausted.
      return "Does not exist";
    }
    //--- Compute the middle function
    let mid = Math.floor((start + end) / 2);
    console.log(mid);
    console.log(arr[mid], x);

    // --- If the middle value is equal to x, return true
    if (arr[mid] === x) {
      return "Found: " + "INDEX:" + mid + " " + "VALUE: " + x;
    }

    // --- If middle value is greater than x, run function again with ending
    // --- as ending value equal to mid-1
    if (arr[mid] > x) {
      return this.recursiveFunction(arr, x, start, mid - 1);
    } else {
      return this.recursiveFunction(arr, x, mid + 1, end);
    }
  }

  recursiveFunctionButton(e) {
    e.preventDefault();
    let array = this.state.array;
    let x = parseInt(document.getElementById("recursiveSelect").value);
    console.log(x);
    console.log(this.recursiveFunction(array, x, 0, array.length - 1));
    let recursiveOutput = document.getElementById("recursiveOutput");
    recursiveOutput.innerText = this.recursiveFunction(
      array,
      x,
      0,
      array.length - 1
    );
  }

  iterativeFunction(arr, x) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
      //--- Find the mid index
      let mid = Math.floor((start + end) / 2);
      //--- If value is equal to mid value
      if (arr[mid] === x) {
        return "Found: " + "INDEX:" + mid + " " + "VALUE: " + x;
      } else if (arr[mid] < x) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    return "Does not exist";
  }
  iterativeFunctionButton(e) {
    e.preventDefault();
    let array = this.state.array;
    let x = parseInt(document.getElementById("iterativeSelect").value);
    console.log(x);
    console.log(this.recursiveFunction(array, x, 0, array.length - 1));
    let iterativeOutput = document.getElementById("iterativeOutput");
    iterativeOutput.innerText = this.iterativeFunction(array, x);
  }

  render() {
    return (
      <div className="content">
        <p>
          Binary search is an efficient algorithm for finding an item from a
          sorted list of items. It repeatedly divides the list in half portion
          of that list that could contain the targeted item. The binary search
          operates with the time complexitiy of O(logN), which is faster than
          linear search's O(n). The goal of this section is to be able to
          implement binary search in both recursive and iterative methods.
        </p>
        <h3>Recursive method</h3>
        <h6>Pseudo:</h6>
        <ul>
          <li>
            <b>Base Condition: </b>If starting index is greater than ending
            index, return false
          </li>
          <li>Compute the middle index</li>
          <li>If middle index is equal to the search value (x), return true</li>
          <li>
            If middle is greater than x, then call the same function with ending
            index as middle -1, repeat function{" "}
          </li>
          <li>
            If middle is less than x, then call the same function with starting
            index as middle +1
          </li>
        </ul>
        <h6>Javascript</h6>
        <Highlight>
          {`recursiveFunction(arr, x, start, end) {
    if (start > end) {
      //---false = x does not exist, entire list has been exhausted.
      return false;
    }
    //--- Compute the middle function
    let mid = Math.floor((start + end) / 2);

    // --- If the middle value is equal to x, return true
    if (arr[mid] === x) {
      return true;
    }

    // --- If middle value is greater than x, run function again with ending
    // --- as ending value equal to mid-1
    if (arr[mid] > x) {
      return this.recursiveFunction(arr, x, start, mid - 1);
    } else {
      return this.recursiveFunction(arr, x, mid + 1, end);
    }
  }`}
        </Highlight>
        <p>
          In this example, we will use the array of [1, 3, 5, 16, 52, 63] and
          where we search for a value.
        </p>
        <Highlight>
          {`this.recursiveFunction(array, x, 0, array.length - 1)`}
        </Highlight>
        <form onSubmit={e => this.printFunctionButton(e)}>
          <input
            type="number"
            id="recursiveSelect"
            placeholder="Search"
          ></input>
          <button className="btn">Search</button>
        </form>
        <div id="recursiveOutput"></div>
        <br />
        <h3>Iterative Method</h3>
        <p>
          The iterative function will use a while loop until it hits the base
          condition: where start index is less than end
        </p>
        <Highlight>
          {`iterativeFunction(arr, x) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
      //--- Find the mid index
      let mid = Math.floor((start + end) / 2);
      //--- If value is equal to mid value
      if (arr[mid] === x) {
        return true;
      } else if (arr[mid] < x) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    return false;
  }`}
        </Highlight>
        <p>The same array will be used: [1, 3, 5, 16, 52, 63]</p>
        <form onSubmit={e => this.iterativeFunctionButton(e)}>
          <input
            type="number"
            id="iterativeSelect"
            placeholder="Search"
          ></input>
          <button className="btn">Search</button>
        </form>
        <div id="iterativeOutput"></div>
      </div>
    );
  }
}
export default BinarySearch;
