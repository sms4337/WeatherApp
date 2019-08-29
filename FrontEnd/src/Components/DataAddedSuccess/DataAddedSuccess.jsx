import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/header";

class DataAddedSuccess extends React.Component {
  render() {
    return (
      <div className="data-success">
        <Header />
        <section className="container del-body">
          <div>
            <img src={require("../../images/check.png")} />
          </div>
          <h1>Data added to the DB successfully.</h1>
        </section>
      </div>
    );
  }
}

export default DataAddedSuccess;
