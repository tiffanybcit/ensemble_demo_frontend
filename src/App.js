//import logo from './nemesislogo.png';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import XLSX from "xlsx";
import Header from "./components/Header";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import LabSalesPie from "./components/LabourSalesPie";
import RevExpBar from "./components/RevExpBar";
import ExpensePie from "./components/ExpenseChart";
import SaleSummBar from "./components/SaleSummaryChart";
import { Report } from "./components/Report";
import data from "./components/data.json";
import { Locations } from "./components/Locations";
import { Filter } from "./components/Filter";
import ScriptTag from "react-script-tag";
import Chart from "react-google-charts";

import DatePicker from "react-date-picker";

// import { BrowserRouter, Route, Switch } from 'react-router-dom';

import "./App.css";
import Login from "../src/components/Login";
import UseToken from "./js/UseToken";

import Sidebar from "./components/SideBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FaHockeyPuck } from "react-icons/fa";
// import Overview from './pages/Overview';
// import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
// import Team from './pages/Team';

// credits to https://github.com/briancodex/react-sidebar-dropdown/blob/main/src/App.js
const HeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  color: grey;
`;

const BodyWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const location_prompt = "Select Location";

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }

function App() {
  // const token = getToken();
  const { token, setToken } = UseToken();
  console.log(token);

  // const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />;
  } else {
  }
  return (
    <>
      {/* <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="./src/js/SalesbyDept"
      /> */}

      <div className="sideBar_container">
        <Router>
          <Sidebar />
          <div id="content">
            <Navbar>
              {/* <NavIcon to='#'>
                <FaIcons.FaBars onClick={showSidebar} />
              </NavIcon> */}
            </Navbar>
            <Switch>
              <Route path="/overview">
                <Overview />
              </Route>
              {/* <Route path='/reports' exact component={Reports} />
          <Route path='/reports/reports1' exact component={ReportsOne} />
          <Route path='/reports/reports2' exact component={ReportsTwo}/>
          <Route path='/reports/reports3' exact component={ReportsThree}/>
          <Route path='/team' exact component={Team}/> */}
              <Route path="/graphs/summaryofsales">
                <SummaryofSales />
              </Route>
              <Route path="/graphs/salesbydepartment">
                <SalesbyDept />
              </Route>
              <Route path="/graphs/labourbysales">
                <LabornSales />
              </Route>
              <Route path="/upload">
                <FileUploadPage />
              </Route>
              <Route path="/support">
                <Support />
              </Route>

              <Route path="/logout">
                <Logout />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
}

// function LoginPage(){
//   return (<form>
//     <label>
//       <p>Username</p>
//       <input type="text" />
//     </label>
//     <label>
//       <p>Password</p>
//       <input type="password" />
//     </label>
//     <div>
//       <button type="submit">Submit</button>
//     </div>
//   </form>);
// }

function LabornSales() {
  let data2;
  let foh = 0;
  let boh = 0;
  let laborCost = 0;
  let totalSales = 0;
  // console.log("data1     " + data2.result2[0]["dept"]);
  // console.log("data1     " + data2.result2[0]["net"]);
  // console.log(data2.result2.length);
  // var d = new Date();
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
    <div id="WrapperLabornSales">
      <HeaderWrap>
        <h2>Labor / Sales</h2>
      </HeaderWrap>
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
          placeholder="Type year here!"
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
}

function SummaryofSales() {
  let data1;
  let foh1 = 0;
  let boh1 = 0;

  let foh2 = 0;
  let boh2 = 0;

  let foh3 = 0;
  let boh3 = 0;

  let foh4 = 0;
  let boh4 = 0;

  let foh5 = 0;
  let boh5 = 0;

  let foh6 = 0;
  let boh6 = 0;

  let foh7 = 0;
  let boh7 = 0;

  let foh8 = 0;
  let boh8 = 0;

  let foh9 = 0;
  let boh9 = 0;

  let foh10 = 0;
  let boh10 = 0;

  let foh11 = 0;
  let boh11 = 0;

  let foh12 = 0;
  let boh12 = 0;

  const [data, setData] = useState({
    set: [
      ["Month", "FOH", "BOH"],
      ["Jan.", foh1, boh1],
      ["Feb.", foh2, boh2],
      ["Mar.", foh3, boh3],
      ["Apr.", foh4, boh4],
      ["May.", foh5, boh5],
      ["Jun.", foh6, boh6],
      ["Jul.", foh7, boh7],
      ["Aug.", foh8, boh8],
      ["Sept.", foh9, boh9],
      ["Oct.", foh10, boh10],
      ["Nov.", foh11, boh11],
      ["Dec.", foh12, boh12],
    ],
  });

  useEffect(async () => {
    const result = await axios.get(
      "https://nemesisproj.herokuapp.com/readSalesData"
    );
    data1 = result.data;
    var d = new Date();
    // var n = d.getFullYear();
    var n = 2020;
    console.log(n);

    for (let i = 0; i < data1["category"].length; i++) {
      if (data1["division"][i] != null) {
        if (data1["division"][i].localeCompare("FOH") == 0) {
          if (data1["month"][i] == 1 && data1["year"][i] == n) {
            foh1 = foh1 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 2 && data1["year"][i] == n) {
            foh2 = foh2 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 3 && data1["year"][i] == n) {
            foh3 = foh3 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 4 && data1["year"][i] == n) {
            foh4 = foh4 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 5 && data1["year"][i] == n) {
            foh5 = foh5 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 6 && data1["year"][i] == n) {
            foh6 = foh6 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 7 && data1["year"][i] == n) {
            foh7 = foh7 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 8 && data1["year"][i] == n) {
            foh8 = foh8 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 9 && data1["year"][i] == n) {
            foh9 = foh9 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 10 && data1["year"][i] == n) {
            foh10 = foh10 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 11 && data1["year"][i] == n) {
            foh11 = foh11 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 12 && data1["year"][i] == n) {
            foh12 = foh12 + parseInt(data1["net"][i]);
          }
        } else if (data1["division"][i].localeCompare("BOH") == 0) {
          if (data1["month"][i] == 1 && data1["year"][i] == n) {
            boh1 = boh1 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 2 && data1["year"][i] == n) {
            boh2 = boh2 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 3 && data1["year"][i] == n) {
            boh3 = boh3 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 4 && data1["year"][i] == n) {
            boh4 = boh4 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 5 && data1["year"][i] == n) {
            boh5 = boh5 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 6 && data1["year"][i] == n) {
            boh6 = boh6 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 7 && data1["year"][i] == n) {
            boh7 = boh7 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 8 && data1["year"][i] == n) {
            boh8 = boh8 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 9 && data1["year"][i] == n) {
            boh9 = boh9 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 10 && data1["year"][i] == n) {
            boh10 = boh10 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 11 && data1["year"][i] == n) {
            boh11 = boh11 + parseInt(data1["net"][i]);
          } else if (data1["month"][i] == 12 && data1["year"][i] == n) {
            boh12 = boh12 + parseInt(data1["net"][i]);
          }
        }
      }
    }
    let dataSet = [
      ["Month", "FOH", "BOH"],
      ["Jan.", foh1, boh1],
      ["Feb.", foh2, boh2],
      ["Mar.", foh3, boh3],
      ["Apr.", foh4, boh4],
      ["May.", foh5, boh5],
      ["Jun.", foh6, boh6],
      ["Jul.", foh7, boh7],
      ["Aug.", foh8, boh8],
      ["Sept.", foh9, boh9],
      ["Oct.", foh10, boh10],
      ["Nov.", foh11, boh11],
      ["Dec.", foh12, boh12],
    ];

    dataSet[1][1] = boh1;
    dataSet[1][2] = foh1;
    dataSet[2][1] = boh2;
    dataSet[2][2] = foh2;
    dataSet[3][1] = boh3;
    dataSet[3][2] = foh3;
    dataSet[4][1] = boh4;
    dataSet[4][2] = foh4;
    dataSet[5][1] = boh5;
    dataSet[5][2] = foh5;
    dataSet[6][1] = boh6;
    dataSet[6][2] = foh6;
    dataSet[7][1] = boh7;
    dataSet[7][2] = foh7;
    dataSet[8][1] = boh8;
    dataSet[8][2] = foh8;
    dataSet[9][1] = boh9;
    dataSet[9][2] = foh9;
    dataSet[10][1] = boh10;
    dataSet[10][2] = foh10;
    dataSet[11][1] = boh11;
    dataSet[11][2] = foh11;
    dataSet[12][1] = boh12;
    dataSet[12][2] = foh12;
    console.log("trigger 1", dataSet);

    setData({ set: dataSet });
  }, []);
  function mySubmitFunction() {
    let shopSelectionSelection = document.getElementById("shopSelection")
      .options[document.getElementById("shopSelection").selectedIndex].text;
    console.log(shopSelectionSelection);
    let yearSummarySales = document.getElementById("year").value;
    console.log(yearSummarySales);
    let typeSelectionElement = document.getElementById("typeSelection").value;
    console.log(typeSelectionElement);

    (async () => {
      const result = await axios.get(
        "https://nemesisproj.herokuapp.com/readSalesData"
      );
      data1 = result.data;
      console.log(data1);
      // var d = new Date();
      // var n = d.getFullYear();
      var n = yearSummarySales;
      console.log(n);

      for (let i = 0; i < data1["category"].length; i++) {
        if (data1["division"][i] != null) {
          if (
            data1["division"][i].localeCompare("FOH") == 0 &&
            data1["store"][i].localeCompare(yearSummarySales) == 0
          ) {
            if (data1["month"][i] == 1 && data1["year"][i] == n) {
              foh1 = foh1 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 2 && data1["year"][i] == n) {
              foh2 = foh2 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 3 && data1["year"][i] == n) {
              foh3 = foh3 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 4 && data1["year"][i] == n) {
              foh4 = foh4 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 5 && data1["year"][i] == n) {
              foh5 = foh5 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 6 && data1["year"][i] == n) {
              foh6 = foh6 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 7 && data1["year"][i] == n) {
              foh7 = foh7 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 8 && data1["year"][i] == n) {
              foh8 = foh8 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 9 && data1["year"][i] == n) {
              foh9 = foh9 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 10 && data1["year"][i] == n) {
              foh10 = foh10 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 11 && data1["year"][i] == n) {
              foh11 = foh11 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 12 && data1["year"][i] == n) {
              foh12 = foh12 + parseInt(data1["net"][i]);
            }
          } else if (
            data1["division"][i].localeCompare("BOH") == 0 &&
            data1["store"][i].localeCompare(yearSummarySales) == 0
          ) {
            if (data1["month"][i] == 1 && data1["year"][i] == n) {
              boh1 = boh1 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 2 && data1["year"][i] == n) {
              boh2 = boh2 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 3 && data1["year"][i] == n) {
              boh3 = boh3 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 4 && data1["year"][i] == n) {
              boh4 = boh4 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 5 && data1["year"][i] == n) {
              boh5 = boh5 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 6 && data1["year"][i] == n) {
              boh6 = boh6 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 7 && data1["year"][i] == n) {
              boh7 = boh7 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 8 && data1["year"][i] == n) {
              boh8 = boh8 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 9 && data1["year"][i] == n) {
              boh9 = boh9 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 10 && data1["year"][i] == n) {
              boh10 = boh10 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 11 && data1["year"][i] == n) {
              boh11 = boh11 + parseInt(data1["net"][i]);
            } else if (data1["month"][i] == 12 && data1["year"][i] == n) {
              boh12 = boh12 + parseInt(data1["net"][i]);
            }
          }
        }
      }
      let dataSet = [
        ["Month", "FOH", "BOH"],
        ["Jan.", foh1, boh1],
        ["Feb.", foh2, boh2],
        ["Mar.", foh3, boh3],
        ["Apr.", foh4, boh4],
        ["May.", foh5, boh5],
        ["Jun.", foh6, boh6],
        ["Jul.", foh7, boh7],
        ["Aug.", foh8, boh8],
        ["Sept.", foh9, boh9],
        ["Oct.", foh10, boh10],
        ["Nov.", foh11, boh11],
        ["Dec.", foh12, boh12],
      ];

      dataSet[1][1] = boh1;
      dataSet[1][2] = foh1;
      dataSet[2][1] = boh2;
      dataSet[2][2] = foh2;
      dataSet[3][1] = boh3;
      dataSet[3][2] = foh3;
      dataSet[4][1] = boh4;
      dataSet[4][2] = foh4;
      dataSet[5][1] = boh5;
      dataSet[5][2] = foh5;
      dataSet[6][1] = boh6;
      dataSet[6][2] = foh6;
      dataSet[7][1] = boh7;
      dataSet[7][2] = foh7;
      dataSet[8][1] = boh8;
      dataSet[8][2] = foh8;
      dataSet[9][1] = boh9;
      dataSet[9][2] = foh9;
      dataSet[10][1] = boh10;
      dataSet[10][2] = foh10;
      dataSet[11][1] = boh11;
      dataSet[11][2] = foh11;
      dataSet[12][1] = boh12;
      dataSet[12][2] = foh12;
      console.log("trigger 1", dataSet);

      setData({ set: dataSet });
    })();
  }
  return (
    <div id="WrapperSalesSummary">
      <HeaderWrap>
        <h2>Sales Summary</h2>
      </HeaderWrap>
      <div id="summarySalesChartWrapper" className="charts_container">
        <Chart
          width={"1200px"}
          height={"600px"}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={data.set}
          options={{
            // title: "Sales by Categories",
            // chartArea: { width: "50%" },
            // legend: {textStyle: {fontSize: 14}},
            // hAxis: {
            //   title: "Total Sales in Canadian Dollars",
            //   minValue: 0,
            //   textStyle: {
            //     bold: true,
            //     fontSize: 10,
            //     color: "#4d4d4d",
            //   },
            //   titleTextStyle: {
            //     bold: true,
            //     fontSize: 10,
            //     color: "#4d4d4d",
            //   },
            // },
            // vAxis: {
            //   title: "Category",
            //   textStyle: {
            //     fontSize: 10,
            //     bold: true,
            //     color: "#848484",
            //   },
            //   titleTextStyle: {
            //     fontSize: 10,
            //     bold: true,
            //     color: "#848484",
            //   },
            // },
            chart: {
              title: "Sales Summary Annual",
            },
          }}
          // For tests
          rootProps={{ "data-testid": "1" }}
        />
      </div>
      {/* <div id="chart_div" style="width: 1000px; height: 500px;"></div> */}
      <br></br>
      <label htmlFor="year">Choose a year: </label>
      <input type="number" id="year" placeholder="Type year here!" />
      <br></br>
      <br></br>
      <div id="shopOption">
        <label htmlFor="shopSelection">Choose a store: </label>
        <select name="shopSelection" id="shopSelection">
          <option value="polygon">Polygon</option>
          <option value="gastown">Gastown</option>
          <option value="store3">3</option>
          <option value="store4">4</option>
          <option value="store5">5</option>
        </select>
      </div>
      <br></br>
      <div id="typeOption">
        <label htmlFor="typeSelection">Choose net or gross: </label>
        <select name="typeSelection" id="typeSelection">
          <option value="netReport">Net</option>
          <option value="grossReport">Gross</option>
        </select>
      </div>
      <br></br>
      <button onClick={mySubmitFunction}>Submit</button>
    </div>
  );
}

function SalesbyDept() {
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
      "https://nemesisproj.herokuapp.com/readSalesData"
    );

    let dataSet = [
      ["City", "2010 Population"],
      ["BOH", boh],
      ["FOH", foh],
    ];

    data1 = result.data;
    // console.log(data1);
    // console.log("it gets here");

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
    let typeofReport = document.getElementById("gorn").options[
      document.getElementById("gorn").selectedIndex
    ].text;
    console.log(typeofReport);

    let shopName = document.getElementById("shopSelection").options[
      document.getElementById("shopSelection").selectedIndex
    ].text;
    console.log(shopName);
    if (!timeRange || !typeofReport) {
      alert("Missing a field!");
    } else {
      if (timeRange.localeCompare("Yearly") == 0) {
        if (typeofReport.localeCompare("Gross") == 0) {
          console.log("You have selected gross yearly!");
          (async () => {
            const result = await axios.get(
              "https://nemesisproj.herokuapp.com/readSalesData"
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
                  foh = foh + parseInt(ret["gross"][i]);
                } else if (
                  ret["store"][i].localeCompare(shopName) == 0 &&
                  ret["division"][i].localeCompare("BOH") == 0 &&
                  ret["year"][i].localeCompare(yearRange.toString()) == 0
                ) {
                  boh = boh + parseInt(ret["gross"][i]);
                }
              }
            }
            // this updates the dataset
            dataSet[1][1] = boh;
            dataSet[2][1] = foh;
            // console.log('trigger 1', dataSet);

            setData({ set: dataSet });
          })();
        } else {
          console.log("You have selected net yearly!");
          (async () => {
            const result = await axios.get(
              "https://nemesisproj.herokuapp.com/readSalesData"
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
                  foh = foh + parseInt(ret["net"][i]);
                } else if (
                  ret["store"][i].localeCompare(shopName) == 0 &&
                  ret["division"][i].localeCompare("BOH") == 0 &&
                  ret["year"][i].localeCompare(yearRange.toString()) == 0
                ) {
                  boh = boh + parseInt(ret["net"][i]);
                }
              }
            }
            // this updates the dataset
            dataSet[1][1] = boh;
            dataSet[2][1] = foh;
            // console.log('trigger 1', dataSet);

            setData({ set: dataSet });
          })();
        }
      } else if (timeRange.localeCompare("Monthly") == 0) {
        if (typeofReport.localeCompare("Gross") == 0) {
          console.log("You have selected gross monthly!");
          (async () => {
            const result = await axios.get(
              "https://nemesisproj.herokuapp.com/readSalesData"
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
                  foh = foh + parseInt(ret["gross"][i]);
                } else if (
                  ret["store"][i].localeCompare(shopName) == 0 &&
                  ret["division"][i].localeCompare("BOH") == 0 &&
                  ret["year"][i].localeCompare(yearRange.toString()) == 0 &&
                  ret["month"][i].localeCompare(monthRange) == 0
                ) {
                  boh = boh + parseInt(ret["gross"][i]);
                }
              }
            }
            // this updates the dataset
            dataSet[1][1] = boh;
            dataSet[2][1] = foh;
            // console.log('trigger 1', dataSet);

            setData({ set: dataSet });
          })();
        } else {
          console.log("You have selected net monthly!");
          (async () => {
            const result = await axios.get(
              "https://nemesisproj.herokuapp.com/readSalesData"
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
                  foh = foh + parseInt(ret["net"][i]);
                } else {
                  boh = boh + parseInt(ret["net"][i]);
                }
              }
            }
            // this updates the dataset
            dataSet[1][1] = boh;
            dataSet[2][1] = foh;
            // console.log('trigger 1', dataSet);

            setData({ set: dataSet });
          })();
        }
      } else if (timeRange.localeCompare("So Far") == 0) {
        if (typeofReport.localeCompare("Gross") == 0) {
          console.log("You have selected gross so far for one store!");
          (async () => {
            const result = await axios.get(
              "https://nemesisproj.herokuapp.com/readSalesData"
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
                  foh = foh + parseInt(ret["gross"][i]);
                } else {
                  boh = boh + parseInt(ret["gross"][i]);
                }
              }
            }
            // this updates the dataset
            dataSet[1][1] = boh;
            dataSet[2][1] = foh;
            // console.log('trigger 1', dataSet);

            setData({ set: dataSet });
          })();
        } else {
          console.log("You have selected net so far for one store!");
          (async () => {
            const result = await axios.get(
              "https://nemesisproj.herokuapp.com/readSalesData"
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
                  foh = foh + parseInt(ret["net"][i]);
                } else {
                  boh = boh + parseInt(ret["net"][i]);
                }
              }
            }
            // this updates the dataset
            dataSet[1][1] = boh;
            dataSet[2][1] = foh;
            // console.log('trigger 1', dataSet);

            setData({ set: dataSet });
          })();
        }
      } else {
        if (typeofReport.localeCompare("Gross") == 0) {
          console.log("You have selected gross across all stores!");
          (async () => {
            const result = await axios.get(
              "https://nemesisproj.herokuapp.com/readSalesData"
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
                  foh = foh + parseInt(ret["gross"][i]);
                } else {
                  boh = boh + parseInt(ret["gross"][i]);
                }
              }
            }
            // this updates the dataset
            dataSet[1][1] = boh;
            dataSet[2][1] = foh;
            // console.log('trigger 1', dataSet);

            setData({ set: dataSet });
          })();
        } else {
          console.log("you have selected net across all stores!");
          document.getElementById("PieGraphTitle").value = "hellllll";
          console.log(document.getElementById("PieGraphTitle").value);
          (async () => {
            const result = await axios.get(
              "https://nemesisproj.herokuapp.com/readSalesData"
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
                  foh = foh + parseInt(ret["net"][i]);
                } else {
                  boh = boh + parseInt(ret["net"][i]);
                }
              }
            }
            // this updates the dataset
            dataSet[1][1] = boh;
            dataSet[2][1] = foh;
            // console.log('trigger 1', dataSet);

            setData({ set: dataSet });
          })();
        }
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
    } else if (kindofRepoElementText.localeCompare("So Far") == 0) {
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
    <div id="wrapperSalesbyDept">
      <HeaderWrap>
        <h2>Sales by Departments</h2>
      </HeaderWrap>
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
        <option value="sofar">So Far</option>
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
          <option value="store3">3</option>
          <option value="store4">4</option>
          <option value="store5">5</option>
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
}

function FileUploadPage() {
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
                console.log(data);
                axios
                  .post("https://nemesisproj.herokuapp.com/writeLaborCost", {
                    year: year,
                    month: month,
                    rowobj: rowobj,
                  })
                  .then(alert("Thanks for submission!"));
              } else {
                // console.log("hi");
                axios
                  .post(
                    "https://nemesisproj.herokuapp.com/writeMonthlySalesData",
                    {
                      store: store,
                      year: year,
                      month: month,
                      rowobj: rowobj,
                    }
                  )
                  .then(alert("Thanks for submission!"));
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
    <div id="wrapperUploadPortal">
      <HeaderWrap>
        <h2>Upload Portal</h2>
      </HeaderWrap>

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
}

function Overview() {
  const [selected, setSelected] = useState(Locations[0]);
  const [value1, onChange1] = useState(new Date());
  const [value2, onChange2] = useState(new Date());

  (function () {
    var value = new Date().toISOString();
    return {
      value: value,
    };
  })();

  let handleChange = (value, formattedValue) => {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue: formattedValue, // Formatted String, ex: "11/19/2016"
    });
  };
  let componentDidUpdate = () => {
    // Access ISO String and formatted values from the DOM.
    var hiddenInputElement = document.getElementById("example-datepicker");
    console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
    console.log(hiddenInputElement.getAttribute("data-formattedvalue")); // Formatted String, ex: "11/19/2016"
  };

  return (
    <BodyWrap>
      <div className="charts_container">
        <SaleSummBar />
        {/* <RevExpBar /> */}
      </div>
      {/* <div className="charts_container"> */}
      {/* <LabSalesPie /> */}
      {/* <ExpensePie /> */}
      {/* </div> */}
      <Filter
        data={Locations}
        title={location_prompt}
        selected={selected}
        onSelectedChange={setSelected}
      />
      <DatePicker id="example-datepicker" onChange={onChange1} value={value1} />
      <DatePicker id="example-datepicker" onChange={onChange2} value={value2} />
      <Report data={data} />
    </BodyWrap>
  );

  // return (
  //   <div>
  //     <div className="charts_container">
  //       <SaleSummBar />
  //       {/* <RevExpBar /> */}
  //       {/* <LabSalesPie /> */}
  //       {/* <ExpensePie /> */}
  //     </div>
  //     <Filter
  //       data={Locations}
  //       title={location_prompt}
  //       selected={selected}
  //       onSelectedChange={setSelected}
  //     />
  //     <Report data={data} />
  //   </div>
  // );
}

function emailFunction() {
  window.location.href = "mailto:ygu32@my.bcit.ca";
}
function Support() {
  return (
    <div id="supportWrapper">
      <HeaderWrap>
        <h2>Contact Support Team!</h2>
      </HeaderWrap>
      <div id="innerSupportWrapper">
        Team Lead: Tiffany Gu
        <br></br>
        Phone Number: 7788986841
        <br></br>
        Email Address: ygu32@my.bcit.ca
      </div>
      <button onClick={emailFunction} id="buttonMailto">
        Email Support Team!
      </button>
    </div>
  );
}

function Logout() {
  function clearSession() {
    localStorage.clear();
    alert("You have successfully logged out!");
    window.location.reload();
  }

  return (
    <div id="WrapperLogout">
      <HeaderWrap>
        <h2>Logout</h2>
      </HeaderWrap>
      <h3>Are you sure you want to logout?</h3>
      <button onClick={clearSession}>Logout</button>
    </div>
  );
}

export default App;
