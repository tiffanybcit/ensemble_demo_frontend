import { Chart } from "react-google-charts";
import React, { useState, useEffect } from "react";
import axios from "axios";

// ===============
// COMPONENT
// ===============
const LabornSales = () => {
  // =====================
  // INITIAL STATES
  // =====================
  let foh = 0;
  let boh = 0;
  let laborCost = 0;
  let totalSales = 0;

  // CURRENT YEAR
  var today = new Date();
  var yearRangeOverview = today.getFullYear();

  // ==============================
  // SET INITIAL STATES
  // ==============================
  const [data, setData] = useState({
    set: [
      ["Division", "Sales"],
      ["Labor/Sales", laborCost],
      ["", totalSales - laborCost],
    ],
  });

  useEffect(async () => {

    //========================
    // READ DATA FROM API
    //========================
    const result = await axios.get(
      "https://ensemble-tiffany-demo.herokuapp.com/readLaborAndSales"
    );

    let dataSet = [
      ["Division", "Sales"],
      ["Labor/Sales", laborCost],
      ["", totalSales - laborCost],
    ];
    let data2;
    data2 = result.data;
    // console.log(data2);

    // ==============================
    // ASSIGNS SALES DATA
    // ==============================
    for (let i = 0; i < data2.result2.length; i++) {
      if (data2.result2[i]["dept"] != null) {
        if (
          data2.result2[i]["dept"].localeCompare("FOH") == 0 &&
          data2.result2[i]["year"].localeCompare(
            yearRangeOverview.toString()
          ) == 0
        ) {
          foh = foh + parseInt(data2.result2[i]["net"]);
        } else if (
          data2.result2[i]["dept"].localeCompare("BOH") == 0 &&
          data2.result2[i]["year"].localeCompare(
            yearRangeOverview.toString()
          ) == 0
        ) {
          boh = boh + parseInt(data2.result2[i]["net"]);
        }
      }
    }

    // ==============================
    // ASSIGNS LABOR DATA
    // ==============================
    for (let j = 0; j < data2.result1.length; j++) {
      laborCost += data2.result1[j]["total"];
    }

    totalSales = boh + foh;

    if (totalSales - laborCost < 0) {
      alert("totalSales-laborCost has a negative value!");
      window.location.reload();
    }

    // ==================================
    // UPDATE STATE
    // ==================================
    dataSet[1][1] = laborCost;
    dataSet[2][1] = totalSales - laborCost;

    setData({ set: dataSet });
  }, []);

  // =======================================================
  // After clicking submit, this function updates the chart
  // =======================================================
  function GenerateNewChart() {
    let branchName = document.getElementById("shopSelectionLabornSales")
      .options[
      document.getElementById("shopSelectionLabornSales").selectedIndex
    ].text;
    let yearRange = document.getElementById("nearLabornSales").value;

    let typeofReport = document.getElementById("gornLabornSales").value;

    // error checking: fields cannot be empty
    if (branchName == "" || yearRange == "" || typeofReport == "") {
      alert("Field cannot be empty!");
      window.location.reload();
    } else {
      (async () => {

        //========================
        // READ DATA FROM API
        //========================
        const result = await axios.get(
          "https://ensemble-tiffany-demo.herokuapp.com/readLaborAndSales"
        );

        let dataSet = [
          ["Division", "Sales"],
          ["Labor/Sales", laborCost],
          ["", totalSales - laborCost],
        ];
        let data2;
        data2 = result.data;

        // ==============================
        // ASSIGNS SALES DATA
        // ==============================
        for (let i = 0; i < data2.result2.length; i++) {
          if (data2.result2[i]["dept"] != null) {
            if (
              branchName.includes(data2.result2[i]["shop"]) == true &&
              data2.result2[i]["dept"].localeCompare("FOH") == 0 &&
              data2.result2[i]["year"].localeCompare(yearRange.toString()) == 0
            ) {
              foh = foh + parseInt(data2.result2[i][typeofReport]);
            } else if (
              branchName.includes(data2.result2[i]["shop"]) == true &&
              data2.result2[i]["dept"].localeCompare("BOH") == 0 &&
              data2.result2[i]["year"].localeCompare(yearRange.toString()) == 0
            ) {
              boh = boh + parseInt(data2.result2[i][typeofReport]);
            }
          }
        }

        // ==============================
        // ASSIGNS LABOR DATA
        // ==============================
        for (let j = 0; j < data2.result1.length; j++) {
          if (data2.result1[j]["dept"].localeCompare(branchName) == 0) {
            laborCost += data2.result1[j]["total"];
          }
        }

        if (branchName.includes("FOH")) {
          totalSales = foh;
        } else {
          totalSales = boh;
        }

        if (totalSales - laborCost < 0) {
          alert("totalSales-laborCost has a negative value!");
          window.location.reload();
        }

        // ==================================
        // UPDATE STATE
        // ==================================
        dataSet[1][1] = laborCost;
        dataSet[2][1] = totalSales - laborCost;

        setData({ set: dataSet });
      })();
    }
  }

  return (
    <div>
      <Chart
        width={1200}
        height={500}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data.set}
        options={{
          colors: ["#e0440e", "#ffffff"],
        }}
        legendToggle
      />

      <br></br>
      <br></br>
      <div id="shopOptionLabornSales">
        <label htmlFor="shopSelectionLabornSales">
          Choose what you want to look at:{" "}
        </label>
        <select name="shopSelectionLabornSales" id="shopSelectionLabornSales">
          <option value="polygonf">Polygon FOH</option>
          <option value="gastownf">Gastown FOH</option>
          <option value="polygonb">Polygon BOH</option>
          <option value="gastownb">Gastown BOH</option>
        </select>
      </div>
      <br></br>

      <div id="yearlyOptionLabornSales">
        <label htmlFor="yearLabornSales">Choose a year: </label>
        <input type="number" id="nearLabornSales" />
      </div>
      <br></br>
      <div id="grossNetOptionLabornSales">
        <label htmlFor="gornLabornSales">I want to check: </label>
        <select name="gornLabornSales" id="gornLabornSales">
          <option value="net">Net</option>
          <option value="gross">Gross</option>
        </select>
      </div>
      <br></br>
      <br></br>
      <button onClick={GenerateNewChart}>Submit</button>
    </div>
  );
};

export default LabornSales;
