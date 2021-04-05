import React from "react";
import axios from "axios";
import XLSX from "xlsx";

//========================
// COMPONENT
//========================
const UploadPortal = () => {
  // State to store uploaded file
  const [file, setFile] = React.useState("");
  function ToggleFunction() {
    let typeofUpload = document.getElementById("category");
    let typeofUploadText =
      typeofUpload.options[typeofUpload.selectedIndex].text;

    if (typeofUploadText.localeCompare("Labor Cost") == 0) {
      document.getElementById("store").style.visibility = "hidden";
      document.getElementById("storeLabel").style.visibility = "hidden";
    } else {
      document.getElementById("store").style.visibility = "visible";
      document.getElementById("storeLabel").style.visibility = "visible";
    }
  }

  //========================
  // UPDATE FILE INFORMATION
  //========================
  function handleUpload(event) {
    setFile(event.target.files[0]);
  }

  //==============================
  // HELPER FUNCTION PARSING EXCEL
  //==============================
  function processExcel(data) {
    const workbook = XLSX.read(data, { type: "binary" });
    const firstSheet = workbook.SheetNames[0];
    const excelRows = XLSX.utils.sheet_to_row_object_array(
      workbook.Sheets[firstSheet]
    );
    return excelRows;
  }

  //================================
  // TRIGGER CLICKING UPLOAD BUTTON
  //================================
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
      if (typeof FileReader !== "undefined") {
        const reader = new FileReader();
        if (reader.readAsBinaryString) {
          reader.onload = (e) => {
            rowobj = processExcel(reader.result);

            if (year > 2015 && year < 2025) {
              if (category.localeCompare("Labor Cost") == 0) {
                //========================
                // WRITE LABOR DATA TO API
                //========================
                axios
                  .post(
                    "https://ensemble-tiffany-demo.herokuapp.com/writeLaborCost",
                    {
                      year: year,
                      month: month,
                      rowobj: rowobj,
                    }
                  )
                  .then(alert("Thanks for submission!"))
                  .then(function (response) {
                    if (response.data.msg.localeCompare("success") == 0) {
                      window.location.reload();
                    } else {
                      alert("Error!");
                    }
                  });
              } else {
                //========================
                // WRITE SALES DATA TO API
                //========================
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
                  .then(
                    alert("Thanks for submission!")
                  )
                  .then(function (response) {
                    console.log(response);
                    if (response.data.msg.localeCompare("success") == 0) {
                      window.location.reload();
                    } else {
                      alert("Error!");
                    }
                  });
              }
            } else {
              alert("Contact support team!");
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
