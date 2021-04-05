import React, { useEffect } from "react";
import axios from "axios";
import "../styles/LittleNotebook.css";

//========================
// COMPONENT
//========================
const LittleNotebook = () => {
  //GLOBAL VARIABLES
  let msgData;
  let i;

  //==============================================
  // HELPER FUNCTION1 TO FIND THE INDEX OF THE ID
  //==============================================
  function findIndex(dataSet1, id) {
    for (let i = 0; i < dataSet1.length; i++) {
      if (dataSet1[i] == id) {
        return i;
      }
    }
    return -1;
  }

  //======================================================
  // HELPER FUNCTION TO FIND THE VALUE AT A CERTAIN INDEX
  //======================================================
  function findStatus(dataSet2, index) {
    return dataSet2[index];
  }

  //========================
  // READ TASK LIST FROM API
  //========================
  useEffect(async () => {
    axios
      .get("https://ensemble-tiffany-demo.herokuapp.com/readTask")
      .then((response) => {
        msgData = response.data;
        let bodyWrapper = document.getElementById("msgBox");

        // =============================
        // ASSEMBLE LIST DYNAMICALLY
        // =============================
        for (i = 0; i < response.data.length; i++) {
          let gridBox = document.createElement("div");
          bodyWrapper.appendChild(gridBox);
          gridBox.setAttribute("class", "gridContainer");

          let msgtop = document.createElement("h1");
          msgtop.innerHTML = "Title: " + response.data.title[i];

          let msgBtm = document.createElement("div");
          msgBtm.innerHTML = "Content: " + response.data.msg[i];

          let status = document.createElement("div");
          if (response.data.status[i]) {
            status.innerHTML = "Status: completed";
          } else {
            status.innerHTML = "Status: not completed";
          }

          //========================
          // MODIFY STATUS BUTTON AND ASSOCIATED FUNCTION
          //========================
          let modifyButton = document.createElement("button");
          modifyButton.innerHTML = "Change Status";
          modifyButton.setAttribute("id", response.data.idCollection[i]);
          modifyButton.addEventListener("click", modifyFunction);
          function modifyFunction() {
            let index = findIndex(response.data.idCollection, this.id);
            if (index < 0) {
              alert("Something went wrong!");
            }
            let updatedStatus = findStatus(response.data.status, index);

            // ================================
            // USE FETCH TO MAKE UPDATE REQUEST
            // ================================
            fetch("https://ensemble-tiffany-demo.herokuapp.com/updateTask", {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                selectedID: this.id,
                newStatus: !updatedStatus,
              }),
            })
              .then((res) => {
                if (res.ok) return res.json();
              })
              .then((data) => {
                window.location.reload();
              });
          }

          //======================================
          // DELETE BUTTON AND ASSOCIATED FUNCTION
          //======================================
          let deleteButton = document.createElement("button");
          deleteButton.innerHTML = "Delete";
          deleteButton.setAttribute("id", response.data.idCollection[i]);
          deleteButton.addEventListener("click", deleteFunction);
          function deleteFunction() {
            // ================================
            // USE FETCH TO MAKE DELETE REQUEST
            // ================================
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

          //========================
          // ATTACH ELEMENTS
          //========================
          gridBox.appendChild(msgtop);
          gridBox.appendChild(msgBtm);
          gridBox.appendChild(status);
          gridBox.appendChild(modifyButton);
          let break1 = document.createElement("BR");
          gridBox.appendChild(break1);
          gridBox.appendChild(deleteButton);
          let break2 = document.createElement("BR");
          gridBox.appendChild(break2);
          let break3 = document.createElement("hr");
          gridBox.appendChild(break3);
        }
      });
  }, []);

  //========================
  // ADD NEW TODOLIST FUNCTION
  //========================
  function UploadNotebook() {
    let msgSubject = document.getElementById("msgTitleInput").value;
    let msgBody = document.getElementById("msgBodyInput").value;

    //========================
    // ADD TASK API
    //========================
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

  //========================
  // HELPER: SEARCH TITLE FUNCTION
  //========================
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
          Enter a title:
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
          Add
        </button>
      </div>
      <br></br>
      <div id="searchBarContainer">
        <input
          placeholder="Search by title"
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
