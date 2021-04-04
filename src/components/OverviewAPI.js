// import * as React from "react";
// import { Chart } from "react-google-charts";
// import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Overview.css";

// import "../styles/Support.css";
const FunAPI = () => {
  useEffect(async () => {
    axios
      .get("http://taco-randomizer.herokuapp.com/random/")
      .then((response) => {
        console.log(response.data);
        console.log(response.data);
        //   let msgData = response.data;
        let bodyWrapper = document.getElementById("tacoRecipeBox");

        let gridBox = document.createElement("div");
        gridBox.setAttribute("class", "gridContainer");

        let condimentTitle = document.createElement("div");
        condimentTitle.innerHTML =
          "<h2>Condiment Name</h2><br>" +
          response.data.condiment.name +
          "<br><br><h2>Condiment Recipe</h2><br>";

        let addBtnCond = document.createElement("button");
        addBtnCond.innerHTML = "+";

        addBtnCond.addEventListener("click", addFunctionCond);


        let condimentDetail = document.createElement("div");
        condimentDetail.innerHTML =
          "<br><div>" + response.data.condiment.recipe + "</div>";
        function addFunctionCond() {
          if (addBtnCond.innerHTML.localeCompare("+") == 0) {
            condimentDetail.style.display = "block";
            addBtnCond.innerHTML = "-";
          } else {
            condimentDetail.style.display = "none";
            addBtnCond.innerHTML = "+";
          }
        }

        let mixinTitle = document.createElement("div");
        mixinTitle.innerHTML =
          "<br><h2>Mixin Name</h2><br>" +
          response.data.mixin.name +
          "<br><br><h2>Mixin Recipe</h2><br>";
        let addBtnMixin = document.createElement("button");
        addBtnMixin.innerHTML = "+";

        addBtnMixin.addEventListener("click", addFunctionMixin);

        let mixinDetail = document.createElement("div");
        mixinDetail.innerHTML =
          "<br><div>" + response.data.mixin.recipe + "</div>";
        function addFunctionMixin() {
          if (addBtnMixin.innerHTML.localeCompare("+") == 0) {
            mixinDetail.style.display = "block";
            addBtnMixin.innerHTML = "-";
          } else {
            mixinDetail.style.display = "none";
            addBtnMixin.innerHTML = "+";
          }
        }

        let baseLayerTitle = document.createElement("div");
        baseLayerTitle.innerHTML =
          "<br><h2>Base Layer Name</h2><br>" +
          response.data.base_layer.name +
          "<br><br><h2>Base Layer Recipe</h2><br>";

        let addBtnBase = document.createElement("button");
        addBtnBase.innerHTML = "+";

        addBtnBase.addEventListener("click", addFunctionBase);

        let baseLayerDetails = document.createElement("div");
        baseLayerDetails.innerHTML =
          "<br><div>" + response.data.base_layer.recipe + "</div>";
        function addFunctionBase() {
          if (addBtnBase.innerHTML.localeCompare("+") == 0) {
            baseLayerDetails.style.display = "block";
            addBtnBase.innerHTML = "-";
          } else {
            baseLayerDetails.style.display = "none";
            addBtnBase.innerHTML = "+";
          }
        }

        let seasoningTitle = document.createElement("div");
        seasoningTitle.innerHTML =
          "<br><h2>Seasoning Name</h2><br>" +
          response.data.seasoning.name +
          "<br><br><h2>Seasoning Recipe</h2><br>";
        let addBtnseas = document.createElement("button");
        addBtnseas.innerHTML = "+";

        addBtnseas.addEventListener("click", addFunctionSeas);

        let seasoningDetails = document.createElement("div");
        seasoningDetails.innerHTML =
          "<br><div>" + response.data.seasoning.recipe + "</div>";
        function addFunctionSeas() {
          if (addBtnseas.innerHTML.localeCompare("+") == 0) {
            seasoningDetails.style.display = "block";
            addBtnseas.innerHTML = "-";
          } else {
            seasoningDetails.style.display = "none";
            addBtnseas.innerHTML = "+";
          }
        }

        let shellTitle = document.createElement("div");
        shellTitle.innerHTML =
          "<br><h2>Shell Name</h2><br>" +
          response.data.shell.name +
          "<br><br><h2>Shell Recipe</h2><br>";
        let addBtnShell = document.createElement("button");
        addBtnShell.innerHTML = "+";

        addBtnShell.addEventListener("click", addFunctionShell);

        let shellDetails = document.createElement("div");
        shellDetails.innerHTML =
          "<br><div>" + response.data.shell.recipe + "</div>";
        function addFunctionShell() {
          if (addBtnShell.innerHTML.localeCompare("+") == 0) {
            shellDetails.style.display = "block";
            addBtnShell.innerHTML = "-";
          } else {
            shellDetails.style.display = "none";
            addBtnShell.innerHTML = "+";
          }
        }

        bodyWrapper.appendChild(gridBox);
        gridBox.appendChild(condimentTitle);
        gridBox.appendChild(addBtnCond);

        gridBox.appendChild(condimentDetail);

        condimentDetail.style.display = "none";
        gridBox.appendChild(mixinTitle);
        gridBox.appendChild(addBtnMixin);

        gridBox.appendChild(mixinDetail);
        mixinDetail.style.display = "none";
        gridBox.appendChild(baseLayerTitle);
        gridBox.appendChild(addBtnBase);
        gridBox.appendChild(baseLayerDetails);
        baseLayerDetails.style.display = "none";

        gridBox.appendChild(seasoningTitle);
        gridBox.appendChild(addBtnseas);
        gridBox.appendChild(seasoningDetails);
        seasoningDetails.style.display = "none";
        gridBox.appendChild(shellTitle);
        gridBox.appendChild(addBtnShell);
        gridBox.appendChild(shellDetails);
        shellDetails.style.display = "none";
        let break1 = document.createElement("BR");
        gridBox.appendChild(break1);
      });
  }, []);
  function refreshFunction(){
      window.location.reload();
  }

  return (
    <div id="overviewWrapper">
        <button onClick={refreshFunction}>Get a new one!</button>
      <div id="tacoRecipeBox"></div>
      <button onClick={refreshFunction}>Get a new one!</button>
    </div>
  );
};
export default FunAPI;
