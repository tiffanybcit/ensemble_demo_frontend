//import logo from './nemesislogo.png';
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Helmet } from "react-helmet";

import Header from "./components/Header";
import styled from "styled-components";
import Navbar from "./components/Navbar";
// import LabSalesPie from "./components/LabourSalesPie";
// import RevExpBar from "./components/RevExpBar";
// import ExpensePie from "./components/ExpenseChart";
import LogoutPage from "./components/Logout";
import SupportPage from "./components/Support";
import UploadPortal from "./components/UploadPortal";
import SummaryofSalesPortal from "./components/SalesSummaryPortal";
import SalesbyDeptsPortal from "./components/SalesbyDeptsPortal";
import LabornSales from "./components/LabornSales";
import LittleNotebook from "./components/LittleNotebook";
import OverviewAPI from "./components/OverviewAPI";
// import { Report } from "./components/Report";
import data from "./components/data.json";
// import { Locations } from "./components/Locations";
// import { Filter } from "./components/Filter";
// import ScriptTag from "react-script-tag";
import Chart from "react-google-charts";

// import DatePicker from "react-date-picker";

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
              <Route path="/graphs/summaryofsales">
                <SummaryofSales />
              </Route>
              <Route path="/graphs/salesbydepartment">
                <SalesbyDept />
              </Route>
              <Route path="/graphs/labourbysales">
                <LaborSales />
              </Route>
              <Route path="/upload">
                <FileUploadPage />
              </Route>
              <Route path="/support">
                <Support />
              </Route>
              <Route path="/todolist">
                <TodoList />
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

function TodoList() {
  return (
    <div id="WrapperTodoList">
    <HeaderWrap>
      <h2>Todo List</h2>
    </HeaderWrap>
   <LittleNotebook />
  </div>
  
  );
}

function LaborSales() {
  return (
    <div id="WrapperLabornSales">
      <HeaderWrap>
        <h2>Labor / Sales</h2>
      </HeaderWrap>
      <LabornSales />
    </div>
  );
}

function SummaryofSales() {
  return (
    <div id="WrapperSalesSummary">
      <HeaderWrap>
        <h2>Sales Summary</h2>
      </HeaderWrap>
      <SummaryofSalesPortal />
    </div>
  );
}

function SalesbyDept() {
  return (
    <div id="wrapperSalesbyDept">
      <HeaderWrap>
        <h2>Sales by Departments</h2>
      </HeaderWrap>
      <SalesbyDeptsPortal />
    </div>
  );
}

function FileUploadPage() {
  return (
    <div id="wrapperUploadPortal">
      <HeaderWrap>
        <h2>Upload Portal</h2>
      </HeaderWrap>
      <UploadPortal />
    </div>
  );
}

function Overview() {
  return (
    <div>
      <HeaderWrap>
        <h2>Welcome Back! Here is your daily taco recipe!!</h2>
      </HeaderWrap>
      <OverviewAPI />
    </div>
  );
}

function Support() {
  return (
    <div id="supportWrapper">
      <HeaderWrap>
        <h2>Contact Support Team!</h2>
      </HeaderWrap>
      <SupportPage />
    </div>
  );
}

function Logout() {
  return (
    <div id="WrapperLogout">
      <HeaderWrap>
        <h2>Logout</h2>
      </HeaderWrap>
      <LogoutPage />
    </div>
  );
}

export default App;
