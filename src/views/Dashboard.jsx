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
import React from "react";

class Dashboard extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <h1>Welcome</h1>
          <h6>About this project</h6>
          <p>
            As a self-taught programmer, I realize that online curriculums do
            not always cover the basic concepts that computer science degrees
            cover. After talking to a friend who has already completed his
            degree, it was clear that data structures and algorithms were a
            crucial part of becoming a good programmer.
          </p>
          <br />
          <h6>Purpose</h6>
          <p>
            The purpose of this project is to track my learning curve of my
            progress of Data structure and Algorithms. It was a good way to
            practice my Javascript while honing my basic programming concepts.
            After reading up on the basics of DS/Algorithms, I found this
            article which had a lists of challenges:{" "}
            <a
              href="https://medium.com/@alimirio/before-you-start-solving-problems-on-leetcode-prep-work-9d65fc964c6f"
              target="_blank"
            >
              https://medium.com/@alimirio/before-you-start-solving-problems-on-leetcode-prep-work-9d65fc964c6f
            </a>
          </p>
          <br />
          <br />
          <h6>Suggestions</h6>
          <p>
            {" "}
            If you have any suggestions on how I can improve, want to talk about
            programming, or have any questions feel free to contact me at my
            email: jeffreychowcoding@gmail.com
          </p>
        </div>
      </>
    );
  }
}

export default Dashboard;
