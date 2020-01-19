import React, { Component } from "react";
import Highlight from "react-highlight";
import "./Sort.css";
class Sort extends Component {
  constructor() {
    super();
    this.state = {
      array: [10, -1, 2, 5, 0, 6, 4, -5],
      items: [200, 4, 2, 6, 5, 3, 9]
    };
  }

  //---Merge sort with recursion
  mergeSort(unsortedArray) {
    //--- If  unsortedArray has one item or empty, return it
    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }

    //--- Divide the array in half
    const mid = Math.floor(unsortedArray.length / 2);

    //--- Divide the array into left half and right half
    const left = unsortedArray.slice(0, mid);
    const right = unsortedArray.slice(mid);
    // console.log(left);
    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  //--- Merge the two arrays
  merge(left, right) {
    let resultArray = [],
      leftIndex = 0,
      rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      // console.log(leftIndex, rightIndex);

      if (left[leftIndex] < right[rightIndex]) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    }
    return resultArray
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
  }

  ///---- QUICKSORT
  //--- temp is used so the value of items[firstindex] is not deleted
  swap(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
  }
  //--- Puts all numbers smaller than pivot to the left of pivot,
  //--- and values greater to the right of the pivot
  partition(items, left, right, use) {
    //--- Set pivot equal to the middle value of the items array
    var pivot = items[Math.floor((right + left) / 2)];
    var i = left;
    var j = right;
    console.log(pivot);

    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        this.swap(items, i, j);
        i++;
        j--;
      }
    }
    if (use === "displayPartition") {
      return items;
    }
    return i;
  }

  quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
      index = this.partition(items, left, right);
      console.log(left, right, index);
      console.log(items);
      if (left < index - 1) {
        this.quickSort(items, left, index - 1);
      }
      if (index < right) {
        this.quickSort(items, index, right);
      }
    }
    return items;
  }
  componentDidMount() {
    console.log(
      this.quickSort(this.state.items, 0, this.state.items.length - 1)
    );
  }

  //   get the index values for array
  arrayIndex() {
    const arrayIndex = [];
    for (let i = 0; i < this.state.array.length; i++) {
      arrayIndex[i] = i;
    }
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
  format(array, div) {
    const arrayFormat = array.toString();
    const displayArray = arrayFormat.replace(/,/g, ", ");
    console.log(displayArray);
    const sorted = document.getElementById(div);
    sorted.innerHTML = displayArray;
  }

  displayPartition() {
    var items = this.state.items;
    var left = 0;
    var right = items.length - 1;
    var display = this.partition(items, left, right, "displayPartition");
    const displayDiv = document.getElementById("partitionDisplay");
    displayDiv.innerText = "Result: " + display.toString().replace(/,/g, ", ");
    console.log(display);
  }

  render() {
    return (
      <div className="content">
        <p>
          In this section, I explore two of the common sorting methods: Merge
          Sort and Quick Sort
        </p>
        <h3>Merge Sort</h3>
        <p>
          Merge sort divides the array in half, sorts each of those halves, and
          then merges them back together. Each of those halves has the same
          sorting algorithm applied to it. Eventually, you are merging just two
          single-element arrays. It is the 'merge' part that does the heavy
          lifting.
        </p>
        <p>
          {" "}
          The merge method operates by copying all the elements from the target
          array segment into a helper array, keeping track of where the start of
          the left and right halves should be. We then iterate through helper,
          copying the smaller element from each half into the array. At the end,
          we copy and remaining elements into the target array.
        </p>
        <h6>
          Merge Sort in Javascript || runtime: O(n log(n)) average and worst
          case
        </h6>
        <p>
          First, write a recursive function that splits the array into a left
          and right half, with the base condition is set to having an array
          length of 0 or 1.
        </p>
        <Highlight>
          {`//---Merge sort with recursion
  mergeSort(unsortedArray) {
    //--- If  unsortedArray has one item or empty, return it
    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }

    //--- Divide the array in half
    const mid = Math.floor(unsortedArray.length / 2);

    //--- Divide the array into left half and right half
    const left = unsortedArray.slice(0, mid);
    const right = unsortedArray.slice(mid);
    // console.log(left);
    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }`}
        </Highlight>
        <p>
          {" "}
          Next, we will need a merge function for the left and right sides.{" "}
        </p>
        <Highlight>
          {`//--- Merge the two arrays
  merge(left, right) {
    let resultArray = [],
      leftIndex = 0,
      rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      console.log(leftIndex, rightIndex);

      if (left[leftIndex] < right[rightIndex]) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    }

    //--- Without the concat, a value will be missing from either the left or the right sides
    return resultArray
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
  }`}
        </Highlight>
        {this.state.array.toString().replace(/,/g, ", ")}
        <form onSubmit={e => this.addToArray(e)}>
          <input
            type="number"
            id="stringInput"
            placeholder="Insert a number"
            required
          />
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
        <button
          className={"btn" + " " + "inline"}
          onClick={() =>
            this.format(this.mergeSort(this.state.array), "sorted")
          }
        >
          Sort
        </button>
        <div id="sorted" className="inline"></div>
        <br />
        <br />
        <h3>Quick Sort</h3>
        <p>
          In quick sort, we pick a random element and partition the array, such
          that all numbers that are less than the partitioning element come
          before all elements that are greater than it.
        </p>
        <h6>Pseudo</h6>
        <ol>
          <li>
            Find a 'pivot item' in the array. This item is the basis for
            comparison for a single round.
          </li>
          <li>Start a pointer (left pointer) at the start of the array</li>
          <li>Start a pointer (right pointer) at the end of the array</li>
          <li>
            While the value of the left pointer is less than the pivot value,
            move the left pointer to the right. Continue until left pointer is
            greater or equal to pivot value.
          </li>
          <li>
            While the value of the right pointer is greater than the pivot
            value, move the right pointer to the left. Continue until left
            pointer is less than or equal to pivot value.
          </li>
          <li>
            If the left pointer is less than or equal to the right pointer
            value, swap the locations in the array.
          </li>
          <li>
            Move the left pointer to the right by one and the left pointer to
            the left by one. This signals that the operation is finished.
          </li>
          <li>
            If left pointer and right pointer do not meet, go back to step 1.
          </li>
        </ol>
        <h6>Writing quick sort in javascript</h6>
        <p>
          The first step is to write a function to swap two values. To do this,
          we use a temp to ensure the first value is not erased.
        </p>
        <Highlight>
          {`swap(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
  }`}
        </Highlight>
        Next, we use a partition function to move a selected pivot value.
        <br />
        <Highlight>
          {`//--- Puts all numbers smaller than pivot to the left of pivot,
//--- and values greater to the right of the pivot

partition(items, left, right) {
  //--- Set pivot equal to the middle value of the items array
  var pivot = items[Math.floor((right + left) / 2)];
  var i = left;
  var j = right;

  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      this.swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}`}
        </Highlight>
        <br />
        <br />
        <b>Try it!</b>
        <br />
        <div>
          Array: {this.state.items.toString().replace(/,/g, ", ")}
          <button className="btn" onClick={() => this.displayPartition()}>
            Partition once
          </button>
        </div>
        <div id="partitionDisplay"></div>
        <br />
        <p>
          Lastly, we write a function that runs partition multiple times until
          fully sorted.
        </p>
        <Highlight>
          {`quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
      index = this.partition(items, left, right);
      // console.log(left, right, index);
      console.log(items);
      if (left < index - 1) {
        this.quickSort(items, left, index - 1);
      }
      if (index < right) {
        this.quickSort(items, index, right);
      }
    }
    return items;
  }`}
        </Highlight>
        <br />
        <b>Try it!</b>
        <br />
        <div>Array: {this.state.items.toString().replace(/,/g, ", ")}</div>
        <button
          className="btn"
          onClick={() =>
            this.format(
              this.quickSort(this.state.items, 0, this.state.items.length - 1),
              "sortedQuick"
            )
          }
        >
          Quick Sort
        </button>
        <div>
          Result: <div className="inline" id="sortedQuick"></div>
        </div>
      </div>
    );
  }
}

export default Sort;
