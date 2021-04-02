// import * as React from "react";
// import { Chart } from "react-google-charts";
// import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import XLSX from "xlsx";

// import "../styles/Support.css";
const UploadPortal = () => {
  // State to store uploaded file
  const [file, setFile] = React.useState("");
  function ToggleFunction() {
    let kind = document.getElementById("category");
    let kind2 = kind.options[kind.selectedIndex].text;
    console.log(kind.options[kind.selectedIndex].text);
    console.log(kind2.localeCompare("RISE LABOR"));

    if (kind2.localeCompare("Labor Cost") == 0) {
      document.getElementById("store").style.visibility = "hidden";
      document.getElementById("storeLabel").style.visibility = "hidden";
    } else {
      document.getElementById("store").style.visibility = "visible";
      document.getElementById("storeLabel").style.visibility = "visible";
    }
  }

  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0]);

    // Add code here to upload file to server
    // ...
  }
  function processExcel(data) {
    const workbook = XLSX.read(data, { type: "binary" });
    const firstSheet = workbook.SheetNames[0];
    const excelRows = XLSX.utils.sheet_to_row_object_array(
      workbook.Sheets[firstSheet]
    );
    console.log(excelRows);
    return excelRows;
  }
  function uploadData(e) {
    e.preventDefault();

    let categoryElement = document.getElementById("category");
    let category = categoryElement.options[categoryElement.selectedIndex].text;

    let storeElement = document.getElementById("store");
    let store = storeElement.options[storeElement.selectedIndex].text;

    let yearElement = document.getElementById("year");
    let year = yearElement.value;

    let monthElement = document.getElementById("month");
    let month = monthElement.options[monthElement.selectedIndex].value;

    const fileUpload = document.getElementById("input");
    const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    let rowobj;
    if (regex.test(fileUpload.value.toLowerCase())) {
      // let fileName = fileUpload.files[0].name;
      if (typeof FileReader !== "undefined") {
        const reader = new FileReader();
        if (reader.readAsBinaryString) {
          reader.onload = (e) => {
            rowobj = processExcel(reader.result);
            // console.log(rowobj);
            if (year > 2010 && year < 2040) {
              if (category.localeCompare("Labor Cost") == 0) {
                // alert("hello");
                // console.log(data);
                axios
                  .post("https://ensemble-tiffany-demo.herokuapp.com/writeLaborCost", {
                    year: year,
                    month: month,
                    rowobj: rowobj,
                  })
                  .then(alert("Thanks for submission!"));
              } else {
                // console.log("hi");
                axios
                  .post(
                    "https://ensemble-tiffany-demo.herokuapp.com/writeMonthlySalesData",
                    {
                      store: store,
                      year: year,
                      month: month,
                      rowobj: rowobj,
                    }
                  )
                  .then(function refresh(){
                      alert("Thanks for submission!");
                      window.location.reload();
                  });
                // .then(window.location.reload());
              }
            }
          };
          reader.readAsBinaryString(fileUpload.files[0]);
        }
      } else {
        alert("This browser does not support HTML5.");
      }
    } else {
      alert("Please upload a valid Excel file.");
    }
  }

  return (
    <div>
      <label htmlFor="category">Choose a document to upload: </label>
      <select name="item1" id="category" onChange={ToggleFunction}>
        <option value="Sqaure">Square Sales Data</option>
        <option value="RISE">Labor Cost</option>
      </select>
      <br></br>
      <br></br>

      <label htmlFor="store" id="storeLabel">
        Choose a store:{" "}
      </label>
      <select name="item2" id="store">
        <option value="Polygon">Polygon</option>
        <option value="Gastown">Gastown</option>
      </select>
      <br></br>
      <br></br>

      <label htmlFor="year">Choose a year: </label>
      <input type="number" id="year"></input>
      <br></br>
      <br></br>

      <label htmlFor="month">Choose a month: </label>
      <select name="item3" id="month">
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <br></br>
      <br></br>
      <div id="upload-box">
        <input
          onChange={handleUpload}
          type="file"
          id="input"
          accept=".xls,.xlsx"
        />
        <br></br>
        <br></br>
        <p>Filename: {file.name}</p>
        <p>File type: {file.type}</p>
        <p>File size: {file.size} bytes</p>
      </div>
      <br></br>

      <button onClick={uploadData} id="buttonSubmit">
        Upload
      </button>
    </div>
  );
};
export default UploadPortal;
