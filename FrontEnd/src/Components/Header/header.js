import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div className="">
        <div className="del-header">
          <div className="container">
            <h1 className="del-heading">
              <div className="del-logo">
                <Link to="/">
                  Weather <span className="highlight">Portfolio </span>
                  App
                </Link>
              </div>
              
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
