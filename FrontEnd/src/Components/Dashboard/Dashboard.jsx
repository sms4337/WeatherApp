import React from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import Header from "../Header/header";
import { LineChart } from "react-easy-chart";
import LoadingSpinner from "../LoadingSpinner/loadingSpinner";

class Dashboard extends React.Component {
  state = {
    data: null
  };
  retrievedArrayH = [];
  retrievedArrayM = [];
  retrievedArrayB = [];
  retrievedArrayC = [];
  retrievedArrayD = [];
  retrievedArrayK = [];

  cityNmH = "";
  cityNmM = "";
  cityNmB = "";
  cityNmC = "";
  cityNmD = "";
  cityNmK = "";

  componentDidMount() {
    const cities = [
      "Mumbai",
      "Hyderabad",
      "Bangalore",
      "Chennai",
      "Delhi",
      "Kolkatta"
    ];
    const endDate = moment();
    const endDateVal = endDate.format();
    const startDate = endDate.subtract(7, "days");
    const startDateVal = startDate.format();
    console.log(startDateVal + " " + endDateVal);
    cities.map(city => {
      console.log(city);
      axios({
        method: "GET",
        url: `http://localhost:8765/forecastUI/forecast/${city}/${startDateVal}/${endDateVal}`,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          this.setState({ data: response.data });
          console.log(this.state.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }

  render() {
    let chart = (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LoadingSpinner />
      </div>
    );
    if (this.state.data) {
      const stateData = { ...this.state.data };
      for (const key in stateData) {
        const retrievedDataH = {};
        const retrievedDataM = {};
        const retrievedDataB = {};
        const retrievedDataC = {};
        const retrievedDataD = {};
        const retrievedDataK = {};
        switch (stateData[key].cityName) {
          case "Hyderabad":
            retrievedDataH.x = moment(stateData[key].date).format("DD-MMM-YY");
            retrievedDataH.y = stateData[key].temperature;
            this.retrievedArrayH.push(retrievedDataH);
            this.cityNmH = stateData[key].cityName;
            break;
          case "Mumbai":
            retrievedDataM.x = moment(stateData[key].date).format("DD-MMM-YY");
            retrievedDataM.y = stateData[key].temperature;
            this.retrievedArrayM.push(retrievedDataM);
            this.cityNmM = stateData[key].cityName;
            break;
          case "Bangalore":
            retrievedDataB.x = moment(stateData[key].date).format("DD-MMM-YY");
            retrievedDataB.y = stateData[key].temperature;
            this.retrievedArrayB.push(retrievedDataB);
            this.cityNmB = stateData[key].cityName;
            break;
          case "Chennai":
            retrievedDataC.x = moment(stateData[key].date).format("DD-MMM-YY");
            retrievedDataC.y = stateData[key].temperature;
            this.retrievedArrayC.push(retrievedDataC);
            this.cityNmC = stateData[key].cityName;
            break;
          case "Delhi":
            retrievedDataD.x = moment(stateData[key].date).format("DD-MMM-YY");
            retrievedDataD.y = stateData[key].temperature;
            this.retrievedArrayD.push(retrievedDataD);
            this.cityNmD = stateData[key].cityName;
            break;
          case "Kolkatta":
            retrievedDataK.x = moment(stateData[key].date).format("DD-MMM-YY");
            retrievedDataK.y = stateData[key].temperature;
            this.retrievedArrayK.push(retrievedDataK);
            this.cityNmK = stateData[key].cityName;
            break;
        }
      }
      if (
        this.retrievedArrayB &&
        this.retrievedArrayM &&
        this.retrievedArrayH &&
        this.retrievedArrayC &&
        this.retrievedArrayD &&
        this.retrievedArrayK
      ) {
        chart = (
          <div>
            <section className="container del-body">
              <div className="row">
                <div className="col-sm-6">
                  <h4>{this.cityNmM}</h4>
                  <LineChart
                    axisLabels={{ x: "Date", y: "Temperature" }}
                    xType={"time"}
                    style={{ ".label": { fill: "black" } }}
                    axes
                    lineColors={["greenyellow"]}
                    dataPoints
                    grid
                    verticalGrid
                    interpolate={"cardinal"}
                    width={550}
                    height={200}
                    data={[this.retrievedArrayM]}
                  />
                </div>
                <div className="col-sm-6">
                  <h4>{this.cityNmH}</h4>
                  <LineChart
                    axisLabels={{ x: "Date", y: "Temperature" }}
                    style={{ ".label": { fill: "black" } }}
                    xType={"time"}
                    lineColors={["orange"]}
                    dataPoints
                    axes
                    grid
                    verticalGrid
                    interpolate={"cardinal"}
                    width={550}
                    height={200}
                    data={[this.retrievedArrayH]}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <h4>{this.cityNmB}</h4>
                  <LineChart
                    axisLabels={{ x: "Date", y: "Temperature" }}
                    style={{ ".label": { fill: "black" } }}
                    xType={"time"}
                    axes
                    grid
                    verticalGrid
                    lineColors={["brown"]}
                    dataPoints
                    interpolate={"cardinal"}
                    width={550}
                    height={200}
                    data={[this.retrievedArrayB]}
                  />
                </div>
                <div className="col-sm-6">
                  <h4>{this.cityNmC}</h4>
                  <LineChart
                    axisLabels={{ x: "Date", y: "Temperature" }}
                    style={{ ".label": { fill: "black" } }}
                    xType={"time"}
                    axes
                    grid
                    verticalGrid
                    lineColors={["green"]}
                    dataPoints
                    interpolate={"cardinal"}
                    width={550}
                    height={200}
                    data={[this.retrievedArrayC]}
                  />
                </div>
                <div className="col-sm-6">
                  <h4>{this.cityNmD}</h4>
                  <LineChart
                    axisLabels={{ x: "Date", y: "Temperature" }}
                    style={{ ".label": { fill: "black" } }}
                    xType={"time"}
                    axes
                    grid
                    verticalGrid
                    lineColors={["blue"]}
                    dataPoints
                    interpolate={"cardinal"}
                    width={550}
                    height={200}
                    data={[this.retrievedArrayD]}
                  />
                </div>
                <div className="col-sm-6">
                  <h4>{this.cityNmK}</h4>
                  <LineChart
                    axisLabels={{ x: "Date", y: "Temperature" }}
                    style={{ ".label": { fill: "black" } }}
                    xType={"time"}
                    axes
                    grid
                    verticalGrid
                    lineColors={["olive"]}
                    dataPoints
                    interpolate={"cardinal"}
                    width={550}
                    height={200}
                    data={[this.retrievedArrayK]}
                  />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h4>Overall Data</h4>
                <LineChart
                  axisLabels={{ x: "Date", y: "Temperature" }}
                  style={{ ".label": { fill: "black" } }}
                  xType={"time"}
                  axes
                  grid
                  verticalGrid
                  dataPoints
                  interpolate={"cardinal"}
                  lineColors={[
                    "greenyellow",
                    "orange",
                    "brown",
                    "green",
                    "blue",
                    "olive"
                  ]}
                  width={1100}
                  height={250}
                  data={[
                    this.retrievedArrayM,
                    this.retrievedArrayH,
                    this.retrievedArrayB,
                    this.retrievedArrayC,
                    this.retrievedArrayD,
                    this.retrievedArrayK
                  ]}
                />
              </div>
            </section>
            <div className="boxes">
              <div id="Mumbai" className="color-box">
                {" "}
                Mumbai
              </div>
              <div id="Hyderabad" className="color-box">
                {" "}
                Hyderabad
              </div>
              <div id="Bangalore" className="color-box">
                {" "}
                Bangalore
              </div>
              <div id="Chennai" className="color-box">
                {" "}
                Chennai
              </div>
              <div id="Delhi" className="color-box">
                {" "}
                Delhi
              </div>
              <div id="Kolkatta" className="color-box">
                {" "}
                Kolkatta
              </div>
            </div>
          </div>
        );
      }
    }
    return <div>{chart}</div>;
  }
}

export default Dashboard;
