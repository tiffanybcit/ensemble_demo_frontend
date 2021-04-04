// import * as React from "react";
import { Chart } from "react-google-charts";
// import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const LabornSales = () => {
  let data2;
  let foh = 0;
  let boh = 0;
  let laborCost = 0;
  let totalSales = 0;

  var today = new Date();
  let shopName = "Polygon FOH";
  // var monthRange = String(today.getDate()).padStart(2, '0');
  var monthRange = String(today.getMonth() + 1).padStart(2, ""); //January is 0!
  var yearRange = today.getFullYear();
  // console.log("Helllpppppp");
  console.log();
  console.log(monthRange);
  console.log();
  console.log(yearRange);
  console.log();
  console.log(shopName);
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
      "https://nemesisproj.herokuapp.com/readLaborAndSales"
    );

    let dataSet = [
      ["Division", "Sales"],
      ["Labor/Sales", laborCost],
      ["", totalSales - laborCost],
    ];

    data2 = result.data;
    console.log(data2);
    // console.log(data2.result2.length);

    console.log(shopName.includes(data2.result2[0]["shop"]) == true);
    console.log(data2.result2[0]["dept"].localeCompare("FOH") == 0);
    console.log(data2.result2[13]["year"] == yearRange);
    console.log(data2.result2[13]["month"] == monthRange);

    for (let i = 0; i < data2.result2.length; i++) {
      if (data2.result2[i]["dept"] != null) {
        if (
          shopName.includes(data2.result2[i]["shop"]) == true &&
          data2.result2[i]["dept"].localeCompare("FOH") == 0 &&
          data2.result2[i]["year"].localeCompare(yearRange.toString()) == 0 &&
          data2.result2[i]["month"].localeCompare(monthRange) == 0
        ) {
          foh = foh + parseInt(data2.result2[i]["net"]);
          console.log("it gets here!");
        } else if (
          shopName.includes(data2.result2[i]["shop"]) == true &&
          data2.result2[i]["dept"].localeCompare("BOH") == 0 &&
          data2.result2[i]["year"].localeCompare(yearRange.toString()) == 0 &&
          data2.result2[i]["month"].localeCompare(monthRange) == 0
        ) {
          boh = boh + parseInt(data2.result2[i]["net"]);
          console.log("it gets here!!!!");
        }
      }
    }

    for (let j = 0; j < data2.result1.length; j++) {
      if (data2.result1[j]["dept"].localeCompare(shopName) == 0) {
        laborCost = data2.result1[j]["total"];
      }
    }
    console.log("dataaaaa   " + foh);
    console.log("dataaaaa   " + boh);

    if (shopName.includes("FOH")) {
      totalSales = foh;
    } else {
      totalSales = boh;
    }

    // console.log(`foh ${foh}, boh ${boh}`);
    console.log(totalSales - laborCost);
    if (totalSales - laborCost < 0) {
      alert("totalSales-laborCost has a negative value!");
    }

    dataSet[1][1] = laborCost;
    dataSet[2][1] = totalSales - laborCost;
    console.log("trigger 1", dataSet);

    setData({ set: dataSet });
  }, []);
  function ToggleLabornSales() {
    let kind = document.getElementById("KindofRepoLabornSales");
    let kind2 = kind.options[kind.selectedIndex].text;
    console.log(kind2);

    if (kind2.localeCompare("Yearly") == 0) {
      document.getElementById("MonthlyOptionLabornSales").style.visibility =
        "hidden";
    } else {
      document.getElementById("MonthlyOptionLabornSales").style.visibility =
        "visible";
    }
  }
  return (
    <div>
      {/* <div id="piechart" style="width: 70%; height: 500px;"></div> */}
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

      <label htmlFor="KindofRepoLabornSales">
        Do you want to check yearly or monthly repo:{" "}
      </label>
      <select
        name="KindofRepoLabornSales"
        id="KindofRepoLabornSales"
        onChange={ToggleLabornSales}
      >
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <br></br>
      <br></br>
      <div id="ShopOptionLabornSales">
        <label htmlFor="ShopSelectionLabornSales">
          Choose what you want to look at:{" "}
        </label>
        <select name="ShopSelectionLabornSales" id="ShopSelectionLabornSales">
          <option value="polygonf">Polygon FOH</option>
          <option value="gastownf">Gastown FOH</option>
          <option value="polygonb">Polygon BOH</option>
          <option value="gastownb">Gastown BOH</option>
          <option value="store5">5</option>
        </select>
      </div>
      <br></br>

      <div id="YearlyOptionLabornSales">
        <label htmlFor="YearLabornSales">Choose a year: </label>
        <input
          type="NumberLabornSales"
          id="NearLabornSales"
        />
      </div>
      <br></br>
      <div id="GrossNetOptionLabornSales">
        <label htmlFor="GornLabornSales">I want to check: </label>
        <select name="GornLabornSales" id="GornLabornSales">
          <option value="net">Net</option>
          <option value="gross">Gross</option>
        </select>
      </div>
      <br></br>
      <div id="MonthlyOptionLabornSales">
        <label htmlFor="MonthLabornSales">Choose a month: </label>
        <select name="MonthLabornSales" id="MonthLabornSales">
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
      </div>
      <br></br>
      <button>Submit</button>
    </div>
  );
};

export default LabornSales;
