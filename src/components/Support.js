import React from "react";
import "../styles/Support.css";

// ==============================
// COMPONENT
// ==============================
const Support = () => {

  // ======================
  // HELPER FUNCTION
  // ======================
  function emailFunction() {
    window.location.href = "mailto:ygu32@my.bcit.ca";
  }

  return (
    <div>
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
};
export default Support;
