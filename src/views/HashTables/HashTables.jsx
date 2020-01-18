import React, { Component } from "react";
import Highlight from "react-highlight";
import "./HashTables.css";

var hash = (string, max) => {
  var hash = 0;
  //For each character in the string, get the character code
  for (var i = 0; i < string.length; i++) {
    hash += string.charCodeAt(i);
  }
  return hash % max;
};

var HashTable = function(Limit, storageArray) {
  // var storage = storageArray;
  let storage;
  if (storageArray) {
    let storage = storageArray;
    return storage;
  } else storage = [];

  const storageLimit = Limit;

  this.print = function(div) {
    const hashTable = document.getElementById("tbody");
    hashTable.innerHTML = "";

    for (var i = 0; i < storage.length; i++) {
      let newRow = hashTable.insertRow(-1);
      let indexCell = newRow.insertCell(0);
      let kvCell = newRow.insertCell(1);

      indexCell.appendChild(document.createTextNode(i));
      // console.log(storage[i], i);
      if (storage[i]) {
        for (var n = 0; n < storage[i].length; n++) {
          kvCell.appendChild(document.createTextNode(storage[i][n] + " ||"));
        }
      }
      if (storage[i] === undefined) {
        kvCell.appendChild(document.createTextNode("empty"));
      }
    }
    return storage;
  };

  this.add = function(key, value) {
    var index = hash(key, storageLimit);
    //If the storage index is empty
    if (storage[index] === undefined) {
      storage[index] = [[key, value]];
      return;
    } else {
      //If the storage index already has a value
      var inserted = false;
      //---Check if the key exists already
      for (var i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          //Set the key to the new value
          storage[index][i][1] = value;
          inserted = true;
        }
      }
      if (inserted === false) {
        //push in the item to the table
        storage[index].push([key, value]);
      }
    }
    return storage;
  };

  this.remove = function(key) {
    var index = hash(key, storageLimit);
    /*if the bucket only contains one item, and the 
    item in the bucket is equal to the key, delete */
    if (!index) {
      return null;
    }
    if (storage[index].length === 1 && storage[index][0][0] === key) {
      delete storage[index];
    } else {
      //Go through the storage to find the key, and then delete
      for (var i = 0; i < storage[index]; i++) {
        if (storage[index][i][0] === key) {
          delete storage[index][i];
        }
      }
    }
  };
  this.lookup = function(key) {
    const searchDiv = document.getElementById("searchValue");
    var index = hash(key, storageLimit);
    if (storage[index] === undefined) {
      return undefined;
    } else {
      for (var i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          console.log(storage[index][i][1]);
          searchDiv.innerHTML = "Value: " + storage[index][i][1];
          return storage[index][i][1];
        }
      }
    }
  };
};
class HashTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storage: []
    };

    this.printHashTable = this.printHashTable.bind(this);
  }
  printHashTable(e, fnc) {
    const storageLimit = document.getElementById("storageLimit").value;
    let ht = new HashTable(storageLimit);
    const storage = this.state.storage;
    ht.add("jeffrey", "person");
    ht.add("fido", "dog");
    ht.add("running", "activity");
    console.log(storage);
    // console.log(ht.print("print", storage));

    if (fnc === "print") {
      ht.print("print", storage);
      // console.log(storage);
      this.setState({
        storage: ht.print("print", storage)
      });
    }
    if (fnc === "add") {
      e.preventDefault(e);
      const key = document.getElementById("addKeyInput").value;
      const value = document.getElementById("addValueInput").value;
      ht.add(key, value);
      ht.print("print", storage);
      this.setState({
        storage: ht.print("print", storage)
      });
      console.log(storage);
    }
    if (fnc === "delete") {
      e.preventDefault(e);
      const key = document.getElementById("removeKeyInput").value;
      ht.remove(key);
      ht.print("print");
      this.setState({
        storage: ht.print("print", storage)
      });
    }
    if (fnc === "search") {
      e.preventDefault(e);
      const key = document.getElementById("searchKeyInput").value;
      ht.lookup(key);
    }
  }

  render() {
    return (
      <div className="content">
        <h6>Writing a hash table</h6>
        <p>
          In this section, I will create a hash table using a hash function.{" "}
        </p>
        <h6>Hashing each character</h6>
        <p>
          The first step is to get the unicode of each character, then putting
          it into a hash string. In this function, max represents the total
          number of bucket entries.
        </p>
        <Highlight language="javascript">{`var hash = (string, max) => {
      var hash = 0;
      //For each character in the string, get the character code
      for (var i = 0; i < string.length; i++) {
        hash += string.charCodeAt(i);
      }
      return hash%max
    };
    
hash("jeffrey", 4) will return '3'`}</Highlight>
        <h6>Creating the Hash Table</h6>
        <Highlight language="javascript">
          <p>First, we will set a class for HashTables</p>
          {`var HashTable = function() {
  var storage = [];
  const storageLimit = 5;
};`}
        </Highlight>
        <p>Next, create a function to add to the hashtable</p>
        <Highlight>
          {`this.add = function(key, value) {
    var index = hash(key, storageLimit);
    //---If the storage index is empty
    if (storage[index] === undefined) {
      storage[index] = [[key, value]];
    } else {
      //---If the storage index already has a value
      var inserted = false;
      //---Check if the key exists already
      for (var i = 0; i < storage[index].length; i++ ) {
        if (storage[index][i][0] === key) {
          //Set the key to the new value
          storage[index][i][1] = value;
          inserted = true;
          console.log(storage);
          return;
        }
      }
      if (inserted === false) {
        //---push in the item to the table
        storage[index].push([key, value]);
      }
    }
  };
`}
        </Highlight>
        <br />
        <p>
          To demonstrate the table, here I added a three elements to the table
        </p>
        <table id="printTable">
          <thead>
            <tr>
              <th>Index</th>
              <th>Key/value</th>
            </tr>
          </thead>
          <tbody id="tbody"></tbody>
        </table>
        <div>
          <p className="inline">Storage limit:</p>
          <input
            type="number"
            defaultValue="4"
            placeholder="Storage Limit"
            id="storageLimit"
          ></input>
          <button
            id="printButton"
            className="btn"
            onClick={e => this.printHashTable(e, "print")}
          >
            Print table
          </button>
        </div>

        <form onSubmit={e => this.printHashTable(e, "add")}>
          <input type="text" id="addKeyInput" placeholder="key"></input>
          <input type="text" id="addValueInput" placeholder="value"></input>
          <button className="btn">Add to Hash Table</button>
        </form>

        <form onSubmit={e => this.printHashTable(e, "delete")}>
          <input type="text" id="removeKeyInput" placeholder="key"></input>
          <button className="btn">Remove from Hash Table</button>
        </form>
        <form onSubmit={e => this.printHashTable(e, "search")}>
          <input type="text" id="searchKeyInput" placeholder="key"></input>
          <button className="btn">Search from Hash Table</button>
          <div id="searchValue">Value: </div>
        </form>
      </div>
    );
  }
}

export default HashTables;
