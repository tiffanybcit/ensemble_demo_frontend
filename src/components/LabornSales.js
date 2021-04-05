import { Chart } from "react-google-charts";
import React, { useState, useEffect } from "react";
import axios from "axios";

const LabornSales = () => {
  let data2;
  let foh = 0;
  let boh = 0;
  let laborCost = 0;
  let totalSales = 0;

  var today = new Date();
  // let branchNameOverview = "Polygon FOH";

  // var monthRangeOverview = String(today.getMonth() + 1).padStart(2, ""); //January is 0!
  var yearRangeOverview = today.getFullYear();

  console.log();
  // console.log(monthRange);
  console.log();
  console.log(yearRangeOverview);
  console.log();
  // console.log(branchNameOverview);
  // alert("datamonth"+data1["month"][0]);
  // alert("datamonth"+monthRange);

  const [data, setData] = useState({
    set: [
      ["Division", "Sales"],
      ["Labor/Sales", laborCost],
      ["", totalSales - laborCost],
    ],
  });

  useEffect(async () => {
    const result = await axios.get(
      "https://ensemble-tiffany-demo.herokuapp.com/readLaborAndSales"
    );

    let dataSet = [
      ["Division", "Sales"],
      ["Labor/Sales", laborCost],
      ["", totalSales - laborCost],
    ];

    data2 = result.data;
    console.log(data2);
    // console.log(data2.result2.length);

    // console.log(branchNameOverview.includes(data2.result2[0]["shop"]) == true);
    console.log(data2.result2[0]["dept"].localeCompare("FOH") == 0);
    console.log(data2.result2[13]["year"] == yearRangeOverview);
    // console.log(data2.result2[13]["month"] == monthRange);

    for (let i = 0; i < data2.result2.length; i++) {
      if (data2.result2[i]["dept"] != null) {
        if (
      
          data2.result2[i]["dept"].localeCompare("FOH") == 0 &&
          data2.result2[i]["year"].localeCompare(
            yearRangeOverview.toString()
          ) == 0
        ) {
          foh = foh + parseInt(data2.result2[i]["net"]);
          console.log("it gets here!");
        } else if (
        
          data2.result2[i]["dept"].localeCompare("BOH") == 0 &&
          data2.result2[i]["year"].localeCompare(
            yearRangeOverview.toString()
          ) == 0
        ) {
          boh = boh + parseInt(data2.result2[i]["net"]);
          console.log("it gets here!!!!");
        }
      }
    }

    for (let j = 0; j < data2.result1.length; j++) {
      // if (data2.result1[j]["dept"].localeCompare(branchNameOverview) == 0) {
        laborCost = data2.result1[j]["total"];
      // }
    }
    console.log("dataaaaa   " + foh);
    console.log("dataaaaa   " + boh);

   
    totalSales = boh;
   

    console.log(totalSales - laborCost);
    if (totalSales - laborCost < 0) {
      alert("totalSales-laborCost has a negative value!");
    }

    dataSet[1][1] = laborCost;
    dataSet[2][1] = totalSales - laborCost;
    console.log("trigger 1", dataSet);

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
    console.log(branchName);
    let yearRange = document.getElementById("nearLabornSales").value;
    console.log(yearRange);
    let typeofReport = document.getElementById("gornLabornSales").value;
    console.log(typeofReport);

    // error checking: fields cannot be empty
    if (branchName == "" || yearRange == "" || typeofReport == "") {
      alert("Field cannot be empty!");
      window.location.reload();
    } else {
      (async () => {
        const result = await axios.get(
          "https://ensemble-tiffany-demo.herokuapp.com/readLaborAndSales"
        );

        let dataSet = [
          ["Division", "Sales"],
          ["Labor/Sales", laborCost],
          ["", totalSales - laborCost],
        ];

        data2 = result.data;
        console.log(data2);

        console.log(branchName.includes(data2.result2[0]["shop"]) == true);
        console.log(data2.result2[0]["dept"].localeCompare("FOH") == 0);
        console.log(data2.result2[13]["year"] == yearRange);

        for (let i = 0; i < data2.result2.length; i++) {
          if (data2.result2[i]["dept"] != null) {
            if (
              branchName.includes(data2.result2[i]["shop"]) == true &&
              data2.result2[i]["dept"].localeCompare("FOH") == 0 &&
              data2.result2[i]["year"].localeCompare(yearRange.toString()) == 0
            ) {
              foh = foh + parseInt(data2.result2[i][typeofReport]);
              console.log("it gets here!");
            } else if (
              branchName.includes(data2.result2[i]["shop"]) == true &&
              data2.result2[i]["dept"].localeCompare("BOH") == 0 &&
              data2.result2[i]["year"].localeCompare(yearRange.toString()) == 0
            ) {
              boh = boh + parseInt(data2.result2[i][typeofReport]);
              console.log("it gets here!!!!");
            }
          }
        }

        for (let j = 0; j < data2.result1.length; j++) {
          if (data2.result1[j]["dept"].localeCompare(branchName) == 0) {
            laborCost = data2.result1[j]["total"];
          }
        }
        console.log("dataaaaa   " + foh);
        console.log("dataaaaa   " + boh);

        if (branchName.includes("FOH")) {
          totalSales = foh;
        } else {
          totalSales = boh;
        }

        console.log(totalSales - laborCost);
        if (totalSales - laborCost < 0) {
          alert("totalSales-laborCost has a negative value!");
        }

        dataSet[1][1] = laborCost;
        dataSet[2][1] = totalSales - laborCost;
        console.log("trigger 1", dataSet);

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
