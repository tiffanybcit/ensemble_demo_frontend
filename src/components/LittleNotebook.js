// import * as React from "react";
// import { Chart } from "react-google-charts";
// import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/LittleNotebook.css";

// import "../styles/Support.css";
const LittleNotebook = () => {
  let msgData;
  let i;

  function findIndex(dataSet1, id){
    for(let i = 0; i < dataSet1.length; i++){
      if(dataSet1[i] == id){
        return i;
      }
    }
    return -1;
  }

  function findStatus(dataSet2, index){
    return dataSet2[index];
  }


  useEffect(async () => {
    axios
      .get("https://ensemble-tiffany-demo.herokuapp.com/readTask")
      .then((response) => {
        console.log(response.data);
        msgData = response.data;
        console.log(msgData);
        let bodyWrapper = document.getElementById("msgBox");
        console.log(msgData.length);

        // console.log(msgData.length);

        for (i = 0; i < response.data.length; i++) {
          let gridBox = document.createElement("div");
          bodyWrapper.appendChild(gridBox);
          gridBox.setAttribute("class", "gridContainer");

          let msgtop = document.createElement("h1");
          msgtop.innerHTML = "Title: " + response.data.title[i];

          let msgBtm = document.createElement("div");
          msgBtm.innerHTML = "Content: " + response.data.msg[i];

          let status = document.createElement("div");
          status.innerHTML = "Status: " + response.data.status[i];

          let modifyButton = document.createElement("button");
          modifyButton.innerHTML = "Change Status";
          modifyButton.setAttribute("id", response.data.idCollection[i]);
          modifyButton.addEventListener("click", modifyFunction);
          function modifyFunction() {
            
            
            let index = findIndex(response.data.idCollection, this.id);
            let updatedStatus = findStatus(response.data.status, index);
            alert(this.id);

            fetch("https://ensemble-tiffany-demo.herokuapp.com/updateTask", {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                selectedID: this.id,
                newStatus: !updatedStatus

              }),
            })
              .then((res) => {
                if (res.ok) return res.json();
              })
              .then((data) => {
                window.location.reload();
              });
          }

          let deleteButton = document.createElement("button");
          deleteButton.innerHTML = "Delete";
          deleteButton.setAttribute("id", response.data.idCollection[i]);
          deleteButton.addEventListener("click", deleteFunction);
          function deleteFunction() {
            alert(this.id);
            fetch("https://ensemble-tiffany-demo.herokuapp.com/deleteTask", {
              method: "delete",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                selectedID: this.id,
              }),
            })
              .then((res) => {
                if (res.ok) return res.json();
              })
              .then((data) => {
                window.location.reload();
              });
          }

          gridBox.appendChild(msgtop);
          gridBox.appendChild(msgBtm);
          gridBox.appendChild(status);
          gridBox.appendChild(modifyButton);
          let break1 = document.createElement("BR");
          gridBox.appendChild(break1);
          let break2 = document.createElement("BR");
          gridBox.appendChild(break2);
          gridBox.appendChild(deleteButton);
          let break3 = document.createElement("BR");
          gridBox.appendChild(break3);
        }
        // largestID = response.data.idCollection[i];
      });
  }, []);

  function UploadNotebook() {
    let msgSubject = document.getElementById("msgTitleInput").value;
    let msgBody = document.getElementById("msgBodyInput").value;
    // let biggestID = document.getElementById();
    console.log(msgSubject);
    console.log(msgBody);
    console.log(msgData);
    console.log(msgData.idCollection[i - 1] + 1);
    axios
      .post("https://ensemble-tiffany-demo.herokuapp.com/writeTask", {
        msgSubject: msgSubject,
        msgBody: msgBody,
        largestID: msgData.idCollection[i - 1] + 1,
        status: false,
      })
      .then(alert("Thanks for submission!"))
      .then(function (response) {
        if (response.data.msg.localeCompare("success") == 0) {
          window.location.reload();
        } else {
          alert("Error!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
      <div id="topPortion">
        <label htmlFor="msgTitle" id="msgTitleLabel">
          Enter a subject:
        </label>
        <input id="msgTitleInput" />
        <br></br>
        <br></br>

        <label htmlFor="msgBody" id="msgBodyLabel">
          Enter some content:
        </label>
        <input id="msgBodyInput" />
      </div>
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
