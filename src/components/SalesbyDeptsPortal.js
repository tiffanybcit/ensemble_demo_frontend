// import * as React from "react";
import { Chart } from "react-google-charts";
// import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const SalesbyDeptPortal = () => {
  let data1;
  let boh = 0;
  let foh = 0;

  const [data, setData] = useState({
    set: [
      ["Departments", "Sales"],
      ["BOH", boh],
      ["FOH", foh],
    ],
  });

  useEffect(async () => {
    const result = await axios.get(
      "https://ensemble-tiffany-demo.herokuapp.com/readSalesData"
    );

    let dataSet = [
      ["City", "2010 Population"],
      ["BOH", boh],
      ["FOH", foh],
    ];

    data1 = result.data;

    for (let i = 0; i < data1["category"].length; i++) {
      if (data1["division"][i] != null) {
        if (data1["division"][i].localeCompare("FOH") == 0) {
          foh = foh + parseInt(data1["net"][i]);
        } else {
          boh = boh + parseInt(data1["net"][i]);
        }
      }
    }

    console.log(`foh ${foh}, boh ${boh}`);

    dataSet[1][1] = boh;
    dataSet[2][1] = foh;
    console.log("trigger 1", dataSet);

    setData({ set: dataSet });
  }, []);

  // fetch data from a url endpoint

  function GenerateNewPieChart() {
    let timeRange = document.getElementById("kindofRepoSales").options[
      document.getElementById("kindofRepoSales").selectedIndex
    ].text;
    console.log(timeRange);
    let yearRange = document.getElementById("year").value;
    console.log(yearRange);
    let monthRange = document.getElementById("month").selectedIndex + 1;
    console.log(monthRange);
    let typeofReport = document.getElementById("gorn").value;
    console.log(typeofReport);

    let shopName = document.getElementById("shopSelection").options[
      document.getElementById("shopSelection").selectedIndex
    ].text;
    console.log(shopName);
    if (!timeRange || !typeofReport) {
      alert("Missing a field!");
    } else {
      if (timeRange.localeCompare("Yearly") == 0) {
        console.log("You have selected yearly!");
        (async () => {
          const result = await axios.get(
            "https://ensemble-tiffany-demo.herokuapp.com/readSalesData"
          );
          let dataSet = [
            ["Department", "Sales"],
            ["BOH", boh],
            ["FOH", foh],
          ];

          let ret = result.data; // return value

          // do algorithm here
          for (let i = 0; i < ret["category"].length; i++) {
            if (ret["division"][i] != null) {
              if (
                ret["store"][i].localeCompare(shopName) == 0 &&
                ret["division"][i].localeCompare("FOH") == 0 &&
                ret["year"][i].localeCompare(yearRange.toString()) == 0
              ) {
                foh = foh + parseInt(ret[typeofReport][i]);
              } else if (
                ret["store"][i].localeCompare(shopName) == 0 &&
                ret["division"][i].localeCompare("BOH") == 0 &&
                ret["year"][i].localeCompare(yearRange.toString()) == 0
              ) {
                boh = boh + parseInt(ret[typeofReport][i]);
              }
            }
          }
          // this updates the dataset
          dataSet[1][1] = boh;
          dataSet[2][1] = foh;

          setData({ set: dataSet });
        })();
      } else if (timeRange.localeCompare("Monthly") == 0) {
        console.log("You have selected monthly!");
        (async () => {
          const result = await axios.get(
            "https://ensemble-tiffany-demo.herokuapp.com/readSalesData"
          );
          let dataSet = [
            ["Department", "Sales"],
            ["BOH", boh],
            ["FOH", foh],
          ];

          let ret = result.data; // return value

          // do algorithm here
          for (let i = 0; i < ret["category"].length; i++) {
            if (ret["division"][i] != null) {
              if (
                ret["store"][i].localeCompare(shopName) == 0 &&
                ret["division"][i].localeCompare("FOH") == 0 &&
                ret["year"][i].localeCompare(yearRange.toString()) == 0 &&
                ret["month"][i].localeCompare(monthRange) == 0
              ) {
                foh = foh + parseInt(ret[typeofReport][i]);
              } else if (
                ret["store"][i].localeCompare(shopName) == 0 &&
                ret["division"][i].localeCompare("BOH") == 0 &&
                ret["year"][i].localeCompare(yearRange.toString()) == 0 &&
                ret["month"][i].localeCompare(monthRange) == 0
              ) {
                boh = boh + parseInt(ret[typeofReport][i]);
              }
            }
          }
          // this updates the dataset
          dataSet[1][1] = boh;
          dataSet[2][1] = foh;
          console.log('trigger 1', dataSet);

          setData({ set: dataSet });
        })();
      } else if (timeRange.localeCompare("So Far One Store") == 0) {
        console.log("You have selected so far for one store!");
        (async () => {
          const result = await axios.get(
            "https://ensemble-tiffany-demo.herokuapp.com/readSalesData"
          );
          let dataSet = [
            ["Department", "Sales"],
            ["BOH", boh],
            ["FOH", foh],
          ];

          let ret = result.data; // return value

          // do algorithm here
          for (let i = 0; i < ret["category"].length; i++) {
            if (ret["division"][i] != null) {
              if (
                ret["store"][i].localeCompare(shopName) == 0 &&
                ret["division"][i].localeCompare("FOH") == 0
              ) {
                foh = foh + parseInt(ret[typeofReport][i]);
              } else if (
                ret["store"][i].localeCompare(shopName) == 0 &&
                ret["division"][i].localeCompare("BOH") == 0
              ) {
                boh = boh + parseInt(ret[typeofReport][i]);
              }
            }
          }
          // this updates the dataset
          dataSet[1][1] = boh;
          dataSet[2][1] = foh;
          console.log('trigger 1', dataSet);

          setData({ set: dataSet });
        })();
      } else {
        console.log("You have selected across all stores!");
        (async () => {
          const result = await axios.get(
            "https://ensemble-tiffany-demo.herokuapp.com/readSalesData"
          );
          let dataSet = [
            ["Department", "Sales"],
            ["BOH", boh],
            ["FOH", foh],
          ];

          let ret = result.data; // return value

          // do algorithm here
          for (let i = 0; i < ret["category"].length; i++) {
            if (ret["division"][i] != null) {
              if (ret["division"][i].localeCompare("FOH") == 0) {
                foh = foh + parseInt(ret[typeofReport][i]);
              } else {
                boh = boh + parseInt(ret[typeofReport][i]);
              }
            }
          }
          // this updates the dataset
          dataSet[1][1] = boh;
          dataSet[2][1] = foh;
          console.log('trigger 1', dataSet);

          setData({ set: dataSet });
        })();
      }
    }
  }

  // helper function to hide certain options when triggered
  function ToggleFunctionPie() {
    let kindofRepoElement = document.getElementById("kindofRepoSales");
    let kindofRepoElementText =
      kindofRepoElement.options[kindofRepoElement.selectedIndex].text;
    console.log(kindofRepoElementText);
    if (kindofRepoElementText.localeCompare("Yearly") == 0) {
      document.getElementById("monthlyOption").style.visibility = "hidden";
      document.getElementById("yearlyOption").style.visibility = "visible";
      document.getElementById("shopOption").style.visibility = "visible";
    } else if (kindofRepoElementText.localeCompare("Monthly") == 0) {
      document.getElementById("monthlyOption").style.visibility = "visible";
      document.getElementById("yearlyOption").style.visibility = "visible";
      document.getElementById("shopOption").style.visibility = "visible";
    } else if (kindofRepoElementText.localeCompare("So Far One Store") == 0) {
      document.getElementById("monthlyOption").style.visibility = "hidden";
      document.getElementById("yearlyOption").style.visibility = "hidden";
      document.getElementById("shopOption").style.visibility = "visible";
    } else {
      document.getElementById("monthlyOption").style.visibility = "hidden";
      document.getElementById("yearlyOption").style.visibility = "hidden";
      document.getElementById("shopOption").style.visibility = "hidden";
    }
  }

  return (
    <div>
      {/* <HeaderWrap>
          <h2>Sales by Departments</h2>
        </HeaderWrap> */}
      <div id="PieGraphTitle"></div>
      {/* <div id="piechart"></div> */}
      <Chart
        width={1200}
        height={500}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data.set}
        // options={{
        //   title: "Sales Summary So Far All Stores",
        // }}
        legendToggle
      />

      <label htmlFor="kindofRepoSales">
        Do you want to check yearly/monthly repo:{" "}
      </label>
      <select
        name="kindofRepoSales"
        id="kindofRepoSales"
        onChange={ToggleFunctionPie}
      >
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="sofarAll">So Far All Stores</option>
        <option value="sofar">So Far One Store</option>
      </select>
      <br></br>
      <br></br>
      <div id="grossNetOption">
        <label htmlFor="gorn">I want to check: </label>
        <select name="gorn" id="gorn">
          <option value="net">Net</option>
          <option value="gross">Gross</option>
        </select>
      </div>
      <br></br>
      <div id="yearlyOption">
        <label htmlFor="year">Choose a year: </label>
        <input type="number" id="year" />
      </div>
      <br></br>
      <div id="shopOption">
        <label htmlFor="shopSelection">Choose a store: </label>
        <select name="shopSelection" id="shopSelection">
          <option value="polygon">Polygon</option>
          <option value="gastown">Gastown</option>
        </select>
      </div>
      <br></br>
      <div id="monthlyOption">
        <label htmlFor="month">Choose a month: </label>
        <select name="month" id="month">
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

      <button onClick={GenerateNewPieChart}>Submit</button>
    </div>
  );
};

export default SalesbyDeptPortal;
