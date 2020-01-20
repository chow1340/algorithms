import React, { Component } from "react";
import graph from "./graph.png";
import "./graphs.css";
import exampleGraph from "./exampleGraph.png";
import Highlight from "react-highlight";
class Graphs extends Component {
  constructor(noOfVertices) {
    super();
    this.state = {
      vertices: ["A", "B", "C", "D", "E", "F"],
      displayDFS: []
    };

    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();

    this.addVertex = this.addVertex.bind(this);
    this.bfs = this.bfs.bind(this);
    this.addEdge = this.addEdge.bind(this);
    // this.getVertices = this.getVertices.bind(this);
  }
  //Add a new vertex by intializing AdjList with a new, null array
  addVertex(v) {
    this.AdjList.set(v, []);
  }

  //Adding edge to the graph
  addEdge(v, w) {
    /*Get the list for the vertex and w 
    represents the edge that connects v and w*/
    this.AdjList.get(v).push(w);

    /*Since this is a undirected graph, 
    that means w connects to v as well!*/
    this.AdjList.get(w).push(v);
  }

  printGraph() {
    var getKeys = this.AdjList.keys();

    for (var i of getKeys) {
      //Get corresponding values of adjacency list
      var getValues = this.AdjList.get(i);
      var conc = "";

      for (var j of getValues) {
        conc += j + " ";
      }

      console.log(i + "->" + conc);
    }
  }

  //---BFS
  bfs(e) {
    const bfsDiv = document.getElementById("bfsDiv");
    const displayArray = [];

    e.preventDefault();
    const startingNode = document.getElementById("vertex").value;
    console.log(startingNode);
    //create a visited array
    const visited = [];
    for (var i = 0; visited.length; i++) {
      visited[i] = false;
    }

    const queue = [];

    function enqueue(node) {
      queue.push(node);
    }
    //--- Add starting node to queue
    visited[startingNode] = true;
    enqueue(startingNode);

    //--- loop until queue is empty
    while (queue.length !== 0) {
      var getElementInQueue = queue.shift().toString();
      console.log(getElementInQueue);
      displayArray.push(getElementInQueue);
      //   bfsDiv.innerText += conc;

      //   var getElementInQueue = dequeue();
      var getList = this.AdjList.get(getElementInQueue);
      for (var i in getList) {
        var neigh = getList[i];
        if (!visited[neigh]) {
          visited[neigh] = true;
          enqueue(neigh);
        }
      }
    }
    console.log(displayArray);
    bfsDiv.innerText = displayArray.toString();
  }

  dfs(e) {
    const dfsDiv = document.getElementById("dfsDiv");
    // dfsDiv.innerText = "";
    e.preventDefault();
    let startingNode = document.getElementById("vertex2").value;
    var visited = [];
    for (var i = 0; i < visited.length; i++) {
      visited[i] = false;
    }

    this.DFSUtil(startingNode, visited);
    // console.log(this.DFSUtil(startingNode, visited));
    dfsDiv.innerText = this.state.displayDFS;
  }

  DFSUtil(vert, visited) {
    // const displayArray = [];
    visited[vert] = true;
    this.state.displayDFS.push(vert);
    // dfsDiv.innerText = displayDFS.toString();

    var getNeighbours = this.AdjList.get(vert);
    for (var i in getNeighbours) {
      var getElem = getNeighbours[i];
      if (!visited[getElem]) {
        this.DFSUtil(getElem, visited);
      }
    }
  }

  componentDidMount() {
    let vertices = this.state.vertices;
    for (var i = 0; i < vertices.length; i++) {
      var sel = document.getElementById("vertex");
      var opt = document.createElement("option");
      opt.appendChild(document.createTextNode(vertices[i]));
      sel.appendChild(opt);
    }
    for (var i = 0; i < vertices.length; i++) {
      var sel = document.getElementById("vertex2");
      var opt = document.createElement("option");
      opt.appendChild(document.createTextNode(vertices[i]));
      sel.appendChild(opt);
    }
  }
  render() {
    // Using the above implemented graph class
    var g = new Graphs(6);
    var vertices = this.state.vertices;

    // adding vertices
    for (var i = 0; i < vertices.length; i++) {
      g.addVertex(vertices[i]);
    }

    // adding edges
    g.addEdge("A", "B");
    g.addEdge("A", "D");
    g.addEdge("A", "E");
    g.addEdge("B", "C");
    g.addEdge("D", "E");
    g.addEdge("E", "F");
    g.addEdge("E", "C");
    g.addEdge("C", "F");

    g.printGraph();
    console.log("BFS");
    // g.bfs("D");
    // g.dfs("A");
    return (
      <div className="content">
        <h3>Implementing a Graph in Javascript</h3>
        <p>A graph contains a set of:</p>
        <ul>
          <li>
            <b>Vertices -</b> The nodes in the graph
          </li>
          <li>
            <b>Edge -</b> Connects the vertices
          </li>
        </ul>
        <img src={graph} alt="graph" className="image"></img>
        <br />
        <br />
        <p>
          When learning this topic, I found this article extremely helpful in
          helping me learn how graphs work:
          <a
            target="_blank"
            href="https://www.geeksforgeeks.org/implementation-graph-javascript/"
          >
            https://www.geeksforgeeks.org/implementation-graph-javascript/
          </a>{" "}
          In this section, I will use an undirected graph (where edges do not
          have a direction), and the graph will be represented through an
          adjacency list rather than an adjacency matrix. The first step is
          creating the class Graph itself. With an adjacency matrix, a Map class
          included in javascript is used (very similar to Objects).A graph will
          have the following functions:
        </p>
        <ul>
          <li>
            <b>Add Vertex</b>- Add a vertex to the graph.
          </li>
          <li>
            <b>Add Edges</b>- Links the vertexes in the graph
          </li>
          <li>
            <b>Print</b>- Show the output of the graph as an adjacency list,
            where every vertex stores a list of adjacent verticies.
          </li>
        </ul>
        <Highlight language="javascript">
          {`class Graphs extends Component {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();

  }
  //Add a new vertex by intializing AdjList with a new, null array
  addVertex(v) {
    this.AdjList.set(v, []);
  }

  //Adding edge to the graph
  addEdge(v, w) {
    /*Get the list for the vertex and w 
    represents the edge that connects v and w*/
    this.AdjList.get(v).push(w);

    /*Since this is a undirected graph, 
    that means w connects to v as well!*/
    this.AdjList.get(w).push(v);
  }

  printGraph() {
    var getKeys = this.AdjList.keys();

    for (var i of getKeys) {
      //Get corresponding values of adjacency list
      var getValues = this.AdjList.get(i);
      var conc = "";

      for (var j of getValues) {
        conc += j + " ";
      }

      console.log(i + "->" + conc);
    }
  }`}
        </Highlight>
        <p>Our goal is to recreate this graph: </p>
        <img className="image2" src={exampleGraph} alt="example graph"></img>
        <Highlight>
          {` // Using the above implemented graph class
    var g = new Graphs(6);
    var vertices = ["A", "B", "C", "D", "E", "F"];

    // adding vertices
    for (var i = 0; i < vertices.length; i++) {
      g.addVertex(vertices[i]);
    }

    // adding edges
    g.addEdge("A", "B");
    g.addEdge("A", "D");
    g.addEdge("A", "E");
    g.addEdge("B", "C");
    g.addEdge("D", "E");
    g.addEdge("E", "F");
    g.addEdge("E", "C");
    g.addEdge("C", "F");

    g.printGraph();`}
        </Highlight>
        The output is:
        <Highlight>{` A -> B D E 
 B -> A C 
 C -> B E F 
 D -> A E 
 E -> A D F C 
 F -> E C `}</Highlight>
        <p>
          {" "}
          Each key represents the vertex, and the value represents the array of
          edges.
        </p>
        <h3>Using BFS to search the graph</h3>
        <p>
          Breadth first search starts at the root (or whatever selected node)
          and explores each neighbour before going on to any of their children.
          That is, we go wide before deep. When implementing BFS, the key is to
          use an iterative solution and using queue.
        </p>
        <Highlight>
          {`//---BFS
  bfs(startingNode) {
    //create a visited array
    const visited = [];
    for (var i = 0; visited.length; i++) {
      visited[i] = false;
    }

    const queue = [];

    function enqueue(node) {
      queue.push(node);
    }
    //--- Add starting node to queue
    visited[startingNode] = true;
    enqueue(startingNode);

    //--- loop until queue is element
    while (queue.length != 0) {
      var getElementInQueue = queue.shift().toString();
      console.log(getElementInQueue);

      //   var getElementInQueue = dequeue();
      var getList = this.AdjList.get(getElementInQueue);
      for (var i in getList) {
        var neigh = getList[i];
        if (!visited[neigh]) {
          visited[neigh] = true;
          enqueue(neigh);
        }
      }
    }
  }`}
        </Highlight>
        <form onSubmit={e => g.bfs(e)}>
          Starting node: <select id="vertex"></select>
          <button id="printVertex" className="btn">
            BFS outcome
          </button>
        </form>
        <div id="bfsDiv"></div>
        <br />
        <br />
        <p>
          In the outcomes, the starting node is the root, and then BFS searches
          its neighbours, and then its neighbours neighbours, etc...
        </p>
        <h3>Using DFS to search the graph</h3>
        <p>
          In DFS, we visit a node a and then iterate through each of node a's
          neighbours. When visiting a node b that is a neighbour of a, we visit
          all of b's neighbours before going on to a's other neighbours. That
          is, a exhaustively searches b's branch before any of its neighbours.
          DFS uses a recursive method
        </p>
        <form onSubmit={e => g.dfs(e)}>
          Starting node: <select id="vertex2"></select>
          <button id="printVertex" className="btn">
            DFS outcome
          </button>
        </form>
        <div id="dfsDiv">{console.log(this.state.displayDFS.toString())}</div>
      </div>
    );
  }
}

export default Graphs;
