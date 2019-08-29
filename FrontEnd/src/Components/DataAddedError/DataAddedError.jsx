import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/header";

class DataAddedError extends React.Component {
  render() {
    return (
      <div className="data-error">
        <Header />
        <section className="container del-body">
          <div>
            <img src={require("../../images/x.png")} />
          </div>
          <h1>Error while saving data. Please try again !</h1>
        </section>
      </div>
    );
  }
}

export default DataAddedError;
