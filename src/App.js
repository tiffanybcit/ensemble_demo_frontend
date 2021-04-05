import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// COMPONENTS
import LogoutPage from "./components/Logout";
import SupportPage from "./components/Support";
import UploadPortal from "./components/UploadPortal";
import SummaryofSalesPortal from "./components/SalesSummaryPortal";
import SalesbyDeptsPortal from "./components/SalesbyDeptsPortal";
import LabornSales from "./components/LabornSalesPortal";
import LittleNotebook from "./components/LittleNotebook";
import OverviewAPI from "./components/OverviewAPI";
import Login from "../src/components/Login";
import UseToken from "./js/UseToken";
import Sidebar from "./components/SideBar";

// STYLE SHEET
import "./App.css";

// credits to https://github.com/briancodex/react-sidebar-dropdown/blob/main/src/App.js
const HeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  color: grey;
`;

function App() {
  // destructuring the setToken and token values
  const { token, setToken } = UseToken();

  // display Login if the token is falsy
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <>
      <div className="sideBar_container">
        <Router>
          <Sidebar />
          <div id="content">
            {/* The added functionality of Switch is that it will only render the first matched <Route/> child.  */}
            <Switch>
              {/* The < Router /> component wraps our main application routing. 
              Nested within Router will be all of our < Route /> components, which will point to all other URLs. */}
              <Route path="/overview">
                <Overview />
              </Route>
              <Route path="/reports/summaryofsales">
                <SummaryofSales />
              </Route>
              <Route path="/reports/salesbydepartment">
                <SalesbyDept />
              </Route>
              <Route path="/reports/labourbysales">
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


// ==============
// TODOLIST TAB
// ==============
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

// ======================
// LABOR / SALES REPORT
// ======================
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

// ============================
// YEARLY SUMMARY SALES REPORT
// ============================
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

// ==================
// UPLOAD PORTAL
// ==================
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

// =====================
// OVERVIEW PAGE - TACO
// =====================
function Overview() {
  return (
    <div id="overviewWrapper">
      <HeaderWrap>
        <h2>Welcome Back! Here is your daily taco recipe!!</h2>
      </HeaderWrap>
      <OverviewAPI />
    </div>
  );
}

// ======================
// SUPPORT PAGE
// ======================
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

// =================
// LOGOUT PAGE
// =================
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
