import React, { Component } from "react";
import Highlight from "react-highlight";
import BinaryTreePic from "./BinaryTree.png";
import "./BinaryTree.css";

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinaryTree extends Component {
  constructor() {
    super();
    this.state = {};
    this.root = null;
  }

  insert(data) {
    //--- Creating a new node and intializing it with data
    let newNode = new Node(data);

    //--- If root is null, then set node to root
    if (this.root === null) {
      this.root = newNode;
    } else {
      //--- Find correct position in  tree and add the  node
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    //--- If the data is less than the node,
    //--- move the data to the left of the tree
    if (newNode.data < node.data) {
      //--- If left is null, set as node
      if (node.left === null) {
        node.left = newNode;
      } else {
        //--- If left is not null, run until a null node is found
        this.insertNode(node.left, newNode);
      }
    }
    //--- If the data is more than the node,
    //--- Move the data to the right of the tree
    else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        //--- If right is not null, run function again to right node
        this.insertNode(node.right, newNode);
      }
    }
  }

  remove(data) {
    //--- Root is reinitialized with the root of a modified tree
    this.root = this.removeNode(this.root, data);
  }

  removeNode(node, key) {
    //--- If the root is null, then the tree is empty
    if (node === null) {
      return null;
    }
    //--- If data to be deleted is less than the roots data, move to left subtree
    else if (key < node.data) {
      node.left = this.removeNode(node.left, key);
      return node;
    }
    //--- If data is greater than roots data, move the right subtree
    else if (key > node.data) {
      node.right = this.removeNode(node.right, key);
      return node;
    }
    //--- If data is equal to key, delete!
    else {
      //--- Deleting a node with no children
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      //--- Deleting a node with one children
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      // //--- Delete a node with two children
      var temp = this.findMinNode(node.right);
      console.log(temp);
      node.data = temp.data;

      node.right = this.removeNode(node.right, temp.data);
      return node;
    }
  }

  //--- Searches for a node with a minimum value starting from node
  findMinNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  //---Inorder traversal: left, current, right
  inorder(node) {
    const traverseDisplay = document.getElementById("traverseResult");

    if (node !== null) {
      this.inorder(node.left);
      console.log(node.data);
      traverseDisplay.innerHTML += node.data + `, `;
      this.inorder(node.right);
    }
  }

  //---Preorder traversal: Visits current nodes before children
  preorder(node) {
    const traverseDisplay = document.getElementById("traverseResult");

    if (node != null) {
      console.log(node.data);
      traverseDisplay.innerHTML += node.data + `, `;
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  //---Postorder traversal: Visits the children nodes first before current node
  postorder(node) {
    const traverseDisplay = document.getElementById("traverseResult");

    if (node != null) {
      this.postorder(node.left);
      this.postorder(node.right);
      traverseDisplay.innerHTML += node.data + `, `;

      console.log(node.data);
    }
  }

  bfs(startingNode, e) {
    e.preventDefault();
    const bfsResult = document.getElementById("bfsResult");
    bfsResult.innerHTML = "";
    if (startingNode == null) {
      return;
    }
    const visited = [];
    for (var i = 0; i < visited.length; i++) {
      visited[i] = false;
    }
    const queue = [];
    function enqueue(node) {
      queue.push(node);
    }
    //---Add starting node to queue
    visited[startingNode] = true;
    enqueue(startingNode);

    //--- Loop until queue is empty
    while (queue.length != 0) {
      var node = queue.shift();
      console.log(node.data);
      bfsResult.innerHTML += node.data + `, `;
      //--- If node has two children, continue
      if (node.left == null && node.right == null) {
        continue;
      }
      //--- If node has a left children,  add the left node to the queue
      if (node.left != null) {
        queue.push(node.left);
      }
      //--- If node  has a right children, add the right node to the queue
      if (node.right != null) {
        queue.push(node.right);
      }
    }
  }

  //--- Search a node for a given data
  search(node, data) {
    //--- If tree is empty, return null
    if (node === null) {
      return null;
    } else if (data < node.data) {
      return this.search(node.left, data);
    } else if (data > node.data) {
      return this.search(node.right, data);
    } else return node;
  }

  traverse(e) {
    e.preventDefault();
    const traverseType = document.getElementById("traverseType").value;
    document.getElementById("traverseResult").innerText = "";
    console.log(traverseType);
    if (traverseType === "In order") {
      this.inorder(this.root);
    }
    if (traverseType === "Pre-order") {
      this.preorder(this.root);
    }
    if (traverseType === "Post-order") {
      this.postorder(this.root);
    }
  }

  render() {
    let BT = new BinaryTree();
    BT.insert(15);
    BT.insert(25);
    BT.insert(10);
    BT.insert(7);
    BT.insert(22);
    BT.insert(17);
    BT.insert(13);
    BT.insert(5);
    BT.insert(9);
    BT.insert(27);
    BT.insert(26);
    BT.insert(30);
    // console.log(BT.root);
    return (
      <div className="content">
        <p>
          A binary search tree is a form of binary tree. The only difference is
          that a binary tree has a specific ordering property:
        </p>
        <Highlight>{`all left descendents <= n < all right descendents`}</Highlight>
        <p>In this section, I follow this binary search tree.</p>
        <img src={BinaryTreePic} alt="Binary Tree Picture" id="treePic"></img>
        <br />
        <br />
        <h3>Binary Trees in Javascript</h3>
        <p>
          The first step is to create a class for nodes that are included in
          binary trees.
        </p>
        <Highlight>
          {`class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}`}
        </Highlight>
        <p>The functions that are included in a binary trees are:</p>
        <Highlight>
          {` insert(data) 
 remove(data) 
                

 Helper functions: 
 findMinNode() 
 inorder(node) 
 preorder(node)                
 postorder(node) 
 bfs(node)
 search(node, data) `}
        </Highlight>
        <h6>Insert data</h6>
        <p>
          In a nutshell, nodes are added by first going through the tree (left
          side if value of newNode is less than node.data, and right side if
          value of newNode is greater than node.data). It goes through the tree
          until a null position is found, and the node is added.
        </p>
        <Highlight>
          {`insert(data) {
    //--- Creating a new node and intializing it with data
    let newNode = new Node(data);

    //--- If root is null, then set node to root
    if (this.root === null) {
      this.root = newNode;
    } else {
      //--- Find correct position in  tree and add the  node
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    //--- If the data is less than the node,
    //--- move the data to the left of the tree
    if (newNode.data < node.data) {
      //--- If left is null, set as node
      if (node.left === null) {
        node.left = newNode;
      } else {
        //--- If left is not null, run until a null node is found
        this.insertNode(node.left, newNode);
      }
    }
    //--- If the data is more than the node,
    //--- Move the data to the right of the tree
    else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        //--- If right is not null, run function again to right node
        this.insertNode(node.right, newNode);
      }
    }
  }`}
        </Highlight>
        To print the binary tree above:
        <Highlight>
          {`let BT = new BinaryTree();
    BT.insert(15);
    BT.insert(25);
    BT.insert(10);
    BT.insert(7);
    BT.insert(22);
    BT.insert(17);
    BT.insert(13);
    BT.insert(5);
    BT.insert(9);
    BT.insert(27);
    BT.insert(26);
    BT.insert(30);`}
        </Highlight>
        <h6>Removing data</h6>
        <p>
          To remove a node on the tree, cycle through the tree until search
          value === node.data. Then, delete the node. We start of with the
          helper function that calls the removeNode function, and updates the
          root of the tree.
        </p>
        <Highlight>
          {`remove(data) {
    //--- Root is reinitialized with the root of a modified tree
    this.root = this.removeNode(this.root, data);
  }`}
        </Highlight>
        <p>
          removeNode then searches for the node, and then deletes it. Depending
          amount of childrens the nodes have, there are different methods to
          delete.
        </p>
        <ul>
          <li>
            <b>No children: </b>Pretty simple, just delete the node
          </li>
          <li>
            <b>One children: </b>Update the current node to equal to the
            children node.
          </li>
          <li>
            <b>Two children: </b> This one is a little bit more complicated. To
            delete a node, we find the node with the minimum value in its right
            subtree, and replace the current node with this minimum value.
            Another way to approach this is to find the maximum value in the
            left subtree.
          </li>
        </ul>
        <Highlight>
          {`removeNode(node, key) {
    //--- If the root is null, then the tree is empty
    if (node === null) {
      return null;
    }
    //--- If data to be deleted is less than the roots data, move to left subtree
    else if (key < node.data) {
      node.left = this.removeNode(node.left, key);
      return node;
    }
    //--- If data is greater than roots data, move the right subtree
    else if (key > node.data) {
      node.right = this.removeNode(node.right, key);
      return node;
    }
    //--- If data is equal to key, delete!
    else {
      //--- Deleting a node with no children
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      //--- Deleting a node with one children
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      // //--- Delete a node with two children
      var temp = this.findMinNode(node.right);
      console.log(temp);
      node.data = temp.data;

      node.right = this.removeNode(node.right, temp.data);
      return node;
    }
  }
`}
        </Highlight>
        <h5>Traversal methods - DFS</h5>
        <p>
          For traversal methods, there are three methods that we can use that
          follows a DFS method.
        </p>
        <ol>
          <li>
            <b>In order: </b>Visits the left branch, then the current node, then
            the right branch.
            <Highlight>
              {`inorder(node) {
    // console.log("ran");
    if (node !== null) {
      this.inorder(node.left);
      console.log(node.data);
      this.inorder(node.right);
    }
  }`}
            </Highlight>
          </li>
          <li>
            <b>Pre-order: </b>Visits the current node, then its children
            branches
            <Highlight>
              {` preorder(node) {
    if (node != null) {
      console.log(node.data);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }`}
            </Highlight>
          </li>
          <li>
            <b>Post-order: </b>Visits the chilren nodes, then the parent node.
            <Highlight>
              {`postorder(node) {
    if (node != null) {
      this.postorder(node.left);
      this.postorder(node.right);
      console.log(node.data);
    }
  }`}
            </Highlight>
          </li>
        </ol>
        <h6>Try it!</h6>
        <div>
          <form onSubmit={e => BT.traverse(e)}>
            <select className={"inline"} id="traverseType">
              <option>In order</option>
              <option>Pre-order</option>
              <option>Post-order</option>
            </select>
            <button className="btn">Traverse!</button>
          </form>
          <div id="traverseResult"></div>
        </div>
        <br />
        <h5>Traversal methods - BFS</h5>
        <p>Once again, the key to a implementing BFS is to use queue. </p>
        <Highlight>
          {` bfs(startingNode) {
    if (startingNode == null) {
      return;
    }
    const visited = [];
    for (var i = 0; i < visited.length; i++) {
      visited[i] = false;
    }
    const queue = [];
    function enqueue(node) {
      queue.push(node);
    }
    //---Add starting node to queue
    visited[startingNode] = true;
    enqueue(startingNode);

    //--- Loop until queue is empty
    while (queue.length != 0) {
      var node = queue.shift();
      console.log(node.data);
      //--- If node has two children, continue
      if (node.left == null && node.right == null) {
        continue;
      }
      //--- If node has a left children,  add the left node to the queue
      if (node.left != null) {
        queue.push(node.left);
      }
      //--- If node  has a right children, add the right node to the queue
      if (node.right != null) {
        queue.push(node.right);
      }
    }
  }`}
        </Highlight>
        <form onSubmit={e => BT.bfs(BT.root, e)}>
          <button className="btn">Traverse!</button>
        </form>
        <div id="bfsResult"></div>
      </div>
    );
  }
}
export default BinaryTree;
