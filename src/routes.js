/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import ArrayList from "views/ArrayList/ArrayList.jsx";
import LinkedList from "views/LinkedList/LinkedList.jsx";
import StackQueue from "views/StackQueue/StackQueue.jsx";
import HashTables from "views/HashTables/HashTables.jsx";
import Graphs from "views/Graphs/graphs.jsx";
import BinarySearch from "views/BinarySearch/BinarySearch.jsx";
import Sort from "views/Sort/Sort.jsx";
import BinaryTree from "views/BinaryTree/BinaryTree.jsx";
var routes = [
  {
    path: "/home",
    name: "Home",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/array-list",
    name: "Array List",
    // icon: "nc-tile-56",
    component: ArrayList,
    layout: "/admin"
  },
  {
    path: "/linked-list",
    name: "Linked List",
    // icon: "nc-tile-56",
    component: LinkedList,
    layout: "/admin"
  },
  {
    path: "/stack-queue",
    name: "Stack and Queue",
    component: StackQueue,
    layout: "/admin"
  },
  {
    path: "/hash",
    name: "Hash Tables",
    component: HashTables,
    layout: "/admin"
  },
  {
    path: "/graphs",
    name: "Graphs",
    component: Graphs,
    layout: "/admin"
  },
  {
    path: "/binary-search",
    name: "Binary search",
    component: BinarySearch,
    layout: "/admin"
  },
  {
    path: "/sort",
    name: "Quick/Merge Sort",
    component: Sort,
    layout: "/admin"
  },
  {
    path: "/binary-tree",
    name: "Binary Search Tree",
    component: BinaryTree,
    layout: "/admin"
  }
];
export default routes;
