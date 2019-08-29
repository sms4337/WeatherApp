import React from "react";
import "./loading.css";

const LoadingSpinner = () => (
  <div>
    {/* <i className="loadingIcon" /> Loading... */}
    {/* <img className = 'loadingIcon' alt = 'loadingIcon' src = '../images/loading_spinner.gif'/> */}
    <img
      className="loadingIcon"
      src={require("../../images/loading_spinner.gif")}
    />
  </div>
);

export default LoadingSpinner;
