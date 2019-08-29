import React from "react";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import LoadingSpinner from "../LoadingSpinner/loadingSpinner";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

function renderComponent(weatherDetails) {
  if (weatherDetails) {
    return (
      <BootstrapTable data={weatherDetails}>
        <TableHeaderColumn dataField="cityName" isKey>
          City name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="countryName">
          Country Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="temperature">
          Temperature ( &#8451;)
        </TableHeaderColumn>
        <TableHeaderColumn dataField="cloudsDescription">
          Clouds Description
        </TableHeaderColumn>
        <TableHeaderColumn dataField="windDescription">
          Wind Description
        </TableHeaderColumn>
        <TableHeaderColumn dataField="pressure">
          Pressure (hPa)
        </TableHeaderColumn>
        <TableHeaderColumn dataField="humidityPercentage">
          Humidity Percentage (%)
        </TableHeaderColumn>
        <TableHeaderColumn dataField="date">Date</TableHeaderColumn>
        <TableHeaderColumn dataField="weatherDescription">
          Weather Description
        </TableHeaderColumn>
      </BootstrapTable>
    );
  } else {
    <div style={{ display: "flex", justifyContent: "center" }}>
      <LoadingSpinner />;
    </div>;
  }
}

const WeatherDetailsTable = ({ weatherDetails = [] }) => {
  return renderComponent(weatherDetails);
};

// class WeatherDetailsTable extends React.Component{
// constructor(){
//     super();

// }
//     render (){
//         return (

//         );
//      }
// }

export default WeatherDetailsTable;
