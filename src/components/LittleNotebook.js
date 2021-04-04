// import * as React from "react";
// import { Chart } from "react-google-charts";
// import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/LittleNotebook.css";

// import "../styles/Support.css";
const LittleNotebook = () => {
  let largestID;
  function UploadNotebook() {
    let msgSubject = document.getElementById("msgTitleInput").value;
    let msgBody = document.getElementById("msgBodyInput").value;
    // let biggestID = document.getElementById();
    console.log(msgSubject);
    console.log(msgBody);
    console.log(largestID);
    axios
      .post("https://ensemble-tiffany-demo.herokuapp.com/writeMsg", {
        msgSubject: msgSubject,
        msgBody: msgBody,
        largestID:largestID
      })
      .then(alert("Thanks for submission!"));
      window.location.reload();
      
  }

  useEffect(async () => {
    axios
      .get("https://ensemble-tiffany-demo.herokuapp.com/readMsg")
      .then((response) => {
        console.log(response.data);
        let msgData = response.data;
        let bodyWrapper = document.getElementById("msgBox");
        console.log(msgData.length);
        largestID = response.data.length;
        // console.log(msgData.length);
        for (let i = 0; i < response.data.length; i++) {
          let gridBox = document.createElement("div");
          bodyWrapper.appendChild(gridBox);
          gridBox.setAttribute("class", "gridContainer");

          let msgtop = document.createElement("h1");
          msgtop.innerHTML = "Title: "+response.data.title[i];

          let msgBtm = document.createElement("div");
          msgBtm.innerHTML = "Content: "+response.data.msg[i];

          gridBox.appendChild(msgtop);
          gridBox.appendChild(msgBtm);
          let break1 = document.createElement("BR");
          gridBox.appendChild(break1);
        }
      });
  }, []);
  function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchFieldName");
    filter = input.value.toUpperCase();
    ul = document.getElementById("msgBox");
    li = ul.getElementsByClassName("gridContainer");
    console.log(li[1]);
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("h1")[0];
      console.log(a.innerHTML);
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  return (
    <div>
      <label htmlFor="msgTitle" id="msgTitleLabel">
        Enter a subject:{" "}
      </label>
      <input id="msgTitleInput" />
      <br></br>
      <br></br>

      <label htmlFor="msgBody" id="msgBodyLabel">
        Enter some content:
      </label>
      <input id="msgBodyInput" />
      <br></br>
      <br></br>
      <div id="btnContainer">
        <button onClick={UploadNotebook} id="buttonSubmit">
          Submit
        </button>
      </div>
      <br></br>
      <div id="searchBarContainer">
        <input
          placeholder="Search by name"
          type="text"
          id="searchFieldName"
          onKeyUp={searchFunction}
        />
      </div>
      <br></br>
      <div id="msgBox"></div>
    </div>
  );
};
export default LittleNotebook;
